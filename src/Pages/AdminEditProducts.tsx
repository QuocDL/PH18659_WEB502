import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ProductForm } from "./Createproduct";
import { Category } from "./AdminProductsList";
import { ErrorType } from "./LoginPage";


const AdminEditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productEdit, setProductEdit] = useState<ProductForm>({
    title: "",
    categoryID: "",
    image: "",
    price: 0,
    description: "",
  });

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const fetchProductAndCategoryList = async (id: string) => {
    try {
      const [{ data: categoriesRes }, { data: productRes }] = await Promise.all(
        [axios.get("/api/categories"), axios.get(`/api/products/${id}`)]
      );
      setCategoryList(categoriesRes);
      const { title, image, description, price, categoryID } = productRes;
      setProductEdit({
        title,
        image,
        description,
        price,
        categoryID: categoryID._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!productId) return;
    fetchProductAndCategoryList(productId);
  }, []);

  const handleChangeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProductEdit({ ...productEdit, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!productId) return;
    try {
      const { data } = await axios.put(`/api/products/${productId}`, productEdit);
      toast.success("Update Product Successfull!", data.title);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      const err = error as ErrorType
      toast.error("Update Product Failed! - " + err.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Update Product
      </h2>
      <form onSubmit={handleSubmitForm}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Title
            </label>
            <input
              value={productEdit.title}
              onChange={handleChangeForm}
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Image
            </label>
            <input
              value={productEdit.image}
              onChange={handleChangeForm}
              type="text"
              name="image"
              id="image"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product image"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Description
            </label>
            <input
              value={productEdit.description}
              onChange={handleChangeForm}
              type="text"
              name="description"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product description"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              value={productEdit.categoryID}
              onChange={handleChangeForm}
              name={"categoryID"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={"657081d49da378542c697049"}>Select category</option>
              {categoryList.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              value={productEdit.price}
              onChange={handleChangeForm}
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
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update product
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AdminEditProduct;
