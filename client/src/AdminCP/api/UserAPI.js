import axios from 'axios';
import authHeader from '../../api/AuthHeader';

class UserAPI {
    constructor()
    {
        this.apiUrl = process.env.REACT_APP_API_URL + '/user/';

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

    async GetDetail(userId) {
        return axios({
            url: this.apiUrl + 'detail/' + userId, 
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
    }
    async Create(user) {
        const endpoint = this.apiUrl + 'create'
        return axios.post(endpoint, { 
            userName: user.UserName,
            email: user.Email,
            password: user.Password
        })
        .then(response => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    }
    async Update(user) {
        const endpoint = this.apiUrl + 'edit/' + user.id;
        return axios.put(endpoint, { 
            password: user.Password
        })
        .then(response => {
            return response.data;
        });
    }

    async Delete(userId) {
        const endpoint = this.apiUrl + 'delete/' + userId
        return axios.delete(endpoint)
        .then(response => {
            return response.data;
        });
    }
}

export default new UserAPI();