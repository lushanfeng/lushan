window.onload=function(){
	var navFixed=document.getElementById("navFixed");
	function scroll(){
		return {
			"top":document.body.scrollTop+document.documentElement.scrollTop,
			"left":document.body.scrollLeft+document.documentElement.scrollLeft
		}
	}
	window.onscroll=function(){
		if(scroll().top>420){
			navFixed.style.display="block";
		}else{
			navFixed.style.display="none"
		}
	}
	//nav-fixed导航栏js
	var navInput=document.getElementById("navInput");
	var oneLi=document.getElementById("oneLi");
	var lastLi=document.getElementById("lastLi");
	navInput.onfocus=function(){
		navInput.style.borderWidth="2px";
	}
	navInput.onblur=function(){
		navInput.style.borderWidth="1px";
	}
}
