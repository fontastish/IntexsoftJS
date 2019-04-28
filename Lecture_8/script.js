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

function timeShift(date) {
    return {
        varDate : new Date(Date.parse(date)),
        value: null,
        add: function (addend, command) {
                
            switch (command) {
                case 'years': this.varDate.setFullYear(this.varDate.getFullYear() + addend); break;
                case 'months': this.varDate.setMonth(this.varDate.getMonth() + addend); break;
                case 'days': this.varDate.setDate(this.varDate.getDate() + addend); break;
                case 'hours': this.varDate.setHours(this.varDate.getHours() + addend); break;
                case 'minutes': this.varDate.setMinutes(this.varDate.getMinutes() + addend); break;
            }
            this.value = this.varDate.getFullYear() + '-' + (this.varDate.getMonth() + 1).toString().padStart(2, 0)
            + '-' + this.varDate.getDate().toString().padStart(2, 0) + ' '
            + this.varDate.getHours().toString().padStart(2, 0) + ":" + this.varDate.getMinutes().toString().padStart(2, 0);
            return this;
            
        },
        subtract: function (subtrahend, command) {
            return this.add(-subtrahend,command);
        }
    }
}