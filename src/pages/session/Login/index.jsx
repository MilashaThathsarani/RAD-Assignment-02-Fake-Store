import {Grid, Typography} from "@mui/material";
import React, {Component} from "react";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {styleSheet} from "./style";
import {Link} from "react-router-dom";
import CommonButton from "../../../component/common/Button";
import localStorageService from "../../../service/localStorageService";
import LoginService from "../../../service/loginService";
import jwt_decode from "jwt-decode";
import CustomSnackBar from "../../../component/common/SnakBar";
import {withRouter} from "../../../withRouter";
import withStyles from "@mui/material/styles/withStyles";


class LoginAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: "",
                password: "",
            },
            alert: false,
            message: '',
            severity: '',
        };
    }

    handleSubmit = async () => {
        console.log("Hi handle");
        console.log(this.state.formData);

        let fData = this.state.formData
        let res = await LoginService.postLogin(fData);
        if (res.status === 200) {
            let token = res.data.token;
            let decoded = jwt_decode(token);
            localStorageService.setItem("user", decoded.user)
            // console.log(decoded)
            // window.location.replace("http://www.w3schools.com");
            this.props.navigate('/dashboard')
            // window.location.reload();
        } else {

            this.setState({
                alert: true, message: 'Please Check the Email & Password!', severity: 'error'
            });


        }

        // localStorage.setItem("user",this.state.username)

    };

    /*async componentDidMount() {
        const {regNumber} = this.props.params
        await this.loadVehicle(regNumber)
        // console.log('http://localhost:8080/backend/'+this.state.vehicleObj.imgs[0].path))
        console.log("details",this.state.vehicleObj)
    }*/

    handleChange = (event) => {
        let id = event.target.name;
        switch (id) {
            case "username":
                const username = event.target.value;
                this.setState(
                    Object.assign(this.state.formData, {username: username})
                );
                // this.setState({ userId });
                break;

            case "password":
                const password = event.target.value;
                this.setState(
                    Object.assign(this.state.formData, {password: password})
                );
                break;

            default:
                break;
        }
    };

    async componentDidMount() {
        const regNumber = this.props.params
        // console.log('http://localhost:8080/backend/'+this.state.vehicleObj.imgs[0].path))
        console.log("details", regNumber)
    }

    checkValidity() {

    }

    render() {
        // if (this.state.redirect){
        //     <Navigate to="/dashboard" replace={true}/>
        // }
        const {classes} = this.props;
        return (
            <>
                <Grid
                    container
                    direction={"row"}
                    justifyContent="center"
                    alignItems="stretch"
                    className="h-screen min-h-min w-screen p-0 m-0 bg-login-img bg-no-repeat bg-bottoms bg-cover bg-center bg-blend-overlay bg-stone-700"
                >
                    <Grid
                        container
                        direction={"row"}
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <div
                            className="flex gap-6 flex-col h-fit w-96 rounded-xl bg-blue-300 p-10 m-5 md:m-0 bg-opacity-10  backdrop-blur-sm"
                            style={{border: "1px solid rgba(255, 255, 255, 0.09)"}}
                        >
                            <Grid item>
                                <Typography
                                    variant="h4"
                                    className="text-center uppercase font-bold text-white"
                                >
                                    Login
                                </Typography>
                            </Grid>
                            <ValidatorForm
                                onSubmit={this.handleSubmit}
                                onError={(errors) => console.log(errors)}
                            >
                                <Grid item container direction={"column"} rowGap="20px">
                                    <TextValidator
                                        label="User Name"
                                        onChange={this.handleChange}
                                        name="username"
                                        value={this.state.formData.username}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className={[classes.textField, "w-full text-red-500"]}
                                    />
                                    <TextValidator
                                        label="Password"
                                        onChange={this.handleChange}
                                        name="password"
                                        value={this.state.formData.password}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        type={"password"}
                                        className={[classes.textField, "w-full"]}
                                    />
                                    {/*<Link to="dashboard">*/}
                                    <CommonButton
                                        size="large"
                                        variant="contained"
                                        label="Login"
                                        type="submit"
                                        onClick={() => {
                                            this.checkValidity();
                                        }}
                                        className="text-white w-full bg-blue-500 font-bold tracking-wide"
                                    />
                                    {/*</Link>*/}

                                    <Typography variant="p" className={'text-white'}>
                                        You are not a member? <Link to={'/register'}
                                                                    className={'font-semibold'}> Register
                                        Now</Link>
                                    </Typography>

                                </Grid>
                            </ValidatorForm>
                        </div>
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
            </>
        );
    }
}

export default withRouter(withStyles(styleSheet)(LoginAdmin));