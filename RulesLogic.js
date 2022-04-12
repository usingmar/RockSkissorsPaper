class RulesLogic{
    mooves;

    constructor(mooves_){
        this.mooves = mooves_;
    }

    calculateResult(userMoove, computerMoove){
        if(userMoove === computerMoove) return 'Draw';
        if(userMoove > computerMoove) return userMoove-computerMoove > Math.floor(this.mooves.length/2) ? 'Win' : 'Loose';
        else return computerMoove - userMoove > Math.floor(this.mooves.length/2) ? 'Loose' : 'Win';             
    }
}
module.exports = new RulesLogic(process.argv.slice(2));
