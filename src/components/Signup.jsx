import React from "react";
import { useForm } from "react-hook-form";   // ✅ import useForm
import { Link, useLocation, useNavigate } from "react-router-dom";     // ✅ import Link
import Login from "./Login";
import apiClient from "../api/client"; 
import toast from "react-hot-toast";

function Signup() {

   const location=useLocation ()
   const navigate=useNavigate()
   const from=location.state?.from?.pathname || "/"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ define the onSubmit function
  const onSubmit = async (data) => {
   const userInfo={
    fullname:data.fullname,
    email:data.email,
    password:data.password,
   }
    await apiClient.post("/user/signup" , userInfo)
   .then((res)=>{
    console.log(res.data)
    if(res.data){
                toast.success("Signup Successfully");
                navigate(from,{replace:true});
              
      
    }
    localStorage.setItem("Users", JSON.stringify(res.data.user));
   }).catch((err)=>{
    if (err.response){
    console.log(err);
    toast.error("Error:" + err.response.data.message);
    }
   })
  } ;

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* Close button */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Sign Up</h3>

              {/* Name */}
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter Your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                <br />
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
                  Signup
                </button>

                <p>
                  Have Account?{" "}
                  <button
                    type="button"
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="modal-backdrop">
            <button
              onClick={() => document.getElementById("my_modal_2").close()}
            >
              Close
            </button>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
