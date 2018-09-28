import request from '../utils/request';

export async function queryDate() {
    return request('api/todolist');
}