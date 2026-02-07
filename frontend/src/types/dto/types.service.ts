export type ServiceResult<T> = {
    ok: boolean,
    error?: Error,
    value?: T
}