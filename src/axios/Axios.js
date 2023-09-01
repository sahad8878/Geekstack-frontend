import axios from 'axios'
import { BACKEND_URI } from '../config/constants'


const instance = axios.create({
    baseURL:BACKEND_URI
  
})

export default instance