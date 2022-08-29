import { $authHost, $host } from "./index"

export const createItem = async (item) => {
    const {data} = await $authHost.post('api/item', item)
    return data
}

export const getAllItem = async () => {
    const {data} = await $host.get('api/item')
    return data
}
export const getItemById = async (id) => {
    const {data} = await $host.get('api/item/' + id)
    return data
}
export const removeItem = async (id) => {
    const {data} = await $host.delete('api/item/' + id)
    return data
}