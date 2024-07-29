import FoodComponent from "./foodComponent";
import imageUrl1 from "../../../assets/images/food1.jpg";
import imageUrl2 from "../../../assets/images/food2.jpg";
import imageUrl3 from "../../../assets/images/food3.jpg";
import imageUrl4 from "../../../assets/images/food4.png";
import imageUrl5 from "../../../assets/images/food5.jpeg";
import imageUrl6 from "../../../assets/images/food6.png";
import imageUrl7 from "../../../assets/images/food7.jpg";
import imageUrl8 from "../../../assets/images/food8.jpg";
import imageUrl9 from "../../../assets/images/food9.jpg";
import imageUrl10 from "../../../assets/images/food10.jpg";
import imageUrl11 from "../../../assets/images/food11.png";
import imageUrl12 from "../../../assets/images/food12.jpg";
import imageUrl13 from "../../../assets/images/food13.jpg";
import imageUrl14 from "../../../assets/images/food14.jpg";
import imageUrl15 from "../../../assets/images/food15.jpg";
import imageUrl16 from "../../../assets/images/food16.jpg";
import imageUrl17 from "../../../assets/images/food17.jpg";
import imageUrl18 from "../../../assets/images/food18.jpg";
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