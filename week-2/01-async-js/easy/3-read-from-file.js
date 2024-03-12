const fs = require("fs")

function readContentFromFile(fileName){
    return new Promise(function(resolve, reject){
        fs.readFile(fileName, "utf-8", (err, data)=>{
            resolve(data);
        })
    })
}

async function callReadContentFromFile(){
    let content = await readContentFromFile("./test.txt");
    console.log(content)
}

callReadContentFromFile()
ans=0;
for(let i=0;i<100000000;i++){
    ans+=i
}