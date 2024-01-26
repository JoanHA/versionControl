import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {AiFillEyeInvisible,AiOutlineEye} from "react-icons/ai"
import {useAuth} from"../context/AuthContext"
function UserForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const [data, setData] = useState({});
  const {SignUp}= useAuth()
  const getUserData = async () => {};

  const createUser = async (values) => {
console.log(values)

  };
  const updateUser = async (values) => {};
  const onSubmit = async (values) => {
      if (params.id) {
        return updateUser(values)
      }
      createUser(values)
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
    //Esconder el sidebar
    document.getElementById("sidebar").style.display = "none";
  }, []);
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
                    <Link className="my-1 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ">
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
                  {...register("name",{required:true,maxLength:8})}
                />
                {
                    errors.name?.type==="required" && (<p className="errorMsg">
                            Este campo es obligatorio
                    </p>)
                }
                  {
                    errors.name?.type==="maxLength" && (<p className="errorMsg">
                            Este solo puede tener maximo 8 carácteres
                    </p>)
                }
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="email@bioart.com.co"
                  {...register("email",{required:true})}
                /> {
                    errors.email?.type==="required" && (<p className="errorMsg">
                            Este campo es obligatorio
                    </p>)
                }
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
                    {...register("password", { required: true, minLength: 8 ,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/ })}
                    className="form-control form-control-sm  "
                    placeholder="Contraseña..."
                  />
                   
                  <span
                    className="input-group-text fa fa-eye-slash medium-rounded-right"
                    id="basic-addon1"
                  >
                    <a  onClick={changeEye} id="eye-line">
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
                {
                      errors.password?.type=="pattern" && (
                        <p className="errorMsg">La contraseña debe tener Mayúsculas, Minúsculas, Números y carácteres especiales</p>
                      )
                    }
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
                <button className="btn btn-success my-2">{params.id ?"Editar":"Guardar"}</button>
                <button
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
