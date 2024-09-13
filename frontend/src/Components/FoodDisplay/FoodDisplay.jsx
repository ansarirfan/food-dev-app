import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodITem from '../FoodITem/FoodITem'


const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item, i)=>{
              if(category==='All' || category === item.category){
                return <FoodITem key={i} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
              }
               
            })}
        </div>
    </div>
  )
}

export default FoodDisplay
