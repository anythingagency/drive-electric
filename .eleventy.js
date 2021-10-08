const { pluginPrismic } = require("eleventy-plugin-prismic");

const linkResolver = (doc) => {
  if (doc.type === 'manufacturer') return `/manufacturer/${doc.uid}/`
  return '/'
}

module.exports = function(eleventyConfig) {

	/**
	 * @type {import("eleventy-plugin-prismic").PrismicPluginOptions}
	 */
	 const prismicPluginOptions = {
		endpoint: "drive-electric",

		// Optional, additional parameters to pass to the client
		clientConfig: {
			accessToken: "MC5ZV0JTMUJRQUFDSUFselUy.77-977-977-9Uj5s77-977-9dO-_vS1BBCsK77-977-9GmTvv73vv70g77-9fu-_vSjvv70e77-977-977-9Aw",
		},

		linkResolver: linkResolver,

		/* see configuration references for more */
	};

	eleventyConfig.addPlugin(pluginPrismic, prismicPluginOptions);

  eleventyConfig.addPassthroughCopy('src/images')

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'njk'
  }
}