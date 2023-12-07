import { Link, useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { ErrorType } from "./LoginPage";

export type Product = {
    _id: string,
    title: string,
    price: number,
    image: string,
    categoryID: Category,
    description: string,
   
}
export type Category = {
  _id: string;
  name: string;
  desc: string;
  slug: string;
};

const ProductList = ()=>{
  const navigate = useNavigate()
   const [productList, setProductList] = useState<Product[]>([]);

    const fetchProduct = async()=>{
        try {
            const {data} = await axios.get('http://localhost:8000/api/products')
            setProductList(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
          return navigate('/')
        }
        fetchProduct()
    },[])
    const handleRemove =async(id: string)=>{
        try {
            if(window.confirm('Remove Product?')){
                await axios.delete(`/api/products/${id}`)
                fetchProduct()
                   toast.success("Delete Successfull - " + id,{
          position: toast.POSITION.BOTTOM_CENTER
        })
            }
        } catch (error) {
          const err = error as ErrorType
            console.log(error);
            toast.error('Delete Failed -  ' + err.response.data.message,{
          position: toast.POSITION.BOTTOM_CENTER
        })
        }
    }

    return(
         <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Product List
      </h1>
      <Link to={"/admin/create"}>
        <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Product
        </button>
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
                <th scope="col" className="px-6 py-3">
                Image
              </th>
               <th scope="col" className="px-6 py-3">
                CateGory
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => (
            <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.title}
                </th>
                <td className="px-6 py-4">$ {product.price}</td>
                 <td className="px-6 py-4"><img src={product.image} className="w-[30px]"  alt="" /></td>
                <td className="px-6 py-4 flex gap-[2px] items-center">
                    {product.categoryID.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link to={`/admin/products/edit/${product._id}`}>
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Edit
                      </button>
                    </Link>

                    <button
                    onClick={()=> handleRemove(product._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
    )
}

export default ProductList