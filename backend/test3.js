const bcrypt = require("bcryptjs");

//Hash password
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(req.body.password, salt)
console.log(hashPassword);

//  // Password is correct ?
//  const validPass = await bcrypt.compare(req.body.password, user.password)
//  if(!validPass) return res.status(400).send('Invalid password !!')