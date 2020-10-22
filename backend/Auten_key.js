const generatePassword = require('password-generator');

function randomkeygen() {
    let Client_id = generatePassword(8, false,/[a-z0-9]/) +'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(12, false,/[a-z0-9]/);
    // let activate = Client_id.replace(/[-]/g,'')
    let Device_id = generatePassword(4, false,/[a-z0-9]/) +'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/);
    let Device_password = generatePassword(4, false,/[a-z0-9]/) +'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/);
    return {Client_id,Device_id,Device_password}
};
// console.log(randomkeygen());
module.exports.randomkeygen = randomkeygen;

//467cdfd4-77b5-4846-ab58-b8619fe9315b
//Username
//Devicename
//Scope ??

//Plugin web hook --Vernmq (REST Api)