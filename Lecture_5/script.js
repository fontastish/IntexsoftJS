var test = 'Прохожу курс в компнии #intexsoft по #javascript';

function getWords(sentence) {
    var finalArr = sentence.split(' ')
        .filter(function (item) {
            return item.indexOf('#') === 0;
        })
        .map(function (item) {
            return item.slice(1);
        });
    return finalArr;
}

var test2 = ['web', 'intexsoft', 'JavaScript', 'IntexSoft', 'script', 'programming'];

function normalizeWords(words) {
    var result = [];
    words.map(function (item) {
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
}

var phoneBook = [];

function addressBook(command) {
    var finalReturn;
    var tempArr = command.split(/[ |,]/);
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
                phoneBook = phoneBook.map(function (eachItem) {         // Маp для изменения записи
                    eachItem = eachItem.split(/ |, /g).filter(function (item) {   //Фильтр чтобы удалить нужный номер из записи
                        return item.localeCompare(tempArr[1]) !== 0;
                    });
                    return eachItem[0] + ' ' + eachItem.slice(1, eachItem.length).join(', ');
                });
                phoneBook = phoneBook.filter(function (item) {      // Перепроверка всех контактов на наличие в них телефонов
                    return item.split(/: |,|:/)[1] != "";
                });
                finalReturn = true;
            } else {
                finalReturn = false;
            }
            break;
    }
    return finalReturn;
}

addressBook('ADD Vlad 00000');
addressBook('ADD Ivan 33-33-33,45-456-5');
addressBook('ADD Avan 100000,99999');
addressBook('ADD Vlad 444');
console.log(addressBook('SHOW'));
//addressBook('REMOVE_PHONE 99999');