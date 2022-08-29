import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  return (
    <div style={{marginBottom: 25}}>
        {isAuth
        ? <div>
            <Link style={{textDecoration: 'none', color: 'black', marginRight: 15}} to='/'>Кейс</Link>
            <Link style={{textDecoration: 'none', color: 'black', marginRight: 15}} to='/inventory'>Ивентарь</Link>
            <Link style={{textDecoration: 'none', color: 'black'}} to='/create'>Добавление предмета</Link>
          </div>
        : <div>
            <Link style={{textDecoration: 'none', color: 'black', marginRight: 15}} to='/'>Кейс</Link>
            <Link style={{textDecoration: 'none', color: 'black', marginRight: 15}} to='/reg'>регистрация</Link>
          </div>
        }
    </div>
  )
}

export default NavBar