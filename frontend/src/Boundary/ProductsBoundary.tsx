import { useProducts } from "../Provider/ProductContext"

function ProductsBoundary({ children }: { children: React.ReactNode }) {
    const data = useProducts();

    if (data.status === "idle" || data.status === "loading") {
        return (
            <>
                <h1>Now Loading...</h1>
            </>
        )
    }

    if (data.status === "error") {
        return (
            <>
                <h1>Error</h1>
            </>
        )
    }

    return (<>{children}</>)
}

export default ProductsBoundary