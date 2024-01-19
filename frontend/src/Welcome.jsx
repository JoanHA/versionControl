import React from "react";
import image from "../src/assets/IMG/ImgWelcome.jpg";
import { Link } from "react-router-dom";
import "./assets/CSS/Welcome.css";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";

function Welcome() {
  //Size of icons
  const size = 30;
  const arrowSize = 25;
  return (
    <div>
      <div className="titleHeader w-100 text-center p-2">
        Bienvenido al sistemas de control de archivos
      </div>
      <div className="d-flex flex-row justify-content-evenly flex-wrap align-items-center">
        <div className="linksContainer mt-5">
          <div className="linkItem bg-light py-2 px-4 mb-4">
            <IoFileTrayFullOutline size={size} />
            <Link className="link" to={"/"}>Maestro de documentos</Link>
            <FaArrowRight className="arrow" size={arrowSize} />
          </div>
          <div className="linkItem  bg-light py-2 px-4 mb-4">
            <MdOutlinePublishedWithChanges size={size} />
            <Link className="link">Control de cambios</Link>
            <FaArrowRight className="arrow" size={arrowSize} />
          </div>
          <div className="linkItem  bg-light py-2 px-4">
            <VscFileSubmodule size={size} />
            <Link className="link">Retención documental</Link>
            <FaArrowRight className="arrow" size={arrowSize} />
          </div>
        </div>
        <div>
          <img src={image} alt="Imagen de bienvenida" width={400} />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
