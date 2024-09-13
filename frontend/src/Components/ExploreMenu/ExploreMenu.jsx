import React from 'react'
import './ExploreMenu.css'
import {menu_list} from "../../assets/assets"

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='expolre-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='expolre-menu-text'>
        Choose from a divers menu featuring a delaectable arry of dishes crafted wit the finest ingredient and culinary exparties. Our mission is to stisfy your craving and elavate your dining experiences, Once delicious meal at time.
        </p>
         <div className="explore-menu-list">
            {
                menu_list.map((item, i)=>{
                   return (
                   <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={i} className="explore-menu-list-item">
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                   </div>
                   ) 
                })
            }
         </div>
         <hr />
    </div>
  )
}

export default ExploreMenu
