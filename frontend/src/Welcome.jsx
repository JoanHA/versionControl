import React from "react";
import image from "../src/assets/IMG/ImgWelcome.jpg";
import { Link } from "react-router-dom";
import "./assets/CSS/Welcome.css";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";

import { AiOutlineAudit } from "react-icons/ai";
function Welcome() {
  //Size of icons
  const size = 30;
  const arrowSize = 25;
  return (
    <div>
      <div className="titleHeader w-100 text-center p-2 text-uppercase">
        Bienvenid@ al sistema de gestión de calidad
      </div>
      <div className="d-flex flex-row justify-content-evenly flex-wrap align-items-center">
        <div className="linksContainer " style={{ marginTop: "120px" }}>
          <Link to={"/docs"}>
            <div className="linkItem bg-light py-3 px-4 mb-4">
              <IoFileTrayFullOutline size={size} />
              <li className="link">Modúlo documental</li>
              <FaArrowRight className="arrow" size={arrowSize} />
            </div>
          </Link>

          <Link to={"/audits"}>
            <div className="linkItem  bg-light py-3 px-4 mb-4">
              <AiOutlineAudit size={size} />
              <li className="link">Modúlo auditorias</li>
              <FaArrowRight className="arrow" size={arrowSize} />
            </div>
          </Link>
          {/* <Link  to={"/control"} >
          <div className="linkItem  bg-light py-2 px-4">
            <VscFileSubmodule size={size} />
            <li className="link">
              Retención documental
            </li>
            <FaArrowRight className="arrow" size={arrowSize} />
          </div>
        </Link> */}
        </div>
        <div>
          <img src={image} alt="Imagen de bienvenida" width={400} />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
