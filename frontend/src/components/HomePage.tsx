import ProductAside from './ProductAside'
import ProductBanner from './ProductBanner'
import ProductList from './ProductList'

function HomePage() {
    return (
        <div>
            <ProductBanner />
            <ProductList />
            <ProductAside />
        </div>
    )
}

export default HomePage
