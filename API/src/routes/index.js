const { Router } = require('express');
const router = Router();

const { getUsuario, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/index.controller');
const { getSolicitud, getSolicitudById, createSolicitud, updateSolicitud, deleteSolicitud } = require('../controllers/index.controller');
const { getLibro, getLibroById, createLibro, updateLibro, deleteLibro } = require('../controllers/index.controller');
const { getGenero, getGeneroById, createGenero, updateGenero, deleteGenero } = require('../controllers/index.controller');
const { getCategoria, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } = require('../controllers/index.controller');
const { getAutor, getAutorById, createAutor, updateAutor, deleteAutor } = require('../controllers/index.controller');
const { getActa, getActaById, createActa, updateActa, deleteActa } = require('../controllers/index.controller');




//Usuario
router.get('/usuario', getUsuario);
router.get('/usuario/:id', getUsuarioById);
router.post('/usuario', createUsuario);
router.put('/usuario/:id', updateUsuario)
router.delete('/usuario/:id', deleteUsuario);

//Solicitud
router.get('/solicitud', getSolicitud);
router.get('/solicitud/:id', getSolicitudById);
router.post('/solicitud', createSolicitud);
router.put('/solicitud/:id', updateSolicitud)
router.delete('/solicitud/:id', deleteSolicitud);

//Libro
router.get('/libro', getLibro);
router.get('/libro/:id', getLibroById);
router.post('/libro', createLibro);
router.put('/libro/:id', updateLibro)
router.delete('/libro/:id', deleteLibro);

//Genero
router.get('/genero', getGenero);
router.get('/genero/:id', getGeneroById);
router.post('/genero', createGenero);
router.put('/genero/:id', updateGenero)
router.delete('/genero/:id', deleteGenero);

//Categoria
router.get('/categoria', getCategoria);
router.get('/categoria/:id', getCategoriaById);
router.post('/categoria', createCategoria);
router.put('/categoria/:id', updateCategoria)
router.delete('/categoria/:id', deleteCategoria);

//Autor
router.get('/autor', getAutor);
router.get('/autor/:id', getAutorById);
router.post('/autor', createAutor);
router.put('/autor/:id', updateAutor)
router.delete('/autor/:id', deleteAutor);

//Acta
router.get('/acta', getActa);
router.get('/acta/:id', getActaById);
router.post('/acta', createActa);
router.put('/acta/:id', updateActa)
router.delete('/acta/:id', deleteActa);

module.exports = router;