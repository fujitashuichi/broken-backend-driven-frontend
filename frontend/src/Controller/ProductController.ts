import type { ControllerType } from '../types/common/types.union';
import ProductAdaptor from '../service/ProductAdaptor';


function ProductController() {
    const adaptor = ProductAdaptor();

    const load = async (): Promise<ControllerType> => {
        const response = await adaptor.load();

        if (response.status !== 'success') {
            const error = response.error;
            return {
                status: "error",
                error: error
            }
        }

        return {
            status: "success",
            value: response.value
        }
    }

    return { load }
}

export default ProductController
