import axios from "../axios";

class CartService {

    addCart = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('carts',data).then((res)=>{
                return resolve(res)
            }).catch((err)=>{
                return resolve(err)
            })
        })
        return await promise;
    }

    fetchCart = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('carts').then((res)=>{
                return resolve(res)
            }).catch((err)=>{
                return resolve(err)
            })
        })
        return await promise;
    }

}
export default new CartService();