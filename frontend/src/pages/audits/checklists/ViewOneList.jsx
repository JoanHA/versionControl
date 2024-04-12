import React, { useEffect, useState } from "react";
import { getOneList } from "../../../api/AuditAPI/checklistAPI";
import { useParams } from "react-router-dom";
import DownloadCheckList from "../../../components/auditsComponents/DownloadCheckList";
import EditCheckList from "../../../components/auditsComponents/EditCheckList";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
function ViewOneList() {
  const [checkList, setCheckList] = useState([]);
  const [fields, setFields] = useState([]);
  const params = useParams();
  const getData = async () => {
    try {
      const res = await getOneList(params.id);
      setCheckList(res.data.checklist[0]); 
      setFields(res.data.fields);

    } catch (error) {
      swal.fire("Tuvimos un error, intenta mas tarde","","error")
    }
  };
  useEffect(() => {
    getData();
 
  }, []);

  return (
    <div className="px-3"> 
      <div className="titleHeader">Lista de chequeo</div>
      <div>
      <div className="px-3">
        <Link
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </Link>
      </div>
        <div className="d-flex justify-content-evenly">
          <div>
            <div>
              <label htmlFor="">
                <strong>Fecha</strong>
              </label>
            </div>
            <div>
              <p className="m-0">{checkList?.date} </p>
            </div>
          </div>
          <div>
          <div>
              <label htmlFor="">
                <strong>Auditor</strong>
              </label>
            </div>
            <div>
              <p className="m-0">{checkList?.leader} </p>
            </div>
          </div>
          <div>
          <div>
              <label htmlFor="">
                <strong>Proceso</strong>
              </label>
            </div>
            <div>
              <p className="m-0">{checkList?.process_name} </p>
            </div>
          </div>
          <div>
          <div>
              <label htmlFor="">
                <strong>Estado</strong>
              </label>
            </div>
            <div>
              <p className="m-0">{checkList?.status_name} </p>
            </div>
          </div>
          
        </div>
        <hr />  

        {
            checkList?.status === 5 ? (
                <DownloadCheckList/>
            ):(
                <EditCheckList/>
            )
        }
      </div>
    </div>
  );
}

export default ViewOneList;
