const http = require("http");
const url = require("url");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { parse } = require("querystring");
require("dotenv").config();
const uploadfile = require("./config/s3");
const { v4: uuidv4 } = require("uuid");
require("./mongoDB/index");
const { uploadingImg } = require("./controller/imgController");

const coresAllows = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(url, method);
  if (url === "/" && method === "GET") {
    fs.readFile("./view/HomePage/Home.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (url === "/fileupload" && method === "POST") {
    console.log("fkaj");

    let body = "";
    req.on("data", (chunk) => {
      console.log("fajlkj");
      console.log(chunk);
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log(body);
      const { image } = parse(body);
      console.log(image);
    });

    let img;

    let path1 = "_1.png";
    let img1 = img.replace(/^data:([A-Za-z+/]+);base64,/, "");
    fs.writeFileSync(path1, img1, { encoding: "base64" });
  } else if (url === "/" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log(parse(body));
      // let image = parse(body);
      // console.log(image.image);
      // const pic = image.photo;
      // console.log(typeof pic);

      res.end("ok");
    });
  } else if (url === "/image" && method === "GET") {
    fs.readFile("./view/Uploading/Uploading.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (url === "/image" && method === "POST") {
    console.log("this is the /image post req");
    res.writeHead(200, coresAllows);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const { name, image } = parse(body);
      const imgId = uuidv4();
      let path1 = `./uploads/${imgId}.jpg`;
      let img1 = image.replace(/^data:([A-Za-z+/]+);base64,/, "");
      fs.writeFileSync(path1, img1, { encoding: "base64" });
      const result = await uploadfile(path1, imgId);
      console.log(result.Location);
      const imgUrl = result.Location;
      await unlinkFile(path1);
      // const name = "sanoop";
      const addingRes = await uploadingImg(name, imgUrl);
      console.log(addingRes);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify({ message: "uploaded file" }));
    });
  } else {
    // fs.readFile("Error.html", (err, data) => {
    //   res.writeHead(200, { "Content-Type": "text/html" });
    //   res.write(data);
    //   res.end();
    // });
    console.log("error");
  }
});

server.listen(process.env.PORT, () =>
  console.log(`runing server: ${process.env.PORT}`)
);
