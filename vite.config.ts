import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"

export default defineConfig({
    plugins: [solidPlugin()],
    base: "/kepler/",
    server: {
        port: 3000,
        host: "0.0.0.0",
    },
    build: {
        target: "esnext",
    },
    resolve: {
        conditions: ["development", "browser"],
    },
    test: {
        environment: "jsdom",
        transformMode: { web: [/\.[jt]sx?$/] },
    },
})
