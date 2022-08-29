import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { createItem, getAllItem, removeItem } from '../http/itemApi'
import { addItem, deletItem } from '../store/itemStore'

const CreateItem = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [change, setChange] = useState(0)
    const [img, setImg] = useState(null)
    const navigate = useNavigate()
    const item = useSelector(state => state.item.items)
    const dispatch = useDispatch()

    const selectFile = e => {
        setImg(e.target.files[0])
    }

    const sendItem = (e) => {
        e.preventDefault()
        if (!title || !price || !change || !img) {
            return alert('Введите данные')
        }
        const formData = new FormData()
        formData.append('title', title)
        formData.append('price', price)
        formData.append('change', change)
        formData.append('img', img)
        createItem(formData)
        setImg(null)
        setTitle('')
        setPrice(0)
        setChange(0)
        navigate('/')
    }
    const delItem = (id) => {
        removeItem(id).then(data => alert(`предмет с id: ${id}, удалён.`))
    }
    useEffect(() => {
        if (item.length > 0) {
            dispatch(deletItem())
            getAllItem().then(data => data.rows.map(i => dispatch(addItem(i))))
        } else {
            getAllItem().then(data => data.rows.map(i => dispatch(addItem(i))))
        }
    }, [])
  return (
    <div>
        <form>
            <input
                style={{marginRight: 10}}
                placeholder='Введите название предмета'
                type="text"
                className='add__item-title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <label>Введите цену предмета =&gt;</label>
            <input
                style={{marginRight: 10, marginLeft: 10}}
                type="number"
                className='add__item-price'
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <label>Введите шанс выпадения (от 1 до 100) =&gt;</label>
            <input
                style={{marginRight: 10, marginLeft: 10}}
                type="number"
                className='add__item-change'
                value={change}
                onChange={e => setChange(e.target.value)}
            />
            <label>Загрузите изображение =&gt;</label>
            <input
                style={{marginRight: 10, marginLeft: 10}}
                type="file"
                onChange={selectFile}
            />
            <button className='add__item-btn' onClick={e => sendItem(e)}>Добавить предмет</button>
        </form>
        <div className='item__class'>
            <h2>Картинка</h2>
            <h2>Название</h2>
            <h2>Цена</h2>
        </div>
        {item.map(i => 
            <div key={i.id} className='view'>
                <img className='view__img' style={{border: '1px solid black'}} src={`http://localhost:5000/${i.img}`} alt={i.title} />
                <h3 className='view__title'>{i.title}</h3>
                <p className='view__price'>{i.price}</p>
                <button className='add__item-del' onClick={() => delItem(i.id)}>Удалить</button>
            </div>
        )}
    </div>
  )
}

export default CreateItem