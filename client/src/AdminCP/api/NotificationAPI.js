import axios from 'axios';
import authHeader from '../../api/AuthHeader';

class NotificationAPI {
    constructor()
    {
        this.apiUrl = process.env.REACT_APP_API_URL + '/notification/';

    }

    async GetList() {
        return axios({
            url: this.apiUrl, 
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
    }

    async Create(notification) {
        const endpoint = this.apiUrl + 'create'
        return axios.post(endpoint, { 
            recipientId: notification.recipientId,
            senderId: notification.senderId,
            content: notification.content
        })
        .then(response => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    }
}

export default new NotificationAPI();