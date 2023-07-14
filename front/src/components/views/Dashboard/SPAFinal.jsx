import React from 'react'
import "../../../style/SPAFinal.css";
import { Link, useRouteMatch, useLocation } from "react-router-dom"

function SPAFinal() {
  return (
    <div>
    <div className='ct' id='t1'>
    <div className='ct' id='t2'>
    <div className='ct' id='t3'>
      <div className='ct' id='t4'>
         <div className='ct' id='t5'>
          <ul id='menu'>
            <a href='#t1'><li className='icon fa fa-home' id='uno'></li></a>
            <a href='#t2'><li className='icon fa fa-user' id='dos'></li></a>
            <a href='#t3'><li className='icon fa fa-paper-plane' id='tres'></li></a>
            <a href='#t4'><li className='icon fa fa-user-secret' id='cuatro'></li></a>
            <a href='#t5'><li className='icon fa fa-book' id='cinco'></li></a>
          </ul>
          <div className='page' id='p1'>
            <section className='icon fa fa-book'><span className='title'>¡Bienvenidos a la Biblioteca!</span><span className='hint'>¿Deseas solicitad un libro? Estás en el lugar correcto</span></section>  
          </div>

          <div className='page' id='p2'>

          <CustomLink to="/spa-usuario">         
          <section className='icon fa fa-bookmark-o'>
            <span className='title'>Usuarios
            </span>
          </section>  
          </CustomLink>
       
          </div>  

          <div className='page' id='p3'>
          <CustomLink to="/spa-acta">         
            <section className='icon fa fa-th-list'><span className='title'>Actas</span></section>
          </CustomLink>

          </div>
          <div className='page' id='p4'>

          <CustomLink to="/spa-autor">         
            <section className='icon fa fa-pencil'>
              <span className='title'>Autores</span>
            </section>
          </CustomLink>

          </div> 
          <div className='page' id='p5'>

          <CustomLink to="/spa-libro">         
           <section className='icon fa fa-briefcase'>
              <span className='title'>Libros</span>
            </section>
          </CustomLink>
          </div> 
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}

export default SPAFinal;

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

