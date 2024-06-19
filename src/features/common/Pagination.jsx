import React from "react";
import { ITEMS_PER_PAGE } from "../../../src/app/constant";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const Pagination = ({ page, setPage, handlePage, totalItems = 55 }) => {
const Pagination = ({ page, setPage, handlePage, totalItems }) => {
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < 1 ? page - 1 : page)}
          className="relative ml-3 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to <span className="font-medium">{page * ITEMS_PER_PAGE} </span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-4 w-5" aria-hidden="true" />
            </div>
            {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
              (el, index) => (
                <div
                  key={index + 1}
                  onClick={(e) => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative cursor-pointer z-10 inline-flex items-center ${
                    index + 1 === page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400"
                  } px-4 py-2 text-sm font-semibold focus:z-20 `}
                >
                  {index + 1}
                </div>
              )
            )}

            <div
              onClick={(e) => handlePage(page < totalItems ? page + 1 : page)}
              className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;
