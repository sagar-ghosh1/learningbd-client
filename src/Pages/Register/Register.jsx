import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import GoogleLogin from "../../Components/Shared/GoogleLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const { email, password, name, photoUrl } = data;
    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photoUrl)
          .then((result) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Register has been success",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
          })
          .catch((err) => {
            setError(err);
          });
        console.log(result);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className="py-16 px-2 max-w-lg mx-auto">
      <h2 className="textPrimary text-center my-10">Register Here</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full focus:outline-none focus:border-blue-500 p-2 border border-gray-300 rounded"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            className="w-full p-2 border focus:outline-none focus:border-blue-500 border-gray-300 rounded"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\W).*$/,
                message:
                  "Password must contain a capital letter and a special character",
              },
            })}
          />
          <span
            className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="mb-4 relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            id="confirmPassword"
            className="w-full p-2 border focus:outline-none focus:border-blue-500 border-gray-300 rounded"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
          <span
            className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>

          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="photoUrl"
            placeholder="Photo Url"
            className="w-full p-2 border focus:outline-none focus:border-blue-500 border-gray-300 rounded"
            {...register("photoUrl")}
          />
        </div>
        <label className="label">
          <span className="label-text text-red-600">{error}</span>
        </label>

        <p className="mb-4">
          Already Have an account?{" "}
          <Link className="text-blue-500" to={"/user/login"}>
            Login
          </Link>
        </p>
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-400  text-white w-full"
        >
          Register
        </button>
      </form>
      <div className="divider">OR</div>
      <GoogleLogin></GoogleLogin>
    </div>
  );
};

export default Register;
