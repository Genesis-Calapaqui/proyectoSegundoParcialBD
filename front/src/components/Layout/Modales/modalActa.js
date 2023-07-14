import "../../../style/modalActa.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useRouteMatch, useLocation } from "react-router-dom"


export default function ModalActa() {
    const [body, setBody] = useState({ id_usuario: '', id_acta: '',procesado_acta:'',archivado_acta:'',procesado:'',archivado:'' });
    const [formularioVisible, setFormularioVisible] = useState(false);
  
    const inputChange = ({ target }) => {
      const { name, value } = target
      setBody( {
          ...body,
          [name]: value 
      })
  
  }
  const mostrarFormulario = () => {
    setFormularioVisible(true);
  };
  const [actaList, setActaList] = useState([]);
  
    useEffect(()=> {
      Axios.get('http://localhost:4000/acta').then((response) => {
        setActaList(response.data);
      });
      
    }, []);
  
    const registrarActa = () => {
     
      Axios.post('http://localhost:4000/acta',body
      );
    };
  
  const borrarActa = (id_acta) => {
    Axios.delete(`http://localhost:4000/acta/${id_acta}`);
  }
  
  const actualizarActa = (id_acta) => {
    Axios.put(`http://localhost:4000/acta/${id_acta}`,body);
    setFormularioVisible(true);
  };
  
    
    return (
        <div className="contenedor-usuario">

            <button className="boton-regreso">
                <CustomLink to="/spa" className='internoLink'> <section className='icon fa fa-arrow-left'><span>Regresar</span></section></CustomLink>
            </button>
            
            <div >
                <h1>INFORMACIÓN ACTAS</h1>
                <form className="cool-form">
                <h1>Registra un acta:</h1>
                <label>Id usuario: </label>
                <input type="number" name="id_usuario" value={body.id_usuario} onChange={inputChange} />
                <br></br>
                <label>Archivado : </label>
                <label>
                    <input type="radio" name="archivado" value="Si" onChange={(e) => body.archivado = e.target.value}/> Si
                </label>
                <label>
                    <input type="radio" name="archivado" value="No" onChange={(e) => body.archivado = e.target.value}/> No
                </label>
                <br></br>
                <label>Procesado: </label>
                <label>
                    <input type="radio" name="opcion" value="Si" onChange={(e) => body.procesado = e.target.value}/>Si
                </label>
                <label>
                    <input type="radio" name="opcion" value="No" onChange={(e) => body.procesado = e.target.value}/>No
                </label>
                <br></br>
                <button className='enviar' onClick={registrarActa}>Registrar</button>
                </form>
            </div>

            <div>
                    <h1 class='registro' style={{fontSize:'30px'}}>
                    ACTAS REGISTRADAS:
                </h1>
                {actaList.map((val) => {
                    return (
                    <div className='card'>
                        <p style={{fontSize:'25px',textAlign:'center'}}><strong>Acta No. {val.id_acta}</strong> </p>
                        <p className='mostrar' ><strong>Id usuario:</strong> {val.id_usuario} </p>
                        <p className='mostrar' ><strong>Archivado:</strong> {val.archivado_acta ? 'Sí' : 'No'} </p>
                        <p className='mostrar' ><strong>Procesado: </strong>{val.procesado_acta ? 'Sí' : 'No'} </p>


                        <button className='borrar' onClick={() => { borrarActa(val.id_acta); window.location.reload();} }>Borrar</button>
                        <button className='actualizar' onClick={  mostrarFormulario }>Actualizar datos</button>
                        <br></br>
                        {formularioVisible && (
                        <div style={{ display: 'block' }}>
                        {
                            <div>
                            <form>
                            <h1 style={{color:'black', marginLeft:'50px', fontSize:'20px'}}>Ingresa los nuevos datos:</h1>
                            <label>Id usuario : </label>
                        <input type="number" name="id_usuario" value={body.id_usuario} onChange={inputChange} />
                        <br></br>
                        <label>Archivado : </label>
                        <label>
                        <input type="radio" name="archivadoUpdate" value="Si" onChange={(e) => body.archivado = e.target.value}/> Si
                        </label>
                        <label>
                        <input type="radio" name="archivadoUpdate" value="No" onChange={(e) => body.archivado = e.target.value}/> No
                        </label>
                        <br></br>
                        <label>Procesado: </label>
                        <label>
                        <input type="radio" name="procesadoUpdate" value="Si" onChange={(e) => body.procesado = e.target.value}/>Si
                        </label>
                        <label>
                        <input type="radio" name="procesadoUpdate" value="No" onChange={(e) => body.procesado = e.target.value}/>No
                        </label>
                        <br></br>
                        
                    <button className='enviar' onClick={() => { actualizarActa(val.id_acta);window.location.reload(); } }>Actualizar</button>
                    </form>
                    </div>
                }
                    </div>
                    )}

                        </div>
                    );
                
                })};
            </div>


        </div>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useLocation(to)
    const isActive = useRouteMatch({ path: resolvedPath.pathname, end: true })

    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}

