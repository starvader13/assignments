function clock(){
    let date = new Date()
    console.log("Clock is Ticking my friend!!");
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let interval = setInterval(()=>{
        console.log(`${hour}:${minute}::${second}`)
        second++;
        if(second>60){
            minute++;
            second=0;
            if(minute>60){
                hour++;
                minute=0;
                if(hour>24){
                    hour=0;
                }
            }
        }
    }, 1000)
}

function clockSynchronized(){
    let date = new Date()
    console.log("Clock is Ticking my friend!!");

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let interval = setInterval(()=>{
        if(hour>=12){
            let formatHour = hour - 12;
            console.log(`${hour}:${minute}::${second} PM`)
        }
        else{
            console.log(`${hour}:${minute}::${second} AM`)
        }
        second++;
        if(second>60){
            minute++;
            second=0;
            if(minute>60){
                hour++;
                minute=0;
                if(hour>24){
                    hour=0;
                }
            }
        }
    }, 1000)
}

clockSynchronized()