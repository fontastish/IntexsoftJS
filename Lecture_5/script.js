var test = 'Прохожу курс в компнии #intexsoft по #javascript';

function getWords(str){
    var finalarr = [];
    if (typeof(str) == 'string'){
        finalarr = str.split(' ')
            .filter(function (item,i,arr) {return arr[i].indexOf('#') === 0;})
            .map(function (item,i,arr) {
                return arr[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")});
    }
    return finalarr;
}

var test2 = ['web','intexsoft', 'JavaScript', 'IntexSoft', 'script', 'programming'];

function normalizeWords(arr) {
    var result = [];
    if (typeof (arr) == 'object') {
        arr.map(function (item) {return item.toLowerCase();})
            .forEach(function (itemArr) {
                if (!result.some(function (item) {
                    return item.localeCompare(itemArr) === 0
                })) {
                    result.push(itemArr);
                }
            })
            return result.join();
    }
}

var phoneBook = [];

function addressBook(str) {
    var finalReturn = 0;
    if (typeof(str) === 'string'){
        var tempArr = str.split(/[ |,]/),
            tempStr = '';
        switch (tempArr[0]) {
            case 'ADD':
                if (!phoneBook.some(function (item) {return item.split(":")[0]
                    .localeCompare(tempArr[1]) === 0})){
                    finalReturn = phoneBook.push(tempArr[1] + ': '
                        + tempArr.slice(2,tempArr.length).join());
                } else {
                    phoneBook = phoneBook.map(function (item) {
                        return item.split(/[ |,|:]/)[0].localeCompare(tempArr[1]) === 0
                            ? item.concat(',' + tempArr.slice(2,tempArr.length))
                            : item ;
                    })
                }
                break;
            case 'SHOW': return phoneBook; break;
            case 'REMOVE_PHONE': break;
        }
    }
    return finalReturn;
}

addressBook('ADD Vlad 00000');
addressBook('ADD Ivan 33-33-33,45-456-5');
addressBook('ADD Ivan 100000,99999');
console.log(phoneBook);