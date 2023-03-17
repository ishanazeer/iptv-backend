import EpisodeModel from "../models/episode.js";
import StreamModel from "../models/stream.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
const UserService = {
  getAll: async () => {
    try {
      const data = await EpisodeModel.find()
        .populate("season_id")
        .populate("image_id");

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getById: async (id) => {
    try {
      const data = await EpisodeModel.findById(id);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllStreams: async (id) => {
    try {
      const data = await EpisodeModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            localField: "_id",
            from: "streams",
            foreignField: "episode_id",
            as: "streams",
          },
        },
      ]);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  addStreamById: async (body) => {
    try {
      const savedData = await StreamModel.create(body); 

    

      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  add: async (body) => {
    try {
      const savedData = await EpisodeModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  update: async (id, body) => {
    try {
      const savedData = await EpisodeModel.findByIdAndUpdate(id, body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  delete: async (id) => {
    try {
      const savedData = await EpisodeModel.findByIdAndDelete(id);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default UserService;
