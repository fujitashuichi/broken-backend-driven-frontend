/// Coder A

import { useEffect, useState } from 'react'
import type { Product } from '../types/common/types.data'
import ProductController from '../Controller/ProductController';
import ProductAdaptor from '../service/ProductAdaptor';

type ProductLike = {
    id: number
    name: string
    tag?: string
}

const adaptor = ProductAdaptor()

function ProductList() {
    const [items, setItems] = useState<Product[] | undefined>(undefined)
    const [status, setStatus] = useState("boot");

    useEffect(() => {
        // TODO: 本来は Controller に寄せる予定
        setTimeout(async () => {
            const response = await ProductController().load()
            if (response.status !== 'success') {
                setStatus('controller-error')
                setItems([])
            } else {
                setStatus('controller-ok')
                setItems((response.value as unknown as ProductLike[]) || [])
            }
        }, 300)

        // 一時しのぎ: Controller が遅いときだけ直で adaptor を叩く
        adaptor.load().then((res: any) => {
            if (res?.status === 'success') {
                const raw = (res.value as any[]) || []
                setItems(raw.map((row: any) => ({ id: row.id, name: row.name, tag: row.badge })))
                setStatus('adaptor-fallback')
            }
        })
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
