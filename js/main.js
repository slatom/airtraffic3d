/*!
 * Exp 2 - World Map
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */

requirejs.config({
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		requestAnimationFrame: '../bower_components/requestAnimationFrame/app/requestAnimationFrame',
		ticktack: '../bower_components/ticktack.js/ticktack',
		threejs: '../bower_components/three.js/three.min',
		orbitcontrols: 'vendor/OrbitControls',
		mathx: 'slawnikowski/MathX'
	},

	shim: {
		'threejs': { exports: 'THREE' },
		'orbitcontrols': { deps: ['threejs'] }
	}
});


require( ['jquery'], function( $ ){

	if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 

	$(function(){
	
		var $body = $('body');
		require(['globe/globe'], function(page){
			page.init($body);
		});

	});

});


