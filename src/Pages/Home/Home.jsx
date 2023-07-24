import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import CollegesCards from "./CollegesCards/CollegesCards";
import Gallery from "./Gallery/Gallery";
import Review from "./Review/Review";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section>
        <Banner></Banner>
      </section>
      <section className="my-[80px]">
        <CollegesCards></CollegesCards>
      </section>
      <section>
        <Gallery></Gallery>
      </section>
      <section className="my-[80px]">
        <Review></Review>
      </section>
    </div>
  );
};

export default Home;
