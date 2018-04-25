import uuid from "uuid/v1";
const dbData = [];

const addItem = (item) => {
  const dbItem = {
    "id": uuid(),
    "requestUrl": item
  };
  dbData.push(dbItem);
};

const getChunk = (chunkSize) =>
  dbData.
    slice().
    reverse().
    slice(0, chunkSize);

export default {
  addItem,
  getChunk
};
