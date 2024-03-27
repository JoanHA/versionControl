import React, { useEffect } from "react";
import "../../assets/CSS/admin.css";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/IMG/grupo-carval-Logo-Bioart.png";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsersCog,
  FaPowerOff,
  FaArrowRight,
  FaRegUserCircle,
  FaList,
} from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";

import { IoIosSettings } from "react-icons/io";
import ChangePassword from "../../components/ChangePassword";
function AdminView({ children }) {
  const { user, logOut } = useAuth();
  const size = 30;
  return (
    <>
      <ChangePassword />
      <div className="d-flex flex-row  w-100 h-100vh">
        <div id="adminSidebarContainer">
          <div className="AdminSidebar">
            <div className="d-flex flex-column  top-0" style={{ height: "100%" }}>
              <div className="d-flex flex-column admin-info flex-fill ">
                <div className="admin-box ">
                  <li>{user ? user.username.toUpperCase() : "ADMIN"}</li>
                  <Link to={`/editUser/${user?.id}`}>
                    <AiTwotoneEdit size={35} />
                  </Link>
                </div>
                <Link to={"/admin"}>
                  <div className="side-links">
                    <FaHome size={size} />
                    <li style={{ color: "white" }}>HOME</li>
                    <FaArrowRight className="arrow" />
                  </div>
                </Link>
                <Link to={"/admin/users"}>
                  <div className="side-links">
                    <FaUsersCog size={size} />
                    <li>USUARIOS</li>
                    <FaArrowRight className="arrow" />
                  </div>
                </Link>
                <Link to={"/admin/parameters"}>
                  <div className="side-links">
                    <IoIosSettings size={size} />
                    <li>PARAMETROS</li>
                    <FaArrowRight className="arrow" />
                  </div>
                </Link>

                <Link className="mx-1" to={"/docs"}>
                  <div className="side-links">
                    <FaList size={25} />
                    <li>VOLVER</li>
                    <FaArrowRight className="arrow" />
                  </div>
                </Link>
              </div>
              <div className="d-flex close-sesion mt-auto ">
                <FaPowerOff size={size} />
                <li>
                  <button onClick={logOut}>CERRAR SESIÓN</button>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-fill" id="secondChild" style={{overflowX:"hidden"}}>
          <div className="">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AdminView;
