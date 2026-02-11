import { createContext, useContext } from "react";
import type { ProductContextType } from "../types/common/types.context";

export const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
    const ctx = useContext(ProductContext);
    if (ctx === null) {
        throw new Error("ProductContext must be used in ProductProvider");
    }
    return ctx;
}