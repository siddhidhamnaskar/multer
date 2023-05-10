import logo from './logo.svg';
import './App.css';
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [file,setFile]=useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4050")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });


  const postImage=()=>{
    const imageData=new FormData();
    imageData.set('file',file[0])
    fetch("http://localhost:4050",{
      method:"POST",
      body:imageData
    })
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
    })
    
  }
  return (
    <div className="App">
      <div>
        <input type='file' onChange={(e)=>setFile(e.target.files)}/>
        <button onClick={postImage}>Uploads</button>
      </div>
      <h1>Image uploading react</h1>
      {data.map((singleData) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        );
        return <img src={`data:image/png;base64,${base64String}`} width="300"/>
      })}
    </div>
  );
}

export default App;
