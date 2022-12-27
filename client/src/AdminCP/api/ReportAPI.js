import axios from 'axios';
import authHeader from '../../api/AuthHeader';

class ReportAPI {
    constructor()
    {
        this.apiUrl = process.env.REACT_APP_API_URL + '/report/';

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
}

export default new ReportAPI();