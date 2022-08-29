import CreateItem from './components/CreateItem'
import Inventory from './page/Inventory'
import CaseList from './components/CaseList'
import Auth from './page/Auth'

export const authRouts = [
    {
        path: '/create',
        component: <CreateItem/>
    },
    {
        path: '/inventory',
        component: <Inventory/>
    },
    {
        path: '/',
        component: <CaseList/>
    },
]

export const publicRouts = [
    {
        path: '/reg',
        component: <Auth/>
    },
    {
        path: '/login',
        component: <Auth/>
    },
]