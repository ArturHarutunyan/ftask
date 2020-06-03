square = function ( width,height ){
	this.width = width;
	this.height = height;
};

element = function(x,y,w,h,bl,br,bt,bb){
  return {
    x:x,
    y:y,
    w:w,
	h:h,
	bl:bl,
	br:br,
	bt:bt,
	bb:bb,
	bls:bl==1?0:3,
	brs:br==1?0:3,
	bts:bt==1?0:3,
	bbs:bb==1?0:3,
    x1:function(){ return this.x+this.w;},
    y1:function(){ return this.y+this.h;},
    intersect:function( rc ){
      return (
			(
				(
					( rc.x>=this.x && rc.x<=this.x1() )||( rc.x1()>=this.x && rc.x1()<=this.x1()  )
				) && (
					( rc.y>=this.y && rc.y<=this.y1() )||( rc.y1()>=this.y && rc.y1()<=this.y1() )
				)
			)||(
				(
					( this.x>=rc.x && this.x<=rc.x1() )||( this.x1()>=rc.x && this.x1()<=rc.x1()  )
				) && (
					( this.y>=rc.y && this.y<=rc.y1() )||( this.y1()>=rc.y && this.y1()<=rc.y1() )
				)
			)
		)||(
			(
				(
					( rc.x>=this.x && rc.x<=this.x1() )||( rc.x1()>=this.x && rc.x1()<=this.x1()  )
				) && (
					( this.y>=rc.y && this.y<=rc.y1() )||( this.y1()>=rc.y && this.y1()<=rc.y1() )
				)
			)||(
				(
					( this.x>=rc.x && this.x<=rc.x1() )||( this.x1()>=rc.x && this.x1()<=rc.x1()  )
				) && (
					( rc.y>=this.y && rc.y<=this.y1() )||( rc.y1()>=this.y && rc.y1()<=this.y1() )
				)
			)
		);
    },
  };
}
square.prototype = {
	width:0,
	height:0,
	pack:[],
	findPlace:function( rc ){
		if( this.pack.length ){
			var i = 0;
			while( i<this.pack.length ){
				if( rc.intersect( this.pack[i] ) ){
					if( 1+rc.w+(rc.bls+rc.brs)+this.pack[i].x1()<this.width ){
						rc.x = this.pack[i].x1()+1;
						i  = -1;
					}else{
						rc.y+=1
						rc.x=0;
						i  = -1;
					}
				}
				i++;
			}
		}else{ rc.x = 0; rc.y = 0;};
		return rc;
	},
	fit:function (rcs){
		this.pack = [];
		for(var i=0;i<rcs.length;i++){
			this.pack.push( this.findPlace(rcs[i]) );
		}
	}
}