"use client";
import { createQueryString, deleteParam } from "@/app/Utils";
import { SearchParams } from "@/app/interface";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const FavoritesButton = ({ searchParams }: SearchParams) => {
  const router = useRouter();

  useEffect(() => {}, []);

  const getFavorites = useCallback(() => {
    let _bookmarkedBeers = window.localStorage.getItem("beers");
    //@ts-ignore
    let bookmarkedBeers = JSON.parse(_bookmarkedBeers) || [];
    return bookmarkedBeers;
  }, []);

  return (
    <div className="w-max mx-auto">
      <div
        onClick={() => {
          let url = new URL(window.location.href);
          let params = new URLSearchParams(url.search);
          if (params.has("favorites")) {
            router.push("/");
          } else {
            let favorites = getFavorites();
            let joinedFavorites = favorites.slice(0, 10).join("|");
            let query = createQueryString(
              "favorites",
              joinedFavorites,
              url.search
            );
            query = deleteParam("page", query);
            router.push("?" + query);
          }
        }}
        className="flex justify-center items-center mb-4"
      >
        <div className="btn btn-primary rounded-3xl px-8">
          SHOW {searchParams?.favorites ? "ALL" : "FAVORITES"}
        </div>
      </div>
    </div>
  );
};

export default FavoritesButton;
