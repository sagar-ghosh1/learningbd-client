import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import images from "../../../assets/banner.jpg";
import Container from "../../../Components/Container";
import Heading from "../../../Components/Heading";

const Gallery = () => {
  // TODO Change image
  return (
    <Container>
      <Heading
        title={"Discover Collages"}
        description={
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, "
        }
      ></Heading>
      <Marquee>
        <img
          className="h-96 w-96 mr-10 rounded-lg p-5 hover:scale-110 delay-75 transition-transform"
          src={images}
          alt=""
        />
        <img
          className="h-96 w-96 mr-10 rounded-lg p-5 hover:scale-110 delay-75 transition-transform"
          src={images}
          alt=""
        />
        <img
          className="h-96 w-96 mr-10 rounded-lg p-5 hover:scale-110 delay-75 transition-transform"
          src={images}
          alt=""
        />
      </Marquee>
      <div className="mt-10">
        <Marquee direction="right">
          <img
            className="h-96 w-96 mr-10 rounded-lg p-5 hover:scale-110 delay-75 transition-transform"
            src={images}
            alt=""
          />
          <img
            className="h-96 w-96 mr-10 rounded-lg p-5 hover:scale-110 delay-75 transition-transform"
            src={images}
            alt=""
          />
          <img
            className="h-96 w-96 mr-10 rounded-lg p-5 hover:scale-110 delay-75 transition-transform"
            src={images}
            alt=""
          />
        </Marquee>
      </div>
    </Container>
  );
};

export default Gallery;
