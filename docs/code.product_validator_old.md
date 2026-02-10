```ts
import type { Product } from "../types/common/types.data"

const ProductShape = {
    id: "number",
    name: "string"
} as const;

export const isProduct = (value: unknown): value is Product => {
    const isRequiredKeys = (value: object) => {
        return (
            (Object.entries(ProductShape)).every(([key, type]) => {
                return key in value && typeof (value as any)[key] === type;
            })
        )
    }


    return (
        value instanceof Object &&
        value !== null &&
        isRequiredKeys(value)
    )
}

export const isProductArray = (value: unknown): value is Product[] => {
    return (
        Array.isArray(value) &&
        value.every(item => isProduct(item))
    )
}
```