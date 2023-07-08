import React from "react";
import Link from "next/link";
import { createQueryString } from "@/app/Utils";

const Pagination = ({
  searchParams,
}: {
  searchParams: { food: string; beer_name: string; page: string };
}) => {
  let page = Number(searchParams.page) || 1;
  let prevPage = page - 1;
  let nextPage = page + 1;
  if (prevPage <= 0) {
    prevPage = 1;
  }

  return (
    <div className="flex gap-4 justify-center items-center mt-10">
      {page >= 2 ? (
        <Link
          id="prevPage"
          href={`/?${createQueryString(
            "page",
            prevPage.toString(),
            searchParams
          )}`}
        >
          <div className={`btn btn-primary rounded-3xl px-8`}>{"<"}</div>
        </Link>
      ) : null}
      <Link
        id="nextPage"
        href={`/?${createQueryString(
          "page",
          nextPage.toString(),
          searchParams
        )}`}
      >
        <div className={`btn btn-primary rounded-3xl px-8`}>{">"}</div>
      </Link>
    </div>
  );
};

export default Pagination;
