import axios from 'axios';

const baseURL = "http://localhost:8000/messaging/authenticate/"
const authenticate= new Promise(function(resolve, reject) {
    axios.get(baseURL,
        { withCredentials: true })
        .then((r) => {
            resolve(true)
        }).catch((r) => {
            reject(false)
        })
})
    



export default authenticate;