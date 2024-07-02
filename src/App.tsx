
import { Routes, Route } from "react-router-dom";
import CategoriesPage from "./components/categories/CategoriesPage.tsx";
import CategoryCreatePage from "./components/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./components/edit/CategoryEditPage.tsx";
import ProductListPage from "./components/product/list/ProductListPage.tsx";
import ProductCreate from "./components/product/create/ProductCreate.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<CategoriesPage />} />
            <Route path="/create" element={<CategoryCreatePage />} />
            <Route path="/edit/:id" element={<CategoryEditPage />} />
            <Route path="products/:id" element={<ProductListPage/>}/>
            <Route path="products/:id/create" element={<ProductCreate />} />
        </Routes>
    );
};

export default App;
