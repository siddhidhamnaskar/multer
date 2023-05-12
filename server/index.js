const express=require('express');
const cors=require('cors');
const bodyParser = require("body-parser");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })
  
  app.post("/", upload.single("file"), async(req, res) => {
    try{
        const saveImage = new images({
   
            img: {
              data: fs.readFileSync("uploads/" + req.file.filename),
              contentType: "image/png",
            },
          })
          const image=await saveImage.save();
          res.status(200).json(image);

    }
    catch(err){
        res.status(505).json(err);

    }
   
   
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