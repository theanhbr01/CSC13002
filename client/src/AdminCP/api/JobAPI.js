import axios from 'axios';
import authHeader from '../../api/AuthHeader';

class JobAPI {
    constructor()
    {
        this.apiUrl = process.env.REACT_APP_API_URL + '/job/';

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

    async GetDetail(jobId) {
        return axios({
            url: this.apiUrl + 'detail/' + jobId, 
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
    }
    async Create(model) {
        const endpoint = this.apiUrl + 'create'
        return axios.post(endpoint, { model })
        .then(response => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    }
    async Update(model) {
        const endpoint = this.apiUrl + 'edit/' + model.id;
        return axios.put(endpoint, { model })
        .then(response => {
            return response.data;
        });
    }

    async Delete(jobId) {
        const endpoint = this.apiUrl + 'delete/' + jobId
        return axios.delete(endpoint)
        .then(response => {
            return response.data;
        });
    }
}

export default new JobAPI();