"use client";
import React, { useCallback, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [criteria, setCriteria] = useState<"beer_name" | "food">("beer_name");
  const [query, setQuery] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      //@ts-ignore
      const params = new URLSearchParams(searchParams);
      params.delete("food");
      params.delete("beer_name");
      params.delete("page");
      if (name != "") {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3 my-6">
        <p>Search by:</p>
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            className={`btn rounded-3xl px-8 ${
              criteria == "beer_name" ? "btn-primary" : null
            }`}
            onClick={() => setCriteria("beer_name")}
          >
            Beer Name
          </button>
          <button
            className={`btn rounded-3xl px-8 ${
              criteria == "food" ? "btn-primary" : null
            }`}
            onClick={() => setCriteria("food")}
          >
            Food Pairing
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mb-10 mx-auto max-w-lg">
        <input
          type="text"
          placeholder={`Search by ${criteria.replace("_", " ")}...`}
          className="input input-bordered w-full max-w-xs bg-[#f5f5f5]"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="w-[48px] h-[48px] p-2 bg-[#f5f5f5] ml-1 cursor-pointer active:bg-gray-200 rounded"
          onClick={async () => {
            if (query == "") {
              router.push("?" + createQueryString("", query));
              return;
            }
            if (criteria == "beer_name") {
              router.push("?" + createQueryString("beer_name", query));
            } else if (criteria == "food") {
              router.push("?" + createQueryString("food", query));
            }
          }}
        >
          <FontAwesomeIcon size="2x" icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default SearchBy;
