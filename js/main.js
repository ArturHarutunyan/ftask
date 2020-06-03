$(document).ready(function(){
    let num = 0;

    $(".click").on("click",go)
    $('.add').on('click', function(){
        addInputCart(++num)
    });
    $("#mosaic").on("click",changeColor);
    $("#setColor").on("click",setColor);
    $(".setBorder").on("click",openBorderModal)
    
    $("#addBorder").on("click",addBorder)
});

function addInputCart(num){
    let html =
        '<div class="input-cart">' 
            + '<input class="widths" number="'+num+'" id="w-' + num + '" type="text" placeholder="Width">' 
            + '<input class="heights" number="'+num+'" id="h-' + num + '" type="text" placeholder="Height">' 
            + '<input class="counts" number="'+num+'" id="c-' + num + '" type="text" placeholder="Count">'
            + '<input type="hidden"   number="'+num+'" id="border-left-'+num+'" value="1">'
            + '<input type="hidden"   number="'+num+'" id="border-right-'+num+'" value="1">'
            + '<input type="hidden"   number="'+num+'" id="border-top-'+num+'" value="1">'
            + '<input type="hidden"   number="'+num+'" id="border-bottom-'+num+'" value="1">'
            + '<button id="block-'+num+'" num="'+num+'" class="setBorder">border</button>'
            + '<button class="deletes" number="'+num+'" id="d-' + num + '" >-</button>'
        '</div>';
        
    $( "#input-group" ).append( html );
    $(".setBorder").on("click",openBorderModal)
    $("#d-"+num).on("click", function(event){
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    })
}
//
let openBorderModal = function(event){
    let button = event.target;
    let id = button.getAttribute("num")
    
    document.getElementById("element-id").value = id;
    
    if(+document.getElementById("border-left-"+id).value>4){
        document.getElementById("left").value = 1
    }else{
        document.getElementById("left").value =document.getElementById("border-left-"+id).value
    }
    
    if(+document.getElementById("border-right-"+id).value>4){
        document.getElementById("right").value = 1
    }else{
        document.getElementById("right").value =document.getElementById("border-right-"+id).value
    }
    if(+document.getElementById("border-top-"+id).value>4){
        document.getElementById("top").value = 1
    }else{
        document.getElementById("top").value =document.getElementById("border-left-"+id).value
    }
    if(+document.getElementById("border-bottom-"+id).value>4){
        document.getElementById("bottom").value = 1
    }else{
        document.getElementById("bottom").value =document.getElementById("border-bottom-"+id).value
    }
          
    $("#borderModal").modal()
}
var random_color = function(){
    var color = [0, 0, 0]
    color_types = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
	for(var i = 0; i <= 2; i++)
	{
		if(Math.random() < 0.66666)
			color[i] = 32 + parseInt(Math.random() * 192);
    }
    return "#"+color_types[parseInt(Math.random()*16)]+color_types[parseInt(Math.random()*16)]+color_types[parseInt(Math.random()*16)]+color_types[parseInt(Math.random()*16)]+color_types[parseInt(Math.random()*16)]+color_types[parseInt(Math.random()*16)];
	//return '#('+color[0]+','+color[1]+','+color[2]+')';
}

let go = function(){
    let width = document.getElementById("mosaic").offsetWidth;
    let height = document.getElementById("mosaic").offsetHeight;
    let maxsquere = width*height;
    let mosaic = document.getElementById('mosaic');
    mosaic.innerHTML = "";
    let blocks = [],
    blocksSquere = 0;
    packer = new square( width, height );
    for(let i=0;i<$(".widths").length;++i){
        number = $(".widths")[i].getAttribute("number")
        for(let j=0;j<$("#c-"+number).val();++j){
            blockwidth = +$("#w-"+number).val()
            blockheight = +$("#h-"+number).val()
            borderLeft = +$("#border-left-"+number).val()
            borderRight = +$("#border-right-"+number).val()
            borderTop = +$("#border-top-"+number).val()
            borderBottom = +$("#border-bottom-"+number).val()
            blocksSquere += blockwidth*blockheight;
            if(blocksSquere>maxsquere || blockwidth>width || blockheight>height){
                alert("Error There is not enough space for selected elemets");
                return false;
            }
            blocks.push(new element(0,0,parseInt(blockwidth),parseInt(blockheight),borderLeft,borderRight,borderTop,borderBottom));
        }
        
    }
    
    //blocks.shuffle();

   //blocks.shuffle();

    let max_heigth_id = 0;
    let max_width_id = 0;
    for(let i = 1;i<blocks.length;++i){
        if(blocks[i].w+(blocks[i].bls+blocks[i].brs)>blocks[max_width_id].w+(blocks[max_width_id].bls+blocks[max_width_id].brs)>width){ 
            max_width_id = i
        }
        if( blocks[i].h+(blocks[i].bts+blocks[i].bbs)>blocks[max_width_id].h+(blocks[max_width_id].bts+blocks[max_width_id].bbs) ) {
            max_heigth_id = i
        }
    }
    
    for(let i = 1;i<blocks.length;++i){
        if(blocks[i].w+(blocks[i].bls+blocks[i].brs)+blocks[max_width_id].w+(blocks[max_width_id].bls+blocks[max_width_id].brs)>width && i!=max_width_id){
            if(blocks[i].h+(blocks[i].bts+blocks[i].bbs)+blocks[max_width_id].h+(blocks[max_width_id].bts+blocks[max_width_id].bbs)>height){
                alert("Error, There is not enough space for selected elemets")
                return false;
            }
        }
        if(blocks[i].h+(blocks[i].bts+blocks[i].bbs)+blocks[max_width_id].h+(blocks[max_width_id].bts+blocks[max_width_id].bbs)>height&& i!=max_heigth_id){
            if(blocks[i].w+(blocks[i].bls+blocks[i].brs)+blocks[max_width_id].w+(blocks[max_width_id].bls+blocks[max_width_id].brs)>width){
                alert("Error, There is not enough space for selected elemets")
                return false;
            }
        }
    }

    blocks.sort(function (a,b){return (a.h+a.bbs+a.bts)*(a.w+a.bls+a.brs)<(b.h+b.bbs+b.bts)*(b.w+b.bls+b.brs) ? 1 : (a.h+a.bbs+a.bts)*(a.w+a.bls+a.brs)>(b.h+b.bbs+b.bts)*(b.w+b.bls+b.brs)?-1:0});
    
    packer.fit(blocks);
    for(let i=0;i<packer.pack.length;++i){

        var div = document.createElement("div");
        div.id = "element-"+i;
        div.className = "element";

        mosaic.appendChild(div)
        
		//if(div.style){
            console.log(packer.pack[i])
        if(packer.pack[i].bl == 2){
            div.style.borderLeft = "3px solid";
        }else if(packer.pack[i].bl == 3){
            div.style.borderLeft = "3px dashed";
        }

        if(packer.pack[i].br == 2){
            div.style.borderRight = "3px solid";
        }else if(packer.pack[i].br == 3){
            div.style.borderRight = "3px dashed";
        }

        if(packer.pack[i].bb == 2){
            div.style.borderBottom = "3px solid";
        }else if(packer.pack[i].bb == 3){
            div.style.borderBottom = "3px dashed";
        }

        if(packer.pack[i].bt == 2){
            div.style.borderTop = "3px solid";
        }else if(packer.pack[i].bt == 3){
            div.style.borderTop = "3px dashed";
        }
        div.style.left = packer.pack[i].x+"px";
        div.style.top = packer.pack[i].y+"px";
        div.style.width = (packer.pack[i].w+packer.pack[i].bls+packer.pack[i].brs)+"px";
        div.style.position = "absalute";
        div.style.backgroundColor = random_color();
        div.style.height = (packer.pack[i].h+packer.pack[i].bts+packer.pack[i].bbs)+"px";
        div.setAttribute("number",parseInt(i));
        
        div.innerHTML = parseInt(i)+1;
        //}

    }

   
}

let addBorder = function(){
    element_id = document.getElementById("element-id").value;
    document.getElementById("border-left-"+element_id).value    =document.getElementById("left").value
    console.log(document.getElementById("border-left-"+element_id).value)
    document.getElementById("border-right-"+element_id).value   =document.getElementById("right").value
    document.getElementById("border-top-"+element_id).value    =document.getElementById("top").value
    document.getElementById("border-bottom-"+element_id).value  =document.getElementById("bottom").value
    $("#borderModal").modal("hide")
}

Array.prototype.shuffle = function( b ){
	let i = this.length, j, t;
    while( i ) 
    {
        j = Math.floor( ( i-- ) * Math.random() );
        t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};

let changeColor = function(event){
    if(event.target.id==="mosaic"){
        $("#changeColorModal").modal();
    }
}
let setColor = function(){
    document.getElementById("mosaic").style.backgroundColor = document.getElementById("maincolor").value;

    $("#changeColorModal").modal("hide");
    
}