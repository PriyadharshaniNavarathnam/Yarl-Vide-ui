import "./selectTableComponent.css";

const TableTwoChair = ({ number }) => {
  return (
    <div>
      <div className="select-table-table-twoChairs">
        <div className="select-table-chair-right dark:bg-gray-400"> </div>
        <div className="select-table-table dark:bg-gray-600">{number}</div>
        <div className="select-table-chair-right dark:bg-gray-400"> </div>
      </div>
    </div>
  );
};
const ThreeChair = () => {
  return (
    <div className="select-table-threeChairs">
      <div className="select-table-chair-top dark:bg-gray-400"></div>
      <div className="select-table-chair-top dark:bg-gray-400"></div>
      <div className="select-table-chair-top dark:bg-gray-400"></div>
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
      className="select-table-table-container dark:bg-gray-700 dark:text-white font-semibold"
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
