import {React, useEffect, useState } from 'react';


import './App.css';

function obtenerImagenesAleatorias(){
  const prefix = "./"
  return [
    prefix + "nico/1-removebg-preview.png",
    prefix + "adri/1-1removebg-preview.png",
    prefix + "sebas/1-removebg-preview.png",
    prefix + "nico/2-removebg-preview.png",
    prefix + "adri/2-1removebg-preview.png",
    prefix + "sebas/2-removebg-preview.png",
    prefix + "nico/3-removebg-preview.png",
    prefix + "adri/3-1removebg-preview.png",
    prefix + "sebas/3-removebg-preview.png",
    prefix + "nico/4-removebg-preview.png",
    prefix + "adri/4-1removebg-preview.png",
    prefix + "sebas/4-removebg-preview.png",
    prefix + "nico/5-removebg-preview.png",
    prefix + "adri/5-1removebg-preview.png",
    prefix + "adri/6-1removebg-preview.png",
    prefix + "adri/7-1removebg-preview.png",
  ].sort( () => .5 - Math.random() );
}

function obtenerMensajesAleatorias(){

  return [
    "Lo único que deseamos por tu cumpleaños es hacerte feliz muchas bendiciones.",
    "Te queremos dar las gracias por ser un tío increíble y apoyarnos en todo.",
    "Te deseamos lo mejor en este día especial.",
    "Te deseamos una vida llena de bonitos e increíbles momentos y regalos, donde cumplas todos tus deseos y alcances todas tus metas.",
    "Tío Carlos, te deseamos un día repleto de experiencias y de recuerdos muy felices, además de que disfrutes siempre al lado de las personas que más te quieren, ¡Felicidades!.",
    "Con el paso del tiempo te has convertido en un increíble tío, eres un gran hombre, eres de las personas más importantes para la vida de tus sobrinos.",
    "Tío Carlos una persona en la que podemos confiar y apoyarnos, que pases un feliz cumpleaños."
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
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "es";
    
    let voices = [];
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    const id_ = setInterval(() => {
      if(music.paused === false && window.speechSynthesis.speaking === false){
        
        const index = parseInt(localStorage.getItem("tio_2_temp"))

        if(index + 1 >= listMensaje.length){
          localStorage.setItem("tio_2_temp", ""+0)
          setMensaje(listMensaje[0])
          speech.text = listMensaje[0]
        }else{
          const index_ = index + 1
          localStorage.setItem("tio_2_temp", ""+index_)
          setMensaje(listMensaje[index_])
          speech.text = listMensaje[index_]
        }
        window.speechSynthesis.speak(speech);
      }

    }, 1000);

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
            <button onClick={()=>{   music.volume = 0.4; music.play(); setMusicB(false) }} className="btn btn-primary">Reproducir</button>
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
