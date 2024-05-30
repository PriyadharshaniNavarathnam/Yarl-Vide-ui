import "./selectTableComponent.css";

const TableTwoChair = ({ number }) => {
  return (
    <div>
      <div className="select-table-table-twoChairs">
        <div className="select-table-chair-right"> </div>
        <div className="select-table-table">{number}</div>
        <div className="select-table-chair-right"> </div>
      </div>
    </div>
  );
};
const ThreeChair = () => {
  return (
    <div className="select-table-threeChairs">
      <div className="select-table-chair-top"></div>
      <div className="select-table-chair-top"></div>
      <div className="select-table-chair-top"></div>
    </div>
  );
};
const SelectTableComponent = ({
  tableNumber,
  tableStatus,
  setSelectedTable,
  setIsShowTable,
}) => {
  const handleClick = () => {
    if (tableStatus == "Available") {
      setIsShowTable(false);
      setSelectedTable(tableNumber);
    } else {
      alert("This Table is occupied!");
    }
  };

  return (
    <div
      className="select-table-table-container"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div></div>
      <div className="select-table-table-setup" style={{ scale: "1.3" }}>
        <ThreeChair />
        <TableTwoChair number={tableNumber} />
        <ThreeChair />
      </div>
      <div
        className={
          tableStatus == "Available"
            ? "select-table-active-line-green"
            : "select-table-active-line-red"
        }
      ></div>
    </div>
  );
};

export default SelectTableComponent;
