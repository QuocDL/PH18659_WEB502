import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOutAdmin from "./Layout/Adminlayout";
import Login from "./Pages/LoginPage";
import ProductList from "./Pages/AdminProductsList";
import AdminCreateProduct from "./Pages/Createproduct";



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/admin/" element={<LayOutAdmin/>}>
            <Route path="products" element={<ProductList/>}/>
            <Route path="create" element={<AdminCreateProduct/>}/>
          </Route>
          <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
