import axios from 'axios';
import authHeader from '../../api/AuthHeader';

class ArticleAPI {
    constructor()
    {
        this.apiUrl = process.env.REACT_APP_API_URL + '/article/';

    }

    async GetList() {
        return axios({
            url: this.apiUrl + 'all', 
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
    }

    async GetDetail(articleId) {
        return axios({
            url: this.apiUrl + 'detail/' + articleId, 
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
    }

    async Create(role) {
        const endpoint = this.apiUrl + 'create'
        return axios.post(endpoint, { 
            title: role.Title,
        })
        .then(response => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    }

    async Delete(articleId) {
        const endpoint = this.apiUrl + 'delete/' + articleId
        return axios.delete(endpoint)
        .then(response => {
            return response.data;
        });
    }
}

export default new ArticleAPI();