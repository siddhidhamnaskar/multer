const express=require('express');
const cors=require('cors');
const multer  = require('multer');
const images=require('./models/image')

const dotenv=require('dotenv');
dotenv.config();
const PORT=process.env.PORT;
const fs = require("fs");
const connection=require('./Config/db')
const app=express();

app.use(cors());
app.use(express.json());



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/", upload.single("file"), (req, res) => {
    const saveImage =  images({
   
      img: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
    });
    saveImage
      .save()
      .then((res) => {
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.send('image is saved')
  });
  
  
  app.get('/',async (req,res)=>{
    const allData = await images.find()
    res.json(allData)
  })

app.listen(PORT,()=>{
    try{
        connection()
        console.log(`server listening to ${PORT}`);

    }
    catch(err){
        console.log("Error");
    }
})