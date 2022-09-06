import React from 'react'
import { useState } from "react"
import Preimage from '../images/Preimage.png'
import Converting from '../images/Converting.png'
import Error from '../images/Error.png'

export default function Home(props) {
    const [displayprop, setdisplay] = useState('block');
    const [imageurl,setImageUrl] = useState(Preimage)
    const [deletehash,setdeletehash] = useState(null)
    const [errormsg,setErrorMsg] = useState('')
    const [downloadbtn,enabledownloadbtn] = useState('none')
    
    const upload_image=async event=>{
        // const file = document.getElementById("file")
        const img = document.getElementById("img")
        setImageUrl(Converting)
        const imagefile = event.target.files[0]
        const formdata = new FormData()
        formdata.append("image", imagefile,imagefile.name)
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization':"Client-ID 0a51372f4148df3"},
            body: formdata,
            redirect: 'follow'
            };
        const response = await fetch("https://api.imgur.com/3/image", requestOptions)
        const data = await response.json()
        const imgurl = data.data.link
        const dlthash = data.data.deletehash
        setdisplay('none')
        if (data){
            setdeletehash(dlthash)
            convertImagemainStack(data.data.link,dlthash)
        }
        else{
            img.src = Error
            setdisplay('block')
        }
    }


    async function convertImage(url){

        const img = document.getElementById("img")
        const myHeaders = new Headers();
        myHeaders.append("apikey", "LRFfI58yg1fZGtov2kpnQ2fq4oodizil");
        const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };
        
        // just need to check below code in comments for bluring pictures.
        const output = await fetch(`https://api.apilayer.com/face_pixelizer/url?url=${url}`, requestOptions);
        if (!output.ok) {
            throw new Error(`HTTP error! status: ${output.status}`);
        }
        const data = await output.json();
        return data
        };

    async function convertImagemainStack(url,dlthash1){
        const data = await convertImage(url)
        console.log('dataXXX',data)
        // if (data.status === 200){
        console.log('Inside here')
        console.log(data)
        console.log(data.result)
        enabledownloadbtn('block')
        setImageUrl(data.result)
        const requestOptions2 = {
                method: 'DELETE',
                headers: {'Authorization':"Client-ID 0a51372f4148df3"},
                };
            if (dlthash1!=null){
                const nodedelete = await fetch(`https://api.imgur.com/3/image/${dlthash1}`, requestOptions2)
                console.log(nodedelete)
            }
            else{
                console.log('error while deleting')
            }
    }
    return (
    <>
    <center><h1>Blurify face in any image</h1></center>
    <div className='container d-flex justify-content-center'>
        <div className="card" style={{width: "50%"}}>
        <img src={imageurl} id='img' className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title"> </h5>
            <div className="mb-3 row" style={{display:displayprop}}>
        <b><label htmlFor="inputPassword" className="col-sm-2 col-form-label">Picture:</label></b>
            <div className="col">
            <input type="file" id='file' onChange={upload_image} accept="image/png, image/gif, image/jpeg" className="form-control"/>
            <h5 style={{color:'red'}}>{errormsg}</h5>
            </div>
            <a to={imageurl} download><button type="button" style={{display:downloadbtn}} class="btn btn-success ">Download</button></a>
        </div>
        </div>
        </div>
        </div>
        </>
  )
}
