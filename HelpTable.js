const {table} = require('table');
let RulesLogic = require('./RulesLogic');

class HelpTable{
    tableData = [];

    createTableData(variants){
        this.createHead(variants); 
        for(let i = 0; i < variants.length; i++){
            let buf = variants.map(item => RulesLogic.calculateResult(i, variants.indexOf(item)));
            buf.unshift(variants[i]);
            this.tableData[i+1] = buf.slice();
        }         
    }

    createHead(variants){
        variants.unshift('  ');
        this.tableData[0] = variants.slice();
        variants.shift();
    }

    showTable(){
        console.log(table(this.tableData));
    }
}

module.exports = new HelpTable();
