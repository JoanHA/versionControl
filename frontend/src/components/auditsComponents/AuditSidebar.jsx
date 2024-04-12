import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosPeople } from "react-icons/io";
import { AiFillSchedule } from "react-icons/ai";
import { GrPlan } from "react-icons/gr";
import { VscChecklist, VscServerProcess } from "react-icons/vsc";
import { GoReport } from "react-icons/go";
import { FaFileSignature } from "react-icons/fa6";
import { RiListCheck2 } from "react-icons/ri";
import { FaChartLine, FaHome } from "react-icons/fa";
import { MdRule } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaSitemap } from "react-icons/fa";

import { TbProgress } from "react-icons/tb";

const size = 25;
function AuditSidebar() {
  const [plans, setPlans] = useState(false);
  const [reports, setReports] = useState(false);
  const path = useLocation();

  return (
    <div
      className={
        path.pathname.substring(0, 18) === "/audits/plans/view" ? "d-none" : ""
      }
      id="audit-side"
    >
      <div id="audit-side-container ">
        <ul className="p-0">
          <Link className="text-light" to={"/audits"}>
            <li className="nav-link flex flex-column ">
              <div className="d-flex flex-row w-100">
                {" "}
                <div className="audit-link row m-0 flex-shrink-1 flex-grow-1 ">
                  <div className="col-1">
                    <FaHome size={size} />
                  </div>
                  <div className="col-8">HOME</div>
                  <div className="col-1">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </li>
          </Link>
          <Link className="text-light" to={"/audits/inspectors"}>
            <li className="nav-link flex flex-column">
              <div className=" d-flex flex-row w-100 ">
                <div className="audit-link row m-0  m-0 col-9 flex-shrink-1 flex-grow-1">
                  <div className="col-1">
                    <IoIosPeople size={size} />
                  </div>
                  <div className="col-8">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      Auditores
                    </div>
                  </div>
                  <div className="col-1">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </li>
          </Link>
          <Link className="text-light" to={"/audits/programs"}>
            {" "}
            <li className="nav-link flex flex-column ">
              <div className="d-flex flex-row w-100">
                {" "}
                <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                  <div className="col-1">
                    <AiFillSchedule size={size} />
                  </div>
                  <div className="col-8">Programas</div>
                  <div className="col-1">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </li>
          </Link>
          <div className="text-light">
            <li className="nav-link flex flex-column ">
              <div className="d-flex flex-row w-100">
                {" "}
                <Link
                  className="audit-link row m-0 flex-shrink-1 flex-grow-1 text-light "
                  to={"/audits/plans"}
                >
                  <div className="col-1">
                    <GrPlan size={size} />
                  </div>
                  <div className="col-8">Planes</div>
                </Link>
                <div
                  className="flex-shrink col-2 dropInspector"
                  id=""
                  onClick={() => {
                    var au = plans ? false : true;
                    setPlans(au);
                  }}
                >
                  {plans ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </div>
              {plans && (
                <>
                  <div className="px-3" id="audit-box">
                    <Link className="" to={"/audits/checklist/"}>
                      <div className="text-dark">Listas de chequeo</div>
                    </Link>
                  </div>
                  {/* <div className="px-3" id="audit-box">
                    <div className="">
                      <Link className="text-dark">Momentos de reunión</Link>
                    </div>
                  </div> */}
                </>
              )}
            </li>
          </div>
     
          <Link className="text-light"   to={"/audits/findings"}>
            <li className="nav-link flex flex-column ">
              <div className="d-flex flex-row w-100">
                {" "}
                <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                  <div className="col-1">
                  <GoReport size={size} />
                  </div>
                  <div className="col-8">Reporte Hallazgos</div>
                  <div className="col-1">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </li>
          </Link>

          <Link className="text-light" to={"/audits/finalReports/"}>
            <li className="nav-link flex flex-column ">
              <div className="d-flex flex-row w-100">
                {" "}
                <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                  <div className="col-1">
                    <FaFileSignature size={size} />
                  </div>
                  <div className="col-8">Informes finales</div>
                  <div className="col-1">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </li>
          </Link>
          <Link className="nav-link flex flex-column " to={"/audits/files"}>
            <div className="d-flex flex-row w-100">
              <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                <div className="col-1">
                  <RiListCheck2 size={size} />
                </div>
                <div className="col-8">Archivos de consulta</div>
                <div className="col-1">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </Link>

          {/* <li className="nav-link flex flex-column ">
            <div className="d-flex flex-row w-100">
              {" "}
              <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                <div className="col-1">
                  <FaChartLine size={size} />
                </div>
                <div className="col-8">
                  <Link className="text-light" to={"/audits/programs"}>
                    Evaluaciones de desempeño
                  </Link>
                </div>
                <div className="col-1">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </li> */}
          {/* <li className="nav-link flex flex-column ">
            <div className="d-flex flex-row w-100">
              {" "}
              <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                <div className="col-1">
                  <MdRule size={size} />
                </div>
                <div className="col-8">
                  <Link className="text-light" to={"/audits/programs"}>
                    Requisitos
                  </Link>
                </div>
                <div className="col-1">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </li> */}
          {/* <li className="nav-link flex flex-column ">
            <div className="d-flex flex-row w-100">
              {" "}
              <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                <div className="col-1">
                  <VscServerProcess size={size} />
                </div>
                <div className="col-8">
                  <Link className="text-light" to={"/audits/programs"}>
                    Caracterizaciónes
                  </Link>
                </div>
                <div className="col-1">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </li> */}
          {/* <li className="nav-link flex flex-column ">
            <div className="d-flex flex-row w-100">
              {" "}
              <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                <div className="col-1">
                  <TbProgress fill="#fff" size={size} />
                </div>
                <div className="col-8">
                  <Link className="text-light" to={"/audits/programs"}>
                    Auditoria en proceso
                  </Link>
                </div>
                <div className="col-1">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </li> */}
          <Link className="nav-link flex flex-column " to={"/audits/process"}>
            <div className="d-flex flex-row w-100">
              <div className="audit-link row m-0 flex-shrink-1 flex-grow-1  ">
                <div className="col-1">
                  <FaSitemap size={size} />
                </div>
                <div className="col-8">
                  <Link className="text-light">Procesos</Link>
                </div>
                <div className="col-1">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default AuditSidebar;
