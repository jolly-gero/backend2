const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcryptjs");

// schema data user
const login = require("../model/userProfile");

// schema device user
const _device = require("../model/deviceID");

// schema data
const _data = require("../model/data");
// Key gen
const Keygen = require("../Auten_key");

const router = express.Router();

//use bodyParser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//!---------------------------- Test  Get ------------------------------------------------------
router.get("/2", async (req, res) => {
  console.log(Keygen.randomkeygen());
  console.log(Keygen.randomkeygen().client_id);
  res.json(Keygen.randomkeygen());
});

// //!----------------------------- crate device----------------------------------------------//
router.post("/device", async (req, res) => {
  console.log(req.body);
  console.log(req.body.username);

  // Checking if the deviceName is already in the database
  const deviceExist = await _device.findOne({
    device_name: req.body.device_name,
  });
  if (deviceExist) return res.status(400).send("device name already exists");

  // create a new device
  const createDevice = new _device({
    username: req.body.username,
    device_name: req.body.device_name,
    client_id: Keygen.randomkeygen().client_id,
    device_id: Keygen.randomkeygen().device_id,
    device_password: Keygen.randomkeygen().device_password,
  });

  try {
    const saveDevice = await createDevice.save();
    res.json(saveDevice);
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

//!----------------------------- crate data----------------------------------------------//
router.post("/data", async (req, res) => {
  console.log(req.body);
  console.log(req.body.dataU);

  const boom = new _data({
    _data: req.body.dataU,
  });

  try {
    const saveData = await boom.save();
    res.json(saveData);
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

//!----------------------------- crate user----------------------------------------------//
router.post("/create", async (req, res) => {
  console.log(req.body);
  console.log(req.body.username);

  // Checking if the userEmail is already in the database
  const emailExist = await login.findOne({ "profile.email": req.body.email });
  if (emailExist) return res.send("Email already exists");

  // Checking if the username is already in the database
  const userExist = await login.findOne({ username: req.body.username });
  if (userExist) return res.send("Username already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create a new user
  const jolly = new login({
    username: req.body.username,
    password: hashPassword,
    profile: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      mobilephone: req.body.mobilephone,
      position: req.body.position,
    },
  });

  try {
    const saveUser = await jolly.save();
    res.json(saveUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//!----------------------------- Unlocked user ----------------------------------------------//
router.post("/unlocked", async (req, res) => {
  console.log(req.body);
  console.log(req.body.username);
  try{
    const unlocked = await login.findOneAndUpdate(
      { username: `${req.body.username}` },
      { unlocked: `${req.body.unlocked}` }, 
      {new: true}
      // {returnOriginal: false}
    );
    console.log(unlocked.unlocked);
    res.json(unlocked)
  } catch (err) {

    res.json({ message: err.toString() });
  }
});

//!----------------------------- deleted user ----------------------------------------------//
router.post("/deleted", async (req, res) => {
  console.log(req.body);
  console.log(req.body.username);
  try{
    const deleted = await login.findOneAndDelete({ username: `${req.body.username}` });
    if (!deleted) return res.send(`username does not exist`);
    console.log(deleted);
    res.send(deleted)
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

//!----------------------------- show All users ----------------------------------------------//
router.post("/showAll", async (req, res) => {
  console.log("Find all Users");

  try {
    const findUser = await login
      .find({})
      .select([
        "username",
        "profile.firstname",
        "profile.lastname",
        "profile.email",
        "profile.position",
        "unlocked",
      ]);
    res.json(findUser);
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

//!----------------------------- find specific user [Login]----------------------------------------------//
router.post("/findOne", async (req, res) => {
  try {
    console.log(req.body);
    const findUser = await login.findOne({
      username: `${req.body.username}`,
      password: `${req.body.password}`,
    });
    console.log(`id : ${findUser._id} >>>> passed`);
    res.json(findUser);
  } catch (err) {
    // res.json({ message: "Username or password is wrong" });
    //const validPass = await bcrypt.compare(req.body.password, )
    res.json({ message: err.toString() });
  }
});

//!----------------------------- [Login with hash]----------------------------------------------//
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);

    // Checking if the email exists
    const user = await login.findOne({ username: `${req.body.username}` });
    if (!user) return res.send("Username does not exists");

    // Password is correct ?
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.send("Invalid password !!");

    res.json(user);
  } catch (err) {
    // res.json({ message: "Username or password is wrong" });
    //const validPass = await bcrypt.compare(req.body.password, )
    res.json({ message: err.toString() });
  }
});

//! ----------------------------- Update user ----------------------------------------------//
router.patch("/update", async (req, res) => {
  
  try{
    // Checking if the username is already in the database
    const userExist = await login.findOne({ username: req.body.username });
    if (!userExist) return res.send("Username does not exists");
 
    // Password is the same ?
    const samePass = await bcrypt.compare(req.body.newPassword, userExist.password);
    if (samePass){return res.send("same");} 
    else{

      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

      const updateUser = await login.updateOne(
      { username: `${req.body.username}` },
      { $set: { password: `${hashPassword}` } });
      console.log(updateUser);
      res.send("updated");
    }
  }catch (err) {
    console.log(err.toString());
    res.json({ message: err.toString() });
  }
  
    // if (updateUser.nModified === 1 && updateUser.n === 1) {
    //   console.log(`this User password >>>> updated`);
    //   res.send("updated");
    // } else if (updateUser.nModified === 0 && updateUser.n === 1) {
    //   console.log(`this User password >>>> the same password`);
    //   res.send("same");
    // } else {
    //   console.log(`can't update`);
    //   res.json({ message: "can't find the User!!" });
    // }
  
});

module.exports = router;
