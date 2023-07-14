import '../App.css';
import { useState, useEffect } from "react";
import Axios from "axios";



export default function Usuario() {
    const [body, setBody] = useState({ id_usuario: '', nombre_usuario: '', codigo_usuario: '', penalizacion_usuario: '' });
    const [formularioVisible, setFormularioVisible] = useState(false);


    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })

    }
    const mostrarFormulario = () => {
        setFormularioVisible(true);
    };
    const [actaList, setActaList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:4000/usuario').then((response) => {
            setActaList(response.data);
        });

    }, []);

    const registrarActa = () => {

        Axios.post('http://localhost:4000/usuario', body
        );
    };

    const borrarActa = (id_usuario) => {
        Axios.delete(`http://localhost:4000/usuario/${id_usuario}`);
    }

    const actualizarActa = (id_usuario) => {
        Axios.put(`http://localhost:4000/usaurio/${id_usuario}`, body);
        setFormularioVisible(true);
    };

    return (
        <div >


            <div >
                <h1 style={{ color: 'black', marginLeft: '50px', fontSize: '50px' }}>INFORMACIÓN USUARIOS</h1>
                <form >
                    <h1 style={{ color: 'black', marginLeft: '50px' }}>Registra un nuevo Usuario:</h1>
                    <label>Nombre: </label>
                    <input type="text" name="nombre_usuario" value={body.nombre_usuario} onChange={inputChange} />
                    <label>Código: </label>
                    <input type="text" name="codigo_usuario" value={body.codigo_usuario} onChange={inputChange} />
                    <br></br>
                    <label>Penalización:</label>
                    <label>
                        <input
                            type="radio"
                            name="procesadoUpdate"
                            value="true"
                            onChange={(e) => (body.penalizacion_usuario = e.target.value)}
                            checked={body.penalizacion_usuario === "true"}
                        />
                        Tiene penalización
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="procesadoUpdate"
                            value="false"
                            onChange={(e) => (body.penalizacion_usuario = e.target.value)}
                            checked={body.penalizacion_usuario === "false"}
                        />
                        No tiene penalización
                    </label>
                    <button className='enviar' onClick={registrarActa}>Registrar</button>
                </form>
            </div>
            <h1 class='registro' style={{ fontSize: '30px' }}>
                USUARIO REGISTRDADO:
            </h1>
            {actaList.map((val) => {
                return (
                    <div className='card'>
                        <p style={{ fontSize: '25px', textAlign: 'center' }}><strong>USUARIO. {val.id_usuario}</strong> </p>
                        <p className='mostrar' ><strong>Nombre:</strong> {val.nombre_usuario} </p>
                        <p className='mostrar' ><strong>Codigo:</strong> {val.codigo_usuario} </p>
                        <p className='mostrar'>
                            <strong>Penalización:</strong> {val.penalizacion_usuario ? 'Tiene penalización' : 'No tiene penalización'}
                        </p>



                        <button className='borrar' onClick={() => { borrarActa(val.id_usuario); window.location.reload(); }}>Borrar</button>
                        <button className='actualizar' onClick={mostrarFormulario}>Actualizar datos</button>
                        <br></br>
                        {formularioVisible && (
                            <div style={{ display: 'block' }}>
                                {
                                    <div>
                                        <form>
                                            <h1 style={{ color: 'black', marginLeft: '50px', fontSize: '20px' }}>Ingresa los nuevos datos:</h1>
                                            <label>Id usuario : </label>
                                            <input type="number" name="id_usuario" value={body.id_usuario} onChange={inputChange} />
                                            <label>Nombre: </label>
                                            <input type="text" name="nombre_usuario" value={body.nombre_usuario} onChange={inputChange} />
                                            <label>Codigo : </label>
                                            <input type="text" name="codigo_usuario" value={body.codigo_usuario} onChange={inputChange} />
                                            <br></br>

                                            <br></br>
                                            <label>Penalización:</label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="procesadoUpdate"
                                                    value="true"
                                                    onChange={(e) => (body.penalizacion_usuario = e.target.value)}
                                                    checked={body.penalizacion_usuario === "true"}
                                                />
                                                Tiene penalización
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="procesadoUpdate"
                                                    value="false"
                                                    onChange={(e) => (body.penalizacion_usuario = e.target.value)}
                                                    checked={body.penalizacion_usuario === "false"}
                                                />
                                                No tiene penalización
                                            </label>
                                            <br />
                                            <button className='enviar' onClick={() => { actualizarActa(val.id_usuario); window.location.reload(); }}>Actualizar</button>
                                        </form>
                                    </div>
                                }
                            </div>
                        )}



                    </div>
                );

            })};


        </div>
    );
}

