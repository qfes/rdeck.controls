const { resolve } = require("path");

module.exports = (env, { mode }) => {
  process.env.NODE_ENV = mode;

  return {
    mode,
    entry: { rdeckControls: "./src" },
    output: {
      path: resolve(__dirname, "inst/htmlwidgets"),
      filename: "[name].js",
      library: "rdeckControls",
      libraryTarget: "umd",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", "jsx"],
      mainFields: ["esnext", "browser", "module", "main"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
        }
      ],
    },
    devtool: mode === "development" && "inline-source-map",
    optimization: {
      minimize: mode === "production",
    },
  };
};