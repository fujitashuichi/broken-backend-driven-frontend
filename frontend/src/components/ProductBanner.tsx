import { useEffect, useState } from 'react'
import { useSuccessProducts } from '../Boundary/useSuccessProducts'
import type { Product } from '../types/common/types.data'


function ProductBanner() {
    const products = useSuccessProducts();

    const [first, setFirst] = useState<Product>(products[0]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFirst(products[products.length - 1]);
        }, 700)

        return () => clearTimeout(timer);
    }, [products])

    return (
        <section>
            <h2>Banner</h2>
            <div>{first.name || ""}</div>
        </section>
    )
}

export default ProductBanner
