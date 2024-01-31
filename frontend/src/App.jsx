import React from "react";
import Header from "./layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Documents from "./pages/Documents";
import CreateDocument from "./pages/CreateDocument";
import ViewDocument from "./pages/ViewDocument";
import CreateChange from "./pages/changes/CreateChange";
import CreateControl from "./pages/control/CreateControl";
import "./App.css";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Login from "./Auth/Login";
import RecoverCode from "./Auth/Recovering/RecoverCode";
import EnterEmail from "./Auth/Recovering/EnterEmail";
import RecoverPassword from "./Auth/Recovering/RecoverPassword";
import Not_Found from "./components/Not_Found";
import ViewChanges from "./pages/changes/ViewChanges";
import ViewControl from "./pages/control/ViewControl";
import AdminView from "./pages/admin/AdminView";
import Parameters from "./pages/admin/Parameters";
import Users from "./pages/admin/Users";
import AdminWelcome from "./pages/admin/AdminWelcome";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import EditUser from "./pages/admin/EditUser";
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header>
            <Routes>
              {/* Rutas de login y recuperacion de contraseña */}
              <Route path="/login" element={<Login />} />
              <Route path="/reset" element={<RecoverPassword />} />
              <Route path="/enterEmail" element={<EnterEmail />} />
              <Route path="/otp" element={<RecoverCode />} />
              <Route path="/" element={<Documents />}></Route>
              <Route path="/newDoc" element={<CreateDocument />}></Route>
              <Route path="document/:id" element={<ViewDocument />}></Route>
              <Route path="/createChange" element={<CreateChange />}></Route>
              <Route path="/createControl" element={<CreateControl />}></Route>
              <Route
                path="/createControl/:code"
                element={<CreateControl />}
              ></Route>
              {/* Rutas protegidas (SOlO INGRESA LOGUEADO)*/}
              <Route element={<ProtectedRoute />}>
                <Route path="/welcome" element={<Welcome />}></Route>

                <Route
                  path="/admin"
                  element={
                    <AdminView>
                      <AdminWelcome></AdminWelcome>
                    </AdminView>
                  }
                ></Route>
                <Route
                  path="/admin/users"
                  element={
                    <AdminView>
                      <Users></Users>
                    </AdminView>
                  }
                ></Route>
                <Route
                  path="/admin/parameters"
                  element={
                    <AdminView>
                      <Parameters></Parameters>
                    </AdminView>
                  }
                ></Route>
                <Route
                  path="/admin/newUser"
                  element={
                    <AdminView>
                      <EditUser />
                    </AdminView>
                  }
                ></Route>
                <Route
                  path="/editUser/:id"
                  element={
                    <AdminView>
                      <EditUser />
                    </AdminView>
                  }
                ></Route>
              </Route>

              <Route path="/edit/:id" element={<CreateDocument />}></Route>
              <Route path="/changes" element={<ViewChanges />}></Route>
              <Route path="/control" element={<ViewControl />}></Route>
              <Route path="*" element={<Not_Found />}></Route>
            </Routes>
          </Header>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
