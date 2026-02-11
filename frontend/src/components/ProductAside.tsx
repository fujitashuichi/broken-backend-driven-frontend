/// Coder B

import { useSuccessProducts } from '../Boundary/useSuccessProducts.tsx'

function ProductAside() {
    const products = useSuccessProducts();

    return (
        <aside>
            <ul>
                {products.slice(0, 3).map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </aside>
    )
}

export default ProductAside
