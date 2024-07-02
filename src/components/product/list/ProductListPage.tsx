import {Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProductItem } from "./types.ts";

const ProductListPage = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<IProductItem[]>([]);

    useEffect(() => {
        fetchProducts();
    }, [id]);

    const fetchProducts = () => {
        axios.get(`http://localhost:8000/api/products?categoryId=${id}`)
            .then(resp => {
                setData(resp.data);
            });
    };

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(() => {
                fetchProducts();  // Fetch categories again after successful deletion
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <h1 className="text-center text-4xl font-bold">Продукти з id {id}</h1>
            <Link to={"create"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Додати
                </button>
            </Link>
            <div className={"grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"}>
                {data.map(item => (
                    <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">{item.name}</div>
                            <p className="text-gray-700 text-base">{item.description}</p>
                            <p className="text-gray-700 text-base">Price: ${item.price}</p>
                            <p className="text-gray-700 text-base">Quantity: {item.quantity}</p>
                            {/*<p className="text-gray-700 text-base">Category ID: {item.category_id}</p>*/}
                            <div className="flex justify-around">
                                <button onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                > Delete
                                </button>
                                {/*<Link to={`/edit/${item.id}`}>*/}
                                {/*    <button*/}
                                {/*        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit*/}
                                {/*    </button>*/}
                                {/*</Link>*/}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductListPage;
