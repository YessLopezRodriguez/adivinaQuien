
$(document).ready(function() {
	console.log("Esta Listo");

	//objetos fotos

	var mexico = [{
	              imagen: "setsuna.jpg",
	              name: "setsuna"
	            },{
	              image: "usagi.jpg",
	              name: "usagi"
	            },{
	              image: "minako.jpg",
	              name: "minako"  
	            },{
	              image: "haruko.jpg",
	              name: "haruko"  
	            }];

	var lima =  [{
	              image:"bellota.jpg",
	              name:"bellota"
	            },{
	              image:"burbuja.jpg",
	              name:"burbuja"
	            },{
	              image:"bombon.jpg",
	              name:"bombon" 
	            },{
	              image:"mojo.jpg",
	              name:"mojo" 
	            }];

	// Genera aleatorio
	var arreglo_fotos = [];

	function fotoAleatorio(largo) {
		var aleatorio;
		var existe = true;
		do {
			aleatorio = Math.floor(Math.random()*largo)
			if (arreglo_fotos.length == largo) {
				aleatorio = -1
				existe = false
			} else if (arreglo_fotos.length == 0) {
				arreglo_fotos.push(aleatorio)
				existe = false
			} else {
				var encontrado = arreglo_fotos.indexOf(aleatorio)
				if (encontrado < 0) {
					arreglo_fotos.push(aleatorio)
					existe = false 	
				} else {
					console.log("Se repite! -> " + aleatorio)
				}
			}
		} while (existe)
		return aleatorio
	}


	function tomaNombre(){
	  var valor_usuario= ($("#nombre").val()).toLowerCase(); //toma valor de input, lo pasa a minusculas y lo guarda en valor_usuario
	  return valor_usuario;
	}



	var img_aleatoria=0;
	var pais=0;
	function r_foto(img_aleatoria) {
		var imagen_pais= (pais==2) ?  ("mexico/"+mexico[img_aleatoria].image) :((pais==1) ? ("lima/"+lima[img_aleatoria].image): "info.png");
	    return "fotos/"+imagen_pais;
	}
	function MostrarFoto(src){
		$(".foto").attr("src",src);
	}
	ejecutar();


	function consultaName(){
		var nameConsulta="";
		nameConsulta= (pais==1)? lima[img_aleatoria].name : mexico[img_aleatoria].name ;
		return nameConsulta.toLowerCase();
	}

	$("#boton").click(funciona);

	var k=0;
	var c=3;
	var j=0;
	function funciona () {
		k++;
		if(tomaNombre() == consultaName()){
			ganador();
			ejecutar();
			k=0;
			c=3;
			j+=3;
			$("#contador").html(j+" Puntos");
			$("#resultado").html("Bien, la que sigue");
			$("#nombre").val("");
		} else if (k===3) {
			ganador();
			ejecutar();
			$("#resultado").html("Mal, perdiste");
			k=0;
			c=3;
			j--;
			$("#contador").html(j+" Puntos");
		}else if(k<3){
			c--;
			$("#resultado").html("Tienes "+c+" opciones vuelve a intentar");
			$(".foto").fadeOut(3000,"swing", function() { change() });
		}
	}

	function ganador(){
		if( k%numRandoms=== 0){
			alert("El puntaje obtenido es "+j);
			k=0;
		}
	}

	function ejecutar(){
		numRandoms=paisActual();
		random=	fotoAleatorio(numRandoms);
		var src=r_foto(random);
		MostrarFoto(src);
	}

	function paisActual() {
		var max=(pais==1) ? (lima.length-1) : mexico.length-1;
		return max;
	}

	$("#sedes").change(function(){
		var valor = $(this).val();
		pais=(valor==1)? 1 : ((valor==2) ? 2 : 3);
		ejecutar();
	});
});