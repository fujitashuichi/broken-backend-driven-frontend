/// Coder B

import { useEffect, useState } from 'react'
import ProductAdaptor from '../service/ProductAdaptor'

type ProductBannerRow = {
    id: number
    name: string
    memo?: string
}

const adaptor = ProductAdaptor()

function ProductBanner() {
    const [first, setFirst] = useState<ProductBannerRow | undefined>(undefined)
    const [note, setNote] = useState('')

    useEffect(() => {
        adaptor.load().then((result) => {
            if (result.status === 'success') {
                const list = result.value as unknown as ProductBannerRow[]
                setFirst(list[0])
                setNote('primary')
                return
            }
            setNote('error-ish')
        })

        setTimeout(() => {
            adaptor.load().then((result) => {
                if (result.status === 'success') {
                    const list = result.value as unknown as ProductBannerRow[]
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
