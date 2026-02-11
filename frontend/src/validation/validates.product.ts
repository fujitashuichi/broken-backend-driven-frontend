import type { ProductContextType } from "../types/common/types.context";
import type { ControllerType } from "../types/common/types.controller";
import type { Product } from "../types/common/types.data"
import * as z from "zod";

const ProductShape = z.object({
    id: z.number(),
    name: z.string()
});

export const isProduct = (value: unknown): value is Product => {
    return ProductShape.safeParse(value).success;
}

export const isProductArray = (value: unknown): value is Product[] => {
    return (
        Array.isArray(value) &&
        value.every(item => isProduct(item))
    )
}

// バリデーションを行い、ContextType に整形します
export const productsProviderValidator = (data: ControllerType): ProductContextType => {
    if (data.status === "error") {
        return data;
    }

    if (!isProductArray(data.value)) {
        return {
            status: "error",
            error: new Error("invalid data: fetched data type is not Product[]")
        }
    }

    return {
        status: "success",
        products: data.value
    }
}