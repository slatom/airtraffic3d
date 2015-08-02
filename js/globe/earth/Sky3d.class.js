define(
	['jquery'],
	function( $ ){


	var MAX_STAR_COUNT = 400;
	var UNIVERS_SIZE = 8;

	function Sky3d( scene ) {

		this.scene = scene;

		this.group = new THREE.Group();
		this.scene.add( this.group );		

		var sMaterial = new THREE.PointCloudMaterial( {
			color: 0xFFFFFF,
			size: 1,
			transparent: true,
			opacity:.7,
			sizeAttenuation: false,
			fog: true
		} );

		this.starsGeo = new THREE.BufferGeometry();
		this.starsPositions = new Float32Array( MAX_STAR_COUNT * 3 );

		for ( var i = 0; i < MAX_STAR_COUNT; i++ ) {

			var x = ( Math.random() - .5 ) * UNIVERS_SIZE;
			var y = ( Math.random() - .5  ) * UNIVERS_SIZE;
			var z = ( Math.random() - .5 ) * UNIVERS_SIZE;

			this.starsPositions[ i * 3     ] = x;
			this.starsPositions[ i * 3 + 1 ] = y;
			this.starsPositions[ i * 3 + 2 ] = z;

		}

		this.starsGeo.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.starsPositions, 3 ) );

		pointCloud = new THREE.PointCloud( this.starsGeo, sMaterial );
		
		this.group.add( pointCloud );
	}


	return Sky3d;
});