import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/Inicio.vue'


import Menu from './components/template/Menu'
import MenuAlt from './components/template/MenuAlt'

// import Usuario from './components/usuario/Usuario'
// import UsuarioLista from './components/usuario/UsuarioLista'
// import UsuarioDetalhe from './components/usuario/UsuarioDetalhe'
// import UsuarioEditar from './components/usuario/UsuarioEditar'

Vue.use(Router)

const Usuario = () =>  import('./components/usuario/Usuario')
const UsuarioLista = () =>  import('./components/usuario/UsuarioLista')
const UsuarioDetalhe = () =>  import('./components/usuario/UsuarioDetalhe')
const UsuarioEditar = () =>  import('./components/usuario/UsuarioEditar')

const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition){
        if(savedPosition){
            return savedPosition
        } else if(to.hash){
            return {selector : to.hash}
        }else{
            return {x :0 , y: 0}
        }
    },
    routes:[{
        name : 'inicio',
        path: '/',
        // component: Inicio
        components:{
            default: Inicio,
            menu : Menu
        }
    },{
        path: '/usuario/',
        // component: Usuario,
        components:{
            default: Usuario,
            menu: MenuAlt,
            menuInf: MenuAlt
        },
        props: true,
        children: [
            {path: '', component: UsuarioLista},
            {path: ':id', component: UsuarioDetalhe, props: true,
            beforeEnter (to, from, next) {
                console.log('Antes do usuario detalhe');
                next()
            }},
            {path: ':id/editar', component: UsuarioEditar , props: true,
                name: 'editarUsuario'}
        ]
    },{
        path: '/redirec',
        redirect: '/usuario'
    },{
        path: '*',
        redirect: '/'
    }]
})

router.beforeEach((to, from, next) => {
    console.log('antes da rota');
    next()
    // to and from are both route objects. must call `next`.
})

export default router