import React, {Component} from 'react';
import {Grid, MenuItem, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import CommonButton from "../../component/common/Button";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import CustomSnackBar from "../../component/common/SnakBar";
import ProductService from "../../service/ProductService";
import UserService from "../../service/UserService";
import CartService from "../../service/CartService";
import CommonDataTable from "../../component/common/Table";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: "",
                username: "",
                password: "",
                name: {
                    firstname: "",
                    lastname: ""
                },
                address: {
                    city: "",
                    street: "",
                    number: '',
                    zipcode: "",
                    geolocation: {
                        lat: "",
                        long: ""
                    }
                },
                phone: ""

            },
            alert: false,
            message: '',
            severity: '',
            columns: [
                {
                    field: "firstName",
                    headerName: "First Name",
                    width: 150,
                    renderCell:(params)=>{
                        return(
                            <>
                                <span>{params.row.name.firstname}</span>
                            </>
                        )
                    }
                },
                {
                    field: "lastName",
                    headerName: "Last Name",
                    width: 150,
                    renderCell:(params)=>{
                        return(
                            <>
                                <span>{params.row.name.lastname}</span>
                            </>
                        )
                    }
                },
                {
                    field: "email",
                    headerName: "Email",
                    width: 200,
                    sortable: false,
                },
                {
                    field: "username",
                    headerName: "User Name",
                    width: 150,
                    sortable: false,
                },
                {
                    field: "password",
                    headerName: "Password",
                    width: 125,
                    sortable: false,
                    renderCell:(params) => {
                        return(
                            <>
                                <span style={{'-webkit-text-security': 'disc'}} >{params.row.password}</span>
                            </>
                        )
                    }
                },
                {
                    field: "phone",
                    headerName: "Mobile No",
                    width: 150,
                    sortable: false,
                },
                {
                    field: "city",
                    headerName: "City",
                    width: 125,
                    renderCell:(params) => {
                        return(
                            <>
                                <span>{params.row.address.city}</span>
                            </>
                        )
                    }
                },
                {
                    field: "street",
                    headerName: "Street",
                    width: 175,
                    renderCell:(params) => {
                        return(
                            <>
                                <span>{params.row.address.street}</span>
                            </>
                        )
                    }
                },
                {
                    field: "streetNo",
                    headerName: "Street No",
                    width: 100,
                    renderCell:(params) => {
                        return(
                            <>
                                <span>{params.row.address.number}</span>
                            </>
                        )
                    }
                },
                {
                    field: "zipCode",
                    headerName: "Zip Code",
                    width: 125,
                    renderCell:(params) => {
                        return(
                            <>
                                <span>{params.row.address.zipcode}</span>
                            </>
                        )
                    }
                },
                {
                    field: "latValue",
                    headerName: "Lat Value",
                    width: 120,
                    renderCell:(params) => {
                        return(
                            <>
                                <span>{params.row.address.geolocation.lat}</span>
                            </>
                        )
                    }
                },
                {
                    field: "longValue",
                    headerName: "Long Value",
                    width: 120,
                    renderCell:(params) => {
                        return(
                            <>
                                <span>{params.row.address.geolocation.long}</span>
                            </>
                        )
                    }
                },
                {
                    field: "action",
                    headerName: "Action",
                    width: 75,
                    renderCell: (params) => {
                        return (
                            <>
                                <Tooltip title="Delete">
                                    <IconButton className={'bg-red-100 mr-2'} onClick={async () => {
                                        await this.deleteUser(params.row.id);
                                    }}>
                                        <DeleteIcon className={'text-red-500'}/>
                                    </IconButton>
                                </Tooltip>
                            </>
                        )
                    }
                },

            ],
            userData:[],
        };
    }

    clearFields = () => {
        this.setState({
            formData: {
                email: "",
                username: "",
                password: "",
                name: {
                    firstname: "",
                    lastname: ""
                },
                address: {
                    city: "",
                    street: "",
                    number: '',
                    zipcode: "",
                    geolocation: {
                        lat: "",
                        long: ""
                    }
                },
                phone: ""

            }
        })
    }

    deleteUser = async (id) =>{
        const res = await UserService.deleteUsers(id);
        if (res.status===200){
            this.setState({
                alert: true, message: 'User Deleted!', severity: 'success'
            })
        }else {
            this.setState({
                alert: true, message: 'User Delete Unsuccessful!', severity: 'error'
            })
        }
    }

    handleSubmit = async () => {
        let formDate = this.state.formData
        let res = await UserService.addUsers(formDate)

        if (res.status === 200) {
            this.setState({
                alert: true, message: 'User Saved!', severity: 'success'
            })
            this.clearFields();
        } else {
            this.setState({
                alert: true, message: res.message, severity: 'error'
            })
        }
        console.log("submit",this.state.formData)
    };

    handleChange = (event) => {
        let id = event.target.name;
        switch (id) {
            case "firstname":
                const firstname = event.target.value;
                this.setState(Object.assign(this.state.formData.name, {firstname: firstname}));
                break;

            case "lastname":
                const lastname = event.target.value;
                this.setState(Object.assign(this.state.formData.name, {lastname: lastname}));
                break;

            case "email":
                const email = event.target.value;
                this.setState(Object.assign(this.state.formData, {email: email}));
                break;

            case "username":
                const username = event.target.value;
                this.setState(Object.assign(this.state.formData, {username: username}));
                break;

            case "password":
                const password = event.target.value;
                this.setState(Object.assign(this.state.formData, {password: password}));
                break;

            case "zipcode":
                const zipcode = event.target.value;
                this.setState(Object.assign(this.state.formData.address, {zipcode: zipcode}));
                break;

            case "street":
                const street = event.target.value;
                this.setState(Object.assign(this.state.formData.address, {street: street}));
                break;

            case "long":
                const long = event.target.value;
                this.setState(Object.assign(this.state.formData.address.geolocation, {long: long}));
                break;

            case "city":
                const city = event.target.value;
                this.setState(Object.assign(this.state.formData.address, {city: city}));
                break;

            case "number":
                const number = event.target.value;
                this.setState(Object.assign(this.state.formData.address, {number: number}));
                break;

            case "lat":
                const lat = event.target.value;
                this.setState(Object.assign(this.state.formData.address.geolocation, {lat: lat}));
                break;

            case "phone":
                const phone = event.target.value;
                this.setState(Object.assign(this.state.formData, {phone: phone}));
                break;

            default:
                break;
        }
    };

    fetchUserData = async ()=>{
        const res = await UserService.fetchUsers();
        console.log(res)
        /*let count = Object.keys(res.data).length;
        console.log("count",count)*/
        if (res.status === 200){
            this.setState({
                userData:res.data
            })
        }
    }

    async componentDidMount() {
        await this.fetchUserData();
        console.log("data : ",this.state.userData)
    }

    render() {
        const {classes} = this.props;
        return (<>
            <Grid container justifyContent={"center"} className={'h-screen bg-red-000 pt-28 px-10'}>
                <Grid container item direction={"column"} xs={12} gap={5} className={'bg-red-000'}>
                    <Grid item container justifyContent={"center"}>
                        <Typography variant={'h3'} textAlign={"center"}>User Registration</Typography>
                    </Grid>
                    <Grid item container justifyContent={"center"}>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                            onError={(errors) => console.log(errors)}
                            className={classes.validator}
                        >
                            <Grid item container direction={'row'} xs={12} gap={'15px'} justifyContent={"center"}
                                  className="rounded-lg p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-10 py-10"
                            >
                                <Grid item container direction={'column'} xs={12} sm={10} md={5} gap={'15px'}>
                                    <TextValidator
                                        label="Firste Name"
                                        onChange={this.handleChange}
                                        name="firstname"
                                        value={this.state.formData.name.firstname}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Last Name"
                                        onChange={this.handleChange}
                                        name="lastname"
                                        value={this.state.formData.name.lastname}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Email"
                                        onChange={this.handleChange}
                                        name="email"
                                        value={this.state.formData.email}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="User Name"
                                        onChange={this.handleChange}
                                        name="username"
                                        value={this.state.formData.username}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Password"
                                        onChange={this.handleChange}
                                        name="password"
                                        value={this.state.formData.password}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Zip Code"
                                        onChange={this.handleChange}
                                        name="zipcode"
                                        value={this.state.formData.address.zipcode}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                </Grid>

                                <Grid item container direction={'column'} xs={12} sm={10} md={5} gap={'15px'}>

                                    <TextValidator
                                        label="Street"
                                        onChange={this.handleChange}
                                        name="street"
                                        value={this.state.formData.address.street}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Long Value"
                                        onChange={this.handleChange}
                                        name="long"
                                        value={this.state.formData.address.geolocation.long}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="City"
                                        onChange={this.handleChange}
                                        name="city"
                                        value={this.state.formData.address.city}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                    <TextValidator
                                        label="Street No"
                                        onChange={this.handleChange}
                                        name="number"
                                        value={this.state.formData.address.number}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                    <TextValidator
                                        label="Lat Value"
                                        onChange={this.handleChange}
                                        name="lat"
                                        value={this.state.formData.address.geolocation.lat}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                    <TextValidator
                                        label="Mobile No"
                                        onChange={this.handleChange}
                                        name="phone"
                                        value={this.state.formData.phone}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                </Grid>

                                <Grid container direction={'row'} xs={12} sm={10} md={5} gap={'15px'}
                                      justifyContent={'center'}>
                                    <CommonButton
                                        size="large"
                                        variant="contained"
                                        label='Save'
                                        type="submit"
                                        className="text-white bg-blue-500 font-bold tracking-wide"
                                        style={{backgroundColor: 'rgba(25, 118, 210, 0.95)', width: '100%'}}
                                    />
                                </Grid>
                                <Grid container direction={'row'} xs={12} sm={10} md={5} gap={'15px'}
                                      justifyContent={'center'}>
                                    <CommonButton
                                        size="large"
                                        variant="contained"
                                        label='Clear'
                                        className="text-white bg-red-500 font-bold tracking-wide"
                                        style={{backgroundColor: 'rgba(210,25,25,0.95)', width: '100%'}}
                                        onClick={this.clearFields}
                                    />
                                </Grid>

                            </Grid>
                        </ValidatorForm>
                        <Grid
                            container
                            item
                            xs={12}
                            gap="5px"
                            className="rounded-lg p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-16 py-10"
                            style={{height: "750px"}}
                        >
                            <CommonDataTable
                                columns={this.state.columns}
                                rows={this.state.userData}
                                rowsPerPageOptions={10}
                                pageSize={10}
                                // checkboxSelection={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CustomSnackBar
                open={this.state.alert}
                onClose={() => {
                    this.setState({alert: false})
                }}
                message={this.state.message}
                autoHideDuration={3000}
                severity={this.state.severity}
                variant={'filled'}
            />
        </>);
    }
}

export default withStyles(styleSheet)(Register);