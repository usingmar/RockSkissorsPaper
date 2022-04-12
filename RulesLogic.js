class RulesLogic{
    mooves;

    constructor(mooves_){
        this.mooves = mooves_;
    }

    setMooves(mooves_){
        this.mooves = mooves_;
    }

    getResult(){
        return this.result;
    }

    calculateResult(userMoove, computerMoove){
        if(userMoove === computerMoove) return 'Draw';
        if(userMoove > computerMoove) return userMoove-computerMoove > Math.floor(this.mooves.length/2) ? 'Win' : 'Loose';
        else return computerMoove - userMoove > Math.floor(this.mooves.length/2) ? 'Loose' : 'Win';             
    }
}
module.exports = new RulesLogic(process.argv.slice(2));