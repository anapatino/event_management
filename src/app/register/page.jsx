"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      role: "organizer",
    },
  });
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      if (data.email === "correo@existente.com") {
        setError("email", { message: "Este correo ya está en uso" });
        return;
      }
      alert("Registro exitoso");
      router.push("/login");
    } catch (error) {
      setServerError("Error en el servidor, inténtelo de nuevo");
    }
  };

  return (
    <AnimatePresence>
      <div className='flex items-center content-center h-screen w-full bg-[#0F102B]'>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='w-md h-auto mx-auto  bg-[#23243D] p-6 rounded-xl shadow-xl shadow-[#434458] text-white'
        >
          <h2 className='text-4xl font-bold text-center mb-4'>Registro</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label className='block font-medium'>Nombre:*</label>
              <div className='w-full flex flex-col items-end justify-start h-12 '>
                <input
                  {...register("name", { required: "requerido" })}
                  className='w-full px-2 py-[5px] rounded-lg mt-1 bg-[#434458] text-white focus:outline-none'
                  placeholder='Ingrese su nombre'
                />
                {errors.name && (
                  <p className='text-[#F2F2F2] text-[13px]'>
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className='block font-medium'>Correo Electrónico:*</label>
              <div className='w-full flex flex-col items-end justify-start h-12 '>
                <input
                  type='email'
                  {...register("email", { required: "requerido" })}
                  className='w-full px-2 py-[5px] rounded-lg mt-1 bg-[#434458] text-white focus:outline-none'
                  placeholder='correo@ejemplo.com'
                />
                {errors.email && (
                  <p className='text-[#F2F2F2] text-[13px]'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className='block font-medium'>Contraseña:*</label>
              <div className='w-full flex flex-col items-end justify-start h-12 '>
                <input
                  type='password'
                  {...register("password", {
                    required: "requerido",
                    minLength: {
                      value: 8,
                      message: "Minimo 8 caracteres",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                      message: "mínimo 8 caracteres, una letra y un número",
                    },
                  })}
                  className='w-full px-2 py-[5px] rounded-lg mt-1 bg-[#434458] text-white focus:outline-none'
                  placeholder='********'
                />
                {errors.password && (
                  <p className='text-[#F2F2F2] text-[13px]'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className='block font-medium'>
                Confirmar Contraseña:*
              </label>
              <div className='w-full flex flex-col items-end justify-start h-12 '>
                <input
                  type='password'
                  {...register("confirmPassword", {
                    required: "requerido",
                    minLength: {
                      value: 8,
                      message: "Minimo 8 caracteres",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                      message: "mínimo 8 caracteres, una letra y un número",
                    },
                    validate: (value) =>
                      value === watch("password") ||
                      "Las contraseñas no coinciden",
                  })}
                  className='w-full px-2 py-[5px] rounded-lg mt-1 bg-[#434458] text-white focus:outline-none'
                  placeholder='********'
                />
                {errors.confirmPassword && (
                  <p className='text-[#F2F2F2] text-[13px]'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className='block font-medium'>Rol:*</label>
              <div className='flex gap-4'>
                <label className='flex items-center gap-2'>
                  <input type='radio' value='organizer' {...register("role")} />{" "}
                  Organizador
                </label>
                <label className='flex items-center gap-2'>
                  <input type='radio' value='attendee' {...register("role")} />{" "}
                  Asistente
                </label>
              </div>
              {errors.role && (
                <p className='text-[#F2F2F2] text-[12px]'>
                  {errors.role.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              disabled={!isValid}
              className='w-full bg-white  font-extrabold text-[#23243D] p-2 rounded-lg mt-2 disabled:bg-gray-500 hover:bg-[#55B3C3] hover:text-white transition-all hover:scale-105 cursor-pointer'
            >
              Registrar
            </button>
            {serverError && (
              <p className='text-red-700 text-[13px] p-1'>{serverError}</p>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
