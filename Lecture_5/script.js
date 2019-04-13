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
    if (typeof (arr) == 'object') {
        var result = [];
        arr.map(function (item, i, arr) {
            return item.toLowerCase();
        })
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


console.log(normalizeWords(test2));