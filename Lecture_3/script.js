var h = 26,
    m = 35;

function isTimeValid(a,b){
    if(typeof(a)=='number' && typeof(b) =='number' ){
        if (a>=1 && a<=24 && b >= 0 && b<=60){
            return true;
        } else{
            return false;
        }    
    }else {
        return false;
    }
}
