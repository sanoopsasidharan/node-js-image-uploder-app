const http = require("http");
const url = require("url");
const fs = require("fs");
const { parse } = require("querystring");
var formidable = require("formidable");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const uploadfile = require("./config/s3");
const uploadfile = require("./config/s3");

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const coresAllows = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

// let q = url.parse(req.url)

// console.log(req.method);
// console.log(req.url);
// thus is user regtister route
// @body name email number password
// @return user true
// if (req.url === "/register" && req.method === "POST") {
//   res.writeHead(200, coresAllows);
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });
//   req.on("end", () => {
//     console.log(body);
//     const { name, email, password, number } = parse(body);
//     const todos = {
//       name: "sanoop",
//     };
//   });
// }
// next is login route
// @body email password
// @return user true
// else if (req.url === "/login") {
//   res.writeHead(200, coresAllows);
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });
//   req.on("end", () => {
//     const { email, password } = parse(body);
//   });
// if (req.url === "/" && req.method === "GET") {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.write("Hi there, This is a Vanilla Node.js API");
//   res.end();
// } else {
//   console.log("error router");
// res.writeHead(405);
// res.end(`${req.url} is not allowed for the request.`);
//   }
// })

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(url, method);
  if (url === "/" && method === "GET") {
    fs.readFile("./view/HomePage/Home.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });

    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write(
    //   '<form action="fileupload" method="post" enctype="multipart/form-data">'
    // );
    // res.write('<input type="file" name="filetoupload"><br>');
    // res.write('<input type="submit">');
    // res.write("</form>");
    // return res.end();

    //   res.end(`
    //   <!doctype html>
    //   <html>
    //   <body>
    //       <form action="/" method="post">
    //           <input type="text" name="fname" /><br />
    //           <input type="number" name="age" /><br />
    //           <input type="file" name="photo" /><br />
    //           <button>Save</button>
    //       </form>
    //   </body>
    //   </html>
    // `);
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

    // var form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //   console.log(files.filetoupload.originalFilename, "files");
    //   const img = files.filetoupload.originalFilename;
    //   console.log(typeof img);

    //   upload.single("img");

    // let path1 = "_1.png";
    // let img1 = img.replace(/^data:([A-Za-z+/]+);base64,/, "");
    // fs.writeFileSync(path1, img1, { encoding: "base64" });
    // console.log(fs.writeFileSync(path1, img1, { encoding: "base64" }));

    // var oldpath = files.filetoupload.filepath;
    // var newpath = "C://Downloads/" + files.filetoupload.originalFilename;
    // fs.rename(oldpath, newpath, function (err) {
    //   if (err) throw err;
    //   res.write("File uploaded and moved!");
    //   res.end();
    // });
    // });

    // fs.readFile("homePage.html", (err, data) => {
    //   res.writeHead(200, { "Content-Type": "text/html" });
    //   res.write(data);
    //   res.end();
    // });
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
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      console.log(parse(body));
      const { image } = parse(body);

      let path1 = "./uploads/image.jpg";
      let img1 = image.replace(/^data:([A-Za-z+/]+);base64,/, "");
      fs.writeFileSync(path1, img1, { encoding: "base64" });
      const result = await uploadfile("./uploads/image.jpg");
      res.end("ok");
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
