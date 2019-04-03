function isTimeValid(a, b){                               //first task
    if(typeof(a)=='number' && typeof(b) =='number' ){
        if (a>=1 && a<=24 && b >= 0 && b<=59){
            return true;
        } else{
            return false;
        }    
    }else {
        return false;
    }
}

function addMinutes(h, m, addM){                           //second task
    if(typeof(h)=='number' && typeof(m) =='number' && typeof(addM) == 'number' ){
        if(isTimeValid(h, m) == true){
            m+=addM;
            if (m>=60){
                h+=Math.floor(m/60);
                m%=60;
            }
            if(h>24){
                h%=24;
            }
            return h + ':' + m;
        } else{
            return false;
        }
    } else {
        return false;
    }
}

function getSeason(m){                              //thrid task
    if(typeof(m)=='number'){
            switch (m) {
                case 12:
                case 1:
                case 2: return 'Winter'; break;
                case 3:
                case 4:
                case 5: return "Spring"; break;
                case 6:
                case 7:
                case 8: return "Summer"; break;
                case 9:
                case 10:
                case 11: return "Autumn"; break;
                default: return false
            }
    } else {
        return false;
    }
}

function getDayDeclension(d){
    if(typeof(d)=='number'){
        switch (d) {
            case 1: return "День"; break;
            case 2:
            case 3:
            case 4: return "Дня"; break;
            default: return "Дней";

            default: return false
        }
} else {
    return false;
}
}