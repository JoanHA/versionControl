import React from "react";
import Header from "./layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Documents from "./pages/Documents";
import CreateDocument from "./pages/CreateDocument";
import ViewDocument from "./pages/ViewDocument";
import CreateChange from "./pages/changes/CreateChange";
import "./App.css"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Documents></Documents>}></Route>
            <Route path="/newDoc" element={<CreateDocument></CreateDocument>}></Route>
            <Route path="document/:id" element={<ViewDocument/>}></Route>
            <Route path="/welcome" element={<Welcome/>}></Route>
            <Route path="/createChange" element={<CreateChange/>}></Route>

          </Routes>
        </Header>
      </BrowserRouter>
    </div>
  );
}

export default App;
