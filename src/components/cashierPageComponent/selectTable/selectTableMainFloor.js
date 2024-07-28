import "./selectTableMainFloor.css";
import SelectTableComponent from "./selectTableComponent";

const SelectTableMainFloor = ({
  data,
  updateTableStatus,
  setSelectedTable,
  setIsShowTable
}) => {
  return (
    <div className="select-table-mainfloor dark:bg-secondary dark:text-white">
      <div className="select-table-background-container dark:bg-secondary dark:text-white py-0">
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
      <div class="select-table-status-row" className="dark:bg-secondary dark:text-white flex py-0">
        <div class="select-table-circle green"></div>
        <div class="select-table-status-text">Vacant</div>
        <div class="select-table-circle red"></div>
        <div class="select-table-status-text">Occupied</div>
      </div>
    </div>
  );
};
export default SelectTableMainFloor;
