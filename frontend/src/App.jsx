import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./Auth/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import Spinner from "./components/Spinner";
const Final_reports = React.lazy(() => import("./pages/audits/final_reports/Final_reports"));
const CreateChange = React.lazy(() => import("./pages/changes/CreateChange"));
const CreateControl = React.lazy(() => import("./pages/control/CreateControl"));
const Login = React.lazy(() => import("./Auth/Login"));
const RecoverCode = React.lazy(() => import("./Auth/Recovering/RecoverCode"));
const EnterEmail = React.lazy(() => import("./Auth/Recovering/EnterEmail"));
const RecoverPassword = React.lazy(() =>
  import("./Auth/Recovering/RecoverPassword")
);
const External = React.lazy(() => import("./pages/control/External"));
const CreateExternal = React.lazy(() =>
  import("./pages/control/CreateExternal")
);
const AuditLayout = React.lazy(() => import("./layout/AuditLayout"));
const Dashboard = React.lazy(() => import("./pages/audits/Dashboard"));

const AuditPrograms = React.lazy(() => import("./pages/audits/AuditPrograms"));
const Welcome = React.lazy(() => import("./Welcome"));
const Documents = React.lazy(() => import("./pages/Documents"));
const CreateDocument = React.lazy(() => import("./pages/CreateDocument"));
const ViewDocument = React.lazy(() => import("./pages/ViewDocument"));
const ViewChanges = React.lazy(() => import("./pages/changes/ViewChanges"));
const ViewControl = React.lazy(() => import("./pages/control/ViewControl"));
const AdminView = React.lazy(() => import("./pages/admin/AdminView"));
const Parameters = React.lazy(() => import("./pages/admin/Parameters"));
const Users = React.lazy(() => import("./pages/admin/Users"));
const AdminWelcome = React.lazy(() => import("./pages/admin/AdminWelcome"));
const EditUser = React.lazy(() => import("./pages/admin/EditUser"));
const Inspectors = React.lazy(() => import("./pages/audits/Inspectors"));
const CreateInspector = React.lazy(() =>
  import("./pages/audits/inspectors/CreateInspector")
);
const CreateProgram = React.lazy(() => import("./pages/audits/CreateProgram"));
const AuditPlans = React.lazy(() => import("./pages/audits/plans/AuditPlans"));
const CreateAuditPlan = React.lazy(() =>
  import("./pages/audits/plans/CreateAuditPlan")
);
const ViewInspector = React.lazy(() =>
  import("./pages/audits/inspectors/ViewInspector")
);
const ViewPrograms = React.lazy(() => import("./pages/audits/ViewPrograms"));
const ViewPlan = React.lazy(() => import("./pages/audits/plans/ViewPlan"));
const CreateProcess = React.lazy(() =>
  import("./pages/audits/process/CreateProcess")
);
const Process = React.lazy(() => import("./pages/audits/process/Process"));
const CreateCheckLists = React.lazy(() =>
  import("./pages/audits/checklists/CreateCheckLists")
);
const CheckLists = React.lazy(() =>
  import("./pages/audits/checklists/ViewCheckLists")
);
const ViewOneList = React.lazy(() =>
  import("./pages/audits/checklists/ViewOneList")
);
const CreateReport = React.lazy(() =>
  import("./pages/audits/reports/CreateReport")
);
const ViewOneReport = React.lazy(() =>
  import("./pages/audits/reports/ViewOneReport")
);
const Reports = React.lazy(() => import("./pages/audits/reports/Reports"));
const CreateFinalReport = React.lazy(() =>
  import("./pages/audits/final_reports/CreateFinalReport")
);
const Files = React.lazy(() => import("./pages/audits/files/files"));
const CreateFiles = React.lazy(() =>
  import("./pages/audits/files/CreateFiles")
);

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner/>}>
          
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
                <Route
                  path="/createControl"
                  element={<CreateControl />}
                ></Route>
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
                  />{" "}
                  <Route
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
                  <Route
                    path="/audits/viewReport/:id"
                    element={
                      <AuditLayout>
                        <ViewOneReport></ViewOneReport>
                      </AuditLayout>
                    }
                  />
                  <Route
                    path="/audits/findings/"
                    element={
                      <AuditLayout>
                        <Reports></Reports>
                      </AuditLayout>
                    }
                  />
                  {/* Reporte final */}
                  <Route
                    path="/audits/createFinal/:id"
                    element={
                      <AuditLayout>
                        <CreateFinalReport></CreateFinalReport>
                      </AuditLayout>
                    }
                  />
                    <Route
                    path="/audits/finalReports/"
                    element={
                      <AuditLayout>
                        <Final_reports/>
                      </AuditLayout>
                    }
                  />
                  {/* Archivos de consulta */}
                  <Route
                    path="/audits/files/"
                    element={
                      <AuditLayout>
                        <Files></Files>
                      </AuditLayout>
                    }
                  />
                  <Route
                    path="/audits/createFiles"
                    element={
                      <AuditLayout>
                        <CreateFiles></CreateFiles>
                      </AuditLayout>
                    }
                  />
                </Route>

                <Route path="/edit/:id" element={<CreateDocument />}></Route>
                <Route path="/changes" element={<ViewChanges />}></Route>
                <Route path="/control" element={<ViewControl />}></Route>
                <Route path="/external" element={<External />}></Route>
                <Route
                  path="/CreateExternal"
                  element={<CreateExternal />}
                ></Route>
                <Route
                  path="/CreateExternal/edit/:id"
                  element={<CreateExternal />}
                ></Route>
                {/* <Route path="*" element={<Not_Found />}></Route> */}
              </Routes>
        
          </Suspense>
          {/* <Header> */}

          {/* </Header> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
