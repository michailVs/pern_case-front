import { $authHost, $host } from "./index"

export const addItemInv = async (userId, itemId, id) => {
    const {data} = await $authHost.post('api/inv/' + id, {userId, itemId})
    return data
}

export const getAllItemInv = async (id) => {
    const {data} = await $host.get('api/inv/' + id)
    return data
}
export const delInvItem = async (userId, itemId, id) => {
    const {data} = await $authHost.post('api/inv/del/' + id, {userId, itemId})
    return data
}