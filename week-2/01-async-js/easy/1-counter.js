function counter(n){
    let i=1;
    let interval = setInterval(()=>{
        console.log(i);
        i+=1;
        if(i>n){
            clearInterval(interval);
        }
    },1000)
}

counter(30)