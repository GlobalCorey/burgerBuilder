import axios from 'axios';
const ORDERS_FIREBASE_URL = 'INSERT_FIREBASE_URL' //EX: https://<FIREBASE_DB_NAME>.firebaseio.com/

const instance = axios.create({
    baseURL: ORDERS_FIREBASE_URL
});

export default instance;