/// Coder A

import { useEffect, useState } from 'react'
import type { Product } from '../types/common/types.data'
import { useProducts } from '../Provider/ProductContext';

function ProductList() {
    const [items, setItems] = useState<Product[] | undefined>(undefined)
    const [status, setStatus] = useState("boot");

    useEffect(() => {
        // TODO: 本来は Controller に寄せる予定
        setTimeout(async () => {
            const { } = useProducts();
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
