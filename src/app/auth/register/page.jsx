"use client";
import {useForm} from "react-hook-form";

function RegisterPage() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = handleSubmit(async  (data) => {

        if (data.password !== data.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(
                {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
            ),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const resJSON = await res.json();
        console.log(resJSON);
    });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">
            Register
        </h1>
        <label htmlFor="username" className="text-slate-500 mb-2 text-sm">
            Usuario
        </label>
        <input type="text"
            {...register("username", {
                required: {
                    value: true,
                    message: "El campo es requerido"
                }
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            placeholder="Usuario"
        />
          {
                errors.username && (
                    <span className="text-red-500 text-sm">{errors.username.message}</span>
              )
          }
        <label htmlFor="email" className="text-slate-500 mb-2 text-sm">
            Email
        </label>
        <input type="email"
            {...register("email", {
                required: {
                    value: true,
                    message: "El campo es requerido"
                }
            })}
           className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
           placeholder={"user@email.com"}
        />
        {
            errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
            )
        }

        <label htmlFor="password" className="text-slate-500 mb-2 text-sm">
            Contraseña
        </label>
        <input type="password"
            {...register("password", {
                required: {
                    value: true,
                    message: "El campo es requerido"
                }
            })}
           className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
           placeholder={"********"}
        />
        {
            errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
            )
        }

        <label htmlFor="confirmPassword" className="text-slate-500 mb-2 text-sm">
            Confirmar Contraseña
        </label>
        <input type="Password"
            {...register("confirmPassword", {
                required: {
                    value: true,
                    message: "El campo es requerido"
                }
            })}
           className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
           placeholder={"********"}
        />
        {
            errors.confirmPassword && (
                <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
            )
        }
        <button
        className="w-full bg-blue-500 text-white p-3 rounded-lg">
            Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;