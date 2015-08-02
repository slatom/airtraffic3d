/*!
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */
 'use strict';

define(['jquery', 'globe/3d/Point3d.class'], function($, Point3d ){

	var UtilsX = {


		getPointFromThetaPhi: function( thetaVal, phiVal, rad ) 
		{
			var theta = thetaVal*2*Math.PI;
			var phi = phiVal*Math.PI;

			var p = new Point3d();

			p.z = rad*Math.sin(phi)*Math.cos(theta);
			p.x = rad*Math.sin(phi)*Math.sin(theta);
			p.y = rad*Math.cos(phi);

			return p;
		}
		
	}


	return UtilsX;
});

