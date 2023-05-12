import logo from './logo.svg';
import './App.css';
import "./App.css";
// import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [file,setFile]=useState("");
  const [json,setJson]=useState("");
  useEffect(() => {
    fetch("https://multerapi.onrender.com")
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json)

    })
    .catch((err)=>{
      console.log("error")
    })
   
  },[json]);


  const postImage=()=>{
    const imageData=new FormData();
    imageData.set('file',file[0])
    fetch("https://multerapi.onrender.com",{
      method:"POST",
      body:imageData
    })
    .then((res)=>{
      setJson(" ")
     
    })
   
    
   
    
  }
  return (
    <div className="App">
      <div>
        <input type='file' accept='image/' onChange={(e)=>setFile(e.target.files)}/>
        <button onClick={postImage}>Uploads</button>
      </div>
      <h1>Image uploading react</h1>
      {data.map((singleData) => {
        const base64String = btoa(new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
      }, ''));
        return <img src={`data:image/png;base64,${base64String}`} width="300"/>
      })}
    
    </div>
  );
}

export default App;
