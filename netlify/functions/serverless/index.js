const { EleventyServerless } = require("@11ty/eleventy");

// For the bundler (auto-generated by the plugin)
require("./eleventy-bundler-modules.js");

// const precompiledCollections = require("./_generated-serverless-collections.json");

async function handler (event) {
	let elev = new EleventyServerless("serverless", event.path, {
		inputDir: "src",
		functionsDir: "netlify/functions/",
		query: event.queryStringParameters,
		// precompiledCollections
	});

	try {
		return {
			statusCode: 200,
			headers: {
				"Content-Type": "text/html; charset=UTF-8"
			},
			body: await elev.render()
		};
	} catch (error) {
		// Only console log for matching serverless paths
		// (otherwise you’ll see a bunch of BrowserSync 404s for non-dynamic URLs during --serve)
		if(elev.isServerlessUrl(event.path)) {
			console.log("Dynamic render error:", error);
		}

		return {
			statusCode: error.httpStatusCode || 500,
			body: JSON.stringify({
				error: error.message
			}, null, 2)
		};
	}
}

// Choose one:

// Netlify Function (runs every time)
exports.handler = handler;

// Netlify On-demand Builder (runs one request)
const { builder } = require("@netlify/functions");
exports.handler = builder(handler);