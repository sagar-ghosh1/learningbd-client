import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../Container";

const CollegeDetails = () => {
  const [college, setCollege] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/college/${id}`).then((response) => {
      setCollege(response.data);
    });
  }, []);
  return (
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
                <h3 className="text-lg font-semibold mr-2">Admission date:</h3>
                <span>{college?.admissionDates}</span>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mr-2">Research Works</h3>
                <p>{college.researchHistory}</p>
              </div>
            </div>
            <div>
              <div>
                <h2 className="text-xl font-bold ">Events</h2>
                {college?.events?.map((ev, index) => (
                  <div className="my-6" key={index}>
                    <h3 className="text-lg font-semibold mb-2">{ev.name}</h3>
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
      </Container>
    </div>
  );
};

export default CollegeDetails;
