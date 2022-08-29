import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createBalance, getBalance } from '../http/balanceApi'
import { login, reg } from '../http/userApi'
import { addBalanc } from '../store/balanceStore'
import { addUser } from '../store/userStore'

const Auth = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const isLogin = location.pathname === '/login'
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const click = async (e) => {
        e.preventDefault()
        try {
          let data
          if (isLogin) {
            data = await login(username, password)
          } else {
            data = await reg(username, password)
            data = await login(username, password)
            createBalance(data.id, 0).then(data => addBalanc(data.balance))
          }
          dispatch(addUser(data))
          navigate('/')
        } catch (err) {
          alert(err.response.data.message)
        }
    }
    return (
        <div>
            <form>
                <input
                    placeholder='Введите имя пользователя'
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value.trim())}
                />
                <input
                    placeholder='Введите пароль'
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value.trim())}
                />
                <div>
                {isLogin
                ? <div>
                Нет аккаунта? <Link to={'/reg'}>Зарегестрирутесь</Link>
                </div>
                : <div>
                Есть аккаунт? <Link to={'/login'}>Войдите</Link>
                </div>
                }
                <button onClick={e => click(e)}>{isLogin ? 'Войти' : 'Зарегестрироватся'}</button>
                </div>
            </form>
        </div>
    )
}

export default Auth