const esbuild = require("esbuild")
const { glob } = require("fast-glob")
const path = require("path")
const fs = require("fs/promises")
const esBuildPluginTsc = require('esbuild-plugin-tsc');

const tsconfig = path.join('./tsconfig.json');

const OUT_DIR = "dist"
const isLocal = process.env.NODE_ENV === "local";

const main = async () => {
    const entryFiles = await glob('packages/functions/src/**/*.ts')
    const entryPoints = entryFiles.reduce((acc, file) => {
        const relativePath = path.relative('packages/functions/src', file);
        const { dir, name } = path.parse(relativePath);
        const entryKey = path.join(dir, name).replace(/\\/g, '/');
        acc[entryKey] = file;
        return acc;
    }, {})

    // fs.rm(OUT_DIR, {recursive: true, force: true}).catch(console.error)
    const watch = process.argv.indexOf("--watch") > -1

    const options = {
        entryPoints,
        target: "node18",
        bundle: true,
        sourcemap: isLocal,
        minify: !isLocal,
        platform: "node",
        external: ["aws-sdk"],
        outdir: OUT_DIR,
        logLevel: "info",
        plugins: [
            esBuildPluginTsc({
                force: true,
                tsconfigPath: tsconfig,
            })
        ],
    }

    if (watch) {
        options.define = { "process.env.NODE_ENV": '"local"' }
        let ctx = await esbuild.context(options)
        await ctx.watch()
    } else {
        await esbuild.build(options)
    }
}

main().catch(console.error)
