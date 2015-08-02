/*!
 * Exp 2 - Globe
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */
 'use strict';


define (
	['jquery', 'threejs', 'globe/earth/EarthData.class', 'mathx'],
	function( $, THREE, EarthData, MathX ){
	

	function Earth3d( scene ) {

		this.scene = scene;

		this.earthData = new EarthData();

		var ref = this;
		$(this.earthData).bind("dataready", function()
		{
			ref.createDots();
		});
	}


	Earth3d.prototype.createDots = function() 
	{	
		var sMaterial = new THREE.PointCloudMaterial( {
			color: 0xFFFFFF,
			size: 1,
			transparent: true,
			opacity:.8,
			sizeAttenuation: false,
			fog: true
		} );
		

		this.starsGeo = new THREE.BufferGeometry();
		
		var earthPoints = this.earthData.getSpherePoints();

		this.starsPositions = new Float32Array( earthPoints.length * 3 );

		var p, pos = 0;
		for ( var i = 0; i < earthPoints.length; i++ ) {

			p = earthPoints[i];

			this.starsPositions[ pos++ ] = p.x;
			this.starsPositions[ pos++ ] = p.y;
			this.starsPositions[ pos++ ] = p.z;
		}

		this.starsGeo.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.starsPositions, 3 ) );

		var pointCloud = new THREE.PointCloud( this.starsGeo, sMaterial );
		
		this.scene.add( pointCloud );	
	}


	return Earth3d;

});
