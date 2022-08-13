import {React, useEffect, useState } from 'react';


import './App.css';
import ReactAudioPlayer from 'react-audio-player';


function obtenerImagenesAleatorias(){
  const prefix = "./"
  return [
    prefix + "nico/1-removebg-preview.png",
    prefix + "sebas/1-removebg-preview.png",
    prefix + "nico/2-removebg-preview.png",
    prefix + "sebas/2-removebg-preview.png",
    prefix + "nico/3-removebg-preview.png",
    prefix + "sebas/3-removebg-preview.png",
    prefix + "nico/4-removebg-preview.png",
    prefix + "sebas/4-removebg-preview.png",
    prefix + "nico/5-removebg-preview.png",
  ].sort( () => .5 - Math.random() );
}

function obtenerMensajesAleatorias(){

  return [
    "Lo único que deseamos por tu cumpleaños es hacerte feliz muchas bendiciones.",
    "Te queremos dar las gracias por ser un tío increíble y apoyarnos en todo.",
    "Te deseamos lo mejor en este día especial."
  ].sort( () => .5 - Math.random() );
}

function App() {
  const [image, setImagen] = useState(obtenerImagenesAleatorias()[0])
  const [list, setList] = useState(obtenerImagenesAleatorias())
  const [mensaje, setMensaje] = useState(obtenerMensajesAleatorias()[0])
  const [listMensaje, setListMensaje] = useState(obtenerMensajesAleatorias())
  const [music, setMusic] = useState(new Audio('music/Happy.mp3'))
  const [musicB, setMusicB] = useState(true)
  
  useEffect(()=>{
    localStorage.setItem("tio_temp", ""+0)
    if(localStorage.getItem("tio_inte") != null){
      clearInterval(parseInt(localStorage.getItem("tio_inte")));
      localStorage.removeItem("tio_inte")
    }
    const id = setInterval(() => {
      const index = parseInt(localStorage.getItem("tio_temp"))
      if(index + 1 >= list.length){
        localStorage.setItem("tio_temp", ""+0)
        setImagen(list[0])
      }else{
        const index_ = index + 1
        localStorage.setItem("tio_temp", ""+index_)
        setImagen(list[index_])
      }
    }, 1000);
    localStorage.setItem("tio_inte", ""+id)


    localStorage.setItem("tio_2_temp", ""+0)
    if(localStorage.getItem("tio_2_inte") != null){
      clearInterval(parseInt(localStorage.getItem("tio_2_inte")));
      localStorage.removeItem("tio_2_inte")
    }
    
    const id_ = setInterval(() => {
      const index = parseInt(localStorage.getItem("tio_2_temp"))
      if(index + 1 >= listMensaje.length){
        localStorage.setItem("tio_2_temp", ""+0)
        setMensaje(listMensaje[0])
      }else{
        const index_ = index + 1
        localStorage.setItem("tio_2_temp", ""+index_)
        setMensaje(listMensaje[index_])
      }
    }, 1000 * 7);

    localStorage.setItem("tio_2_inte", ""+id_)

    music.loop = true;

  },[])


  return (
    <div className="App">
      <header className="App-header">
        <h1 className='animate-charcter'>Feliz cumpleaños tío Carlos</h1>
        <i> { mensaje }</i>
        { musicB && (
          <>
            <br></br>
            <button onClick={()=>{   music.play(); setMusicB(false) }} className="btn btn-primary">Reproducir</button>
          </>
          ) 
        } 
        <br></br>
        <img className='super-img' src={ image }></img>
        <hr></hr>
        <b> Creado por sus adorados sobrinos Sebas, Nico y Adri 😍💕</b>
        <hr></hr>
      </header>

    </div>
  );
}

export default App;
