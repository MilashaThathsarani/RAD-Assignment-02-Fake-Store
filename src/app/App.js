import {Route, Routes} from "react-router-dom";
import LoginAdmin from "../pages/session/Login";
import localStorageService from "../service/localStorageService";
import NavBar from "../component/common/NavBar";
import React from "react";

function App() {
  return (<>
        <header style={{display:localStorageService.getItem("user")?"block":"none"}}>
          <NavBar/>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<LoginAdmin/>}/>

          </Routes>
        </main>
      </>

  );
}

export default App;
