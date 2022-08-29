import { Route, Routes } from "react-router-dom"
import { authRouts, publicRouts } from "../routers";
import { useSelector } from "react-redux"

const AppRouter = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    return (
        <Routes>
            {isAuth && authRouts.map(({path, component}) => 
                <Route key={path} path={path} element={component}/>
            )}
            {publicRouts.map(({path, component}) => 
                <Route key={path} path={path} element={component}/>
            )}
        </Routes>
    )
}

export default AppRouter