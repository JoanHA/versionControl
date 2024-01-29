import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { getUsers } from "../../api/users";
import { formatTimeStamp } from "../../lib/helper";
import { useAuth } from "../../context/AuthContext";
function Users() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const columns = [
    {
      header: "Usuario",
      accessorKey: "username",
    },
    {
      header: "Correo",
      accessorKey: "email",
    },
    {
      header: "Estado",
      accessorKey: "statusName",
    },
    {
      header: "Creacion",
      accessorKey: "created_at",
    },
  ];
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUsers();
        const datos = res.data.map((e) => {
          e.created_at = formatTimeStamp(e.created_at);
          return e;
        });

        const filterData = datos.filter((e)=>e.id !== user.id)
        setData(filterData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div >
      <div className="titleHeader">Administración de usuarios</div>
      <div className="py-2 px-3">
        <div className="table-responsive">
          <Link to={"/admin/newUser"} className="btn btn-primary">
            Nuevo usuario
          </Link>

          <Table
            columns={columns}
            data={data}
            options={false}
            editType={"editUser"}
          ></Table>
        </div>
      </div>
    </div>
  );
}

export default Users;
