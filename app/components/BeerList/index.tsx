"use client";
import { Beer, Beers } from "@/app/interface";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarked } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

const BeerList = ({
  beers,
  searchParams,
}: {
  beers: Beers;
  searchParams: any;
}) => {
  const [bookmarkedBeers, setBookmarkedBeers] = useState<string>(
    JSON.stringify([])
  );

  useEffect(() => {
    setBookmarkedBeers(window.localStorage.getItem("beers") || "[]");
    var properties = [];
    var badges = document.querySelectorAll("span.badge");
    //@ts-ignore
    for (var badge of badges) {
      properties.push(badge.innerText);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("beers", bookmarkedBeers);
  }, [bookmarkedBeers]);

  return (
    <div>
      {beers.length == 0 ? (
        <div className="w-full mt-12">
          <p className="mx-auto w-max">Nothing here...</p>
        </div>
      ) : null}
      <div className="w-full mx-auto my-4">
        <p className="text-gray-500 text-center">{beers.length} Items</p>
      </div>
      {searchParams?.table == "true" && beers.length > 0 ? (
        <div className="overflow-x-auto ">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Id</th>
                <th>Beer name</th>
                <th>Tagline</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {beers.map((beer: any, index: any) => {
                return (
                  <tr key={index}>
                    <th>{beer.id}</th>
                    <td>{beer.name}</td>
                    <td>{beer.tagline}</td>
                    <td>
                      <button
                        className="btn bg-gray-200 rounded-3xl px-8"
                        onClick={() => {
                          //@ts-ignore
                          window[`my_modal_${beer.id}`].showModal();
                          window.document
                            .querySelector(`#my_form_${beer.id}`)
                            ?.scrollTo(0, 0);
                        }}
                      >
                        READ MORE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="justify-center items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3 place-items-center max-w-[1440px] mx-auto">
          {beers.map((beer: Beer) => {
            return (
              <div
                key={beer.id}
                className="card bg-[#f5f5f5] w-[305px] max-h-[2950px] min-h-[569px] rounded-xl relative h-full"
              >
                <div
                  className="w-[32px] h-[32px] absolute right-0 top-0 my-2 mr-2 cursor-pointer"
                  onClick={() => {
                    let _bookmarkedBeers = JSON.parse(bookmarkedBeers);
                    if (_bookmarkedBeers.includes(beer.id)) {
                      _bookmarkedBeers.splice(
                        _bookmarkedBeers.indexOf(beer.id),
                        1
                      );
                    } else {
                      _bookmarkedBeers.push(beer.id);
                    }
                    setBookmarkedBeers(JSON.stringify(_bookmarkedBeers));
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      JSON.parse(bookmarkedBeers).includes(beer.id)
                        ? faBookmarked
                        : faBookmark
                    }
                    className="w-full h-full"
                  />
                </div>
                {!beer.image_url ? (
                  <div className="flex flex-1 justify-center items-center px-20 pt-10 text-center">
                    <p>{"Sorry, we don't have an image yet..."}</p>
                  </div>
                ) : (
                  <div
                    className="mx-10 mt-10 relative h-[349px]"
                    style={{ alignItems: "unset" }}
                  >
                    <Image
                      src={beer.image_url}
                      alt={beer.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="card-body items-center text-center flex-[unset]">
                  <h2 className="card-title">{beer.name}</h2>
                  <p>{beer.tagline}</p>

                  <div className="bg-gray-200  rounded w-full">
                    <div
                      id="first_brewed"
                      className={`${
                        searchParams.first_brewed == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>First Brewed:</strong>
                      <p className="text-right">{beer.first_brewed}</p>
                    </div>
                    <div
                      id="abv"
                      className={`${
                        searchParams.abv == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>ABV:</strong>
                      <p className="text-right">{beer.abv}</p>
                    </div>
                    <div
                      id="ibu"
                      className={`${
                        searchParams.ibu == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>IBU:</strong>
                      <p className="text-right">{beer.ibu || "N/A"}</p>
                    </div>
                    <div
                      id="target_fg"
                      className={`${
                        searchParams.target_fg == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>Target FG:</strong>
                      <p className="text-right">{beer.target_fg}</p>
                    </div>
                    <div
                      id="target_og"
                      className={`${
                        searchParams.target_og == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>Target OG:</strong>
                      <p className="text-right">{beer.target_og}</p>
                    </div>
                    <div
                      id="ebc"
                      className={`${
                        searchParams.ebc == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>EBC:</strong>
                      <p className="text-right">{beer.ebc || "N/A"}</p>
                    </div>
                    <div
                      id="srm"
                      className={`${
                        searchParams.srm == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>SRM:</strong>
                      <p className="text-right">{beer.srm || "N/A"}</p>
                    </div>
                    <div
                      id="ph"
                      className={`${
                        searchParams.ph == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>pH:</strong>
                      <p className="text-right">{beer.ph || "N/A"}</p>
                    </div>
                    <div
                      id="attenuation_level"
                      className={`${
                        searchParams.attenuation_level == "true"
                          ? "flex"
                          : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>Attenuation Level:</strong>
                      <p className="text-right">{beer.attenuation_level}</p>
                    </div>
                    <div
                      id="volume"
                      className={`${
                        searchParams.volume == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>Volume:</strong>
                      <p className="text-right">
                        {beer.volume.value} {beer.volume.unit}
                      </p>
                    </div>
                    <div
                      id="boil_volume"
                      className={`${
                        searchParams.boil_volume == "true" ? "flex" : "hidden"
                      } justify-center items-center gap-6 p-3`}
                    >
                      <strong>Boil Volume:</strong>
                      <p className="text-right">
                        {beer.boil_volume.value} {beer.boil_volume.unit}
                      </p>
                    </div>
                    <div
                      id="method"
                      className={`${
                        searchParams.method == "true" ? "flex" : "hidden"
                      } flex-col justify-center  p-3`}
                    >
                      <div className="flex flex-col w-full border-opacity-50">
                        <strong className="divider">Method:</strong>
                      </div>
                      <div className="flex justify-center items-center gap-6">
                        <strong className="text-left">Mash Temperature:</strong>
                        <p className="text-right">
                          {beer.method.mash_temp[0].temp.value}{" "}
                          {beer.method.mash_temp[0].temp.unit} ~{" "}
                          {beer.method.mash_temp[0].duration || "N/A"} minutes
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-6">
                        <strong className="text-left">Fermentation:</strong>
                        <p className="text-right">
                          {beer.method.fermentation.temp.value}{" "}
                          {beer.method.fermentation.temp.unit}
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-6">
                        <strong className="text-left">Twist:</strong>
                        <p className="text-right">
                          {beer.method.twist || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center ">
                      <div
                        id="ingredients"
                        className={`${
                          searchParams.ingredients == "true" ? "flex" : "hidden"
                        } flex-col w-full border-opacity-50 p-3`}
                      >
                        <strong className="divider">Ingredients</strong>
                      </div>
                      {Object.keys(beer.ingredients).map((ingredient) => {
                        return (
                          <div
                            id="ingredients"
                            className={`${
                              searchParams.ingredients == "true"
                                ? "flex"
                                : "hidden"
                            } flex-col p-3`}
                            key={ingredient}
                          >
                            <strong className="text-center">
                              {ingredient[0].toUpperCase() +
                                ingredient.slice(1)}
                              :
                            </strong>
                            {ingredient == "malt"
                              ? beer.ingredients[ingredient].map((el) => {
                                  return (
                                    <div
                                      key={el.name}
                                      className="flex justify-center items-center gap-6"
                                    >
                                      <p className="text-left">{el.name}:</p>
                                      <p className="text-right">
                                        {el.amount.value} {el.amount.unit}
                                      </p>
                                    </div>
                                  );
                                })
                              : null}
                            {ingredient == "hops"
                              ? beer.ingredients[ingredient].map(
                                  (el, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="flex justify-center items-center gap-6"
                                      >
                                        <p className="text-left">{el.name}:</p>
                                        <p className="text-right">
                                          {el.amount.value} {el.amount.unit}
                                          <br />
                                          {el.add} {el.attribute}
                                        </p>
                                      </div>
                                    );
                                  }
                                )
                              : null}
                            {ingredient == "yeast" ? (
                              <div className="flex justify-center items-center gap-6">
                                <p className="text-center">
                                  {beer.ingredients[ingredient]}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                      <div
                        id="food_pairing"
                        className={`${
                          searchParams.food_pairing == "true"
                            ? "flex"
                            : "hidden"
                        } flex-col w-full border-opacity-50 p-3`}
                      >
                        <strong className="divider">Food Pairing</strong>
                        <div className="flex flex-col justify-center items-center gap-1">
                          {Object.keys(beer.food_pairing).map(
                            (index: string) => {
                              return (
                                <p key={index} className="text-center">
                                  {beer.food_pairing[Number(index)]}
                                </p>
                              );
                            }
                          )}
                        </div>
                      </div>
                      <div
                        id="brewers_tips"
                        className={`${
                          searchParams.brewers_tips == "true"
                            ? "flex"
                            : "hidden"
                        } flex-col w-full border-opacity-50 p-3`}
                      >
                        <strong className="divider">Brewers Tips:</strong>
                        <p className="text-center">{beer.brewers_tips}</p>
                      </div>
                      <div
                        id="contributed_by"
                        className={`${
                          searchParams.contributed_by == "true"
                            ? "flex"
                            : "hidden"
                        } flex-col w-full border-opacity-50 p-3`}
                      >
                        <strong className="divider">Contributed by:</strong>
                        <p className="text-center">{beer.contributed_by}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button
                      className="btn btn-primary rounded-3xl px-8"
                      onClick={() => {
                        //@ts-ignore
                        window[`my_modal_${beer.id}`].showModal();
                        window.document
                          .querySelector(`#my_form_${beer.id}`)
                          ?.scrollTo(0, 0);
                      }}
                    >
                      READ MORE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {beers.map((beer: Beer) => {
        return (
          <dialog
            key={beer.id}
            id={`my_modal_${beer.id}`}
            className="modal modal-bottom sm:modal-middle"
          >
            <form
              id={`my_form_${beer.id}`}
              method="dialog"
              className="modal-box bg-[#f5f5f5] flex justify-center items-center"
            >
              <div
                key={beer.id}
                className="card bg-[#f5f5f5] w-full h-[569px] rounded-xl"
              >
                {!beer.image_url ? (
                  <div className="flex flex-1 justify-center items-center px-20 pt-10 text-center">
                    <p>{"Sorry, we don't have an image yet..."}</p>
                  </div>
                ) : (
                  <div
                    className="mx-auto mt-10 w-[110px] h-auto"
                    style={{ alignItems: "unset" }}
                  >
                    <Image
                      src={beer.image_url}
                      alt={beer.name}
                      width={349}
                      height={249}
                    />
                  </div>
                )}
                <div className="card-body items-center text-center flex-[unset]">
                  <h2 className="card-title">{beer.name}</h2>
                  <p>{beer.tagline}</p>
                  <strong className="mt-6">Description:</strong>
                  <p>{beer.description}</p>
                  <div className="bg-gray-200 p-3 rounded w-full">
                    <div className="flex justify-center items-center gap-6">
                      <strong>First Brewed:</strong>
                      <p className="text-right">{beer.first_brewed}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>ABV:</strong>
                      <p className="text-right">{beer.abv}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>IBU:</strong>
                      <p className="text-right">{beer.ibu || "N/A"}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>Target FG:</strong>
                      <p className="text-right">{beer.target_fg}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>Target OG:</strong>
                      <p className="text-right">{beer.target_og}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>EBC:</strong>
                      <p className="text-right">{beer.ebc || "N/A"}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>SRM:</strong>
                      <p className="text-right">{beer.srm || "N/A"}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>pH:</strong>
                      <p className="text-right">{beer.ph || "N/A"}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>Attenuation Level:</strong>
                      <p className="text-right">{beer.attenuation_level}</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>Volume:</strong>
                      <p className="text-right">
                        {beer.volume.value} {beer.volume.unit}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <strong>Boil Volume:</strong>
                      <p className="text-right">
                        {beer.boil_volume.value} {beer.boil_volume.unit}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center ">
                      <div className="flex flex-col w-full border-opacity-50">
                        <strong className="divider">Method:</strong>
                      </div>
                      <div className="flex justify-center items-center gap-6">
                        <strong className="text-left">Mash Temperature:</strong>
                        <p className="text-right">
                          {beer.method.mash_temp[0].temp.value}{" "}
                          {beer.method.mash_temp[0].temp.unit} ~{" "}
                          {beer.method.mash_temp[0].duration || "N/A"} minutes
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-6">
                        <strong className="text-left">Fermentation:</strong>
                        <p className="text-right">
                          {beer.method.fermentation.temp.value}{" "}
                          {beer.method.fermentation.temp.unit}
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-6">
                        <strong className="text-left">Twist:</strong>
                        <p className="text-right">
                          {beer.method.twist || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center ">
                      <div className="flex flex-col w-full border-opacity-50">
                        <strong className="divider">Ingredients</strong>
                      </div>
                      {Object.keys(beer.ingredients).map((ingredient) => {
                        return (
                          <div key={ingredient}>
                            <strong className="text-center">
                              {ingredient[0].toUpperCase() +
                                ingredient.slice(1)}
                              :
                            </strong>
                            {ingredient == "malt"
                              ? beer.ingredients[ingredient].map((el) => {
                                  return (
                                    <div
                                      key={el.name}
                                      className="flex justify-center items-center gap-6"
                                    >
                                      <p className="text-left">{el.name}:</p>
                                      <p className="text-right">
                                        {el.amount.value} {el.amount.unit}
                                      </p>
                                    </div>
                                  );
                                })
                              : null}
                            {ingredient == "hops"
                              ? beer.ingredients[ingredient].map(
                                  (el, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="flex justify-center items-center gap-6"
                                      >
                                        <p className="text-left">{el.name}:</p>
                                        <p className="text-right">
                                          {el.amount.value} {el.amount.unit}
                                          <br />
                                          {el.add} {el.attribute}
                                        </p>
                                      </div>
                                    );
                                  }
                                )
                              : null}
                            {ingredient == "yeast" ? (
                              <div className="flex justify-center items-center gap-6">
                                <p className="text-center">
                                  {beer.ingredients[ingredient]}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                      <div className="flex flex-col w-full border-opacity-50">
                        <strong className="divider">Food Pairing</strong>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-1">
                        {Object.keys(beer.food_pairing).map((index: string) => {
                          return (
                            <p key={index} className="text-center">
                              {beer.food_pairing[Number(index)]}
                            </p>
                          );
                        })}
                      </div>
                      <div className="flex flex-col w-full border-opacity-50">
                        <strong className="divider">Brewers Tips:</strong>
                      </div>
                      <p className="text-center">{beer.brewers_tips}</p>
                      <div className="flex flex-col w-full border-opacity-50">
                        <strong className="divider">Contributed by:</strong>
                      </div>
                      <p className="text-center">{beer.contributed_by}</p>
                    </div>
                  </div>
                  <div className="card-actions">
                    <div className="modal-action">
                      <button className="btn btn-primary">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        );
      })}
    </div>
  );
};

export default BeerList;
