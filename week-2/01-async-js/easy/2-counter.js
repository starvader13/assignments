function counter(i,n){
    let timeout = setTimeout(()=>{
        console.log(i);
        i+=1;
        if(i>n){
            clearTimeout(timeout);
            return 0;
        }
        counter(i,n);
    },1000);
}

counter(0,10);