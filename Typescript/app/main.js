//main.js
//
var origin = window.location.origin;
var pathname = window.location.pathname;
var baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
require.config({
	baseUrl: baseUrl,
	paths: {
		aurelia: baseUrl + "scripts/aurelia",
		views: baseUrl + "views",
		bluebird: baseUrl + "scripts/bluebird/bluebird",
		pouchdb: baseUrl + "scripts/pouchdb/pouchdb.min"
	},
	shim: {
		"pouchdb": {
			exports: "PouchDB"
		}
	}
});
require(["aurelia/aurelia-bundle-latest"], function (au) {
	require(["aurelia-bundle-manifest"], function (abm) {
		require(["aurelia-bootstrapper"], function (b) {
			// alert("loaded");
		});
	})
});