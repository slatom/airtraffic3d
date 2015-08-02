/*!
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */
 'use strict';

define(['jquery'], function($ ){

	var MathX = {


		range: function range( v, min, max )
		{
			return Math.max( min, Math.min(v, max) );
		},


		degToRad: function degToRad( deg ) 
		{
			return deg * Math.PI / 180;
		},

		redToDeg: function radToDeg( rad ) 
		{
			return rad * 180 / Math.PI;
		}

		
	}


	return MathX;
});