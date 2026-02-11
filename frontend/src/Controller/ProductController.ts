import type { ControllerType } from '../types/common/types.controller';
import ProductAdaptor from '../service/ProductAdaptor';

////// { "error", Error } | { "success", unknown } のみを返す
////// 使用者は、isProduct(unknown) などでバリデーションする

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
