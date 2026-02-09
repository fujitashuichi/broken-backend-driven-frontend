export type ServiceResult = {
    ok: boolean,
    error?: Error,
    value?: unknown
}

export type LoadResult =
    | { status: "error", error: Error }
    | { status: "success", value: unknown }