// function query(collection) {

// }

// function select() {

// }

// function filterIn(property, values) {

// }

// module.exports = {
//     timeShift: function(date) {},
//     lib: {
//         query: query,
//         select: select,
//         filterIn: filterIn
//     }    
// };


//date(2017-05-16 13:45)    

function timeShift(date){
    return {
        add:function(addend, command){
            var varDate = new Date(Date.parse(date))
            switch (command) {
                case 'years': varDate.setFullYear(varDate.getFullYear()+addend);break;
                case 'months': varDate.setMonth(varDate.getMonth()+addend);break;
                case 'days': varDate.setDate(varDate.getDate()+addend);break;
                case 'hours': varDate.setHours(varDate.getHours()+addend);break;
                case 'minutes': varDate.setMinutes(varDate.getMinutes()+addend);break;
            }
            return timeShift.bind(timeShift,varDate.getFullYear() + '-' + (varDate.getMonth()+1).toString().padStart(2,0)     //Для того чтобы собрать новую строку по старому шаблону
            + '-' + varDate.getDate().toString().padStart(2,0)+ ' ' 
            + varDate.getHours().toString().padStart(2,0) + ":" + varDate.getMinutes().toString().padStart(2,0));
        },
        subtract:function(subtrahend, command){
            var varDate = new Date(Date.parse(date))
            switch (command) {
                case 'years': varDate.setFullYear(varDate.getFullYear()-subtrahend);break;
                case 'months': varDate.setMonth(varDate.getMonth()-subtrahend);break;
                case 'days': varDate.setDate(varDate.getDate()-subtrahend);break;
                case 'hours': varDate.setHours(varDate.getHours()-subtrahend);break;
                case 'minutes': varDate.setMinutes(varDate.getMinutes()-subtrahend);break;
            }
            return timeShift.bind(timeShift, varDate.getFullYear() + '-' + (varDate.getMonth()+1).toString().padStart(2,0) 
            + '-' + varDate.getDate().toString().padStart(2,0)+ ' ' 
            + varDate.getHours().toString().padStart(2,0) + ":" + varDate.getMinutes().toString().padStart(2,0));
        }
    }
}