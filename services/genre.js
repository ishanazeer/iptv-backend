import genre from "../models/genre.js";
import GenreModel from "../models/genre.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
const UserService = {
  getAll: async () => {
    try {
      const data = await GenreModel.find();

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getById: async (id) => {
    try {
      const data = await GenreModel.findById(id);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getSeriesById: async (id) => {
    try {
const data = await GenreModel.aggregate([
				{ $match: { _id: ObjectId(id) } },
				{
					$lookup: {
						localField: "_id",
						from: "series",
						foreignField: "genre_id",
						as: "series",
					},
				},
			]);
  if (!data || data.length === 0 || !data[0].series) {
    return { message: "No series found for this genre", data: null };
}
      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getSeasonById: async (id) => {
  	try {
			const data = await GenreModel.aggregate([
				{ $match: { _id: ObjectId(id) } },
				{
					$lookup: {
						localField: "_id",
						from: "series",
						foreignField: "genre_id",
						as: "series",
						pipeline: [
							{
								$lookup: {
									localField: "_id",
									from: "seasons",
									foreignField: "series_id",
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

  add: async (body) => {
    try {
      const savedData = await GenreModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  update: async (id,body) => {
    try {
      const savedData = await GenreModel.findByIdAndUpdate(id, body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  delete: async (id) => {
    try {
      const savedData = await GenreModel.findByIdAndDelete(id);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default UserService;

/**GET /genres/:id/series - Get all series of a genre by genre id
This is the code for this
getSeriesById: async (id) => {
    try {
    const data=  await GenreModel.aggregate([
      {
          $lookup: {
              from: "series",
              localField: "_id",
              foreignField: "genre_id",
              as: "series",
          },
      },
  ])
      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

I have to pass the id cause im giving the id as parameter and dont understand how can I pass the Id with aggregate function , tried some solutions but getting errors
**/