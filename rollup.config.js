import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import nodePolyfills from "rollup-plugin-node-polyfills";
import packageJson from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const plugins = [
    peerDepsExternal(),
    nodePolyfills(),
    resolve(),
    commonjs(),
    postcss({
        inject: true,
    }),
    typescript({
        tsconfig: "./tsconfig.json",
    }),
    babel({
        babelHelpers: "bundled",
        extensions,
        exclude: "node_modules/**",
    }),
    terser(),
];

export default [
    {
        input: "src/editor/index.jsx",
        output: [
            {
                file: packageJson.exports["./editor"].import,
                format: "esm",
                sourcemap: true,
                exports: "named",
            },
            {
                file: packageJson.main.replace("editor", "editor-cjs"),
                format: "cjs",
                sourcemap: true,
                exports: "named",
            },
        ],
        plugins,
        external: ["react", "react-dom"],
    },

    {
        input: "src/renderer/index.jsx",
        output: [
            {
                file: packageJson.exports["./renderer"].import,
                format: "esm",
                sourcemap: true,
                exports: "named",
            },
            {
                file: packageJson.main.replace("editor", "renderer-cjs"),
                format: "cjs",
                sourcemap: true,
                exports: "named",
            },
        ],
        plugins,
        external: ["react", "react-dom"],
    },
];
