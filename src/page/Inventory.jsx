import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delInvItem, getAllItemInv } from '../http/invApi'
import { addItemInv, delInvItem as inveit, refInf } from '../store/invStore'
import { Link } from 'react-router-dom'
import { addBalance, getBalance } from '../http/balanceApi'
import { addBalanc } from '../store/balanceStore'

const Inventory = () => {
    const user = useSelector(state => state.user.users)
    const balance = useSelector(state => state.balance.balance)
    const invent = useSelector(state => state.inv.invItem)
    const isInv = useSelector(state => state.inv.isInv)
    const dispatch = useDispatch()

    const selItem = (item) => {
        dispatch(inveit(item.id))
        delInvItem(user[0].id, item.id, user[0].id)
        addBalance(user[0].id, balance + item.price, user[0].id)
        dispatch(addBalanc(balance + item.price))
    }

    useEffect(() => {
        if (invent.length > 0) {
            dispatch(refInf())
            getAllItemInv(user[0].id).then(data => dispatch(addItemInv(data.items)))
        } else {
            getAllItemInv(user[0].id).then(data => dispatch(addItemInv(data.items)))
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
        {user.map(i => <div key={i.id}>{i.username} | Баланс: {balance} руб.</div>)}
        {!isInv
        ?   <div>
                <h1>Сначала откройте <Link to={'/'}>кейс</Link></h1>
            </div>
        :   invent.map(i =>
                <div className="item__inv" key={i.id}>
                    <img className='item__inv-img' src={`http://localhost:5000/${i.img}`} alt={i.title} />
                    <h2 className='item__inv-title'>{i.title}</h2>
                    <button className='item__inv-sell' onClick={() => selItem(i)}>Продать за {i.price} руб.</button>
                </div>
            )
        }
    </div>
  )
}

export default Inventory