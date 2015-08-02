define(
	['jquery'],
	function( $ ){


	function Point3d(x, y, z)
	{
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}

	return Point3d;
});