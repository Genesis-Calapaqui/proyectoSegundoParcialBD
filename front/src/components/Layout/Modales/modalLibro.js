import "../../../style/modalAutor.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useRouteMatch, useLocation } from "react-router-dom"


export default function ModalLibro() {
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [actaList, setActaList] = useState([]);
    const [autorList, setAutorList] = useState([]);
    const [generoList, setGeneroList] = useState([]);
    const [categoriaList, setCategoriaList] = useState([]);
  
    useEffect(() => {
      Axios.get("http://localhost:4000/libro").then((response) => {
        setActaList(response.data);
      });
      Axios.get("http://localhost:4000/Autor").then((response) => {
        setAutorList(response.data);
      });
      Axios.get("http://localhost:4000/Genero").then((response) => {
        setGeneroList(response.data);
      });
      Axios.get("http://localhost:4000/Categoria").then((response) => {
        setCategoriaList(response.data);
      });
    }, []);
  
    
    return (
        <div className="contenedor-usuario">

            <button className="boton-regreso">
                <CustomLink to="/spa" className='internoLink'> <section className='icon fa fa-arrow-left'><span>Regresar</span></section></CustomLink>
            </button>
            
            <div>
            <h1>
            LIBROS
            </h1>
            {categoriaList.map((val) => {
            return (
                <div className="card" key={val.id_libro}>
                <p style={{ fontSize: "25px", textAlign: "center" }}>
                    <strong>LIBRO. {val.id_libro}</strong>
                </p>
                {actaList.map((val4) => {
                    if (val.id_libro === val4.id_libro)
                    return (
                        <p className="mostrar" key={val4.id_libro}>
                        <strong>Título:</strong> {val4.nombre_libro}
                        <br></br>
                        <br></br>
                        
                        <strong>Disponibilidad:</strong> {val4.existencia_libro ? 'Disponible' : 'No disponible'}
                        </p>
                    
                        
                    );
                    return null;
                })}
                {autorList.map((val2) => {
                    if (val.id_autor === val2.id_autor)
                    return (
                        <p className="mostrar" key={val2.id_autor}>
                        <strong>Autor:</strong> {val2.nombre_autor}
                        </p>
                    );
                    return null;
                })}
                {generoList.map((val3) => {
                    if (val.id_genero === val3.id_genero)
                    return (
                        <p className="mostrar" key={val3.id_genero}>
                        <strong>Género:</strong> {val3.nombre_genero}
                        </p>
                    );
                    return null;
                })}
                </div>
            );
            })}
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

