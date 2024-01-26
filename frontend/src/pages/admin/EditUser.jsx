import React from "react";
import UserForm from "../../components/UserForm";
import { useParams } from "react-router-dom";
function EditUser() {
  const params = useParams();
  return (
    <div>
      <div className="titleHeader">
        <strong> {params.id ? "Editar" : "Registrar"} usuario</strong>
      </div>

      <UserForm></UserForm>
    </div>
  );
}

export default EditUser;
