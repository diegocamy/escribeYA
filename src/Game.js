import React, { Component } from 'react'
import { listaPalabras, obtenerPalabras } from './Palabras'

import './Game.css'
import Resultados from './Resultados'

export default class Game extends Component {
  state = {
    titulo: '',
    palabras: [],
    palabraEscrita: '',
    palabraActual: '',
    palabrasAcertadas: 0,
    cantidadPalabras: 10,
    timer: '00:00',
    juegoTerminado: true
  }


  escribirTitulo = () => {
    const tituloFinal = 'EscribeYA'
    let titulo = '';
    let indice = 0;
    const interval = setInterval(() => {
      if (this.state.titulo !== tituloFinal) {
        titulo = titulo + tituloFinal[indice];
        this.setState({ titulo }, () => indice++)
      } else {
        clearInterval(interval)
      }
    }, 200);

  }

  handleChange = (e) => {
    this.setState({ palabraEscrita: e.target.value }, this.compararPalabras)
  }

  handleCantidadPalabras = (e) => {
    if (e.target.value >= 5 && e.target.value <= 30) {
      this.setState({ cantidadPalabras: e.target.value })
    } else {
      e.target.value = this.state.cantidadPalabras
    }
  }

  compararPalabras = () => {
    if (this.state.palabraActual === this.state.palabraEscrita) {
      //Proxima palabra
      const indice = this.state.palabrasAcertadas + 1;
      //Si es al ultima palabra termina el juego
      if (indice >= this.state.palabras.length) {
        this.setState({
          juegoTerminado: true,
          palabraEscrita: '',
          palabraActual: '',
          palabrasAcertadas: indice
        }, () => {
          const input = document.getElementById('input-palabra');
          input.placeholder = "Puedes hacerlo mejor?";
          input.disabled = true;
          document.getElementById('btn-iniciar').disabled = false;
          document.getElementById('btn-iniciar').textContent = "Reiniciar";
          document.getElementById('btn-iniciar').classList.add('btn-verde');
          document.getElementById('btn-iniciar').classList.remove('btn-desactivado');
        })
      } else {
        this.setState({
          palabraActual: this.state.palabras[indice],
          palabraEscrita: '',
          palabrasAcertadas: indice
        }, () => document.getElementById('input-palabra').placeholder = this.randomPlaceholder())
      }
    }
  }

  iniciarJuego = () => {
    if (this.state.palabras.length > 0) {
      this.setState({
        palabras: [],
        palabraEscrita: '',
        palabraActual: '',
        palabrasAcertadas: 0,
        timer: '00:00',
        juegoTerminado: true
      })
    }
    const palabras = obtenerPalabras(this.state.cantidadPalabras, listaPalabras);
    this.setState({
      palabras,
      palabraActual: palabras[0],
      juegoTerminado: false
    }, this.iniciarTimer);

    document.getElementById('input-palabra').disabled = false;
    document.getElementById('btn-iniciar').disabled = true;
    document.getElementById('btn-iniciar').classList.remove('btn-verde');
    document.getElementById('btn-iniciar').classList.add('btn-desactivado');
    document.getElementById('input-palabra').focus();
    document.getElementById('input-palabra').placeholder = this.randomPlaceholder();

  }

  randomPlaceholder = () => {
    const arr = [
      'Apurate',
      'Muy lento...',
      'Más rápido!',
      'Dale rápido',
      'Vamos dale!'
    ]
    return arr[Math.floor(Math.random() * arr.length)];
  }

  reiniciarJuego = () => {
    this.setState({
      palabras: [],
      palabraEscrita: '',
      palabraActual: '',
      palabrasAcertadas: 0,
      cantidadPalabras: 10,
      timer: '00:00',
      juegoTerminado: true
    })

    document.getElementById('btn-iniciar').disabled = false;
    document.getElementById('btn-iniciar').classList.add('btn-verde');
    document.getElementById('btn-iniciar').classList.remove('btn-desactivado');
    document.getElementById('btn-iniciar').textContent = 'Reiniciar';
    const input = document.getElementById('input-palabra');
    input.placeholder = "Puedes hacerlo mejor?";

  }

  iniciarTimer = () => {
    let seg = 0;
    let min = 0;
    const interval = setInterval(() => {
      if (this.state.juegoTerminado) {
        clearInterval(interval);
        return;
      }
      if (seg + 1 === 60) {
        min++;
        seg = 0;
      } else {
        seg++;
      }
      let minutos = min < 10 ? `0${min}` : min;
      let segundos = seg < 10 ? `0${seg}` : seg;
      this.setState({ timer: `${minutos}:${segundos}` });
    }, 1000);

  }


  componentDidMount() {
    this.escribirTitulo();
  }

  render() {
    return (
      <div className="Game">
        <div className="titulo">
          <h1>{this.state.titulo}<span className="intermitente">_</span></h1>
          <p>Qué tan rápido puedes escribir?</p>
        </div>
        {this.state.juegoTerminado && this.state.palabras.length > 0 && <Resultados palabras={this.state.palabras} tiempo={this.state.timer} reiniciar={this.reiniciarJuego} />}
        <div className="input">
          {this.state.palabraActual ? <p className="growing">{this.state.palabraActual}</p> : <p>...</p>}
          <input
            type="text"
            name="palabra"
            id="input-palabra"
            value={this.state.palabraEscrita}
            onChange={this.handleChange}
            placeholder="Prepárate"
          />
          <div className="botones">
            <button className="btn-verde" id="btn-iniciar" onClick={this.iniciarJuego}>Iniciar</button>
            <button className="btn-rojo" id="btn-parar" onClick={this.reiniciarJuego}>Parar</button>
          </div>
        </div>
        <div className="inferior">
          <div className="cantidad">
            <p>Elige la cantidad de palabras</p>
            <input type="number" name="cantidad-palabras" id="cantidad-palabras" value={this.state.cantidadPalabras} onChange={this.handleCantidadPalabras} />
          </div>
          <div className="timer">
            <p>Timer</p>
            <h1>{this.state.timer}</h1>
          </div>
          <div className="contacto">
            <p>GitHub</p>
            <a href="http://github.com/diegocamy" target="_blank" rel="noopener noreferrer"><i className="fab fa-github fa-3x"></i></a>
          </div>
        </div>

      </div>
    )
  }
}
