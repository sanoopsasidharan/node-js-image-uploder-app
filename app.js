const http = require("http");
const url = require("url");

require("dotenv").config();
const coresAllows = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

http
  .createServer((req, res) => {
    // let q = url.parse(req.url)

    console.log(req.method);
    // thus is user regtister route
    // @body name email number password
    // @return user true
    if (req.url === "/register" && req.method === "POST") {
      res.writeHead(200, coresAllows);
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        console.log(body);
        const { name, email, password, number } = parse(body);
        const todos = {
          name: "sanoop",
        };
      });
    } // next is login route
    // @body email password
    // @return user true
    else if (req.url === "/login") {
      res.writeHead(200, coresAllows);
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { email, password } = parse(body);
      });
    } else if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write("Hi there, This is a Vanilla Node.js API");
      res.end();
    } else {
      console.log("error router");
      // res.writeHead(405);
      // res.end(`${req.url} is not allowed for the request.`);
    }
  })
  .listen(process.env.PORT, () =>
    console.log(`runing server: ${process.env.PORT}`)
  );
