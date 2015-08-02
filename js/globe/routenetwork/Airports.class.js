
/*!
 * Exp 2 - Globe
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */
 'use strict';


define (
	['jquery', 'mathx', 'globe/UtilsX'],
	function( $, MathX, UtilsX ){
	


	function Airports( scene ) {

		this.scene = scene;

		this.airportsData = {};

		var ref = this;
		$.getJSON("json/airports.json", function(data){
			ref.onData(data);
		}).fail(function(){
			console.log('- failed');
		});
	}


	Airports.prototype.onData = function( data )
	{
		var aNo = data.airports.length;

		this.airportsPositions = new Float32Array( aNo * 3 );
		
		var pos = 0;
		for( var i=0; i<aNo; i++ )
		{
			var a = data.airports[i];

			var lat = parseFloat(a.lat) ||0;
			var lng =parseFloat( a.lng) ||0;

			var phiValFrom = (-lat + 90 ) / 180 ;
	        var thetaValFrom = ( lng + 180 ) / 360;

	        var p = UtilsX.getPointFromThetaPhi(thetaValFrom, phiValFrom, 2);

	        this.airportsPositions[ pos++ ] = p.x;
			this.airportsPositions[ pos++ ] = p.y;
			this.airportsPositions[ pos++ ] = p.z;

			this.airportsData[a.code] = {code:a.code, x:p.x, y:p.y, z:p.z};
		}

		//this.createAirports();
	}	


	Airports.prototype.createAirports = function() 
	{	
		var sMaterial = new THREE.PointCloudMaterial( {
			color: 0x0000ff,
			size: 2,
			transparent: true,
			opacity:.7,
			sizeAttenuation: false,
			fog: true
		} );
		
		this.starsGeo = new THREE.BufferGeometry();
	
		this.starsGeo.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.airportsPositions, 3 ) );

		var pointCloud = new THREE.PointCloud( this.starsGeo, sMaterial );
		
		this.scene.add( pointCloud );	
	}


	Airports.prototype.getPos = function( code )
	{
		return this.airportsData[code];
	}


	return Airports;

});


