
import { Routes, Route } from "react-router-dom";
import CategoriesPage from "./components/categories/CategoriesPage.tsx";
import CategoryCreatePage from "./components/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./components/edit/CategoryEditPage.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<CategoriesPage />} />
            <Route path="/create" element={<CategoryCreatePage />} />
            <Route path="/edit/:id" element={<CategoryEditPage />} />
        </Routes>
    );
};

export default App;
