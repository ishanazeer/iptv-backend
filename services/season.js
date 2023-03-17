import SeasonModel from "../models/season.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
const UserService = {
  getAll: async () => {
    try {
      const data = await SeasonModel.find().populate("series_id");

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getById: async (id) => {
    try {
      const data = await SeasonModel.findById(id);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllEpisodes:  async (id) => {
    try {
      const data=  await SeasonModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
            $lookup: {
                from: "episodes",
                localField: "_id",
                foreignField: "season_id",
                as: "episodes",
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
      const savedData = await SeasonModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  
  update: async (id,body) => {
    try {
      const savedData = await SeasonModel.findByIdAndUpdate(id, body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  delete: async (id) => {
    try {
      const savedData = await SeasonModel.findByIdAndDelete(id);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default UserService;
