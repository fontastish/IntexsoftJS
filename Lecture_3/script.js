function isTimeValid(a, b){                               //first task
    if(typeof(a)=='number' && typeof(b) =='number' ){
        return a >= 0 && a <= 23 && b >= 0 && b <= 59;
    } else {
        return false;
    }
}

function addMinutes(h, m, addM){                           //second task
    if(typeof(h)=='number' && typeof(m) =='number' && typeof(addM) == 'number' ){
        if(isTimeValid(h, m) === true){
            m+=addM;
            if (m>=60){
                h+=Math.floor(m/60);
                m%=60;
            }
            if(h>23){
                h%=24;
            }
            return h.toString().padStart(2,0) + ':' + m.toString().padStart(2,0);
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function getSeason(m){                              //thrid task
    var season;
    if(typeof(m)=='number'){
            switch (m) {
                case 12:
                case 1:
                case 2: season = 'Winter'; break;
                case 3:
                case 4:
                case 5: season = 'Spring'; break;
                case 6:
                case 7:
                case 8: season = 'Summer'; break;
                case 9:
                case 10:
                case 11: season = 'Autumn'; break;
                default: return false
            }
            return season;
    } else {
        return false;
    }
}

function getDayDeclension(d){      //fourth task 
    if(typeof(d)=='number'){
        d = d % 100;
        if (d >= 11 && d <= 19){
            return 'Дней';
        }
        var d = d % 10;
        switch (d) {
            case 1: return 'День';
            case 2:
            case 3:
            case 4: return 'Дня';
            default: return 'Дней';
        }
    } else {
        return false;
    }
}

function getSumm(n){                //fifth task
    var summ = 0;
    if(typeof(n)=="number"){
        for (var i = 1; i <= n; i++) {
            summ += i;
        }
        return summ;
    } else {
        return false;
    }
}

function getMultiplicationTable(n){            //sixth task
    if(typeof(n)=="number"){
        for (var i = 1; i <= 10; i++) {
            console.log(n + " * " + i + " = " + n*i);
        }
    } else {
        return false;
    }
}

function isPointInCircle(x,y){                      //seventh task
    if(typeof(x)=="number" && typeof(y)=="number"){
        if((x-3)*(x-3)+(y-5)*(y-5)<=16){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


function isPointInQuadrilateral(x,y){
    if(typeof(x)=="number" && typeof(y)=="number"){
        if(y<=(4/7)*x+4
           && y>=-1.5*x-12
           && y>=0.4*x-2
           && y<=-0.6*x+3
           ){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
