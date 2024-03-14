// FileServer => /files
/*
app.get("/files", (req, res)=>{
	const dir = "./files";
	let fileName = [];
	let directoryName = [];
	fs.readdir(dir, (err, files)=>{
		if(err){
			res.status(400).send("Reading directory does not exist")
			return 
		}
		files.forEach((file)=>{
			let pathDir = path.resolve(dir, file);
			let fileDetails = fs.lstatSync(pathDir);
			if(!(fileDetails.isDirectory())){
				fileName.push(file);
			}else{
				directoryName.push(file);
			}
		})

		res.status(200).json({
			Files: fileName,
			Directory: directoryName,
		});
	})
})
*/