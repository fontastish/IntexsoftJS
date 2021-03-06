function query(collection) {
    var commands = [].slice.call(arguments, 1);
    var filterArr = commands.filter(function (filtCom) {
        return filtCom.com == 'filterIn';
    })
    for (var i = 0; i < filterArr.length; i++) {
        collection = filterArr[i].funct(collection);
    }
    var selectArr = commands.filter(function (filtCom) {
        return filtCom.com == 'select';
    })
    for (var i = 0; i < selectArr.length; i++) {
        collection = selectArr[i].funct(collection);
    }
    return collection;
}

function select() {
    var args = [].slice.call(arguments);
    return {
        com: 'select',
        funct: function (collection) {
            return collection.map(function (itemCollection) {
                var temp = {};
                args.forEach(function (field) {
                    return temp[field] = itemCollection[field]
                });
                return temp;
            })
        }
    }
}

function filterIn(property, values) {
    return {
        com: 'filterIn',
        funct: function (collection) {
            return collection.filter(function (item) {
                return values.indexOf(item[property]) != -1;
            })
        }
    }
}

module.exports = {
    timeShift: function(date) {
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
    },
    lib: {
        query: query,
        select: select,
        filterIn: filterIn
    }    
};
