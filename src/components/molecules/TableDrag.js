import { DragAndDrop } from "@progress/kendo-react-common";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import * as React from "react";
import { ReorderContext } from "../../context";
import { DraggableRow } from "../atoms/DraggableRow";
import { DragHandleCell } from "../atoms/DragHandleCell";

const TableDrag = ({ products }) => {
  const [gridData, setGridData] = React.useState(products);
  console.log("🙀: gridData", gridData);
  const [activeItem, setActiveItem] = React.useState(null);

  const reorder = (dataItem, direction) => {
    console.log("🙀: activeItem === dataItem", activeItem === dataItem);
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
    setGridData({ ...gridData, data: reorderedData });
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
            height: "400px",
          }}
          data={gridData}
          dataItemKey={"id"}
          rowRender={(row, rowProps) => (
            <DraggableRow elementProps={row.props} {...rowProps} />
          )}
        >
          <Column title="" width="80px" cell={DragHandleCell} />
          <Column field="id" title="Product Id" filter={"numeric"} />
          <Column field="name" title="Product Name" filter={"text"} />
          <Column
            field="price"
            title="Price"
            format="{0:c0}"
            filter={"numeric"}
          />
          <Column field="discount" title="Discount" filter={"numeric"} />
        </Grid>
      </DragAndDrop>
    </ReorderContext.Provider>
  );
};

export { TableDrag };
