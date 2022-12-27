import axios from 'axios';
import authHeader from '../../api/AuthHeader';

class ApplicationAPI {
    constructor()
    {
        this.apiUrl = process.env.REACT_APP_API_URL + '/jobapplication/';

    }

    async GetByJob(jobId) {
        const endpoint = this.apiUrl + 'all/' + jobId
        return axios.get(endpoint)
        .then(response => {
            return response.data;
        });
    }

}

export default new ApplicationAPI();