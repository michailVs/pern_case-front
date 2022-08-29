import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBalance, getBalance } from "../http/balanceApi";
import { addItemInv, delInvItem } from "../http/invApi";
import { getAllItem } from "../http/itemApi";
import { addBalanc, addBalancc } from "../store/balanceStore";
import { addItem, deletItem } from "../store/itemStore";

const CaseList = () => {
    const item = useSelector(state => state.item.items)
    const balance = useSelector(state => state.balance.balance)
    const user = useSelector(state => state.user.users)
    const dispatch = useDispatch()
    const [itemInCase, setItemInCase] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const random = () => {
        if (balance < 6000) {
            return alert('Недостаточно средств')
        }
        addBalance(user[0].id, balance - 6000, user[0].id)
        dispatch(addBalanc(balance - 6000))
        const randomItem = Math.round(Math.random() * 100)
        if (randomItem <= 80) {
            item.map(i => i.change <= 80 ? addItemInv(user[0].id, i.id, user[0].id) : false)
            setItemInCase([item.find(i => i.change <= 80)])
        } else if (randomItem > 80 && randomItem < 90) {
            item.map(i => i.change > 80 && i.change < 90 ? addItemInv(user[0].id, i.id, user[0].id) : false)
            setItemInCase([item.find(i => i.change > 80 && i.change < 90)])
        } else if (randomItem > 90 && randomItem < 97) {
            item.map(i => i.change > 90 && i.change < 97 ? addItemInv(user[0].id, i.id, user[0].id) : false)
            setItemInCase([item.find(i => i.change > 90 && i.change < 97)])
        } else if (randomItem > 97 && randomItem < 100) {
            item.map(i => i.change > 97 && i.change < 100 ? addItemInv(user[0].id, i.id, user[0].id) : false)
            setItemInCase([item.find(i => i.change > 97 && i.change < 100)])
        } else {
            item.map(i => i.change > 99 ? addItemInv(user[0].id, i.id, user[0].id) : false)
            setItemInCase([item.find(i => i.change > 99)])
        }
        setIsOpen(true)
    }
    const selItem = (item) => {
        delInvItem(user[0].id, item.id, user[0].id)
        addBalance(user[0].id, balance + item.price, user[0].id)
        dispatch(addBalanc(balance + item.price))
        setIsOpen(false)
    }
    const addBal = (sum) => {
        if (sum < 1) {
            return alert('Сумма не ведена')
        } else {
            dispatch(addBalanc(balance + sum))
            addBalance(user[0].id, sum, user[0].id)
        }
    }
    useEffect(() => {
        if (item.length > 0) {
            dispatch(deletItem())
            getAllItem().then(data => data.rows.map(i => dispatch(addItem(i))))
        } else {
            getAllItem().then(data => data.rows.map(i => dispatch(addItem(i))))
        }
        if (balance > 0) {
            dispatch(addBalanc(0))
            getBalance(user[0].id).then(data => dispatch(addBalanc(data.balance)))
        } else {
            getBalance(user[0].id).then(data => dispatch(addBalanc(data.balance)))
        }
    }, [])
    return (
        <div>
            {user.map(i => 
                <div className="user" key={i.id}>Никнейм: {i.username} | Баланс: {balance} руб. <button onClick={() => addBal(Number(prompt('Введите сумму').trim().match(/\d*/)))}>+</button></div>
            )}
            {isOpen && itemInCase.map(i =>
                <div className="randomItem" key={i.id}>
                    <img className="randomItem__img" src={`http://localhost:5000/${i.img}`} alt={i.title} />
                    <h2 className="randomItem__title">{i.title}</h2>
                    <button className="randomItem__btn-save" onClick={() => setIsOpen(false)}>Оставить</button>
                    <button className="randomItem__btn-sell" onClick={() => selItem(i)}>Продать за {i.price} руб.</button>
                </div>
            )}
            {!isOpen && <button className="randomItem__btn-open" onClick={random}>Открыть кейс за 6000 руб.</button>}
            <div className="item">
                {item.map(i =>
                    <div className="item__case" key={i.id}>
                        <img className="item__case-img" src={`http://localhost:5000/${i.img}`} alt={i.title} />
                        <h2 className="item__case-title">Название: {i.title}</h2>
                        <p className="item__case-price">Цена: {i.price} руб.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CaseList