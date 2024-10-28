import React, { useState } from "react";
// import "./style.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { REGEX } from "../../constants/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiClient } from "../../services/custom-auth-api";
const schema = z
  .object({
    firstName: z
      .string()
      .min(2, "firstName min = 2")
      .max(50, "firstName max = 50"),
    lastName: z
      .string()
      .min(2, "lastName min = 2")
      .max(50, "lastName max = 50"),
    email: z.string().email("email invalid"),
    phone: z.string().regex(REGEX.phoneNumber, "phone invalid"),
    password: z.string(),
    confirmPass: z.string(),
    address: z.string().min(2, "address min = 2").max(50, "address max = 50"),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  });

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPass: "",
      address: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.post("/register", data);
      return response.data;
    },
    onSuccess: (response) => {
      // console.log("Email registered:", response);
      if (response && response.success === false) {
        alert("Vui lòng kiểm tra Email nhận OTP");
        navigate("/otp", { state: { email: email } });
      }
    },
    onError: (error) => {
      console.error("Error:", error.response ? error.response.data : error);
    },
  });

  const [email, setEmail] = useState("");

  const onSubmit = (data) => {
    const { confirmPass, ...registerData } = data; // Loại bỏ confirmPass
    setEmail(registerData.email);
    mutate(registerData);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-2 my-2 w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md">
        <div className="bg-gray-100 p-6">
          <p className="relative text-2xl font-medium">
            Registration
            <span className="absolute bottom-0 left-0 h-0.5 w-8 bg-gradient-to-r from-[#f37a65] to-[#d64141]" />
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="flex flex-wrap justify-between gap-5">
            <div className="mb-3 w-full md:w-[calc(50%-20px)]">
              <label htmlFor="firstName" className="mb-1 block font-medium">
                First Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your firstName"
                {...register("firstName")}
                className="duration-120 h-11 w-full rounded-md border-none bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </div>
            <div className="mb-3 w-full md:w-[calc(50%-20px)]">
              <label htmlFor="lastName" className="mb-1 block font-medium">
                Last Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your lastName"
                {...register("lastName")}
                className="duration-120 h-11 w-full rounded-md border-none bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </div>
            <div className="mb-3 w-full md:w-[calc(50%-20px)]">
              <label htmlFor="email" className="mb-1 block font-medium">
                Email
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                className="duration-120 h-11 w-full rounded-md border-none bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="mb-3 w-full md:w-[calc(50%-20px)]">
              <label htmlFor="phone" className="mb-1 block font-medium">
                Phone Number
                <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                placeholder="Enter your number"
                {...register("phone")}
                className="duration-120 h-11 w-full rounded-md border-none bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>
            <div className="mb-3 w-full md:w-[calc(50%-20px)]">
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
            <div className="mb-3 w-full md:w-[calc(50%-20px)]">
              <label htmlFor="address" className="mb-1 block font-medium">
                Address
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                {...register("address")}
                className="duration-120 h-11 w-full rounded-md border-none bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
              />
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}
            </div>
            <div className="mb-3 w-full md:w-[calc(50%-20px)]">
              <label htmlFor="confirmPass" className="mb-1 block font-medium">
                Confirm Password
                <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPass"
                placeholder="Confirm your password"
                {...register("confirmPass")}
                className="duration-120 h-11 w-full rounded-md border-none bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
              />
              {errors.confirmPass && (
                <span className="text-red-500">
                  {errors.confirmPass.message}
                </span>
              )}
            </div>
          </div>
          <div className="p-6">
            <input
              type="submit"
              value="Register"
              disabled={!isDirty}
              className="disabled:bg-aliceblue h-11 w-full cursor-pointer rounded-md border-2 text-base font-medium tracking-wide shadow-md transition-all duration-300 ease-in-out hover:bg-[#e5a62d] hover:text-white"
            />
          </div>
        </form>

        <Link to="/login" className="flex justify-center hover:font-bold">
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
