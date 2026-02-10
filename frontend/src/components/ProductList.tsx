/// Coder A

import { useEffect, useState } from 'react'
import type { Product } from '../types/common/types.data'
import ProductAdaptor from '../service/ProductAdaptor'
import ProductController from '../Controller/ProductController';

const adaptor = ProductAdaptor();

function ProductList() {
    const [items, setItems] = useState<Product[] | undefined>(undefined)

    useEffect(() => {
        setTimeout(async () => {
            const response = await ProductController().load();
            if (response.status !== "success") {
                setItems([]);
            } else {
                setItems([]);
            }
        }, 300)
    }, [])

    if (!items) return <h1>No Contents.</h1>

    return (
        <div>
            <div>status:{status}</div>
            <ul>
                {items.map((item) => (
                    <li key={`${item.id}-${item.name}`}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList
