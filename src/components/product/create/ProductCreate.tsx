import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export interface IProductCreate {
    name: string;
    description: string;
    price: number;
    quantity: number;
    category_id: number;
}

const ProductCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    let categoryId: number = 0;
    if (typeof id === "string") {
        categoryId = parseInt(id, 10);
    }

    const [data, setData] = useState<IProductCreate>({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category_id: categoryId,
    });

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Data sent to server: ", data);
        axios.post("http://localhost:8000/api/products", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            console.log("Server result: ", resp.data);
            navigate("/");
        });
    };

    return (
        <>
            <h1 className="text-center text-4xl font-bold">Додати продукт</h1>
            <div className={"mt-[20px] flex justify-center"}>
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Назва
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                name="name"
                                onChange={handleChangeInput}
                                value={data.name}
                                type="text"
                                placeholder="Назва"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Опис
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                name="description"
                                onChange={handleChangeInput}
                                value={data.description}
                                type="text"
                                placeholder="Опис"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Ціна
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                name="price"
                                onChange={handleChangeInput}
                                value={data.price}
                                type="number"
                                placeholder="Ціна"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                                Кількість
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="quantity"
                                name="quantity"
                                onChange={handleChangeInput}
                                value={data.quantity}
                                type="number"
                                placeholder="Кількість"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Додати
                            </button>
                            <Link
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                to="/">
                                Скасувати
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductCreatePage;
