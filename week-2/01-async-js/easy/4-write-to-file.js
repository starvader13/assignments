const fs=require("fs")

function writeContentToFile(fileName, message){
    return new Promise((resolve, reject)=>{
        fs.writeFile(fileName, message, function(err){
            console.log("Saved");
        })
    })
}

async function callWriteContent(){
    const content = await writeContentToFile("test.txt", "Writing into test.txt file");
}

callWriteContent()