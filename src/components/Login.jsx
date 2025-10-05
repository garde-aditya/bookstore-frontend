import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import apiClient from "../api/client";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authUser, setAuthUser] = useAuth();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await apiClient.post("/user/login", userInfo);

      if (res.data && res.data.user) {
        // save user in context + localStorage
        setAuthUser(res.data.user);
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        toast.success("Logged in Successfully");

        // close modal
        document.getElementById("my_modal_2").close();

        // refresh after small delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box relative">
        {/* ✕ button to close modal */}
        <button
          type="button"
          onClick={() => document.getElementById("my_modal_2").close()}
          className="btn btn-sm btn-circle absolute right-2 top-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Login</h3>

          {/* Email */}
          <div className="mt-4 space-y-2 text-gray-700 dark:text-white">
            <span>Email</span>
            <br />
            <input
              type="text"
              placeholder="Enter Your Email"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mt-4 space-y-2 text-gray-700 dark:text-white">
            <span>Password</span>
            <br />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-around mt-4">
            <button
              type="submit"
              className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
            >
              Login
            </button>

            <p>
              Not registered?{" "}
              <Link
                to="/signup"
                className="underline text-blue-500 cursor-pointer"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
