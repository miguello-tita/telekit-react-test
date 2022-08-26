import { useState } from "react";
import "./App.css";
import { TableDrag } from "./components/molecules/TableDrag";
import { TableOrdering } from "./components/molecules/TableOrdering";
import products from "./products.json";
import { createDataState } from "./utils/createDataState";

const App = () => {
  const initialState = createDataState(
    {
      take: 10,
      skip: 0,
    },
    products
  );
  const [dataState, setDataState] = useState(initialState.dataState);
  const [result, setResult] = useState(initialState.result);

  const dataStateChange = (event) => {
    const updatedState = createDataState(event.dataState, products);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };

  return (
    <main className="main">
      <section className="main__item">
        <TableOrdering
          dataState={dataState}
          result={result}
          dataStateChange={dataStateChange}
        />
      </section>
      <section className="main__item">
        <TableDrag products={products} result={result} />
      </section>
    </main>
  );
};

export default App;
