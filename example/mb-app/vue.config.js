module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: "8008"
  },
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    proxy: 'https://github.com/',
  }
}