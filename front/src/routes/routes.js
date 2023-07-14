import React, { lazy } from 'react'
import { HomeRedirect } from './RouteUtils'
import RouteController from './RouteController'
const Dashboard = lazy(() => import('../components/views/Dashboard'))
const Acta = lazy(() => import('../components/views/Dashboard/Acta'))
const Autor = lazy(() => import('../components/views/Dashboard/Autor'))
const Usuario = lazy(() => import('../components/views/Dashboard/Usuario'))
const SPAFinal = lazy(() => import('../components/views/Dashboard/SPAFinal'))
const SPAUsuario = lazy(() => import('../components/Layout/Modales/modalUsuario'))
const SPALibro = lazy(() => import('../components/Layout/Modales/modalLibro'))
const SPAActa = lazy(() => import('../components/Layout/Modales/modalActa'))
const SPAAutor = lazy(() => import('../components/Layout/Modales/modalAutor'))
//const Login = lazy(() => import('../components/views/Login'))
const Home = lazy(() => import('../components/views/Home'))

const routes = [
    {
        path: "/",
        exact: true,
        component: HomeRedirect
    },
 /*   {
        path: "/login",
        exact: true,
        render: props => <Login {...props} />
    },*/
    {
        path: "/app",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/app",
                exact: true,
                render: props => <RouteController component={Dashboard} {...props} />
            }
        ]
    },
    {
        path: "/gestionar_acta",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/gestionar_acta",
                exact: true,
                render: props => <RouteController component={Acta} {...props} />
            }
        ]
    },
    {
        path: "/gestionar_usuario",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/gestionar_usuario",
                exact: true,
                render: props => <RouteController component={Usuario} {...props} />
            }
        ]
    },
    {
        path: "/gestionar_autor",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/gestionar_autor",
                exact: true,
                render: props => <RouteController component={Autor} {...props} />
            }
        ]
    },
    {
        path: "/spa",
        render: props => <RouteController component={SPAFinal} {...props} />,
        routes: [
            {
                path: "/spa",
                exact: true,
                render: props => <RouteController component={SPAFinal} {...props} />
            }
        ]
    },
    {
        path: "/spa-usuario",
        render: props => <RouteController component={SPAUsuario} {...props} />,
        routes: [
            {
                path: "/spa-usuario",
                exact: true,
                render: props => <RouteController component={SPAUsuario} {...props} />
            }
        ]
    },
    {
        path: "/spa-acta",
        render: props => <RouteController component={SPAActa} {...props} />,
        routes: [
            {
                path: "/spa-acta",
                exact: true,
                render: props => <RouteController component={SPAActa} {...props} />
            }
        ]
    },
    {
        path: "/spa-autor",
        render: props => <RouteController component={SPAAutor} {...props} />,
        routes: [
            {
                path: "/spa-autor",
                exact: true,
                render: props => <RouteController component={SPAAutor} {...props} />
            }
        ]
    },
    {
        path: "/spa-libro",
        render: props => <RouteController component={SPALibro} {...props} />,
        routes: [
            {
                path: "/spa-libro",
                exact: true,
                render: props => <RouteController component={SPALibro} {...props} />
            }
        ]
    }
]

export default routes