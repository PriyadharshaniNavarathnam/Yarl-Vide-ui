import TableComponent from "./tableComponent";
import "./mainFloor.css"

const MainFloor =({data, updateTableStatus})=>{
    return (
        <div className="mainfloor">
            <div className="background-container">
            <div className="grid-container">
      {data.map(table => (
        <TableComponent tableNumber={table.TableCode} key={table.TableCode} tableStatus={table.TableStatus} updateTableStatus={updateTableStatus}/>
      ))}
    </div>
        </div>
       <div class="status-row">
       <div class="circle green"></div>
       <div class="status-text">Vacant</div>
       <div class="circle red"></div>
       <div class="status-text">Occupied</div>
     </div>
     
        </div>
    );
}
export default MainFloor;