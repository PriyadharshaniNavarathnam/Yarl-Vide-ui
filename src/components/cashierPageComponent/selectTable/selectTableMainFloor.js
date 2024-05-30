import "./selectTableMainFloor.css";
import SelectTableComponent from "./selectTableComponent";

const SelectTableMainFloor = ({
  data,
  updateTableStatus,
  setSelectedTable,
  setIsShowTable
}) => {
  return (
    <div className="select-table-mainfloor">
      <div className="select-table-background-container">
        <div className="select-table-grid-container">
          {data.map((table) => (
            <SelectTableComponent
              tableNumber={table.TableCode}
              key={table.TableCode}
              tableStatus={table.TableStatus}
              updateTableStatus={updateTableStatus}
              setSelectedTable={setSelectedTable}
              setIsShowTable={setIsShowTable}
            />
          ))}
        </div>
      </div>
      <div class="select-table-status-row">
        <div class="select-table-circle green"></div>
        <div class="select-table-status-text">Vacant</div>
        <div class="select-table-circle red"></div>
        <div class="select-table-status-text">Occupied</div>
      </div>
    </div>
  );
};
export default SelectTableMainFloor;
