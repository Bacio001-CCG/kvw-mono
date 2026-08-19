const path = require("node:path");

module.exports = function (options) {
    const originalExternals = options.externals;

    return {
        ...options,
        externals: [
            function (data, callback) {
                if (data.request?.startsWith("@repo/")) {
                    return callback();
                }

                const first = Array.isArray(originalExternals) ? originalExternals[0] : originalExternals;
                if (typeof first === "function") {
                    return first(data, callback);
                }

                callback();
            },
        ],
        resolve: {
            ...options.resolve,
            alias: {
                ...(options.resolve?.alias || {}),
                "@repo/types": path.resolve(__dirname, "../../packages/types/src/index.ts"),
            },
            extensionAlias: {
                ".js": [".ts", ".js"],
            },
        },
    };
};
