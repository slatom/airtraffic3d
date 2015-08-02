/*!
 * Exp 2 - Globe
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */
 'use strict';


define (
	['jquery', 'globe/earth/EarthPoint.class', 'mathx'],
	function( $, EarthPoint, MathX ){
	
	var MAP_IMG_URL = "img/map500.png";


	function EarthData() {
		this.init();
	}
	

	EarthData.prototype.init = function() 
	{	
		this.img = new Image;
		this.img.crossOrigin = "Anonymous";

		this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

		var ref = this;		
		this.img.onload = function() {
			ref.onDataLoaded();			
		}

		this.img.src =  MAP_IMG_URL;

		this.spherePoints = [];
	}

	
	EarthData.prototype.onDataLoaded = function() 
	{
		this.imgW = this.img.width;
		this.imgH = this.img.height;	
		this.canvas.width = this.imgW;
		this.canvas.height = this.imgH;
		
		this.context.drawImage( this.img, 0, 0);
		
		this.pixelData = this.context.getImageData(0, 0, this.imgW, this.imgH).data;
		
		this.createSpherePoints();

		$(this).trigger("dataready");
	}


	EarthData.prototype.createSpherePoints = function() 
	{
		var steps=98;
		var thetaSteps = 2*steps;
		var phiSteps = 1*steps;

		var sphereRad = 2;

		for( var i=1; i<phiSteps; i++ )
		{
			for( var j=0; j<thetaSteps; j++ )
			{

				var jj = j;
				if(i%2) jj +=.5;

				var theta = jj/thetaSteps*2*Math.PI;
				var phi = Math.acos(i/phiSteps*2-1);
	
				var imgPos = this.findImgPixel(this.imgW, this.imgH, j/thetaSteps, phi/Math.PI);

				var px = this.checkImgPixel( imgPos.x, imgPos.y );

				if( px < 241 )
				{
					var p = new EarthPoint();

					var rad = sphereRad + (255-px)/(255*4);

					p.z = rad*Math.sin(phi)*Math.cos(theta);
					p.x = rad*Math.sin(phi)*Math.sin(theta);
					p.y = rad*Math.cos(phi);

					this.spherePoints.push(p);
				}
			}
		}
	}

	
	EarthData.prototype.findImgPixel = function(width, height, a, b )
	{	
	    var x = Math.floor(a*width);
	    var y = Math.floor(b*height)-2;

	    return {x: x, y:y};
	};

	EarthData.prototype.checkImgPixel = function( x, y ) 
	{
		return this.pixelData[ (this.imgW*y + x)*4 ];
	};

	EarthData.prototype.getSpherePoints = function() 
	{
		return this.spherePoints;
	};


	return EarthData;
});
