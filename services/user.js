import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import passwordHash from "password-hash";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
const UserService = {
  getAll: async () => {
    try {
      const data = await UserModel.find();

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  getById: async (id) => {
    try {

      const data = await UserModel.findById(id);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllStreams: async (id) => {
    try {
      const data = await UserModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            localField: "_id",
            from: "streams",
            foreignField: "user_id",
            as: "streams",
          },
        },
      ]);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllStreamsByBothIds: async (id, streamId) => {
    try {
      const data = await UserModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            from: "streams",
            let: { user_id: "$_id" },

            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$user_id", "$$user_id"] },
                      { $eq: ["$_id", ObjectId(streamId)] },
                    ],
                  },
                },
              },
            ],
            as: "streams",
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
      const data = await UserModel.findOne({ email: body.email });
      if (data) {
        return { message: "failed", data: "User already exist" };
      }

      const hashedPassword = passwordHash.generate(body.password);
      body.password = hashedPassword;

      const savedData = await UserModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  login: async (body) => {
    try {
      //     const savedData = await UserModel.findOne({
      //       email: body.email,
      //       password: body.password,
      //     });

      //     if (savedData) {
      //       const token = jwt.sign(savedData._doc, "secretKey");
      //       return { message: "success", token };
      //     } else {
      //       return { message: "Failed" };
      //     }
      //   } catch (error) {
      //     return { message: "error", data: error.message };
      //   }
      // },

      const data = await UserModel.findOne({ email: body.email });

      if (!data) {
        return { message: "failed", data: "Email is wrong" };
      }

      const isVerified = passwordHash.verify(body.password, data.password);
    

      if (!isVerified) {
        return { message: "failed", data: "Password is wrong" };
      }

      delete data._doc.password;
      const token = jwt.sign(data._doc, "secretKey");
      if (token) {
        return { message: "success", data: { token } };
      } else {
        return { message: "error", data: "Token is not generated" };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  update: async (id, body) => {
    try {
      const savedData = await UserModel.findByIdAndUpdate(id, body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  delete: async (id) => {
    try {
      const savedData = await UserModel.findByIdAndDelete(id);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default UserService;
