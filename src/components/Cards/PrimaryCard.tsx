"use client";
import React from "react";
import { Link } from "react-router-dom";
import { BackgroundGradientRound } from "../ui/round-gradient";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../App.css";

interface TPrimaryCard {
  image: string;
  name: string;
  description: string;
  id: string;
  subjects: string[];
}
export const PrimaryCard: React.FC<TPrimaryCard> = ({
  name,
  image,
  description,
  id,
  subjects,
}) => {
  AOS.init();

  const showSubjects = [];
  for (let i = 0; i < subjects.length; i++) {
    if (i == subjects.length - 1) {
      showSubjects.push(subjects[i]);
    } else {
      showSubjects.push(subjects[i] + " | ");
    }
  }

  return (
    <div
      data-aos="zoom-in"
      data-aos-delay="50"
      data-aos-duration="1000"
      className="secondary-bg py-10 px-4 rounded-lg"
    >
      <div className="flex justify-center items-center">
        <BackgroundGradientRound>
          <img className=" rounded-full size-48" src={image} alt="" />
        </BackgroundGradientRound>
      </div>
      <p className="text-xl md:text-3xl font-bold capitalize text-center mt-6 mb-2 text-neutral-200">
        {name}
      </p>
      <p className="text-base md:text-lg text-center brand-text-color">
        {showSubjects}
      </p>

      <p className="text-sm text-center text-white font-light py-5">
        {description.slice(0, 120)}...
      </p>
      <div className="flex justify-center items-center">
        <Link
          to={`/about-teacher/${id}`}
          className="py-1 border-x-2 border-y-2 border-y-[#1a263e] px-5 text-base hover:text-[#00ccb1] hover:border-y-2 hover:border-x-0 hover:border-[#00ccb1] transition-all duration-300 ease-in-out"
        >
          More Details
        </Link>
      </div>
    </div>
  );
};
