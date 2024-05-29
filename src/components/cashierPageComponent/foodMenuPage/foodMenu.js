
import React,{useState} from "react";
import "./foodMenu.css"
import TopTabNavigationCashier from "../header/topTabNavigation";
import ShortEatsPage from "./shortEats";
import MainCoursePage from "./mainCourse";


const FoodMenu=({seMenu,mcMenu,setSelectedFoods,searchText})=>{
    const [selectedTab, setSelectedTab] = useState('Short Eats');
return (
   <div className="foodMenu">
    <TopTabNavigationCashier onSelectTab={setSelectedTab}/>
    {selectedTab === 'Short Eats' && <ShortEatsPage data={seMenu} setSelectedFoods={setSelectedFoods} searchText={searchText}/>}
    {selectedTab === 'Main Course' && <MainCoursePage data={mcMenu} setSelectedFoods={setSelectedFoods} searchText={searchText}/>}
   </div>
);
}
export default FoodMenu;