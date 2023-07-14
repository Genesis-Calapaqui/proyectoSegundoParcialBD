import "../../../style/modalAutor.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useRouteMatch, useLocation } from "react-router-dom"


export default function ModalAutor() {
    const [body, setBody] = useState({ id_autor: '',nombre_autor:'',nombre_autor_nuevo:'' });
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
  const [autorList, setAutorList] = useState([]);
  
    useEffect(()=> {
      Axios.get('http://localhost:4000/autor').then((response) => {
        setAutorList(response.data);
      });
      
    }, []);
  
    const registrarAutor = () => {
     
      Axios.post('http://localhost:4000/autor',body
      );
    };
  
  const borrarAutor = (id_autor) => {
    Axios.delete(`http://localhost:4000/autor/${id_autor}`);
  }
  
  const actualizarAutor = (id_autor) => {
    Axios.put(`http://localhost:4000/autor/${id_autor}`,body);
    setFormularioVisible(true);
  };
  
  
    
    return (
        <div className="contenedor-usuario">

            <button className="boton-regreso">
                <CustomLink to="/spa" className='internoLink'> <section className='icon fa fa-arrow-left'><span>Regresar</span></section></CustomLink>
            </button>
            
                   
            <div >
            <h1>INFORMACIÓN AUTORES</h1>
            <form className= 'cool-form' >
            <h1>Registra un autor:</h1>
            <label>Nombre del autor: </label>
            <input type="text" name="nombre_autor" value={body.nombre_autor} onChange={inputChange} />
            <br></br>
            <button className='enviar' onClick={registrarAutor}>Registrar</button>
            </form>
            </div>

            <div>
            <h1 class='registro'>
                AUTORES REGISTRADOS:
            </h1>
            {autorList.map((val) => {
                return (
                <div className='card'>
                    <p style={{fontSize:'25px',textAlign:'center'}}><strong>Autor No. {val.id_autor}</strong> </p>
                    <p className='mostrar' ><strong>Nombre del autor:</strong> {val.nombre_autor} </p>


                    <button className='borrar' onClick={() => { borrarAutor(val.id_autor); window.location.reload();} }>Borrar</button>
                    <button className='actualizar' onClick={  mostrarFormulario }>Actualizar datos</button>
                    <br></br>
                    {formularioVisible && (
                    <div style={{ display: 'block' }}>
                    {
                        <div>
                        <form>
                        <h1 style={{color:'black', marginLeft:'50px', fontSize:'20px'}}>Ingresa los nuevos datos:</h1>
                        <label>Nombre del autor : </label>
                    <input type="text" name="nombre_autor_nuevo" value={body.nombre_autor_nuevo} onChange={inputChange} />
                    <br></br>
                    
                    
                <button className='enviar' onClick={() => { actualizarAutor(val.id_autor);window.location.reload(); } }>Actualizar</button>
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

