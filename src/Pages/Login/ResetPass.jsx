import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import Container from "../../Components/Container";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const { resetPass } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    resetPass(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Please check your email address",
        });
        navigate("/user/login");
      })
      .catch((err) => {
        setError(err.message.slice(22, -2));
      });
  };
  return (
    <Container>
      <div className="">
        <form
          className="max-w-sm mx-auto mt-[80px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full focus:outline-none focus:border-green-500 p-2 border border-gray-300 rounded"
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

          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-400  text-white w-full"
          >
            Reset
          </button>
          <p className="text-red-500">{error}</p>
        </form>
      </div>
    </Container>
  );
};

export default ResetPass;
