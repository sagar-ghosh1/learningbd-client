import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Container from "../../../Components/Container";
import Heading from "../../../Components/Heading";

const Review = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allColleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
      });
  }, []);

  return (
    <Container>
      <Heading
        title={"Reviews and Feedback"}
        description={
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"
        }
      ></Heading>
      <div className="grid md:grid-cols-2">
        {colleges.map((college) => (
          <ReviewCard key={college.name} college={college}></ReviewCard>
        ))}
      </div>
    </Container>
  );
};

export default Review;
