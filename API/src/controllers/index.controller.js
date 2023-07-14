const {Pool} = require('pg');


const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
};

let currentHost = '172.21.0.2';
let db = createConnection(currentHost);

// Función para crear una nueva conexión a la base de datos con un puerto dado
function createConnection(host) {
    return new Pool({
        ...dbConfig,
        host
        });
}

// Función para cambiar el puerto de conexión
function changeHost() {
    if (currentHost === '172.21.0.2') {
        currentHost = '172.21.0.3';
    } else {
        currentHost = '172.21.0.2';
    }

    db = createConnection(currentHost);
}

// Función para comprobar si la conexión es válida
async function checkConnection() {
   // console.log('Puerto actual: ', currentPort);
    try {
        const result = await db.query('SELECT 1');
        
        if (result.rowCount === 1) {
            console.log('Conexión establecida correctamente, host: ',currentHost);
        }
    } catch (error) {
       console.error('Error al conectar con el host', currentHost);
       changeHost();
    }
}

// Lógica para verificar la conexión cada cierto intervalo de tiempo
const checkInterval = setInterval(checkConnection, 1000);

// Manejo de eventos para evitar la terminación de nodemon al producirse un error no capturado
process.on('uncaughtException', (error) => {
    console.error('Error no capturado:', error);
    changeHost();
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Rechazo no capturado:', reason, promise);
    changeHost();
});

const inicio = async (req, res) => {
    console.log('puerto 4000');
  };

//Usuario
const getUsuario = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM usuario');
    res.send(response.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error al obtener usuarios');
  }
};

const getUsuarioById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
    res.json(response.rows);
};




const createUsuario = async (req, res) => {
    
    const { nombre_usuario, codigo_usuario , penalizacion_usuario } = req.body;
    const maxIdQuery = await db.query('SELECT MAX(id_usuario) AS max_id FROM usuario;');
    const lastId = maxIdQuery.rows[0].max_id;

    // Calcular el nuevo ID sumando 1 al último ID obtenido
    const newId = lastId + 1;

    // Insertar el nuevo usuario en la tabla usuario
    const insertQuery = await db.query('INSERT INTO usuario (id_usuario, nombre_usuario, codigo_usuario, penalizacion_usuario) VALUES ($1, $2, $3, $4)', [newId, nombre_usuario, codigo_usuario, penalizacion_usuario]);
     res.json({
        message: 'User Added successfully',
        body: {
            user: {newId,nombre_usuario, codigo_usuario,penalizacion_usuario}
        }
    })
};

const updateUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre_usuario, codigo_usuario,penalizacion_usuario } = req.body;

    const response =await db.query('UPDATE usuario SET nombre_usuario = $1, codigo_usuario = $2, penalizacion_usuario=$3 WHERE id_usuario = $4', [
        nombre_usuario,
        codigo_usuario,
        penalizacion_usuario,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    await db.query('DELETE FROM usuario where id_usuario = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

//Solicitud
const getSolicitud = async (req, res) => {
    try {
      const response = await db.query('SELECT * FROM solicitud');
      res.send(response.rows);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
      res.status(500).send('Error al obtener solicitudes');
    }
  };
  
  const getSolicitudById = async (req, res) => {
      const id = parseInt(req.params.id);
      const response = await db.query('SELECT * FROM solicitud WHERE id_solicitud = $1', [id]);
      res.json(response.rows);
  };
  
  const createSolicitud = async (req, res) => {
      
      const { id_libro, id_acta,fecha_solicitud } = req.body;
      const maxIdQuery = await db.query('SELECT MAX(id_solicitud) AS max_id FROM solicitud;');
      const lastId = maxIdQuery.rows[0].max_id;

    // Calcular el nuevo ID sumando 1 al último ID obtenido
      const newId = lastId + 1;

      const response = await db.query('INSERT INTO solicitud (id_solicitud,id_libro, id_acta,fecha_solicitud) VALUES ($1, $2,$3,$4)', [newId,id_libro, id_acta,fecha_solicitud]);
      res.json({
          message: 'Solicitude Added successfully',
          body: {
              solicitud: {newId,id_libro,id_acta,fecha_solicitud}
          }
      })
  };
  
  const updateSolicitud = async (req, res) => {
      const id = parseInt(req.params.id);
      const { id_libro, id_acta,fecha_solicitud } = req.body;
  
      const response =await db.query('UPDATE solicitud SET id_libro = $1, id_acta = $2, fecha_solicitud=$3 WHERE id_solicitud = $4', [
          id_libro,
          id_acta,
          fecha_solicitud,
          id
      ]);
      res.json('Solicitude Updated Successfully');
  };
  
  const deleteSolicitud = async (req, res) => {
      const id = parseInt(req.params.id);
      await db.query('DELETE FROM solicitud where id_solicitud = $1', [
          id
      ]);
      res.json(`Solicitude ${id} deleted Successfully`);
  };

//Libro
const getLibro = async (req, res) => {
    try {
      const response = await db.query('SELECT * FROM libro');
      res.send(response.rows);
    } catch (error) {
      console.error('Error al obtener libros:', error);
      res.status(500).send('Error al obtener libros');
    }
  };
  
  const getLibroById = async (req, res) => {
      const id = parseInt(req.params.id);
      const response = await db.query('SELECT * FROM libro WHERE id_libro = $1', [id]);
      res.json(response.rows);
  };

  const getLibros = async (req, res) => {
    try {
        const response = await db.query('SELECT l.nombre_libro,l.existencia_libro,a.nombre_autor, g.nombre_genero FROM libro l JOIN categoria c ON l.id_libro = c.id_libro JOIN autor a ON c.id_autor = a.id_autor JOIN genero g ON c.id_genero = g.id_genero');
        res.send(response.rows);
        } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).send('Error al obtener libros');
        }
    };
  
  const createLibro = async (req, res) => {
      
      const { id_usuario,nombre_libro,existencia_libro } = req.body;
      const maxIdQuery = await db.query('SELECT MAX(id_libro) AS max_id FROM libro;');
      const lastId = maxIdQuery.rows[0].max_id;

      // Calcular el nuevo ID sumando 1 al último ID obtenido
      const newId = lastId + 1;

      const response = await db.query('INSERT INTO libro (id_libro,id_usuario,nombre_libro,existencia_libro) VALUES ($1, $2,$3,$4)', [newId,id_usuario,nombre_libro,existencia_libro]);
      res.json({
          message: 'Book Added successfully',
          body: {
              libro: {newId,id_usuario,nombre_libro,existencia_libro}
          }
      })
  };
  
  const updateLibro = async (req, res) => {
      const id = parseInt(req.params.id);
      const { id_usuario,nombre_libro,existencia_libro } = req.body;
  
      const response =await db.query('UPDATE libro SET id_usuario = $1, nombre_libro = $2, existencia_libro=$3 WHERE id_libro = $4', [
          id_usuario,
          nombre_libro,
          existencia_libro,
          id
      ]);
      res.json('Book Updated Successfully');
  };
  
  const deleteLibro = async (req, res) => {
      const id = parseInt(req.params.id);
      await db.query('DELETE FROM libro where id_libro = $1', [
          id
      ]);
      res.json(`Book ${id} deleted Successfully`);
  };

  //Genero
const getGenero = async (req, res) => {
    try {
      const response = await db.query('SELECT * FROM genero');
      res.send(response.rows);
    } catch (error) {
      console.error('Error al obtener generos:', error);
      res.status(500).send('Error al obtener generos');
    }
  };
  
  const getGeneroById = async (req, res) => {
      const id = parseInt(req.params.id);
      const response = await db.query('SELECT * FROM genero WHERE id_genero = $1', [id]);
      res.json(response.rows);
  };
  
  const createGenero = async (req, res) => {
      
      const { nombre_genero } = req.body;
      const maxIdQuery = await db.query('SELECT MAX(id_genero) AS max_id FROM genero;');
      const lastId = maxIdQuery.rows[0].max_id;

      // Calcular el nuevo ID sumando 1 al último ID obtenido
      const newId = lastId + 1;

      const response = await db.query('INSERT INTO genero (id_genero,nombre_genero) VALUES ($1,$2)', [newId,nombre_genero]);
      res.json({
          message: 'Genre Added successfully',
          body: {
              genero: {newId,nombre_genero}
          }
      })
  };
  
  const updateGenero = async (req, res) => {
      const id = parseInt(req.params.id);
      const { nombre_genero } = req.body;
  
      const response =await db.query('UPDATE genero SET nombre_genero=$1 WHERE id_genero = $2', [
          nombre_genero,
          id
      ]);
      res.json('Genre Updated Successfully');
  };
  
  const deleteGenero = async (req, res) => {
      const id = parseInt(req.params.id);
      await db.query('DELETE FROM genero where id_genero = $1', [
          id
      ]);
      res.json(`Genre ${id} deleted Successfully`);
  };

  //Categoria
  const getCategoria = async (req, res) => {
    try {
      const response = await db.query('SELECT * FROM categoria');
      res.send(response.rows);
    } catch (error) {
      console.error('Error al obtener categorias:', error);
      res.status(500).send('Error al obtener categorias');
    }
  };
  
  const getCategoriaById = async (req, res) => {
      const id = parseInt(req.params.id);
      const response = await db.query('SELECT * FROM categoria WHERE id_categoria = $1', [id]);
      res.json(response.rows);
  };
  
  const createCategoria = async (req, res) => {
      
      const { id_categoria,id_autor,id_libro,id_genero,fecha_categoria } = req.body;
      const maxIdQuery = await db.query('SELECT MAX(id_categoria) AS max_id FROM categoria;');
      const lastId = maxIdQuery.rows[0].max_id;

    // Calcular el nuevo ID sumando 1 al último ID obtenido
      const newId = lastId + 1;

      const response = await db.query('INSERT INTO categoria(id_categoria,id_autor,id_libro,id_genero,fecha_categoria) VALUES ($1,$2,$3,$4,$5)', [id_categoria,id_autor,id_libro,id_genero,fecha_categoria]);
      res.json({
          message: 'Category Added successfully',
          body: {
              categoria: {id_categoria,id_autor,id_libro,id_genero,fecha_categoria}
          }
      })
  };
  
  const updateCategoria = async (req, res) => {
      const id = parseInt(req.params.id);
      const { id_autor,id_libro,id_genero,fecha_categoria } = req.body;
  
      const response =await db.query('UPDATE categoria SET id_autor=$1 ,id_libro= $2, id_genero=$3 ,fecha_categoria=$4 WHERE id_categoria = $5', [
          id_autor,
          id_libro,
          id_genero,
          fecha_categoria,
          id
      ]);
      res.json('Category Updated Successfully');
  };
  
  const deleteCategoria = async (req, res) => {
      const id = parseInt(req.params.id);
      await db.query('DELETE FROM categoria where id_categoria = $1', [
          id
      ]);
      res.json(`Category ${id} deleted Successfully`);
  };  

    //Autor
    const getAutor = async (req, res) => {
        try {
          const response = await db.query('SELECT * FROM autor ORDER BY id_autor ASC');
          res.send(response.rows);
        } catch (error) {
          console.error('Error al obtener autores:', error);
          res.status(500).send('Error al obtener autores');
        }
      };
      
      const getAutorById = async (req, res) => {
          const id = parseInt(req.params.id);
          const response = await db.query('SELECT * FROM autor WHERE id_autor = $1', [id]);
          res.json(response.rows);
      };
      
      const createAutor = async (req, res) => {
          
          const {nombre_autor } = req.body;
          const maxIdQuery = await db.query('SELECT MAX(id_autor) AS max_id FROM autor;');
          const lastId = maxIdQuery.rows[0].max_id;

        // Calcular el nuevo ID sumando 1 al último ID obtenido
          const newId = lastId + 1;

          const response = await db.query('INSERT INTO autor(id_autor,nombre_autor) VALUES ($1,$2)', [newId,nombre_autor]);
          res.json({
              message: 'Author Added successfully',
              body: {
                  autor: {newId,nombre_autor}
              }
          })
      };
      
      const updateAutor = async (req, res) => {
          const id = parseInt(req.params.id);
          const { nombre_autor_nuevo } = req.body;
      
          const response =await db.query('UPDATE autor SET nombre_autor=$1 WHERE id_autor = $2', [
              nombre_autor_nuevo,
              id
          ]);
          res.json('Author Updated Successfully');
      };
      
      const deleteAutor = async (req, res) => {
          const id = parseInt(req.params.id);
          await db.query('DELETE FROM autor where id_autor = $1', [
              id
          ]);
          res.json(`Author ${id} deleted Successfully`);
      };  

//Acta
    const getActa = async (req, res) => {
        try {
        const response = await db.query('SELECT * FROM acta ORDER BY id_acta ASC');
        res.send(response.rows);
        } catch (error) {
        console.error('Error al obtener acta:', error);
        res.status(500).send('Error al obtener acta');
        }
    };
    
    const getActaById = async (req, res) => {
        const id = parseInt(req.params.id);
        const response = await db.query('SELECT * FROM acta WHERE id_acta = $1', [id]);
        res.json(response.rows);
    };
    
    const createActa = async (req, res) => {
        
        const { id_acta,id_usuario,procesado,archivado } = req.body;
        const maxIdQuery = await db.query('SELECT MAX(id_acta) AS max_id FROM acta;');
        const lastId = maxIdQuery.rows[0].max_id;

        const newId = lastId + 1;

        let archivadoBooleano = false;
        let procesadoBooleano = false;
        if(archivado==='Si'){
            archivadoBooleano =true;
        }else{
            archivadoBooleano =false;
        };
        if(procesado==='Si'){
            procesadoBooleano =true;
        }else{
            procesadoBooleano =false;
        }
      /*  console.log(archivado_acta);
        console.log(procesado_acta);*/
        const response = await db.query('INSERT INTO acta (id_acta,id_usuario,archivado_acta,procesado_acta) VALUES ($1, $2,$3,$4)', [newId,id_usuario,archivadoBooleano,procesadoBooleano]);
        res.json({
            message: 'Record Added successfully',
          /*  body: {
                Acta: {id_usuario,archivadoBooleano,procesadoBooleano}
            }*/
        })
    };
    
    const updateActa = async (req, res) => {
        const id = parseInt(req.params.id);
        const { id_usuario,archivado_acta,procesado_acta } = req.body;
        let archivadoBooleano = false;
        let procesadoBooleano = false;
        if(archivado==='Si'){
            archivadoBooleano =true;
        }else{
            archivadoBooleano =false;
        };
        if(procesado==='Si'){
            procesadoBooleano =true;
        }else{
            procesadoBooleano =false;
        }
        const response =await db.query('UPDATE acta SET id_usuario = $1, archivado_acta = $2, procesado_acta=$3 WHERE id_acta = $4', [
            id_usuario,
            archivadoBooleano,
            procesadoBooleano,
            id
        ]);
        res.json('Record Updated Successfully');
    };
  
  const deleteActa = async (req, res) => {
      const id = parseInt(req.params.id);
      await db.query('DELETE FROM acta where id_acta = $1', [
          id
      ]);
      res.json(`Record ${id} deleted Successfully`);
  };

module.exports = {
    inicio,
    //Usuario
    getUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    //Solicitud
    getSolicitud,
    getSolicitudById,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
    //Libro
    getLibro,
    getLibroById,
    getLibros,
    createLibro,
    updateLibro,
    deleteLibro,
    //Genero
    getGenero,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero,
    //Categoria
    getCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    //Autor
    getAutor,
    getAutorById,
    createAutor,
    updateAutor,
    deleteAutor,
    //Acta
    getActa,
    getActaById,
    createActa,
    updateActa,
    deleteActa

};