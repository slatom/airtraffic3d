/*!
 * Exp 2 - Globe
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */
 'use strict';


define (
	['jquery', 'globe/routenetwork/Airports.class','globe/routenetwork/Connections.class', 'vendor/jquery.xdomainajax'],
	function( $, Airports, Connections ){
	


	function RouteNetwork( scene, camera ) {
			
		this.getData();

		this.airports = new Airports( scene );

		this.connections = new Connections( scene, camera );


		var ref = this;
		$(this.connections).bind("onRollOver", function( e, id )
		{
			ref.setTexts( e, id );
		});		

		this.isPanelHidden = true;
	}


	RouteNetwork.prototype.getData = function(data)
	{
		var url = "http://www.world-of-swiss.com/en/routenetwork.json";

		var ref = this;
		$.ajax({
	        url :url,
	        type: 'GET',
		    success: function(res) {
		    	ref.updateData(res );
		    }
	    });
	}


	RouteNetwork.prototype.updateData = function(data)
	{
		if( data.responseText.length < 100 )
		{
			this.getData();
			return;
		}
		else
		{
			$(this).trigger("routenetworkready");	
		}

		var json = $.parseJSON( $(data.responseText, 'body').text() );



		this.flights = json.flights;

		this.connections.setAirplanesNo(this.flights.length);
		for( var i = 0; i<this.flights.length; i++ )
		{
			var f = this.flights[i];
			var from = f.from.code;
			var to = f.to.code;

			var fromPos = this.airports.getPos( from );
			var toPos = this.airports.getPos( to ); 

			if( fromPos != undefined && toPos != undefined )
			{
				this.connections.createConnectionArc(fromPos, toPos, f.position, i);
			}
		}

		this.connections.addAirplanes();
	}


	RouteNetwork.prototype.setTexts = function( e, id )
	{

		if( this.currentAirport != id )
		{
			this.currentAirport = id;

			var d = this.flights[id];

			$(".airporttxtfrom").text( d.from.city );
			$(".airporttxtto").text( d.to.city );

			var hf = d.from.hour;
			$(".timetxtfrom").text( hf.substring(0, hf.length-5) );

			var ht = d.to.hour;
			$(".timetxtto").text( ht.substring(0, ht.length-5) );
						
			if( this.isPanelHidden )
			{
				this.isPanelHidden = false;
				$(".flighttxts").fadeIn(400);
			}
		}		
	}
	

	RouteNetwork.prototype.findIntersection = function()
	{
		this.connections.findIntersection();
	}
	


	return RouteNetwork;

});

