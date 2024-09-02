const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./configs/Database");
const fileUpload = require("express-fileupload");
// const ModelCreate = require("./models/ModelUser");
const path = require("path");

const RouteUser = require("./routers/RouteUser");
dotenv.config();

const app = express();

try {
  db.authenticate();
  console.log("Database connected....");
  //   ModelCreate.sync();
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(fileUpload());

app.use("/user", RouteUser);

app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(5001, () => console.log("Server running at port 5001"));
