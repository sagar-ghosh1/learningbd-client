import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Container from "../../Components/Container";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
import { Rating } from "@smastrom/react-rating";

const MyCollege = () => {
  const [college, setCollege] = useState({});
  const [student, setStudent] = useState({});
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);

  const addReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const collegeName = form.collegeName.value;
    const comment = form.comment.value;
    const newReview = {
      username,
      rating,
      comment,
    };
    axios
      .post(`http://localhost:5000/addReview/${collegeName}`, newReview)
      .then((res) => {
        console.log(res.data);
      });
  };
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/student/${user?.displayName}`)
        .then((res) => {
          setStudent(res.data);
          console.log(student);
        });
    }
  }, []);

  useEffect(() => {
    // Check if both 'user' and 'student' are available
    if (user && student && student.collegeId) {
      axios
        .get(`http://localhost:5000/myCollege/${student.collegeId}`)
        .then((res) => {
          setCollege(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching college data:", error);
        });
    }
  }, [student, user]);

  return (
    <div>
      <Helmet>
        <title>My College</title>
      </Helmet>
      <div>
        <div>
          <img className="h-[600px] w-full" src={college?.image} alt="" />
          <Container>
            <div className="my-[80px]">
              <h2 className="text-center font-semibold text-3xl mb-10">
                {college?.name}
              </h2>
              <div className="md:flex gap-6">
                <div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Admission Process
                    </h3>
                    <p>{college?.admissionProcess}</p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <h3 className="text-lg font-semibold mr-2">
                      Admission date:
                    </h3>
                    <span>{college?.admissionDates}</span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mr-2">
                      Research Works
                    </h3>
                    <p>{college.researchHistory}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <h2 className="text-xl font-bold ">Events</h2>
                    {college?.events?.map((ev, index) => (
                      <div className="my-6" key={index}>
                        <h3 className="text-lg font-semibold mb-2">
                          {ev.name}
                        </h3>
                        <p>{ev.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold ">Sports Categories</h2>
                {college?.sports?.map((sp, index) => (
                  <div className="my-6" key={index}>
                    <h3 className="text-lg font-semibold mb-2">{sp.name}</h3>
                    <p>{sp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-center my-6">
              Add Review
            </h3>
            <form className="mb-[80px]" onSubmit={addReview}>
              <div className="mb-4">
                <input
                  type="Text"
                  placeholder="UserName"
                  defaultValue={user?.displayName}
                  readOnly
                  name="username"
                  className="w-full focus:outline-none focus:border-green-500 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="Text"
                  placeholder="collegeName"
                  defaultValue={student?.selectCollegeName}
                  readOnly
                  name="collegeName"
                  className="w-full focus:outline-none focus:border-green-500 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Comment"
                  name="comment"
                  className="w-full focus:outline-none focus:border-green-500 p-2 border border-gray-300 rounded"
                />
                <div className="mt-4">
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={rating}
                    onChange={setRating}
                    isRequired
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-400  text-white w-full"
              >
                Submit
              </button>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MyCollege;
