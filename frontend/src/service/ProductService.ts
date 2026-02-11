/// Me

import type { ServiceResult } from "../types/dto/types.service";

export class ProductService {
    private readonly API_URL = import.meta.env.VITE_API_URL;

    fetchProducts = async (): Promise<ServiceResult> => {
        try {
            const response = await fetch(`${this.API_URL}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const data = await response.json();
                // ok出ないにも関わらず中身が正常系の場合
                if (data) {
                    return {
                        ok: true,
                        value: data
                    }
                }

                throw new Error(`fetch error: status${response.status}`)
            }

            return {
                ok: true,
                value: await response.json()
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