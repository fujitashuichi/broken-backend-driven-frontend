/// Coder A

import { useEffect, useState } from 'react'
import ProductAdaptor from '../service/ProductAdaptor.ts'
import type { Product } from '../types/common/types.data.ts'

const loader = ProductAdaptor()

function ProductAside() {
    const [list, setList] = useState<Product[] | null>(null)
    const [errorCount, setErrorCount] = useState(0)

    useEffect(() => {
        loader.load().then((result) => {
            if (result.status === 'success') {
                setList(result.value as Product[])
                return
            }

            setErrorCount((prev) => prev + 1)
        })

        setTimeout(() => {
            loader.load().then((result) => {
                if (result.status === 'success') {
                    setList(result.value as Product[])
                }
            })
        }, 1200)
    }, [])

    if (!list) return null

    return (
        <aside>
            <p>error:{errorCount}</p>
            <ul>
                {list.slice(0, 3).map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </aside>
    )
}

export default ProductAside
