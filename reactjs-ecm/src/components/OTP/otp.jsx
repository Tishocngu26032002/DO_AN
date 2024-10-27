import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../services/custom-auth-api";

function OTPPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otpError, setOtpError] = useState("");

  const { email } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
    mode: "onBlur",
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.patch("/register", {
        email,
        otp: data.otp,
      });
      return response.data;
    },
    onSuccess: () => {
      alert("Đăng ký thành công!");
      navigate("/login");
    },
    onError: (error) => {
      setOtpError("OTP không hợp lệ. Vui lòng thử lại.");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-2 my-2 w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
        <div className="bg-gray-100 p-6">
          <p className="relative text-2xl font-medium">
            Verify OTP
            <span className="absolute bottom-0 left-0 h-0.5 w-8 bg-gradient-to-r from-[#f37a65] to-[#d64141]" />
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Registered Email:
            </label>
            <p className="text-base font-semibold text-gray-700">{email}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium">
              Enter OTP:
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              {...register("otp", { required: "OTP is required" })}
              className="h-11 w-full rounded-md bg-gray-100 pl-3 text-base shadow-sm outline-none transition-all ease-out focus:shadow-lg focus:ring-2 focus:ring-[#ac8ece]"
            />
            {errors.otp && (
              <span className="text-red-500">{errors.otp.message}</span>
            )}
            {otpError && <span className="text-red-500">{otpError}</span>}
          </div>

          <div>
            <input
              type="submit"
              value="Verify OTP"
              className="h-11 w-full cursor-pointer rounded-md bg-gradient-to-r from-[#f37a65] to-[#d64141] text-base font-medium tracking-wide text-white shadow-md transition-all duration-300 ease-in-out hover:from-[#d64141] hover:to-[#f37a65]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTPPage;
