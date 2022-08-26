import { GridColumnMenuFilter } from "@progress/kendo-react-grid";

const ColumnMenu = (props) => {
  return (
    <div>
      <GridColumnMenuFilter {...props} expanded={true} />
    </div>
  );
};

export { ColumnMenu };
