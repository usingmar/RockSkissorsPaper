const readline = require("readline-sync");
let HMACGenerator_ = require('./HMACGenerator');
let RulesLogic = require('./RulesLogic');
let HelpTable = require('./HelpTable')

class Game{
    mooves = [];
    isEnd = false;

    constructor(mooves_){
        this.mooves = mooves_;
    }

    start(){
        if(this.isCorrectInput(this.mooves).res) this.gameProcess();
        else console.log(this.isCorrectInput(this.mooves).msg);
    }

    isCorrectInput(input){
        if(!this.isEnoughParametrs(input)) return {msg: `Not enough parametrs`, res: false};
        if(!this.isOddInput(input)) return {msg: `Parameters number must be odd`, res: false};
        if(!this.isRepeatedParametrs(input)) return {msg: `Parameters must not repeat`, res: false}
        return {res: true}; 
    }

    isOddInput(input){
        return input.length % 2 != 0
    }

    isEnoughParametrs(input){
        return input.length > 1
    }

    isRepeatedParametrs(input){
        return new Set(input).size === input.length
    }

    gameProcess(){
        while(!this.isEnd){
            HelpTable.createTableData(this.mooves);
            let computerMoove = this.generateComputerMoove();
            this.generateComputerHMAC();
            console.log(`HMAC: ${HMACGenerator_.getHMAC()}`);
            this.showMooves();
            let userMoove = this.readUserMoove();
            if(userMoove === 0){
                this.isEnd = true;
                break;
            }

            if(userMoove === '?'){
                HelpTable.showTable();
                this.resume('Press enter to continue...');
                continue;
            }

            if(!userMoove){
                this.resume('Illegal moove, press enter to continue...');
                continue;
            }
            console.log(`You moove - ` + this.mooves[userMoove-1]+ `\nComputer moove - ` + this.mooves[computerMoove]);
            RulesLogic.setMooves(this.mooves);
            console.log(`Result: ${RulesLogic.calculateResult(userMoove - 1, computerMoove)}!`);
            console.log(`HMAC key: ${HMACGenerator_.getKey()}`);
            this.resume('-------Press enter to another round--------');
        }
    }

    showMooves(){
        console.log('Available mooves:');
        this.mooves.forEach((item,index) => console.log(`${index + 1} --> ${item}`));
        console.log(`? --> help\n0 --> exit`);
    }

    readUserMoove(){
        let userMoove = readline.question('Enter your moove\n-->');
        if(userMoove === '?') return userMoove;
        userMoove = parseInt(userMoove);
        if(userMoove > -1 && userMoove <= this.mooves.length) return userMoove;
        return false;
    }

    generateComputerMoove(){
        let computerMoove = Math.floor(Math.random() * this.mooves.length);
        computerMoove === 0 ? HMACGenerator_.setMoove(computerMoove+1) : HMACGenerator_.setMoove(computerMoove);
        return computerMoove;
    }

    generateComputerHMAC(){
        HMACGenerator_.generateKey();
        HMACGenerator_.generateHMAC();
    }

    resume(message){
        console.log(message);
        readline.question('-->');
        console.clear();
    }
}
module.exports = new Game(process.argv.slice(2));
