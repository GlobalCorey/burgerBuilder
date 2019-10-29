import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-a26b6.firebaseio.com/'
});

export default instance;