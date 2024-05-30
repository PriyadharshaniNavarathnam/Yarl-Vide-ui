import TableComponent from "./tableComponent";
import "./upperFloor.css"

const UpperFloor =({data, updateTableStatus})=>{
    return (
        <div className="upperFloor">
            <div className="up-background-container">
            <div className="up-grid-container">
            {data.map(table => (
        <TableComponent tableNumber={table.TableCode} key={table.TableCode} tableStatus={table.TableStatus} updateTableStatus={updateTableStatus}/>
      ))}
    </div>
        </div>
       <div class="up-status-row">
       <div class="up-circle green"></div>
       <div class="up-status-text">Vacant</div>
       <div class="up-circle red"></div>
       <div class="up-status-text">Occupied</div>
     </div>
     
        </div>
    );
}
export default UpperFloor;