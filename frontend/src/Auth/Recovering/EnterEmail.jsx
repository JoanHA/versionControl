import React, { useState } from "react";
import "../../assets/CSS/recovery.css";
import { useForm } from "react-hook-form";

// import { recoveryPassword } from "../../lib/sendOtp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function EnterEmail() {
  const navigate = useNavigate();
  const { setEmail, setOtp } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    setEmail(data.recipient_email);
    const otp = parseInt(Math.random() * (9999 - 1000) + 1000);
    setOtp(otp);
    const datos = {
      OTP: otp,
      recipient_email: data.recipient_email,
    };
    try {
      const res = await recoveryPassword(datos);
   
      if (res.status == 200) {
        setLoading(false);
        swal.fire("Tu codigo ha sido enviado", "", "success").then(() => {
          navigate("/otp");
        });
      }
    } catch (error) {
      setLoading(false);
      swal.fire("No pudimos enviar tu codigo intenta mas tarde", "", "error");
    }
  };
  return (
    <div className="w-100 h-100 d-flex justify-content-center">
      <div className="my-5 rounded emailForm">
        <div>
          {loading && <div>Estamos generando tu codigo...</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column align-items-center">
              <strong>
                <h2 style={{fontWeight:"bolder"}}>Olvidaste tu contraseña</h2>
              </strong>
              <p>Ingresa tu email para restablecerla</p>
            </div>
            <div>
              <input
                type="email"
                className="form-control"
                placeholder="Ingresa tu email"
                {...register("recipient_email", { required: true })}
              />
              {errors.recipient_email?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className="w-100">
              <button className="btn-success btn btn-lg mt-1 btn-block w-100">
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnterEmail;
