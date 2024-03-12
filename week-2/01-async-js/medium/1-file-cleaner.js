const fs = require("fs");

function fileReader(fileName){
    return new Promise(function(resolve, reject){
        fs.readFile(fileName, "utf-8", (err,data)=>{
            resolve(data);
        })        
    })
}


async function fileWriter(fileName){
    const data = await fileReader("test.txt");
    const cleanData = cleaner(data)

    return new Promise(function(resolve, reject){
        fs.writeFile(fileName, cleanData, (err)=>{
            if(err){
                throw err;
            }
            console.log("Saved!")
        })        
    })
}

function cleaner(data){
    let arr = data.split(' ');
    let newData = "";
    for(let i=0; i<arr.length; i++){
        if(arr[i]!=''){
            console.log(arr[i])
            newData = newData.concat(arr[i]).concat(' ');
        }
    }

    return newData.trimEnd();
}

async function fileCleaner(){
    const file = await fileWriter("test.txt")
}

fileCleaner();