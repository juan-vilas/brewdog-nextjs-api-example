"use client";
import React from "react";
import {
  createQueryString,
  getNextFavorites,
  getPrevFavorites,
} from "@/app/Utils";
import { useRouter } from "next/navigation";

const Pagination = () => {
  const router = useRouter();

  return (
    <div className="flex gap-4 justify-center items-center mt-10">
      <button
        onClick={() => {
          let url = new URL(window.location.href);
          let prevFavorites = getPrevFavorites();
          let query = createQueryString("favorites", prevFavorites, url.search);
          router.push(`/?${query}`);
        }}
      >
        <div className={`btn btn-primary rounded-3xl px-8`}>{"<"}</div>
      </button>
      <button
        onClick={() => {
          let url = new URL(window.location.href);
          let nextFavorites = getNextFavorites();
          let query = createQueryString("favorites", nextFavorites, url.search);
          router.push(`/?${query}`);
        }}
      >
        <div className={`btn btn-primary rounded-3xl px-8`}>{">"}</div>
      </button>
    </div>
  );
};

export default Pagination;
