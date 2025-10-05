import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import apiClient from "../api/client";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await apiClient.get("/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Hero Section */}
        <div className="mt-12 md:mt-20 items-center justify-center text-center text-black dark:text-white py-10">
          <h1 className="text-2xl md:text-4xl font-bold">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-8 md:mt-12 max-w-3xl mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
            assumenda? Repellendus, iste corrupti? Tempore laudantium repellendus
            accusamus accusantium sed architecto odio, nisi expedita quas quidem
            nesciunt debitis dolore non aspernatur praesentium assumenda sint
            quibusdam, perspiciatis, explicabo sequi fugiat amet animi eos aut.
            Nobis quisquam reiciendis sunt quis sed magnam consequatur!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {/* Cards Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
