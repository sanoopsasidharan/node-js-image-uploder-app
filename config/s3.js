const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

module.exports = function uploadfile(file) {
  console.log("this si uploadfile");
  const fileContent = fs.createReadStream(file);
  //   const fileContent = fs.readFileSync(file);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileContent,
    Key: "image.jpg",
    ContentType: "image/JPG",
  };

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      console.log("file uploaded" + data.Location);
    }
  });
  //   return s3.upload(uploadParams).promise();
};
