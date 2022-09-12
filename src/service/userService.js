import axios from "../axios";

class UserService {

    addUsers = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('users',data).then((res)=>{
                return resolve(res)
            }).catch((err)=>{
                return resolve(err)
            })
        })
        return await promise;
    }

    fetchUsers=async ()=>{
        const promise = new Promise((resolve, reject) => {
            axios.get('users').then((res)=>{
                return resolve(res)
            }).catch((err)=>{
                return resolve(err)
            })
        })
        return await promise;
    }

    deleteUsers = async (id) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete(`users/${id}`).then((res)=>{
                return resolve(res)
            }).catch((err)=>{
                return resolve(err)
            })
        })
        return await promise;
    }
}
export default new UserService();