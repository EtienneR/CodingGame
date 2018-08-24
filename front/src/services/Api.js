import axios from 'axios'
const API_URL = 'http://localhost:1234/api/v1'

export default {
    addSignalement(content) {
        return axios.post(`${API_URL}/signalements`, content)
    },
    getAllSignalements() {
        return axios.get(`${API_URL}/signalements`)
    },
    getSignalement(id) {
        return axios.get(`${API_URL}/signalements/${id}`)
    },
    updateSignalement(id, content) {
        return axios.put(`${API_URL}/signalements/${id}`, content)
    },
}