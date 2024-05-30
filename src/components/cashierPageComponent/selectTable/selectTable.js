import "./selectTable.css";
import { useState, useEffect } from "react";
import SelectTableMainFloor from "./selectTableMainFloor";
import SelectTableTopTabNavigation from "./selectTableTopTabNavigation";
import SelectTableUpperFloor from "./selectTableUpperFloor";
import { getTableDetails } from "../../../services/tablePageApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const SelectTablePage = ({ setSelectedTable, setIsShowTable }) => {
  //Calling Api
  const [dataFloor0, setDataFloor0] = useState([]);
  const [dataFloor1, setDataFloor1] = useState([]);

  useEffect(() => {
    getTableDetails({ setDataFloor0, setDataFloor1 });
  }, []);

  const updateTableStatusFloor0 = (TableCode, newStatus) => {
    const updatedDataFloor0 = dataFloor0.map((table) => {
      if (table.TableCode === TableCode) {
        return { ...table, TableStatus: newStatus };
      }
      return table;
    });
    setDataFloor0(updatedDataFloor0);
  };
  const updateTableStatusFloor1 = (TableCode, newStatus) => {
    const updatedDataFloor1 = dataFloor1.map((table) => {
      if (table.TableCode === TableCode) {
        return { ...table, TableStatus: newStatus };
      }
      return table;
    });
    setDataFloor1(updatedDataFloor1);
  };
  //////////////////
  const [selectedTab, setSelectedTab] = useState("Main Floor");
  const handleCloseIconClick = () => {
    setIsShowTable(false);
    //  navigate('/cashier-home-page/orders');
  };

  return (
    <div>
      <div className="select-table-tableHeader">
        <h1 className="select-table-title">Tables</h1>
        <FontAwesomeIcon
        icon={faClose}
        className="select-table-close-icon"
        onClick={handleCloseIconClick}
      />
      </div>
      <div>
        <SelectTableTopTabNavigation onSelectTab={setSelectedTab} />
        {selectedTab === "Main Floor" && (
          <SelectTableMainFloor
            data={dataFloor0}
            updateTableStatus={updateTableStatusFloor0}
            setSelectedTable={setSelectedTable}
            setIsShowTable={setIsShowTable}
          />
        )}
        {selectedTab === "Upper Floor" && (
          <SelectTableUpperFloor
            data={dataFloor1}
            updateTableStatus={updateTableStatusFloor1}
            setSelectedTable={setSelectedTable}
            setIsShowTable={setIsShowTable}
          />
        )}
      </div>
    </div>
  );
};
export default SelectTablePage;
