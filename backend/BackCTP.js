const express = require("express");
const app = express();

// dotenv
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import Routes
const postsRoute = require("./routes/post");

// Cors
const cors = require("cors");
app.options("*", cors());
app.use(cors());

// use bodyParser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Connect to DB
mongoose.connect(
  //docker exec -it c4a0164bb900 mongo -u 'root' -p 'vKwrDP8fMnnon0scszzEqFaPxocBC1y/b8rOUVzJ8k8=' --authenticationDatabase 'admin'
  // process.env.DB_Connect,
  "DB_Connect = mongodb://root:vKwrDP8fMnnon0scszzEqFaPxocBC1y%2Fb8rOUVzJ8k8%3D@203.150.221.207:27017/sdwanDB?authSource=admin",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  },
  //useFindAndModify: false is required for query https://mongoosejs.com/docs/deprecations.html#findandmodify
  () => console.log("connected")
);

// Check DB error
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error", err);
});

// MQTT Connect
// var mqttHandler = require('./mqttHandler');
// var mqttClient = new mqttHandler();
//mqttClient.connect();

// //middleware
// app.use('/test', (req,res,next) => {
//   console.log('Middle');
//   next()
// })
// mqttClient.connect();
app.use("/user", postsRoute);

// Route
app.get("/", async (req, res) => {
  res.send("We are on home !!");
});

app.listen(4000, () => {
  console.log("server start on port 4000");
});
