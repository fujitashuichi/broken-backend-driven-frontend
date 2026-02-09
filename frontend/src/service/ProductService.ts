import type { ServiceResult } from "../types/dto/types.service";

export class ProductService {
    API_URL = import.meta.env.VITE_API_URL;

    fetchProducts = async (): Promise<ServiceResult> => {
        try {
            const response = await fetch(`${this.API_URL}/products`);

            if (!response.ok) {
                throw new Error(`fetch error: status${response.status}(${response.statusText})`)
            }

            return {
                ok: true,
                value: response.json()
            }
        } catch (e) {
            if (e instanceof Error) {
                return {
                    ok: false,
                    error: e
                }
            }

            return {
                ok: false,
                error: new Error("unknown error")
            }
        }
    }
}