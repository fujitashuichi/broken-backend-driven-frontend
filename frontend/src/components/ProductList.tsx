/// Coder A

import { useSuccessProducts } from '../Boundary/useSuccessProducts';

function ProductList() {
    const products = useSuccessProducts();

    return (
        <div>
            <h2>List</h2>
            <ul>
                {products.map((item) => (
                    <li key={`${item.id}-${item.name}`}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList
