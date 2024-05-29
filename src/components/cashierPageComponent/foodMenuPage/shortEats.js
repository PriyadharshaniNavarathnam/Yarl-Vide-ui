import FoodComponent from "./foodComponent";

import "./shortEats.css"

const ShortEatsPage=({data,setSelectedFoods, searchText})=>{
return (
    <div className="background-container-shortEats">
            <div className="grid-container-shortEats">
            {data.map((menuItem,index) => (
              menuItem.MenuName.toLowerCase().includes(searchText.toLowerCase())?
        <FoodComponent menuItem={menuItem} setSelectedFoods={setSelectedFoods} key={index}/>:<div></div>
      ))}
    </div>
        </div>
);
}
export default ShortEatsPage;