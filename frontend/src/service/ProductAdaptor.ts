import type { LoadResult, ServiceResult } from '../types/dto/types.service';
import { ProductService } from './ProductService'

const service = new ProductService();

function ProductAdaptor() {
    const load = async (): Promise<LoadResult> => {
        const response: ServiceResult = await service.fetchProducts();

        if (!response.ok) {
            const error = response.error;
            return {
                status: "error",
                error: error || new Error("response.error not found")
            }
        }

        return {
            status: "success",
            value: response.value
        }
    }

    return { load }
}

export default ProductAdaptor
