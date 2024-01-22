import React from "react";
import Header from "./layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Documents from "./pages/Documents";
import CreateDocument from "./pages/CreateDocument";
import ViewDocument from "./pages/ViewDocument";
import CreateChange from "./pages/changes/CreateChange";
import CreateControl from "./pages/changes/CreateControl";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import Login from "./Auth/Login";
import RecoverCode from "./Auth/Recovering/RecoverCode";
import EnterEmail from "./Auth/Recovering/EnterEmail"
import RecoverPassword from "./Auth/Recovering/RecoverPassword"
import Not_Found from "./components/Not_Found";
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header>
            <Routes>
              <Route path="*" element={<Not_Found></Not_Found>}></Route>
              {/* Rutas de login y recuperacion de contraseña */}
                <Route path="/login" element={<Login />} />
                <Route path="/reset" element={<RecoverPassword />} />
                <Route path="/enterEmail" element={<EnterEmail />} />
                <Route path="/otp" element={<RecoverCode />} />


              <Route path="/" element={<Documents />}></Route>
              <Route path="/welcome" element={<Welcome />}></Route>
              <Route path="/newDoc" element={<CreateDocument />}></Route>
              <Route path="document/:id" element={<ViewDocument />}></Route>
              <Route path="/createChange" element={<CreateChange />}></Route>
              <Route path="/createControl" element={<CreateControl />}></Route>
              <Route path="/createControl/:code" element={<CreateControl />}></Route>
              <Route path="/edit/:id" element={<CreateDocument />}></Route>
            </Routes>
          </Header>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
