let randomNumber = require('random-number');
sha3_256 = require('js-sha3').sha3_256
class HMACGenerator{
    moove;
    key;
    HMAC;

    generateKey(){
        let key_ = "";
        for(let i = 0; i < 256; i++) key_ += randomNumber({min: 0,max: 1,integer: true})
        this.key = BigInt('0b' + key_).toString(16).toUpperCase();   
    }

    generateHMAC(){
        this.HMAC = sha3_256(this.key + this.moove).toUpperCase();
    }

    getKey(){ return this.key}
    getHMAC(){ return this.HMAC}
    setMoove(moove_){ this.moove = moove_}
    getMoove(){ return this.moove_}
}
module.exports = new HMACGenerator();