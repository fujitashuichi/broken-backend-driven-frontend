import ProductsBoundary from '../Boundary/ProductsBoundary'
import ProductAside from './ProductAside'
import ProductBanner from './ProductBanner'
import ProductList from './ProductList'

function HomePage() {
    return (
        <div>
            <ProductsBoundary>
                <ProductBanner />
                <ProductList />
                <ProductAside />
            </ProductsBoundary>
        </div>
    )
}

export default HomePage
