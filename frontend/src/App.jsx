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
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Documents />}></Route>
            <Route path="/newDoc" element={<CreateDocument />}></Route>
            <Route path="document/:id" element={<ViewDocument />}></Route>
            <Route path="/welcome" element={<Welcome />}></Route>
            <Route path="/createChange" element={<CreateChange />}></Route>
            <Route path="/createChange/:code" element={<CreateChange />}></Route>
            <Route path="/createControl" element={<CreateControl />}></Route>
          </Routes>
        </Header>
      </BrowserRouter>
    </div>
  );
}

export default App;
