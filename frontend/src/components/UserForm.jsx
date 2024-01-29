import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { getUser, updateUser } from "../api/users";
import ChangePassword from "./ChangePassword";
function UserForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const [data, setData] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const getUserData = async () => {
    const id = params.id;
    try {
      const res = await getUser(id);
      const datos = res.data[0];
      setData(datos);
      reset({
        username: datos.username,
        email: datos.email,
        status: datos.status,
      });
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
  };

  const createUser = async (values) => {
    try {
      const res = await signup(values);
      console.log(res);
      console.log("Se enviaron los datos");
      if (res.status === 200) {
        swal
          .fire("Usuario registrado correctamente", "", "success")
          .then(() => {
            navigate("/admin/users");
          });
      }
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
  };
  const updateUsers = async (values) => {
    try {
      const res = await updateUser(values);
      console.log(res.data);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/admin/users");
        });
      }
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  const onSubmit = async (values) => {
    if (params.id) {
      Swal.fire({
        title: "Estas seguro de esto?",
        text: "No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, guardar!",
      }).then((result) => {
        if (result.isConfirmed) {
          return updateUsers(values);
        }
      });
    }
    Swal.fire({
      title: "Estas seguro de esto?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, guardar!",
    }).then((result) => {
      if (result.isConfirmed) {
        createUser(values);
      }
    });
 
  };
  const changeEye = () => {
    document.getElementById("eye-outline").classList.toggle("inactive");
    document.getElementById("eye-line").classList.toggle("inactive");
    document.getElementById("input-pass").type =
      document.getElementById("input-pass").type == "text"
        ? "password"
        : "text";
  };

  useEffect(() => {
    if (params.id) {
      getUserData();
    }
  }, [params.id]);
  return (
    <div>
      <div className="py-2">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-50 mx-auto my-auto">
              <div className="form-group">
                <h3>
                  <strong>{params.id ? "Editar" : "Registrar"} usuario</strong>
                </h3>
                {params.id ? (
                  <>
                    <Link
                      onClick={() => {
                        document
                          .querySelector("#changePassId")
                          .classList.remove("d-none");
                      }}
                      className="my-1 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover "
                    >
                      Cambiar contraseña
                    </Link>
                    <br />
                  </>
                ) : (
                  ""
                )}

                <label className="mt-2">Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario..."
                  disabled={params.id ? true : false}
                  {...register("username", { required: true, maxLength: 8 })}
                />
                {errors.username?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
                {errors.username?.type === "maxLength" && (
                  <p className="errorMsg">
                    Este solo puede tener maximo 8 carácteres
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="email@bioart.com.co"
                  {...register("email", { required: true })}
                />{" "}
                {errors.email?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
              </div>
              {params.id ? (
                ""
              ) : (
                <div className="form-group">
                  <label htmlFor="">Contraseña</label>
                  <div className="d-flex flex-row">
                    <input
                      id="input-pass"
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                      })}
                      className="form-control form-control-sm  "
                      placeholder="Contraseña..."
                    />

                    <span
                      className="input-group-text fa fa-eye-slash medium-rounded-right"
                      id="basic-addon1"
                    >
                      <a onClick={changeEye} id="eye-line">
                        <AiFillEyeInvisible size={"2rem"} className="eye" />
                      </a>

                      <a
                        onClick={changeEye}
                        className="inactive"
                        id="eye-outline"
                      >
                        <AiOutlineEye size={"2rem"} className="eye" />
                      </a>
                    </span>
                  </div>
                  {errors.password?.type == "pattern" && (
                    <p className="errorMsg">
                      La contraseña debe tener Mayúsculas, Minúsculas, Números y
                      carácteres especiales
                    </p>
                  )}
                  {errors.password?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}

                  {errors.password?.type == "minLength" && (
                    <p className="errorMsg mb-0">
                      La contraseña debe de tener minimo 8 carácteres
                    </p>
                  )}
                </div>
              )}
              <div className="form-group">
                <label>Estado</label>
                <select className="form-select" {...register("status")}>
                  <option value="1">Activo</option>
                  <option value="2">Inactivo</option>
                </select>
              </div>
              <div className="d-flex flex-wrap  align-items-center gap-2">
                <button className="btn btn-success my-2">
                  {params.id ? "Editar" : "Guardar"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    history.back();
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
