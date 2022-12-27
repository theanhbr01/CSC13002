import axios from 'axios';
import authHeader from '../../api/AuthHeader';

class RoleAPI {
    constructor()
    {
        this.apiUrl = process.env.REACT_APP_API_URL + '/role/';

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
    async GetByUser(userId) {
        return axios({
            url: this.apiUrl + 'user/' + userId, 
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

    async Delete(roleId) {
        const endpoint = this.apiUrl + 'delete/' + roleId
        return axios.delete(endpoint)
        .then(response => {
            return response.data;
        });
    }

    async AssignRole(userId, roleId) {
        const endpoint = this.apiUrl + 'assign'
        return axios.post(endpoint, { 
            userId: userId,
            roleId: roleId
        })
        .then(response => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    }
    async UnAssignRole(userId, roleId) {
        const endpoint = this.apiUrl + 'unassign'
        return axios.post(endpoint, { 
            userId: userId,
            roleId: roleId
        })
        .then(response => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    }
}

export default new RoleAPI();