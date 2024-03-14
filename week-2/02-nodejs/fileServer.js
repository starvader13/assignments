/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000
const dir="./files"

app.get("/files", (req, res)=>{

	fs.readdir(dir, (err, files)=>{
		if(err){
			return res.status(500).send("Reading directory does not exist") ;
		}
		
		const seperateFileDirectory = files.reduce((acc, file)=>{
			if((fs.lstatSync(path.resolve(dir, file)).isDirectory())){
				acc.dirName.push(file);
			}else{
				acc.fileName.push(file);
			}
			return acc;
		}, {fileName: [], dirName: []});

		res.status(200).json({
			FileName: seperateFileDirectory.fileName,
		})
	})
})

app.get("/file/:filename", (req, res)=>{
	const fileName = dir.concat("/").concat(req.params.filename);
	fs.readFile(fileName, "utf-8", (err, data)=>{
		if(err){
			return res.status(404).send("File not found");
		}
		res.status(200).send(data)
	})
})

app.get("/*", (req, res)=>{
	res.status(404).send("Route not found");
})

// app.listen(port, ()=>{
// 	console.log(`Server is listening at port:${port}`);
// });

module.exports = app;