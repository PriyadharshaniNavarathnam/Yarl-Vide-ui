import "./selectTableUpperFloor.css";
import SelectTableComponent from "./selectTableComponent";

const SelectTableUpperFloor = ({
  data,
  updateTableStatus,
  setSelectedTable,
  setIsShowTable
}) => {
  return (
    <div className="select-table-upperFloor">
      <div className="select-table-up-background-container">
        <div className="select-table-up-grid-container">
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
      <div class="select-table-up-status-row">
        <div class="select-table-up-circle green"></div>
        <div class="select-table-up-status-text">Vacant</div>
        <div class="select-table-up-circle red"></div>
        <div class="select-table-up-status-text">Occupied</div>
      </div>
    </div>
  );
};
export default SelectTableUpperFloor;
