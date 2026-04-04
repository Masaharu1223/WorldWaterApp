import "@testing-library/jest-dom";

// Suppress Next.js-specific globals missing in jsdom
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).Request = globalThis.Request ?? class {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).Response = globalThis.Response ?? class {};
