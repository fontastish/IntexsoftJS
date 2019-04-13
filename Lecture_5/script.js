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
                phoneBook.map(function (item) {
                    var b = item.split(/[ |,|:]/)[0].localeCompare(tempArr[1]) === 0,
                        g = item.split(/[ |,|:]/);
                    console.log(g);
                    return item.split(/[ |,|:]/)[0].localeCompare(tempArr[1]) === 0
                        ? item.concat(tempArr.slice(2,tempArr.length))
                        : console.log(10);
                })
                tempStr = tempArr[1] + ': '
                    + tempArr.slice(2,tempArr.length).join();
                phoneBook.push(tempStr);
                finalReturn = tempStr;
                break;
            case 'SHOW': return phoneBook; break;
            case 'REMOVE_PHONE': break;
        }
    }
    return finalReturn;
}

var sss= 'one'

function s(){
    var sss = 'one';
    return sss.concat('two');
}


phoneBook.forEach(function (item) {
    var g = item.split(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)[0].localeCompare(tempArr[1]) === 0;
    if (g){
        item = item + ',' + tempArr.slice(2,tempArr.length).join();
        console.log(item);
        return item;
    } else {
        console.log(55555)
    }
    return item.split(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)[0].localeCompare(tempArr[1]) === 0 ?
        item.concat(tempArr.slice(2,tempArr.length).join()) : item;
})

console.log(sss.concat('two'));
console.log(s());
addressBook('ADD Vlad 00000');
addressBook('ADD Ivan 33-33-33,45-456-5');
addressBook('ADD Ivan 100000,99999');
console.log(phoneBook);