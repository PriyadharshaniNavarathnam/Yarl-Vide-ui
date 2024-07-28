import "./selectTableUpperFloor.css";
import SelectTableComponent from "./selectTableComponent";

const SelectTableUpperFloor = ({
  data,
  updateTableStatus,
  setSelectedTable,
  setIsShowTable
}) => {
  return (
    <div className="select-table-upperFloor dark:bg-secondary dark:text-white">
      <div className="select-table-up-background-container dark:bg-secondary dark:text-white">
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
      <div class="select-table-up-status-row dark:bg-secondary dark:text-white">
        <div class="select-table-up-circle green"></div>
        <div class="select-table-up-status-text">Vacant</div>
        <div class="select-table-up-circle red"></div>
        <div class="select-table-up-status-text">Occupied</div>
      </div>
    </div>
  );
};
export default SelectTableUpperFloor;
