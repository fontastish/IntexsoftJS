var contentArea = document.getElementById('contentArea');

//Для отрисовки ввода
var form = document.createElement('form');
form.id = "form";
contentArea.appendChild(form);


var inputNumber = document.createElement('input');
inputNumber.id = "inputNumber";
inputNumber.type = "text";
inputNumber.placeholder = "Input number";
form.appendChild(inputNumber);

var buttonSubmit = document.createElement('input');
buttonSubmit.id = "buttonSubmit";
//buttonSubmit.type = "submit";
buttonSubmit.type = "button";
buttonSubmit.value = "Submit";
form.appendChild(buttonSubmit);

var buttonClear = document.createElement('input');
buttonClear.id = "buttonClear";
buttonClear.type = "button";
buttonClear.value = "Clear";
form.appendChild(buttonClear);

//Отрисовка фигур

var figures = document.createElement('div')
figures.id = "figures";
figures.style.margin = "10px 0px 0px 0px";
figures.style.display = "flex"
contentArea.appendChild(figures);

var square = document.createElement('div')
square.id = "square";
figures.appendChild(square);

var circle = document.createElement('div')
circle.id = "circle";
circle.style.borderRadius = "100%"
figures.appendChild(circle);

var leafLeft = document.createElement('div');
leafLeft.id = "leafLeft";
leafLeft.style.borderRadius = "50% 0% 50% 0%"
figures.appendChild(leafLeft);

var leafRight = document.createElement('div');
leafRight.id = "leafRight";
leafRight.style.borderRadius = "0% 50% 0% 50%"
figures.appendChild(leafRight);

var nodeFigures = figures.childNodes;
for (var i = 0; i < nodeFigures.length; i++) {
    nodeFigures[i].style.border = "2px solid #000";
    nodeFigures[i].style.cursor = "pointer"
    nodeFigures[i].style.width = "50px";
    nodeFigures[i].style.height = "50px";
    nodeFigures[i].style.marginLeft = "10px";
}

//Рабочая область

var workspace = document.createElement('div');
workspace.id = "workspace";
contentArea.appendChild(workspace);
workspace.style.marginTop = "10px";
var selectedFigure;

//Ивенты
buttonClear.addEventListener("click", clearFigures);
buttonSubmit.addEventListener("click", drawFigure);
//form.addEventListener("submit",drawFigure);
figures.addEventListener("click", selectFigure)

//Функции для ивентов
function clearFigures() {
    workspace.innerHTML = "";
}

function drawFigure() {
    if (inputNumber.value > 0 && inputNumber.value < 31) {
        for (var i = 0; i < inputNumber.value; i++) {
            var element = document.createElement("div");
            element.style.display = "flex";
            workspace.appendChild(element);
            for (var j = 0; j < inputNumber.value; j++) {
                element.appendChild(newFigure(selectedFigure).cloneNode());
            }
        }
    } else {
        return false;
    }
}


function selectFigure(event) {
    nodeFigures.forEach(function (node) {
        if (node.id === event.target.id) {
            event.target.style.backgroundColor = "red";
            selectedFigure = event.target.cloneNode();

        } else {
            node.style.backgroundColor = "white";
        }
    })
}

// Доп функции

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function newFigure(node) {
    node.style.backgroundColor = randomColor();
    node.style.marginTop = "10px";
    node.style.border = "";
    node.style.cursor = ""
    return node;
}