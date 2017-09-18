window.onload=function(){
	//注册页面
	var inputA=document.getElementById("inputA");
	var inputImg=document.getElementById("inputImg");
	var numfive=0;
	console.log(inputA);
	inputA.onmouseenter=function(){
		inputImg.src="img/getImg1.jpg";
	}
	inputA.onmouseleave=function(){
		inputImg.src="img/getImg.jpg";
	}
//	inputA.ondblclick=function(){
//		numfive++;
//		console.log(numfive);
//		inputImg.src="img/getImg1.jpg";
////		if(numfive%2==0){
////			inputImg.src="img/getImg.jpg";
////			console.log(inputImg.src);
////		}else{
////			inputImg.src="img/getImg1.jpg";
////			console.log(inputImg.src)
////		}
//	}
}
