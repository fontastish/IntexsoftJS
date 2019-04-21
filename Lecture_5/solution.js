//Подсказка: сюда можно складывать записи адресной книги.
var phoneBook = [];

//Здесь можно объявить переменные и функции, которые понядобятся вам для работы ваших функций

module.exports = {
<<<<<<< HEAD
    getWords: function (sentence) {
        var finalarr = sentence.split(/ |, |\. |\.$/g)
=======
    getWords: function(sentence){
        var finalarr = str.split(/ |, |\. |.$/g)
>>>>>>> 7c4fad7b5371eb5073ee05685868a4c83e85a8ad
            .filter(function (item) {
                return item.indexOf('#') === 0;
            })
            .map(function (item) {
<<<<<<< HEAD
                return item.slice(1);
=======
                return item.replace(/[#]/g, "")
>>>>>>> 7c4fad7b5371eb5073ee05685868a4c83e85a8ad
            });
        return finalarr;
    },

<<<<<<< HEAD
    normalizeWords: function (words) {
=======
    normalizeWords: function(words){
>>>>>>> 7c4fad7b5371eb5073ee05685868a4c83e85a8ad
        var result = [];
        arr.map(function (item) {
            return item.toLowerCase();
        })
            .forEach(function (itemArr) {
                if (!result.some(function (item) {
                    return item.localeCompare(itemArr) === 0;
                })) {
                    result.push(itemArr);
                }
            })
        return result.join(', ');
    },

<<<<<<< HEAD
    addressBook: function (command) {
=======
    addressBook: function(command){
>>>>>>> 7c4fad7b5371eb5073ee05685868a4c83e85a8ad
        var finalReturn;
        var tempArr = str.split(/[ |,]/);
        switch (tempArr[0]) {
            case 'ADD':
                if (!phoneBook.some(function (item) {           //Проверка наличие слова
                    return item.split(":")[0]
                        .localeCompare(tempArr[1]) === 0
                })) {                                                       //Если нету записи, добавляем
                    finalReturn = phoneBook.push(tempArr[1] + ': '
                        + tempArr.slice(2, tempArr.length).join(', '));
                } else {                                                    //Есть запись
                    phoneBook = phoneBook.map(function (item) {
                        return item.split(/: |,/)[0].localeCompare(tempArr[1]) === 0
                            ? item.concat(', ' + tempArr.slice(2, tempArr.length))
                            : item;
                    })
                    finalReturn = phoneBook.length;
                }
                break;
            case 'SHOW':
                finalReturn = phoneBook.sort();
                break;
            case 'REMOVE_PHONE':
                if (phoneBook.some(function (item) {                //Определяем есть ли такой номер
                    return item.split(/ |, /g)
                        .indexOf(tempArr[1]) !== -1
                })) {
                    phoneBook = phoneBook.map(function (eachItem) {         // Мап для изменения записи
                        eachItem = eachItem.split(/ |, /g).filter(function (item) {   //Фильтр чтобы удалить нужный номер из записи
                            return item.localeCompare(tempArr[1]) !== 0;
                        });
                        return eachItem[0] + ' ' + eachItem.slice(1, eachItem.length).join(', ');
                    });
                    phoneBook = phoneBook.filter(function (item) {      // Перепроверка всех контактов на наличие в них телефонов
                        return item.split(/: |,|:/).length > 1;
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