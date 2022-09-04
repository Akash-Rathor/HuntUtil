import React from 'react'
import { useState } from "react"
import Preimage from '../images/Preimage.png'
import Converting from '../images/Converting.png'
import Error from '../images/Error.png'

export default function Home(props) {
    const [displayprop, setdisplay] = useState('block');
    const [imageurl,setImageUrl] = useState(Converting)
    const [deletehash,setdeletehash] = useState('asdjbaskd3uehdnwsada')
    
    const upload_image=async event=>{
        // const file = document.getElementById("file")
        const img = document.getElementById("img")
        img.src = Converting
        const imagefile = event.target.files[0]
        const formdata = new FormData()
        formdata.append("image", imagefile,imagefile.name)
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization':"Client-ID 0a51372f4148df3"},
            body: formdata,
            redirect: 'follow'
            };
        await fetch("https://api.imgur.com/3/image", requestOptions).then(response => response.text())
        .then(result => console.log(result))
        .then(data => {img.src = Converting})
        .then(data => {setImageUrl(data.data.link.replace('\/','/'))})
        .then(data => {setdeletehash(data.data.deletehash)})
        .catch(error => {
            if (error){
                img.src = Error
                setdisplay('block')
            }
            else{
                convertImage()
                setdisplay('block')
            }
        });
        // setdisplay('none')
    }


    const convertImage=async()=>{
        const img = document.getElementById("img")
        img.src = imageurl
        const myHeaders = new Headers();
        myHeaders.append("apikey", "LRFfI58yg1fZGtov2kpnQ2fq4oodizil");
        const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };
        await fetch(`https://api.apilayer.com/face_pixelizer/url?url=${imageurl}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(result => {setImageUrl(result.result)})
        .catch(error => console.log('error', error));
        
        requestOptions.method = 'DELETE'

        await fetch(`https://api.imgur.com/3/image/${deletehash}`, requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error))
    };

    return (
    <>
    <center><h1>Blurify face in any image</h1></center>
    <div className='container d-flex justify-content-center'>
        <div className="card" style={{width: "50%"}}>
        <img src={Preimage} id='img' className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title"> </h5>
            <div className="mb-3 row" style={{display:displayprop}}>
        <b><label htmlFor="inputPassword" className="col-sm-2 col-form-label">Picture:</label></b>
            <div className="col">
            <input type="file" id='file' onChange={upload_image} accept="image/png, image/gif, image/jpeg" className="form-control"/>
            </div>
        </div>
        </div>
        </div>
        </div>
        </>
  )
}
