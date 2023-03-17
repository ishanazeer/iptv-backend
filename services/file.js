import FileModel from "../models/file.js";

const UserService = {
  getAll: async (query) => {
    try {
      const data = await FileModel.find(query);

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  findByLink: async (image_link) => {
    try {
      /**
       * do we dont need to create a new api, we can simply use query params,
       * we can even send things like name, type, path, link
       * if the key is not correct, then it will return all the data
       **/
      // the diffference between findOne(image_link) abd findOne({image_link}) ?
      // agar yeh likhay gay keh findOne(image_link), iska matlba hai keh image_link main koi string hai, aur isko compare kro
      // but jo syntax hai filter ka, us main ham ne object bhejna hai, findOne({image_link: image_link})
      // otherwise it will not work, even can throw an error, aur agar variable ka name aur key same ho
      // tu instead of findOne({image_link: image_link}), we can simply write findOne({image_link})
    
      const data = await FileModel.findOne({image_link});

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  add: async (body) => {
    try {
      const savedData = await FileModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  
  update: async (id,body) => {
    try {
      const savedData = await FileModel.findByIdAndUpdate(id, body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  delete: async (id) => {
    try {
      const savedData = await FileModel.findByIdAndDelete(id);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
};

export default UserService;
