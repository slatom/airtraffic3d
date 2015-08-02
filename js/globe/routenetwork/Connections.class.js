
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
	

	function Connections( scene, camera ) {
	
		this.scene = scene;
		this.camera = camera;

		this.raycaster = new THREE.Raycaster();
		this.raycaster.params.PointCloud.threshold = .05;

		this.mouse = new THREE.Vector2();

		var ref = this;
		$( document ).mousemove( function(e){ ref.onDocumentMouseMove(e); } );
	}




	Connections.prototype.createConnectionArc = function( pFrom, pTo, position, id )
	{
		var o = this.calculateConnectionArc( new THREE.Vector3(pFrom.x, pFrom.y, pFrom.z), new THREE.Vector3(pTo.x, pTo.y, pTo.z), position );
		var points = o.points;

		var pointNo = points.length;

		this.positions = new Float32Array( pointNo * 3 );
		this.colors = new Float32Array( pointNo * 3 );

		var colorpos = 0;
		var vertexpos = 0;
		
		for ( var i = 0; i < points.length; i++ ) 
		{
			if( i/pointNo > position )
			{
				this.colors[ colorpos++ ] = .8;
				this.colors[ colorpos++ ] = 0;
				this.colors[ colorpos++ ] = 0;
			} 
			else 
			{
				this.colors[ colorpos++ ] = .4;
				this.colors[ colorpos++ ] = .4;
				this.colors[ colorpos++ ] = .4;
			}

			this.positions[ vertexpos++ ] = points[i].x;
			this.positions[ vertexpos++ ] = points[i].y;
			this.positions[ vertexpos++ ] = points[i].z;
		}

		var airplanePos = o.airplanePos;
		
		this.addAirplanePoint( airplanePos );


		var material = new THREE.LineBasicMaterial( {
			vertexColors: THREE.VertexColors,
			transparent: true,
			opacity:.45,
			fog: true
		} );

		
		this.geometry = new THREE.BufferGeometry();

		this.geometry.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.positions, 3 ) );
		this.geometry.addAttribute( 'color', new THREE.DynamicBufferAttribute( this.colors, 3 ) );

		var curveObject = new THREE.Line( this.geometry, material );
		this.scene.add( curveObject );
	}

	

	Connections.prototype.calculateConnectionArc = function(beg, end, position)
	{
		var distance = beg.distanceTo(end);

		var mid = beg.clone().lerp(end, 0.5);
		mid.normalize();
		mid.multiplyScalar(2+.2+distance * 0.06);

		var normal = (new THREE.Vector3()).subVectors(beg, end);
		normal.normalize();

		var distanceHalf = distance * 0.4;

		var begAnchor    = beg;
		var midbegAnchor = mid.clone().add(normal.clone().multiplyScalar( distanceHalf));
		var midEndAnchor = mid.clone().add(normal.clone().multiplyScalar(-distanceHalf));
		var endAnchor    = end;

		var splineCurveA = new THREE.CubicBezierCurve3(beg, begAnchor, midbegAnchor, mid);
		var splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, end);

		//find airplane position
		if( position<=.5)
		{
			var airplanePos = splineCurveA.getPoint( position*2 );
		}
		else
		{
			var airplanePos = splineCurveB.getPoint( position*2-1 );
		}

		var vertexCount = Math.floor(distance * 3 + 4)*2;

		var points = splineCurveA.getPoints(vertexCount);
		points = points.splice(0, points.length - 1); // Avoid Duplicate
		points = points.concat( splineCurveB.getPoints(vertexCount) );

		return { points: points, airplanePos:airplanePos };
	}
	

	Connections.prototype.setAirplanesNo = function( flightsNo )
	{
		this.airplanePositions = new Float32Array(flightsNo*3);
		this.airplanePos = 0;
	}


	Connections.prototype.addAirplanePoint = function( airplanePos ) 
	{
		this.airplanePositions[ this.airplanePos++ ] = airplanePos.x;
		this.airplanePositions[ this.airplanePos++ ] = airplanePos.y;
		this.airplanePositions[ this.airplanePos++ ] = airplanePos.z;
	}
	

	Connections.prototype.addAirplanes = function( airplanePos, id ) 
	{
		//draw airplane icon on canvas
		var size = 16;
		var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle="#ffffff";
        ctx.lineWidth=1.01;
        ctx.beginPath();
        ctx.moveTo( 3, 3 );
        ctx.lineTo( size-3, size-3 );
        ctx.moveTo( 3, size-3 );
        ctx.lineTo( size-3, 3 );
        ctx.stroke();

        var texture = new THREE.Texture(canvas);
   	    texture.needsUpdate = true;

		var material = new THREE.PointCloudMaterial( 
			{ map: texture, 
			  color: 0xffffff,
			  size: 16, 
			  fog: true,
			  transparent: true,
			  opacity:1,
			  sizeAttenuation: false } );
		
		var geometry = new THREE.BufferGeometry();

		geometry.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.airplanePositions, 3 ) );
		

		this.particlesAirplanes = new THREE.PointCloud( geometry,material );
		this.particlesAirplanes.name = "airplanes";

		this.scene.add( this.particlesAirplanes );
	}


	Connections.prototype.findIntersection = function()
	{
		if( !this.particlesAirplanes ) return;

		this.raycaster.setFromCamera( this.mouse, this.camera );

		var intersects = this.raycaster.intersectObject( this.particlesAirplanes );

		if ( intersects.length > 0 ) {
			$(this).trigger("onRollOver", intersects[ 0 ].index);
		}
	}


	Connections.prototype.onDocumentMouseMove = function( event ) {

		event.preventDefault();

		this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}


	return Connections;

});

