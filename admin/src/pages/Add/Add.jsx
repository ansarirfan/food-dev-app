import './Add.css'
import { assets } from '../../assets/assets'
import {  useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'



const Add = ({url}) => {


  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
  };

  const onSubnitHandler = async  (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image)
  
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        // Reset form
        setData({
          name:"",
          description:"",
          price:"",
          category:"Salad"
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding food:", error);
    }
    
  } 
    
  
  return (
    <div className='add'>
      <form className="add-col" onSubmit={onSubnitHandler}>
        <div className="img-upload add-col">
          <p>Upload Image</p>
          <label htmlFor="image">
          <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-productName add-col">
            <p>Product Name</p>
            <input onChange={handleChange} value={data.name} type="text" name='name' placeholder='Type here ..' />
        </div>
        <div className="add-description add-col">
          <p>Product Description</p>
          <textarea  onChange={handleChange} value={data.description}  name="description" rows={6} placeholder='Type Your Content Here..' />
        </div>

        <div className="add-category-price">
          <div className="add-category add-col">
            <p>Product Category</p>
            <select  onChange={handleChange}  name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price add-col">
              <p>Product Price</p>
              <input  onChange={handleChange} value={data.price}  type="Number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='addBtn'>ADD</button>
      </form>
      
    </div>
  )
}

export default Add
