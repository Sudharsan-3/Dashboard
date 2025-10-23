import {axios} from "axios"

const api = axios.create({
    baseUrl:"https://jsonplaceholder.typicode.com/posts"
})

export default api;
