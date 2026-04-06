const express = require('express');
const multer  = require('multer');
const path    = require('path');

const app = express();

// 1. Tell multer where to save and what to name the file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //save files here
    //this store the files in the order of there types

    
   if(file.mimetype.startsWith('image/')){
    cb(null,'/home/monster/Desktop/Clients-files/images');
   }
   else if(file.mimetype === 'application/pdf'){
    cb(null,'/home/monster/Desktop/Clients-files/pdfs');
   }
   else{
    cb(null,'/home/monster/Desktop/Clients-files/other');
   }
  },


  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname)); // e.g. 1712345678-photo.png
  }
});

// 2. Create the multer instance
const upload = multer({ storage });

// 3. Upload route — accepts up to 10 files
app.post('/upload', upload.array('files', 10), (req, res) => {
  console.log(req.files); // see what multer saved
  res.json({ message: 'Files uploaded!', files: req.files });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));