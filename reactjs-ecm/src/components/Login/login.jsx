import React from "react";
// import "./style.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../services/auth-api";
import { Link, useNavigate } from "react-router-dom";
import { authLocal } from "../../util/authLocal";
const schema = z.object({
  email: z.string().email("email invalid"),
  password: z.string(),
});

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await loginApi(data);
      return response;
    },
    onSuccess: (response) => {
      console.log(response.success);
      if (response && response.success === true) {
        // authLocal.setToken(response.data.access_token);
        // localStorage.setItem("token", JSON.stringify(response?.access_token));
        // const role = response?.role;
        // if (role === "admin") {
        //   setTimeout(() => {
        //     navigate("/admin");
        //   }, 2000);
        // } else if (role === "customer") {
        //   setTimeout(() => {
        //     navigate("/home");
        //   }, 2000);
        // } else {
        //   setTimeout(() => {
        //     navigate("/shipper");
        //   }, 2000);
        // }
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <div className="flex items-center justify-center">
      <div className="mx-2 my-2 w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md">
        <div className="bg-gray-100 p-6">
          <p className="relative text-2xl font-medium">
            Login
            <span className="absolute bottom-0 left-0 h-0.5 w-8 bg-gradient-to-r from-[#f37a65] to-[#d64141]" />
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="flex flex-wrap justify-between gap-5">
            <div className="mb-3 w-full">
              <label htmlFor="email" className="mb-1 block font-medium">
                Email
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                className="duration-120 h-11 w-full rounded-md border-none bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-3 w-full">
              <label htmlFor="password" className="mb-1 block font-medium">
                Password
                <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className="duration-120 h-11 w-full rounded-md border-none bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
          </div>

          <div className="p-6">
            <input
              type="submit"
              value="Login"
              disabled={!isDirty}
              className="disabled:bg-aliceblue h-11 w-full cursor-pointer rounded-md border-none bg-gradient-to-r from-[#f37a65] to-[#d64141] text-base font-medium tracking-wide text-white shadow-md transition-all duration-300 ease-in-out hover:from-[#d64141] hover:to-[#f37a65]"
            />
          </div>
        </form>

        <Link to="/register" className="flex justify-center hover:font-bold">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
