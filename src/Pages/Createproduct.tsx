import { useNavigate } from "react-router-dom"
import React, {useEffect, useState} from 'react'
import { Category, Product } from "./AdminProductsList";
import axios from 'axios'

export type ProductForm = Omit<Product, "_id" | "categoryID"> & {
  categoryID: string;
}
const AdminCreateProduct = ()=>{
    const navigate = useNavigate()
 const [productCreate, setInfoProducts] = useState<ProductForm>({
    title: "",
    image: "",
    categoryID : '',
    price: 0,
    description: "",
  });

const [categoryList, setCategoryList] = useState<Category[]>([]);
  const fetchCategoryList = async()=>{
    try {
        const {data} = await axios.get('http://localhost:8000/api/categories')
        setCategoryList(data)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    fetchCategoryList()
  },[])

  const changeOnForm = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    setInfoProducts({...productCreate,[event.target.name]: event.target.value})
  }
  const onSubmitForm = async(e: React.SyntheticEvent)=>{
    e.preventDefault()

    try {
        await axios.post('http://localhost:8000/api/products', productCreate)
        navigate('/admin/products')
    } catch (error) {
        console.log(error);
    }
  }


  return(
     <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
        <form onSubmit={onSubmitForm}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Title
              </label>
              <input
              value={productCreate.title}
                onChange={changeOnForm}
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product title"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Image
              </label>
              <input
                value={productCreate.image}
                onChange={changeOnForm}
                type="text"
                name="image"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product Image"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="categoryID"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                CategoryID
              </label>
              <select
                value={productCreate.categoryID}
                onChange={changeOnForm}
                id="categoryID"
                name={"categoryID"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value={""}>Select category</option>\
                {categoryList.map((category, index)=>(
                    <option key={index} value={category._id}>
                        {category.name}
                    </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
              value={productCreate.description}
                onChange={changeOnForm}
                name="description"
                id="description"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
              value={productCreate.price}
                onChange={changeOnForm}
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
              />
            </div>

          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminCreateProduct