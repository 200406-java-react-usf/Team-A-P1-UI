//Service for all the admin methods
import { Client } from './client';


export async function getAllUser(){
    let response = await Client.get('/users');
    return await response.data;
}

export async function deleteUserbyID(user_id: number){
    let response = await Client.delete(`/users/${user_id}`);
    return await response.data;
}