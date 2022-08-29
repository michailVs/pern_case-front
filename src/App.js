import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar'
import { check } from "./http/userApi";
import { addUser } from "./store/userStore";
import { useDispatch } from "react-redux"
import { useEffect } from "react";
import './styles/App.scss'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      check().then(data => dispatch(addUser(data)))
  }, [])
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
