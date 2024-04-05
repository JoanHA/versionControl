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
import External from "./pages/control/External";
import CreateExternal from "./pages/control/CreateExternal";
import AuditLayout from "./layout/AuditLayout";
import Dashboard from "./pages/audits/Dashboard";
import AuditPrograms from "./pages/audits/AuditPrograms";
import Inspectors from "./pages/audits/Inspectors";
import CreateInspector from "./pages/audits/inspectors/CreateInspector";
import CreateProgram from "./pages/audits/CreateProgram";
import AuditPlans from "./pages/audits/plans/AuditPlans";
import CreateAuditPlan from "./pages/audits/plans/CreateAuditPlan";
import ViewInspector from "./pages/audits/inspectors/ViewInspector";
import ViewPrograms from "./pages/audits/ViewPrograms";
import ViewPlan from "./pages/audits/plans/ViewPlan";
import CreateProcess from "./pages/audits/process/CreateProcess";
import Process from "./pages/audits/process/Process";
import CreateCheckLists from "./pages/audits/checklists/CreateCheckLists";
import CheckLists from "./pages/audits/checklists/ViewCheckLists";
import ViewOneList from "./pages/audits/checklists/ViewOneList";
import CreateReport from "./pages/audits/reports/CreateReport";
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          {/* <Header> */}
          <Routes>
            {/* Rutas de login y recuperacion de contraseña */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<RecoverPassword />} />
            <Route path="/enterEmail" element={<EnterEmail />} />
            <Route path="/otp" element={<RecoverCode />} />
            <Route path="/docs" element={<Documents />}></Route>
            <Route path="/" element={<Welcome />}></Route>

            <Route path="/newDoc" element={<CreateDocument />}></Route>
            <Route path="document/:id" element={<ViewDocument />}></Route>
            {/*----- Changes----- */}
            <Route path="/createChange" element={<CreateChange />}></Route>
            <Route
              path="/createChange/:code"
              element={<CreateChange />}
            ></Route>
            <Route
              path="/createChange/edit/:id"
              element={<CreateChange />}
            ></Route>

            {/*----- endChanges----- */}

            {/* ---Control--- */}
            <Route path="/createControl" element={<CreateControl />}></Route>
            <Route
              path="/createControl/:code"
              element={<CreateControl />}
            ></Route>
            <Route
              path="/createControl/edit/:id"
              element={<CreateControl />}
            ></Route>
            {/* ---endControl--- */}

            {/* Rutas protegidas (SOLO INGRESA LOGUEADO)*/}
            <Route element={<ProtectedRoute />}>
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
              {/* Auditorias */}
              <Route
                path="/audits"
                element={
                  <AuditLayout>
                    <Dashboard />
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/programs"
                element={
                  <AuditLayout>
                    <AuditPrograms></AuditPrograms>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/programs/:id"
                element={
                  <AuditLayout>
                    <ViewPrograms></ViewPrograms>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/plans/view/:id"
                element={
                  <AuditLayout>
                    <ViewPlan></ViewPlan>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/programs/create"
                element={
                  <AuditLayout>
                    <CreateProgram></CreateProgram>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/inspectors"
                element={
                  <AuditLayout>
                    <Inspectors></Inspectors>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/inspector/:id"
                element={
                  <AuditLayout>
                    <ViewInspector></ViewInspector>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/edit/inspector/:id"
                element={
                  <AuditLayout>
                    <CreateInspector></CreateInspector>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/inspectors/create"
                element={
                  <AuditLayout>
                    <CreateInspector></CreateInspector>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/plans/create/:id"
                element={
                  <AuditLayout>
                    <CreateAuditPlan></CreateAuditPlan>
                  </AuditLayout>
                }
              ></Route>
              <Route
                path="/audits/plans"
                element={
                  <AuditLayout>
                    <AuditPlans></AuditPlans>
                  </AuditLayout>
                }
              ></Route>

              {/* Procesos de auditoria*/}
              <Route
                path="/audits/createProcess"
                element={
                  <AuditLayout>
                    <CreateProcess />
                  </AuditLayout>
                }
              />
              <Route
                path="/audits/createProcess/:id"
                element={
                  <AuditLayout>
                    <CreateProcess />
                  </AuditLayout>
                }
              />
              <Route
                path="/audits/process"
                element={
                  <AuditLayout>
                    <Process />
                  </AuditLayout>
                }
              />
              {/* End procesos de auditoria*/}
              <Route
                path="/audits/checklist/"
                element={
                  <AuditLayout>
                 <CheckLists></CheckLists>
                  </AuditLayout>
                }
              />  <Route
              path="/audits/checklist/:id"
              element={
                <AuditLayout>
                 <ViewOneList></ViewOneList>
                </AuditLayout>
              }
            />
              {/* Lista de chequeo */}
              <Route
                path="/audits/createcheck/:id"
                element={
                  <AuditLayout>
                 <CreateCheckLists></CreateCheckLists>
                  </AuditLayout>
                }
              />
              {/* Reportes */}
              <Route
              path="/audits/createReport/:id"
              element={
                <AuditLayout>
                 <CreateReport></CreateReport>
                </AuditLayout>
              }
            />
          
            </Route>

            <Route path="/edit/:id" element={<CreateDocument />}></Route>
            <Route path="/changes" element={<ViewChanges />}></Route>
            <Route path="/control" element={<ViewControl />}></Route>
            <Route path="/external" element={<External />}></Route>
            <Route path="/CreateExternal" element={<CreateExternal />}></Route>
            <Route
              path="/CreateExternal/edit/:id"
              element={<CreateExternal />}
            ></Route>
            {/* <Route path="*" element={<Not_Found />}></Route> */}
          </Routes>
          {/* </Header> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
