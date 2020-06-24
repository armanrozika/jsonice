module.exports = {
  siteMetadata: {
    title: "Jsonice",
    description: "Gui-based online json generator with real API call",
    url: "https://jsonice.com",
    author: "armanrozika",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {
            family: "Nunito",
            variants: ["300", "700"],
          },
        ],
      },
    },
  ],
}
