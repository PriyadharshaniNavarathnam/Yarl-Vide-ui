import FoodComponent from "./foodComponent";

import "./mainCourse.css"

const MainCoursePage=({data,setSelectedFoods,searchText})=>{
return (
    <div className="background-container-mainCourse">
            <div className="grid-container-mainCourse">
            {data.map((menuItem,index) => (
              menuItem.MenuName.toLowerCase().includes(searchText.toLowerCase())?
        <FoodComponent menuItem={menuItem} setSelectedFoods={setSelectedFoods} key={index}/>:<div></div>
      ))}
    </div>
        </div>
);
}
export default MainCoursePage;