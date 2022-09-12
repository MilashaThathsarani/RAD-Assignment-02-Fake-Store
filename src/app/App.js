import {Route, Routes} from "react-router-dom";
import Product from "../pages/Product";
import LoginAdmin from "../pages/session/Login";
import Dashboard from "../pages/Dashboard";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import NavBar from "../component/common/NavBar";
import localStorageService from "../service/localStorageService";

function App() {
    return (<>
            <header style={{display:localStorageService.getItem("user")?"block":"none"}}>
                <NavBar/>
            </header>
            <main>
                <Routes>
                    <Route exact path="/" element={<LoginAdmin/>}/>

                    {/*<Route exact path="/" element={<LoginAdmin/>}/>*/}
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </main>
        </>

    );
}

export default App;