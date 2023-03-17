import FileService from "../../services/file.js";
import httpResponse from "../../utils/httpResponse.js";


const controller = {
    getAll: async (req, res) => {
        try {
          const data = await FileService.getAll(req.query);
          return httpResponse.SUCCESS(res, data.data);
        } catch (error) {
          return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
      },
      findOne: async (req, res) => {
        try {
          // first thing, we can't pass such url as params, if you want to get file using url, then you need to 
          // pass it in the body, or simply get file by fileId
          // make sense?yes
          // Id se get ho jata hy uska issue nai, mujhe link se get karwana hy
          // understood, but the issue is that link ko as params send krna impossilble hai, us main `/` slashed hoti hain
          // ham body main bhej skte hain, aur reqeust ko post type bna skte hain
          // aik aur kaam bhi ho skta hai, aap just file na name send kro, us se bhi get ho skta hai
          // aik aur cheez, abhi mind main aaya, dont really sure keh work krega, ham agar as query bhejen tu might be keh kaam kar jaye
          // aap issue smjh rhe ho naa keh why URL is different from normal data, it has slashes yes
          // so, simply dont send complete url, even file name would work, aur as a software engineer
          // your first duty is to understand the issue, think and try different solutions, masle ko samjho
          // aur solutions try kro, is se aapki debugging ki skills bhtttttttttt improve hongi, aur ehi chahiye
          // agar aap khud soocho gay, problems ko dhondho gay tu aapko msla smjh main aana start ho jayega
          // and PLEASE documentation ko bar bar parhna, first read main insan kafi cheezon par ghoor nahi kr pata
          // cheezen thik se smjh nahi aati, is lye bar bar parho, har bar new cheezen sekho gay
          // samjh gai , meny isko id se e get kiya tha but sir ny kaha mujhe link se get kr k do bs wohi kab se try kr rahi thi
          // nai hoya tu poucha apse
          // isha main aapko dant nahi , mujhe pata hy ap samjha rahy hen or mein samjh rahi hon apki bat lekin mein waqai khud se try krti hon krna
          // per zaida hota hy thak jati hon dill nai krta phir jab samjh nai ati
          // jee jee, aap jb stuck ho jain, tu i am always available, no problem. I was just saying, glad keh aap acha kaam kr rhe hon
          // OK aik cheez try krte hain, mere lye bhi new hai, dekhte hain kya hota
          const data = await FileService.findByLink(req.params.id);
          return httpResponse.SUCCESS(res, data.data);
        } catch (error) {
          return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
      },

      add: async (req, res) => {
          if (req.file) {
            req.file.path = req.file.path.replace(`\\`, `/`);
    
            const file = {
                image_link: `${req.protocol}://${req.get("host")}/${req.file.path}`,
                name: req.file.filename,
                original_name: req.file.originalname,
                type: req.file.mimetype,
                path: req.file.path,
            };
            const addResponse = await FileService.add(file);
            if (addResponse.message === "success") {
              return httpResponse.CREATED(res, addResponse.data);
            } else if (addResponse.message === "failed") {
              return httpResponse.CONFLICT(res, addResponse.data);
            } else {
              return httpResponse.INTERNAL_SERVER_ERROR(res, addResponse.data);
            }
          
        } 
      },
      update : async (req, res) => {
        if (req.file) {
          req.file.path = req.file.path.replace(`\\`, `/`);
  
          const file = {
              image_link: `${req.protocol}://${req.get("host")}/${req.file.path}`,
              name: req.file.filename,
              original_name: req.file.originalname,
              type: req.file.mimetype,
              path: req.file.path,
          };
          const addResponse = await FileService.update(req.params.id,file);
          if (addResponse.message === "success") {
            return httpResponse.CREATED(res, addResponse.data);
          } else if (addResponse.message === "failed") {
            return httpResponse.CONFLICT(res, addResponse.data);
          } else {
            return httpResponse.INTERNAL_SERVER_ERROR(res, addResponse.data);
          }
        
      } 
    },
    
      delete: async (req, res) => {
        const addResponse = await FileService.delete(req.params.id);
        if (addResponse.message === "success") {
          return httpResponse.CREATED(res, addResponse.data);
        } else if (addResponse.message === "failed") {
          return httpResponse.CONFLICT(res, addResponse.data);
        } else {
          return httpResponse.INTERNAL_SERVER_ERROR(res, addResponse.data);
        }
      },
}
export default controller;