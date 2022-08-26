import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import * as React from "react";
import { CellTooltip, ColumnMenu } from "./columnMenu";
import products from "./products.json";

import { DragAndDrop } from "@progress/kendo-react-common";
import "./App.css";
import { ReorderContext } from "./contaxt";
import { DraggableRow } from "./draggable-row";

const App = () => {
  const [gridData, setGridData] = React.useState(products);
  const [activeItem, setActiveItem] = React.useState(null);

  const reorder = (dataItem, direction) => {
    if (activeItem === dataItem) {
      return;
    }

    let reorderedData = gridData.slice();
    let prevIndex = reorderedData.findIndex((p) => p === activeItem);
    let nextIndex = reorderedData.findIndex((p) => p === dataItem);
    reorderedData.splice(prevIndex, 1);
    reorderedData.splice(
      Math.max(nextIndex + (direction === "before" ? -1 : 0), 0),
      0,
      activeItem || reorderedData[0]
    );
    setGridData(reorderedData);
  };

  const dragStart = (dataItem) => {
    setActiveItem(dataItem);
  };

  return (
    <ReorderContext.Provider
      value={{
        reorder: reorder,
        dragStart: dragStart,
      }}
    >
      <DragAndDrop>
        <Grid
          style={{
            height: "800px",
          }}
          data={gridData}
          columnVirtualization={true}
          scrollable={"virtual"}
          pageable={true}
          dataItemKey={"id"}
          rowRender={(row, rowProps) => (
            <DraggableRow elementProps={row.props} {...rowProps} />
          )}
        >
          <Column
            field="name"
            title="producto"
            columnMenu={ColumnMenu}
            cell={CellTooltip}
            editable={false}
          />
          <Column
            field="soldUnits"
            title="ventas unidades"
            columnMenu={ColumnMenu}
            format="{0:a0}"
            editable={false}
          />
          <Column field="UnitPrice" columnMenu={ColumnMenu} editable={false} />
          <Column field="soldAmount" columnMenu={ColumnMenu} editable={false} />
          <Column
            field="price"
            title="Precio"
            columnMenu={ColumnMenu}
            format="{0:a0}"
            editable={false}
          />
          <Column
            field="inventoryQuality"
            title="Calidad de inventario"
            columnMenu={ColumnMenu}
            editable={false}
          />
          <Column
            field="discount"
            editable={false}
            columnMenu={ColumnMenu}
            format="{0:p}"
          />
          <Column field="brand" columnMenu={ColumnMenu} editable={false} />
          <Column field="vtexScore" columnMenu={ColumnMenu} editable={false} />
        </Grid>
      </DragAndDrop>
    </ReorderContext.Provider>
  );
};

export default App;
