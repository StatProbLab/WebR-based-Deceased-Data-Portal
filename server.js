const express = require('express')
const upload = require('express-fileupload')
const path = require('path');
const fs = require('fs');
const cors = require('cors')
// Serve static files from the 'frontend' folder

const app = express()
app.use(cors())
app.use(upload())
app.use(express.static(path.join(__dirname, 'Frontend')));
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html')
// })
app.get('/file_upload/uploaded_csv.csv',(req,res)=>{
    
    
    const uploadDir = path.join(__dirname, 'Frontend','data');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send(err);
        }

        const csvFiles = files.filter(file => path.extname(file) === '.csv');
        const fileData = [];

        csvFiles.forEach((fileName, index) => {
            const filePath = path.join(uploadDir, fileName);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            fileData.push(fileContent);
        });
        res.type('text/csv');
        res.send(fileData[0]);
    });
        
})
app.post('/file_upload',(req,res)=>{
    console.log('Hii')
    console.log('getting POST request')
    console.log('Hii')
    console.log(req.files)
    console.log('Hii')
    if(req.files){
        console.log(req.files)
        var file = req.files['File']
        var filename = file.name

        console.log(filename)
        file.mv('./Frontend/data/'+filename,function (err){
            if(err){
                res.send(err)
            }
            else{
                res.send('File uploaded successfully')
            }
        })
    }
})
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server listening on http://127.0.0.1:${PORT}`);
  });

  