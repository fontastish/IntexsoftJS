var h = 26,
    m = 35;

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

function addMinutes(h, m, addM){
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
