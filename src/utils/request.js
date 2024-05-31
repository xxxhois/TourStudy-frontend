import axios from 'axios';
import { Navigate } from "react-router-dom";
// 创建axios实例
const request = axios.create({
    baseURL: 'http://10.29.73.74:8080/tour/', // api的base_url
    //baseURL: 'http://127.0.0.1:4523/m1/4095419-0-default/tour/', // api的base_url
    timeout: 5000 // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = localStorage.getItem('token');
            //console.log('token:', localStorage.getItem('token'));
        }
        return config;
    },
    error => {
        if(error.response && error.response.status === 400){
            Navigate('/login');
        }
        else{
        console.error('request:', error);
        return Promise.reject(error);
        }
    }
);

//响应拦截器
// request.interceptors.response.use(
//     response => {
//         // 在这里可以做一些响应的操作
//         return response;
//     },
//     error => {
//         if(error.response && error.response.status === 401){
//             Navigate('/login');
//         }
//         else{
//             console.error('response:', error);
//             return Promise.reject(error);
//         }
//     }
// );

export {request};