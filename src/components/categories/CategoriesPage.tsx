import React, { useEffect, useState } from "react";
import axios from "axios";
import { ICategoryItem } from "./types.ts";

const CategoriesPage = () => {
    const [data, setData] = useState<ICategoryItem[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get<ICategoryItem[]>("http://localhost:8000/api/categories")
            .then(resp => {
                setData(resp.data);  // Update data state with fetched categories
            })
            .catch(err => {
                console.error(err);
            });
    };

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("image", image);  // Append the image file to FormData
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        axios.post("http://localhost:8000/api/categories", formData, config)
            .then(() => {
                fetchCategories();  // Fetch categories again after successful creation
                setName("");
                setImage(null);
                closeCreateModal();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8000/api/categories/${id}`)
            .then(() => {
                fetchCategories();  // Fetch categories again after successful deletion
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-center text-4xl font-bold">Categories</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    Create
                </button>

                <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.map(item => (
                        <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img
                                className="w-full"
                                src={`http://localhost:8000/upload/${item.image}`}
                                alt={item.name}
                            />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-center">{item.name}</div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Створити нову категорію</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Назва</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Зображення</label>
                                <input
                                    type="file"
                                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Зберегти
                                </button>
                                <button
                                    type="button"
                                    onClick={closeCreateModal}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline"
                                >
                                    Скасувати
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CategoriesPage;
