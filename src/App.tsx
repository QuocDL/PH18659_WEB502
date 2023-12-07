import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOutAdmin from "./Layout/Adminlayout";
import Login from "./Pages/LoginPage";
import ProductList from "./Pages/AdminProductsList";
import AdminCreateProduct from "./Pages/Createproduct";
import AdminEditProduct from "./Pages/AdminEditProducts";
import 'react-toastify/ReactToastify.css'
import SignUpPage from "./Pages/SignUpPage";
import { configureAxios } from "./config/axios";

configureAxios()

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/admin/" element={<LayOutAdmin/>}>
            <Route path="products" element={<ProductList/>}/>
            <Route path="create" element={<AdminCreateProduct/>}/>
            <Route path="products/edit/:productId" element={<AdminEditProduct/>}/>
          </Route>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
