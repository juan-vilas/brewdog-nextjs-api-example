"use client";
import { createQueryString } from "@/app/Utils";
import { useRouter } from "next/navigation";
import React from "react";

const properties = [
  "ABV",
  "IBU",
  "First Brewed",
  "Target Fg",
  "Target Og",
  "EBC",
  "SRM",
  "pH",
  "Attenuation Level",
  "Volume",
  "Boil Volume",
  "Method",
  "Ingredients",
  "Food Pairing",
  "Brewers Tips",
  "Contributed By",
];

const Properties = () => {
  const router = useRouter();

  return (
    <div className="w-full mx-auto max-w-xs my-5 mb-7">
      <select
        id="select"
        className="select select-bordered w-full"
        onChange={(event) => {
          let id = "p--" + event.target.value.replace(/\s/g, "_").toLowerCase();
          let _id = event.target.value.replace(/\s/g, "_").toLowerCase();
          const url = new URL(window.location.href);
          const params = new URLSearchParams(url.search);
          if (params.get(_id) == "false" || !params.get(_id)) {
            router.push("?" + createQueryString(_id, "true", url.search));
          }

          let element = document.querySelector("#properties");
          //@ts-ignore
          var aux = element.innerText.split("\n");
          if (!aux.includes(event.target.value)) {
            let span = document.createElement("span");
            let div = document.createElement("div");
            div.className = "badge cursor-pointer gap-2";
            div.innerHTML = `X ${event.target.value}`;

            div.id = `${id}`;
            div.onclick = () => {
              document.querySelector(`#${id}`)?.remove();
              const url = new URL(window.location.href);
              router.push("?" + createQueryString(_id, "false", url.search));
            };
            div.appendChild(span);
            element?.appendChild(div);
            //@ts-ignore
            document.querySelector("#select").value = "1";
          }
        }}
      >
        <option value="1" disabled selected>
          Select properties to show in cards
        </option>
        {properties.map((property) => {
          return <option key={property}>{property}</option>;
        })}
      </select>
      <div id="properties" className="flex flex-wrap gap-3 my-3"></div>
    </div>
  );
};

export default Properties;
