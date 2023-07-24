import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Container";
import { AuthContext } from "../../Context/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
const keyImage = import.meta.env.VITE_Image_key;
const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${keyImage}`;

const AdmissionForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [college, setCollege] = useState({});
  useEffect(() => {
    axios.get(`https://learningbd-server.vercel.app/college/${id}`).then((res) => {
      setCollege(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    console.log(formData);

    axios.post(imageHostingUrl, formData).then((res) => {
      if (res.data.data.display_url) {
        data.image = res.data.data.display_url;
        data.collegeId = id;
        axios.post("https://learningbd-server.vercel.app/admissions", data).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Admission success",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate("/mycollege");
          }
        });
      }
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
            defaultValue={college?.name}
            {...register("selectCollegeName", {
              required: "selectCollegeName is required",
            })}
            readOnly
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
            readOnly
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="tel"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded border-gray-300  focus:outline-none focus:border-blue-500"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="date"
            placeholder="Date Of Birth"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("dateOfBirth", {
              required: "dateOfBirth is required",
            })}
          />

          {errors.dateOfBirth ? (
            <span className="text-red-500">{errors.dateOfBirth.message}</span>
          ) : (
            <span className="">Date Of Birth</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Subject"
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && (
            <span className="text-red-500">{errors.subject.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="file"
            className="w-full p-2 border rounded border-gray-300  focus:outline-none focus:border-blue-500"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </Container>
  );
};

export default AdmissionForm;
