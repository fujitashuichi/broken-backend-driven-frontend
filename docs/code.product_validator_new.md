```ts
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
```