import "isomorphic-fetch";
import dotenv from "dotenv";
dotenv.config();

const { API_KEY, CSE_ID } = process.env;
const BASE_URL = "https://www.googleapis.com/customsearch/v1";

const getRequestUrl = (keyword, offset = 1) => {
  let startIndex = offset === 1 ? offset : offset * 10;

  return (
    `${BASE_URL}?q=${keyword}&` +
    `cx=${CSE_ID}&` +
    `key=${API_KEY}&` +
    "searchType=image&" +
    `start=${startIndex}`
  );
};

const getImages = (keyword, offset) =>
  fetch(getRequestUrl(keyword, offset)).
    then((response) => response.json()).
    then((data) => data.items).
    catch((err) => console.log(err));

export { getImages };
