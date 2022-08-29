import { $host } from './index'

export const createBalance = async (userId, balance) => {
    const {data} = await $host.post('api/balance', {userId, balance})

    return data
}
export const getBalance = async (userId) => {
    const {data} = await $host.get('api/balance/' + userId)
    
    return data
}

export const addBalance = async (id, balance, userId) => {
    const {data} = await $host.post('api/balance/add/' + id, {userId, balance})
    
    return data
}