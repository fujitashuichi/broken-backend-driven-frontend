import React, { useEffect, useState } from 'react'
import { ProductContext } from './ProductContext'
import type { ProductContextType } from '../types/common/types.context'
import ProductController from '../Controller/ProductController';
import { productsProviderValidator } from '../validation/validates.product';


function ProductProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<ProductContextType>({ status: "idle" });

    const controller = ProductController();

    useEffect(() => {
        const load = async () => {
            setData({ status: "loading" });
            const response = await controller.load();
            const validatedData = productsProviderValidator(response);
            setData(validatedData);
        }
        load();
    }, [controller]);

    return (<ProductContext.Provider value={data}>{children}</ProductContext.Provider>)
}

export default ProductProvider
