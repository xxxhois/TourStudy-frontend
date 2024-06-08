import axios from 'axios';
import { Navigate } from "react-router-dom";
// 创建axios实例
const AIGCrequest = axios.create({
    baseURL: 'http://10.106.128.107:10041', // api的base_url
    timeout: 0 // 设置为0表示无超时时间，即长连接
});

// // 请求拦截器
// AIGCrequest.interceptors.request.use(
//     config => {
//         if (localStorage.getItem('token')) {
//             config.headers['Authorization'] = localStorage.getItem('token');
//             //console.log('token:', localStorage.getItem('token'));
//         }
//         return config;
//     },
//     error => {
//         if(error.response && error.response.status === 400){
//             Navigate('/login');
//         }
//         else{
//         console.error('AIGCrequest:', error);
//         return Promise.reject(error);
//         }
//     }
// );

//响应拦截器
// AIGCrequest.interceptors.response.use(
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


export {AIGCrequest};