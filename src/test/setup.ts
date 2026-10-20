import "@testing-library/jest-dom";

// The build scripts' tests run in Node (scripts/*.test.ts), where there is no window to patch.
if (typeof window !== "undefined") Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {
        },
        removeListener: () => {
        },
        addEventListener: () => {
        },
        removeEventListener: () => {
        },
        dispatchEvent: () => {
        },
    }),
});
