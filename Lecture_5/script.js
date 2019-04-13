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

function normalizeWords(arr){
    if (typeof(arr) == 'object'){
        var result = [];
        arr = arr.map(function (item,i,arr) {return item.toLowerCase();})
        for (var i = 0; i < arr.length; i++){
            if (result.some(function (item,i,arr) {return item == arr[i]})){
                result.push(arr[i]);
            }
        }
        return result.join().toLowerCase;
    }
}


console.log(normalizeWords(test2));