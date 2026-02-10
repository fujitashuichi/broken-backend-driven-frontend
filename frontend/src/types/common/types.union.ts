export type ControllerType =
    | { status: "error", error: Error }
    | { status: "success", value: unknown }