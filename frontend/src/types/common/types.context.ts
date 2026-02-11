import type { Product } from "./types.data"

export type ProductContextType =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error", error: Error }
    | { status: "success", products: Product[] }