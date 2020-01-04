import React from 'react'
import './Resultados.css'

export default function Resultados(props) {
  const { palabras, tiempo } = props;

  const handleclick = () => {
    props.reiniciar();
  }

  return (
    <div className="Resultados">
      <div className="top">
        <h1>Resultados</h1>
      </div>
      <div className="bottom">
        <div className="top">
          <h3 style={{ textAlign: 'left', margin: 'auto 5%' }}>Palabras:</h3>
        </div>
        <div className="bottom">
          <div className="palabras">
            {palabras.map((p, i) => <div key={p}>{i + 1}. {p}</div>)}
          </div>
          <div className="tiempo">
            <h3>Tiempo:</h3>
            <h1>{tiempo}</h1>
          </div>
        </div>
      </div>
      <div className="boton">
        <button onClick={handleclick}>Cerrar</button>
      </div>
    </div>
  )
}
