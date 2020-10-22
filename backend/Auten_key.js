const generatePassword = require('password-generator');

function randomkeygen() {
    let client_id = generatePassword(8, false,/[a-z0-9]/) +'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(12, false,/[a-z0-9]/);
    // let activate = Client_id.replace(/[-]/g,'')
    let device_id = generatePassword(4, false,/[a-z0-9]/) +'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/);
    let device_password = generatePassword(4, false,/[a-z0-9]/) +'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/)+'-'+ generatePassword(4, false,/[a-z0-9]/);
    return {client_id,device_id,device_password}
};
// console.log(randomkeygen());
module.exports.randomkeygen = randomkeygen;

//467cdfd4-77b5-4846-ab58-b8619fe9315b
//Username
//Devicename
//Scope ??

//Plugin web hook --Vernmq (REST Api)