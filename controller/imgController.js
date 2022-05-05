const Uploads = require("../model/ImageUpload_Model");

const uploadingImg = async (name, imgUrl) => {
  try {
    console.log("entering uploading img function");
    const result = await new Uploads({ name, imgUrl });
    const saveResult = await result.save();
    return saveResult;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadingImg,
};
