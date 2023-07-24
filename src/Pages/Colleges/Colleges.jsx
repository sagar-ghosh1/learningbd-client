import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import banner from "../../assets/banner.jpg";
import CollegeCard from "../Home/CollegesCards/CollegeCard";
import Container from "../../Components/Container";
import Heading from "../../Components/Heading";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/allColleges").then((response) => {
      setColleges(response.data);
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Colleges</title>
      </Helmet>
      <div className="h-[600px] mb-[80px]">
        <img className="h-[600px] w-full" src={banner} alt="" />
      </div>
      <Container>
        <Heading
          title={"All Colleges"}
          description={
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,"
          }
        ></Heading>
        <div className="grid gap-6 lg:grid-cols-1">
          {colleges &&
            colleges.map((college) => (
              <CollegeCard key={college.name} college={college}></CollegeCard>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Colleges;
