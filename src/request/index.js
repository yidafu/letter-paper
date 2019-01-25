import axios from 'axios';

// const isDev = process.env.NODE_ENV === 'production';
const uri = 'http://localhost:8080/api';
export default axios.create({
  baseURL: uri
});
