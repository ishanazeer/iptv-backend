import SeriesModel from "../models/series.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const UserService = {
  getAll: async () => {
    try {
      const data = await SeriesModel.find().populate("genre_id");

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getById: async (id) => {
    try {
      const data = await SeriesModel.findById(id);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getSeasonById:  async (id) => {
    try {
      const data=  await SeriesModel.aggregate([
				{ $match: { _id: ObjectId(id) } },

        {
            $lookup: {
                from: "seasons",
                localField: "_id",
                foreignField: "series_id",
                as: "seasons",
            },
        },
    ])

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllEpisodes:  async (id) => {
    try {
      const data=  await SeriesModel.aggregate([
				{ $match: { _id: ObjectId(id) } },
        {
            $lookup: {
                from: "seasons",
                localField: "_id",
                foreignField: "series_id",
                pipeline: [
                  {
                      $lookup: {
                          from: "episodes",
                          localField: "_id",
                          foreignField: "season_id ",
                          as: "episodes",
                      },
                  },
              ],
                as: "seasons",
            },
        },
    ])

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  add: async (body) => {
    try {
      const savedData = await SeriesModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  
  update: async (id,body) => {
    try {
      const savedData = await SeriesModel.findByIdAndUpdate(id, body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  delete: async (id) => {
    try {
      const savedData = await SeriesModel.findByIdAndDelete(id);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default UserService;
