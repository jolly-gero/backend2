// const moment = require('moment-timezone');
// const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

// console.log(dateThailand); // "2018-08-20T16:35:14.033+07:00"

// console.log(Date.now.toUTCString());
const moment = require('moment-timezone');
const dateThailand = moment().tz("Asia/Bangkok").format();
// const dateThailand = moment.tz(Date.now()+7, "Asia/Bangkok");
// const dateThailand = moment().utcOffset(7);

const cors = require("cors");
const app = require("express")();
app.use(cors());
const hostname = '127.0.0.1';
const port = 3000;


app.post("/data", (req, res) => {
  console.log("success!");
//   console.log(req);
  console.log(dateThailand);
//   res.send(typeof(dateThailand));
  res.json({"time":dateThailand});

});

app.listen(3000, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});