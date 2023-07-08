import { createQueryString } from "@/app/Utils";
import Link from "next/link";
import React from "react";

const TableButton = ({ searchParams }: any) => {
  return (
    <div className="w-max mx-auto">
      <Link
        href={`/?${createQueryString(
          "table",
          searchParams?.table == "true" ? "false" : "true",
          searchParams
        )}`}
        className="flex justify-center items-center mb-4"
      >
        <div className="btn btn-primary rounded-3xl px-8">
          SHOW {searchParams?.table == "true" ? "CARDS" : "TABLE"}
        </div>
      </Link>
    </div>
  );
};

export default TableButton;
