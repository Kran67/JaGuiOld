SystemJS.config({
    map: {
        "nanovg-js": "./../../scripts/core/nanovg",
        "perf": "./../../scripts/core/nanovg/perf.js",
        "themes": "./js/themes.js"
    },
    packages: {
        "nanovg-js": { main: "nanovg.js" }
    }
});
