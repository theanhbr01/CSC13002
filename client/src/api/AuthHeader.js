import authAPI from './AuthApi'

// For authencated request, add this config to header request
export default function authHeader() {
    const user = authAPI.GetCurrentUser();
    const headerKey = process.env.REACT_APP_API_AUTH_HEADER;
    if (user && user.accessToken) {
      return { headerKey : user.accessToken };
    } else {
      return {};
    }
}