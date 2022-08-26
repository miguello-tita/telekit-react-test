import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ColumnMenu } from "../atoms/ColumnMenu";

const TableOrdering = ({ result, dataState, dataStateChange }) => {
  return (
    <Grid
      data={result}
      onDataStateChange={dataStateChange}
      sortable={{ mode: "multiple" }}
      {...dataState}
      pageable={{
        buttonCount: 5,
        info: true,
        type: "input",
        pageSizes: true,
        previousNext: true,
      }}
    >
      <Column
        field="id"
        title="Product Id"
        filter={"numeric"}
        columnMenu={ColumnMenu}
      />
      <Column
        field="name"
        title="Product Name"
        filter={"text"}
        columnMenu={ColumnMenu}
      />
      <Column
        field="price"
        title="Price"
        format="{0:c0}"
        filter={"numeric"}
        columnMenu={ColumnMenu}
      />
      <Column
        field="discount"
        title="Discount"
        filter={"numeric"}
        columnMenu={ColumnMenu}
      />
    </Grid>
  );
};

export { TableOrdering };
