var contentArea = document.getElementById('contentArea');
contentArea.style.display = "flex";

//отрисовка выбора фигур
var figuresSelect = document.createElement("div");
figuresSelect.style.border = "1px solid #000";
figuresSelect.style.width = "300px";
contentArea.appendChild(figuresSelect);

var figuresText = document.createElement("h1")
figuresText.innerHTML = "Select figure";
figuresText.style.textAlign = "center"
figuresSelect.appendChild(figuresText);

var figures = document.createElement("div")
figures.style.display = "flex";
figures.style.flexWrap = "wrap";
figuresSelect.appendChild(figures);

var king = document.createElement('div')
king.id = "king";
king.innerHTML = "♚";
figures.appendChild(king);

var queen = document.createElement('div')
queen.id = "queen";
queen.innerHTML = "♛";
figures.appendChild(queen);

var bishop = document.createElement('div')
bishop.id = "bishop";
bishop.innerHTML = "♜";
figures.appendChild(bishop);

var rook = document.createElement('div')
rook.id = "rook";
rook.innerHTML = "♝";
figures.appendChild(rook);

var knight = document.createElement('div')
knight.id = "knight";
knight.innerHTML = "♞";
figures.appendChild(knight);

var pawn = document.createElement('div')
pawn.id = "pawn";
pawn.innerHTML = "♟";
figures.appendChild(pawn);

figures.childNodes.forEach(function (node) {
    node.style.cursor = "pointer";
    node.style.fontSize = "100px";
    node.className = 'figure';
    node.style.userSelect = "none";
    var test = (parseInt(figuresSelect.style.width) / 3).toString();
    //node.style.fontSize = (parseInt(figuresSelect.style.width) / 3) + "px";
})

// figures.addEventListener('click', select);
// var selectedFigure;

// function select(event) {
//     selectedFigure = event.target.cloneNode(true);
//     event.target.style.color = 'red';
// }

// board.addEventListener("click", placeFigure);
// function placeFigure(event) {
//     if (event.target.className == 'whiteBlock' || event.target.className == 'blackBlock') {
//         // event.target.parentNode.parentNode.innerHTML = "";
//         //drawChess();
//         event.target.innerHTML = selectedFigure.innerHTML;
//         event.target.style.fontSize = "50px";
//         event.target.style.lineHeight = event.target.style.height;
//         event.target.style.backgroundColor = "red";
//     }

// }

// отрисовка доски
var board = document.createElement('div');
board.id = 'board';
//board.style.display = "flex";
board.style.border = "1px solid #000";
contentArea.appendChild(board);

function drawChess() {
    var flag = true;
    var id = 0;
    for (var i = 0; i < 8; i++) {
        var colomn = document.createElement("div");
        colomn.style.display = "flex";
        board.appendChild(colomn);
        for (var j = 0; j < 8; j++) {
            if (j == 0) {
                flag = !flag;
            }
            var block = document.createElement("div")
            if (flag) {
                block.style.backgroundColor = "#d279a6";
                //block.style.backgroundColor = "black";
                block.className = "blackBlock";
                block.id = id;

            } else {
                block.style.backgroundColor = "white";
                block.className = "whiteBlock";
                block.id = id;
            }
            block.style.height = "50px";
            block.style.width = "50px";
            block.className += " block";
            flag = !flag;
            id++;
            colomn.appendChild(block);
        }

    }

    board.childNodes
}

drawChess();

//dragAndDrop
document.addEventListener('mousedown', dragAndPlace);
function dragAndPlace(event) {
    if (event.target.className == 'figure') {
        var figure = event.target.cloneNode(true);
        figure.style.position = 'absolute';
        figure.style.fontSize = "50px";
        moveAt(event);
        document.body.appendChild(figure);
        figure.style.zIndex = 1000

        function moveAt(event) {
            figure.style.left = event.pageX - figure.offsetWidth / 2 + 'px';
            figure.style.top = event.pageY - figure.offsetHeight / 2 + 'px';
        }
        document.addEventListener('mousemove', mousemove);

        function mousemove(event) {
            moveAt(event)
        };

        figure.addEventListener('mouseup', mouseup);
        figure.addEventListener('dragstart', function () {
            return false;
        });



        function mouseup(event) {
            var arrBlock = Array.prototype.slice.call(document.getElementsByClassName('block'));
            for (let i = 0; i < 64; i++) {
                arrBlock[i].innerText = "";
                arrBoard[i].active = false;
            }
            figure.style.position = "";
            var elem = document.elementFromPoint(event.clientX, event.clientY);
            if (elem.className.includes("block")) {
                elem.innerText = figure.innerText;
                elem.style.fontSize = "50px";
                elem.style.lineHeight = '50px';
                arrBoard[elem.id].active = true;
            }
            document.removeEventListener('mousemove', mousemove);
            figure.removeEventListener('mouseup', mouseup);
            figure.remove();
            showMoves();
        };
    }
}

function showMoves() {
    var activeBlock = arrBoard.find(function (block) {
        return block.active;
    })
    var posibleMoves = {
        x: null,
        y: null
    },
        ActiveMove;
    switch (document.getElementById(activeBlock.id).innerText) {
        case '♟':
            ActiveMove = pawnMoves;
            break;
        case '♚':
            ActiveMove = queenMoves;
            break;
        case '♞':
            ActiveMove = knightMoves;
            break;
        case '♜':
            ActiveMove = bishopMoves;
            break;
        case '♝':
            ActiveMove = rookMoves;
            break;
        case '♛':
            ActiveMove = kingMoves;
            break;
        default:
            break;
    }
    ActiveMove.forEach(function (moves) {
        try {
            var idPosibleMove = arrBoard.find(function (block) {
                return block.x == activeBlock.x + moves.x &&
                    block.y == activeBlock.y + moves.y;
            }).id
            var activeMove = document.getElementById(idPosibleMove);
            activeMove.innerText = "·";
            activeMove.style.fontSize = "100px";
            activeMove.style.lineHeight = '50px';
            activeMove.style.textAlign = "center";
            activeMove.style.color = 'green';
            //document.getElementById(idPosibleMove).style.backgroundColor = "green";
        } catch (error) {
            console.log("за полем")
        }
    })
}

//Логика
var arrBoard = [
    {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {},
]
// Заполнение логической доски 
var g = 0,
    x = 0,
    y = 0;
for (var i = 8; i > 0; i--) {
    for (var j = 8; j > 0; j--) {
        arrBoard[g].y = i;
        arrBoard[g].x = j;
        arrBoard[g].active = false;
        arrBoard[g].id = g;
        g++;
    }
}


// [ходы фигур]
var pawnMoves = [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
]

var queenMoves = [
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
]

var knightMoves = [
    { x: -1, y: 2 },
    { x: 1, y: 2 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
    { x: -1, y: -2 },
    { x: 1, y: -2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
]

var bishopMoves = movesGorVer();

var rookMoves = movesDiag();

var kingMoves = bishopMoves.concat(rookMoves);

function movesDiag() {
    var arr = [];
    for (var i = 1; i <= 7; i++) {
        var temp1 = {},
            temp2 = {},
            temp3 = {},
            temp4 = {};
        temp1.x = i;
        temp1.y = i;
        arr[i - 1] = temp1;
        temp2.x = -i;
        temp2.y = -i;
        arr[i + 7 - 1] = temp2;
        temp3.x = -i;
        temp3.y = i;
        arr[i + 14 - 1] = temp3;
        temp4.x = i;
        temp4.y = -i;
        arr[i + 21 - 1] = temp4;
    }
    return arr;
}

function movesGorVer() {
    var arr = [];
    for (var i = 0; i < 14; i++) {
        var temp = {};
        var minusTemp = {};
        if (i < 7) {
            temp.x = i + 1;
            temp.y = 0;
            arr[i] = temp;
        } else {
            temp.x = 0;
            temp.y = i - 7 + 1;
            arr[i] = temp;
        }
        if (i < 7) {
            minusTemp.x = -(i + 1);
            minusTemp.y = 0;
            arr[i + 14] = minusTemp;
        } else {
            minusTemp.x = 0;
            minusTemp.y = -(i - 7 + 1);
            arr[i + 14] = minusTemp;
        }
    }
    return arr;
}