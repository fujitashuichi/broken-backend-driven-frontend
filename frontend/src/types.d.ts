interface ImportMetaEnv {
    readonly VITE_API_URL: string
    // 他の環境変数...
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
