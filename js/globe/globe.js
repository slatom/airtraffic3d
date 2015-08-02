/*!
 * Exp 2 - Globe
 * Copyright 2015 Tomasz Slawnikowski
 *
 * Authors: Tomasz Slawnikowski http://freelance-html-developer.com/
 */
 'use strict';


define(
['jquery', 'globe/Globe3d.class' ],
function($, Globe3d ){


	var isTouch;

	var globe3d;


	function initPage()
	{
		isTouch = !!('ontouchstart' in window);

		globe3d = new Globe3d();
		
		$(globe3d).bind("routenetworkready", function()
		{
			hideLoader();
		});

  		
	}

	function hideLoader()
	{
		$("#loadercont").hide();
	}


	var page = {};
	page.init = function(element) {
		this.element = $(element);
		initPage();
	};

	return page;

});


