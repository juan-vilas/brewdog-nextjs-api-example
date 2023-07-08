import { Beers } from "./interface";

export const getFavorites = () => {
  let _bookmarkedBeers = window.localStorage.getItem("beers");
  //@ts-ignore
  let bookmarkedBeers = JSON.parse(_bookmarkedBeers) || [];
  return bookmarkedBeers;
};

export const getPrevFavorites = () => {
  let favorites = getFavorites();
  let page = getPage();
  let joinedFavorites = favorites.slice((page - 1) * 10, page * 10).join("|");
  return joinedFavorites;
};
export const getNextFavorites = () => {
  let favorites = getFavorites();
  let page = getPage();
  let joinedFavorites = favorites.slice(page * 10, (page + 1) * 10).join("|");
  return joinedFavorites;
};

export const getPage = () => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let page = Number(params.get("page") || 1);
  return page;
};

export const deleteParam = (name: string, searchParams: any) => {
  //@ts-ignore
  const params = new URLSearchParams(searchParams);
  params.delete(name);

  return params.toString();
};
export const createQueryString = (
  name: string,
  value: string,
  searchParams: any
) => {
  //@ts-ignore
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
};

export const SearchApi = async (query: any) => {
  if ("favorites" in query) {
    query.ids = query.favorites;
    delete query.favorites;
  }
  let _query = "";
  for (var id in query) {
    _query += `${id}=${query[id]}&`;
  }
  _query = _query.slice(0, _query.length - 1);
  const res = await fetch(`https://api.punkapi.com/v2/beers?${_query}`);
  return res.json();
};
