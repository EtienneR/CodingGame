import axios from 'axios'
const API_URL = 'http://localhost:1234/api/v1'
export const brigades = ['75015-A', '75015-B', '75002', '75001', '75006-C']
export const etats = ['Très faible', 'Faible', 'Moyen', 'Bon']

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