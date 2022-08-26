import { process } from "@progress/kendo-data-query";

const createDataState = (dataState, products) => {
  return {
    result: process(products.slice(0), dataState),
    dataState: dataState,
  };
};

export { createDataState };
