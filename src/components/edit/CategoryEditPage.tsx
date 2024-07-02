import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from "axios";
import {ICategoryCreate} from "../create/types.ts";

const CategoryEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get the id from the route parameters
    const [data, setData] = useState<ICategoryCreate>({
        name: "",
        image: null
    });

    // Fetch the category data when the component mounts
    useEffect(() => {
        fetchCategory();
    }, [id]);

    const fetchCategory = () => {
        axios.get(`http://localhost:8000/api/categories/${id}`)
            .then(resp => {
                setData({ name: resp.data.name, image: null });
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image) {
            formData.append("image", data.image);
        }
        axios.post(`http://localhost:8000/api/categories/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(resp => {
            console.log("Server result", resp.data);
            navigate("/");
        }).catch(err => {
            console.error(err);
        });
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files != null) {
            const file = files[0];
            if (file) {
                setData({ ...data, image: file });
            }
        }
    };

    return (
        <>
            <h1 className="text-center text-4xl font-bold">Редагувати категорію</h1>
            <div className={"mt-[20px] flex justify-center"}>
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                          onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                   htmlFor="name">
                                Назва
                            </label>
                            <input className="shadow appearance-none border rounded w-full
                            py-2 px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline" id="name" name={"name"}
                                   onChange={handleChangeInput}
                                   value={data.name}
                                   type="text" placeholder="Назва"/>
                        </div>

                        <div className="mb-4">
                            <label className="block">
                                <span className="sr-only">Оберіть фото</span>
                                <input type="file" onChange={handleChangeFile} className="block w-full text-sm text-gray-500
                                       file:me-4 file:py-2 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-600 file:text-white
                                       hover:file:bg-blue-700
                                       file:disabled:opacity-50 file:disabled:pointer-events-none
                                       dark:text-neutral-500
                                       dark:file:bg-blue-500
                                       dark:hover:file:bg-blue-400
                                     "/>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Зберегти
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
};

export default CategoryEditPage;
