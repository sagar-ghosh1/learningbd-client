import { Helmet } from "react-helmet";
import Container from "../../Components/Container";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/student/${user?.displayName}`)
      .then((res) => {
        setProfile(res.data);
      });
  }, []);
  return (
    <div className="my-[80px]">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Container>
        <div className="card">
          <figure className="px-10 pt-10">
            <img src={profile?.image} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{profile?.name}</h2>
            <div className="md:flex justify-between gap-6">
              <div className="text-left">
                <h3>College: {profile?.selectCollegeName}</h3>
                <h3>Subjects: {profile?.subject}</h3>
                <h3>Date Of Birth: {profile?.dateOfBirth}</h3>
              </div>
              <div className="text-left">
                <p>Email: {profile?.email}</p>
                <p>Phone: {profile?.phone}</p>
                <p>Address: {profile?.address}</p>
              </div>
            </div>
            <div className="card-actions">
              <Link to={"/editProfile"} className="btn btn-primary">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
