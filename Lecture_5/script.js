var test = 'Прохожу курс в компнии #intexsoft по #javascript';

function getWords(str){
    var finalarr = [];
    if (typeof(str) == 'string'){
        finalarr = str.split(' ')
            .filter(function (item,i,arr) {return arr[i].indexOf('#') == 0 ? true : false;})
            .map(function (item,i,arr) {
                return arr[i].slice(1,str.length)
                    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")});
    }
    return finalarr;
}

console.log(getWords(test));