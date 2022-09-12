import React, {Component} from 'react';
import Widget from "../../component/common/widgets";
import {Grid} from "@mui/material";
import UserService from "../../service/UserService";
import CartService from "../../service/CartService";
import ProductService from "../../service/ProductService";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            product:'',
            users:'',
            cart:''
        }
    }

    fetchProductData = async ()=>{
        const res = await ProductService.fetchProducts()
        if (res.status === 200){
            let count = Object.keys(res.data).length;
            this.setState({
                product:count
            })
        }
    }

    fetchUserData = async ()=>{
        const res = await UserService.fetchUsers();
        if (res.status === 200){
            let count = Object.keys(res.data).length;
            this.setState({
                users:count
            })
        }
    }

    fetchCartData = async ()=>{
        const res = await CartService.fetchCart()
        if (res.status === 200){
            let count = Object.keys(res.data).length;
            this.setState({
                cart:count
            })
        }
    }

    async componentDidMount() {
        await this.fetchProductData();
        await this.fetchUserData();
        await this.fetchCartData();
    }

    render() {
        return (
            <Grid container gap={5} item className={'h-screen pt-28 px-5'}>
                <Widget type="Product" path="/product" number={this.state.product} icon={<CategoryIcon className="text-2xl bg-opacity-50 rounded"/>} color={'bg-blue-500'}/>
                <Widget type="Users" path="/register" number={this.state.users} icon={<PersonIcon className="text-2xl 0 bg-opacity-50 rounded"/>} color={'bg-green-500'}/>
                <Widget type="Cart" path="/cart" number={this.state.cart} icon={<ShoppingCartIcon className="text-2xl bg-opacity-50 rounded"/>} color={'bg-yellow-500'}/>
            </Grid>
        );
    }
}

export default Dashboard;