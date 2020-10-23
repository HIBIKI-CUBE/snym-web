module.exports = {
  entry: "/src/index.js",

  output: {
    path: __dirname,
    filename: "main.js"
  },

  mode: "production",

  devServer: {
    contentBase: "/",
    open: true
  }
};