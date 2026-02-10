import { useEffect, useState } from 'react'
import ProductAdaptor from '../service/ProductAdaptor'
import type { Product } from '../types/common/types.data'

const adaptor = ProductAdaptor()

function ProductBanner() {
    const [first, setFirst] = useState<Product | undefined>(undefined)
    const [note, setNote] = useState('')

    useEffect(() => {
        adaptor.load().then((result) => {
            if (result.status === 'success') {
                const list = result.value as Product[]
                setFirst(list[0])
                setNote('primary')
                return
            }
            setNote('error-ish')
        })

        setTimeout(() => {
            adaptor.load().then((result) => {
                if (result.status === 'success') {
                    const list = result.value as Product[]
                    setFirst(list[list.length - 1])
                }
            })
        }, 700)
    }, [])

    if (!first) return null

    return (
        <section>
            <strong>pickup:{note}</strong>
            <div>{first.name}</div>
        </section>
    )
}

export default ProductBanner
