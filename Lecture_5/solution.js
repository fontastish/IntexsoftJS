//Подсказка: сюда можно складывать записи адресной книги.
var phoneBook = [];

//Здесь можно объявить переменные и функции, которые понядобятся вам для работы ваших функций

module.exports = {
    getWords: function(sentence){
        var finalarr = sentence.split(/[ ,.]/g)
        .filter(function (item) {
            return item.indexOf('#') === 0;
        })
        .map(function (item) {
            return item.replace(/[#]/g, "")
        });
        return finalarr;},
    normalizeWords: function(words){
        var result = [];
        words.map(function (item) {
            return item.toLowerCase();
        })
            .forEach(function (itemArr) {
                if (!result.some(function (item) {
                    return item.localeCompare(itemArr) === 0
                })) {
                    result.push(itemArr);
                }
            })
        return result.join(', ');
    },
    addressBook: function(command){
        var finalReturn;
        var tempArr = command.split(/[ |,]/);
        switch (tempArr[0]) {
            case 'ADD':
                if (!phoneBook.some(function (item) {
                    return item.split(":")[0]
                        .localeCompare(tempArr[1]) === 0
                })) {
                    finalReturn = phoneBook.push(tempArr[1] + ': '
                        + tempArr.slice(2, tempArr.length).join());
                } else {
                    phoneBook = phoneBook.map(function (item) {
                        return item.split(/: |,/)[0].localeCompare(tempArr[1]) === 0
                            ? item.concat(',' + tempArr.slice(2, tempArr.length))
                            : item;
                    })
                    finalReturn = phoneBook.length;
                }
                break;
            case 'SHOW':
                finalReturn = phoneBook.sort();
                break;
            case 'REMOVE_PHONE':
                if (phoneBook.some(function (item) {
                    return item.split(/: |,/)
                        .indexOf(tempArr[1]) !== -1
                })) {
                    phoneBook = phoneBook.map(function (eachItem) {
                        eachItem = eachItem.split(/: |,/).filter(function (item) {
                            return item.localeCompare(tempArr[1]) !== 0;
                        });
                        return eachItem[0] + ': ' + eachItem.slice(1, eachItem.length);
                    });
                    phoneBook = phoneBook.filter(function (item) {
                        return item.split(/: |,|:/)[1].localeCompare('')
                    });
                    finalReturn = true;
                } else {
                    finalReturn = false;
                }
                break;
        }
        return finalReturn;
    }
}