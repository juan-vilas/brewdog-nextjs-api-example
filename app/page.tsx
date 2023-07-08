import { Beers, SearchParams } from "./interface";
import { SearchApi } from "./Utils";
import SearchBy from "./components/SearchBy";
import Pagination from "./components/Pagination";
import PaginationClient from "./components/PaginationClient";
import BeerList from "./components/BeerList";
import Link from "next/link";
import TableButton from "./components/TableButton";
import FavoritesButton from "./components/FavoritesButton";
import Properties from "./components/Properties";

export default async function Home({ searchParams }: SearchParams) {
  let beers: Beers = await SearchApi({ ...searchParams });

  return (
    <main className="px-3 py-6">
      <div className="w-max mx-auto">
        <Link href="/" className="w-max">
          <img
            src="/brewdog-logo.png"
            alt="brewdog-logo"
            className="mx-auto p-6 mb-10 max-w-[175px] w-full"
          />
        </Link>
      </div>
      <SearchBy />
      <Properties />
      <div className="flex flex-col md:flex-row max-w-md mx-auto">
        <TableButton searchParams={searchParams} />
        <FavoritesButton searchParams={searchParams} />
      </div>
      <BeerList beers={beers} searchParams={searchParams} />
      {searchParams.favorites ? (
        <PaginationClient />
      ) : (
        <Pagination searchParams={searchParams} />
      )}
    </main>
  );
}
