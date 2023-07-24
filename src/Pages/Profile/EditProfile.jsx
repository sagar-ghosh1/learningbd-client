import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import { AuthContext } from "../../Context/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const EditProfile = () => {
  const [spin, setSpin] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { user, updateUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    setSpin(true);
    updateUser(data.name, data.email)
      .then(() => {
        axios
          .patch(`http://localhost:5000/editProfile/${profile?._id}`, data)
          .then((res) => {
            setSpin(false);
            if (res) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "profile update has been successful",
              });
            }
            navigate("/profile");
          });
      })
      .catch((err) => {
        console.log(err);
      });

    // const {
    //   name,
    //   subject,
    //   email,
    //   phone,
    //   selectCollegeName,
    //   address,
    //   dateOfBirth,
    //   image,
    // } = data;
    // console.log(data);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/student/${user?.displayName}`)
      .then((res) => {
        setProfile(res.data);
      });
  }, []);
  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto bg-white my-[80px] p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded border-gray-300  focus:outline-none focus:border-blue-500"
            placeholder="Candidate Name"
            defaultValue={user?.displayName}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded border-gray-300  focus:outline-none focus:border-blue-500"
            defaultValue={profile?.selectCollegeName}
            {...register("selectCollegeName", {
              required: "selectCollegeName is required",
            })}
          />
          {errors.selectCollegeName && (
            <span className="text-red-500">
              {errors.selectCollegeName.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Candidate Name"
            defaultValue={user?.email}
            {...register("email", { required: "Email is required" })}
            required
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded border-gray-300  focus:outline-none focus:border-blue-500"
            defaultValue={profile?.address}
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Subject"
            defaultValue={profile?.subject}
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && (
            <span className="text-red-500">{errors.subject.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {spin ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Save Change"
          )}
        </button>
      </form>
    </Container>
  );
};

export default EditProfile;
