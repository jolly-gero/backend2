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
