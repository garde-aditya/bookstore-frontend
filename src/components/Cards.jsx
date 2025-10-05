import React from "react";

function Cards({ item }) {
  return (
    <>
      <div className="mt-4 my-3 p-3 flex justify-center">
        <div className="card w-full sm:w-80 md:w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure className="w-full h-48 sm:h-56 md:h-64">
            <img
              src={item.image}
              alt="Shoes"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-sm sm:text-base md:text-lg">
              {item.name}
              <div className="badge badge-secondary text-xs sm:text-sm ml-2">
                {item.category}
              </div>
            </h2>
            <p className="text-xs sm:text-sm md:text-base">{item.title}</p>
            <div className="card-actions justify-between items-center mt-3">
              <div className="badge badge-outline text-xs sm:text-sm md:text-base">
                ${item.price}
              </div>
              <div className="cursor-pointer px-2 py-1 text-xs sm:text-sm md:text-base rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
