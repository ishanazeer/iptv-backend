import StreamModel from "../models/stream.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
const UserService = {
  getAll: async () => {
    try {
      const data = await StreamModel.find()
        .populate("episode_id")
        .populate("user_id");

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getById: async (id) => {
    try {
      const data = await StreamModel.findById(id);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllEpisodes: async (id) => {
    try {
      const data = await StreamModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            localField: "episode_id",
            from: "episodes",
            foreignField: "_id",
            as: "episodes",
          },
        },
      ]);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllUsers: async (id) => {
    try {
      const data = await StreamModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            localField: "user_id",
            from: "users",
            foreignField: "_id",
            as: "users",
          },
        },
      ]);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllSeasonsOfEpisode: async (id) => {
    try {
      const data = await StreamModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            localField: "episode_id",
            from: "episodes",
            foreignField: "_id",
            as: "episodes",
            pipeline: [
              {
                $lookup: {
                  localField: "season_id",
                  from: "seasons",
                  foreignField: "_id",
                  as: "seasons",
                },
              },
            ],
          },
        },
      ]);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllSeasonsOfEpisodeOfSeries: async (id) => {
    try {
      const data = await StreamModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            localField: "episode_id",
            from: "episodes",
            foreignField: "_id",
            as: "episodes",
            pipeline: [
              {
                $lookup: {
                  localField: "season_id",
                  from: "seasons",
                  foreignField: "_id",
                  as: "seasons",
                  pipeline: [
                    {
                      $lookup: {
                        localField: "series_id",
                        from: "series",
                        foreignField: "_id",
                        as: "series",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ]);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllSeasonsOfEpisodeOfSeriesOfGenre: async (id) => {
    try {
      const data = await StreamModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            localField: "episode_id",
            from: "episodes",
            foreignField: "_id",
            as: "episodes",
            pipeline: [
              {
                $lookup: {
                  localField: "season_id",
                  from: "seasons",
                  foreignField: "_id",
                  as: "seasons",
                  pipeline: [
                    {
                      $lookup: {
                        localField: "series_id",
                        from: "series",
                        foreignField: "_id",
                        as: "series",
                        pipeline: [
                          {
                            $lookup: {
                              localField: "genre_id",
                              from: "genres",
                              foreignField: "_id",
                              as: "genres",
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ]);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  add: async (body) => {
    try {
      const savedData = await StreamModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  update: async (id, body) => {
    try {
      const savedData = await StreamModel.findByIdAndUpdate(id, body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  delete: async (id) => {
    try {
      const savedData = await StreamModel.findByIdAndDelete(id);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default UserService;
