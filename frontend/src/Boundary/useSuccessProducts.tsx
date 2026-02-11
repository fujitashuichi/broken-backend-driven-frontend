import { useProducts } from '../Provider/ProductContext'

////// Boundary の設定が間違っているとき、throw Error します.
////// Status が排除され、ProductsのみをUIで扱います

export const useSuccessProducts = () => {
    const data = useProducts();

    if (data.status !== "success") {
        throw new Error("UI must be used in Boundary");
    }

    return data.products;
}
