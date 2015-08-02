/*!
 * Exp 2 - Globe
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */
 'use strict';


define (
	['jquery', 'orbitcontrols', 'threejs', 'requestAnimationFrame', 'globe/routenetwork/RouteNetwork.class', 'globe/earth/Earth3d.class', 'globe/earth/Sky3d.class' ],
	function( $, OrbitControls, THREE, requestAnimationFrame, RouteNetwork, Earth3d, Sky3d ){


	var scene;
	var camera;
	var renderer;
	var controls;

	var earth3d;
	var sky3d;

	var routenetwork;


	function Globe3d() {

		this.init();
	}


	Globe3d.prototype.init = function() {
		
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );

		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize( window.innerWidth, window.innerHeight );

		renderer.setClearColor( 0x222222, 1);

		var container = $('#threecont')[0];
		
		container.appendChild( renderer.domElement );

		camera.position.z = 4.2;

		earth3d = new Earth3d( scene );

		sky3d = new Sky3d( scene );


		routenetwork = new RouteNetwork( scene, camera );

		var fog = new THREE.Fog(0x222222, 0, 6.5);
		scene.fog = fog;

		scene.rotation.y += .5;

		this.render();

		controls = new THREE.OrbitControls( camera, container );

		window.addEventListener( 'resize', this.onWindowResize, false );

		var ref = this;
		$(routenetwork).bind("routenetworkready", function()
		{
			$(ref).trigger("routenetworkready");	
		});

	};


	Globe3d.prototype.onWindowResize = function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}


	Globe3d.prototype.render = function() {

		requestAnimationFrame( this.render.bind(this) );

		renderer.render( scene, camera );

		scene.rotation.y += 0.002;

		routenetwork.findIntersection();
	}


	return Globe3d;
});
