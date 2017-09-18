window.onload=function(){
	var jsonmore = [
		        {  // 1
		            width:90,
		            height:80,
		            top:20,
		            left:-90,
		            
		            zIndex:3
		        },
		        {   // 2
		            width:90,
		            height:100,
		            top:10,
		            left:-45,
		            
		            zIndex:4
		        },
		        {  // 3
		            width:90,
		            height:120,
		            
		            top:0,
		            left:0,
		            zIndex:5
		        },
		         {   // 4
		            width:90,
		            height:100,
		            top:10,
		            left:45,
		           
		            zIndex:4
		        },
		         {  // 5
		            width:90,
		            height:80,
		            top:20,
		            left:90,
		            
		            zIndex:3
		        }
		    ];
		    //根据json的内容把图片缓动到相应位置，同时缓动
		    var silderMoreUl=document.getElementById("silderMoreUl");
		    var liArrMore = silderMoreUl.children;
		    var next = document.getElementById('next');
		    var prev = document.getElementById('prev');
		    var focusToday=document.getElementById("focusToday");
		    var arrow=document.getElementById("arrow");
		    var numtwo=2;
		    var silderContentOne=document.getElementById("silderContentOne");
			var silderContentTwo=document.getElementById("silderContentTwo");
			var silderContentOneArr=['神魔供应商','明末工程师','天影','莽穿新世界','神级幸运星'];
			var silderContentTwoArr=['天穹光辉之下，沉默的影子在黑暗中悄然杀戮！','一群穿越到奇幻游戏时间的玩家们，和自己曾经熟悉的世界碰撞，挣扎求存的故事','无意中获得了一枚运气骰子，运气骰子的六个面分别是“非常倒霉，倒霉，普通，好运，非常好运，神级好运”','专业种植，培养，租借，出售，回收一切神魔，一条龙服务。','二十一世纪的工业设计师李植穿越到明末。没有钱？搞个飞梭织布机来，立刻赚到盆满钵满。'];
		    function movetwo(){
		    	for(var i=0;i<liArrMore.length;i++){
		    		animation(liArrMore[i],jsonmore[i]);
		    	}
		    }
		    movetwo();
		  
		//自动生成小圆点
		for(var i=0;i<liArrMore.length;i++){
		//1、生成对应的span
			var newSpan = document.createElement('span');
			newSpan.className = "";
			prev.parentNode.insertBefore(newSpan,prev);
		}
		var spanArr=arrow.children;
		spanArr[2].className= "now";
		  lighttwo();
		//点亮小圆点
		function lighttwo(){
			for(var i=0;i<spanArr.length-2;i++){
				spanArr[i].className = "";
			}
			if(numtwo>4){
			    		numtwo=0;
			    	}
			    	if(numtwo<0){
			    		numtwo=4;
			    	}
			spanArr[numtwo].className="now";
		}
	function movenexttwo(){
			var next = jsonmore.pop();
		    	jsonmore.unshift(next);
		    		numtwo++;
		    		if(numtwo>4){
			    		numtwo=0;
			    	}
			    	if(numtwo<0){
			    		numtwo=4;
			    	}
		    		silderContentOne.innerHTML=silderContentOneArr[numtwo];
		    		silderContentTwo.innerHTML=silderContentTwoArr[numtwo];
		    		
			    	movetwo();
			    	lighttwo();	    	
		}
	function moveprev(){
		var first = jsonmore.shift();
		    jsonmore.push(first); 
		    numtwo--;
		    if(numtwo>4){
			    numtwo=0;
			}
			if(numtwo<0){
			    numtwo=4;
			}
		    silderContentOne.innerHTML=silderContentOneArr[numtwo];
		    silderContentTwo.innerHTML=silderContentTwoArr[numtwo];
		    movetwo();
		    lighttwo();    
	}
		next.onclick=function(){
			movenexttwo();
		}
		prev.onclick = function(){
		    moveprev();
		}
	
	focusToday.timer=setInterval(movenexttwo,3000);
	focusToday.onmouseenter=function(){
		clearInterval(focusToday.timer);
	}
	focusToday.onmouseleave=function(){
		clearInterval(focusToday.timer);
		focusToday.timer=setInterval(movenexttwo,3000);
	}
	
	
	
	function animation(obj,json,fn){
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					var flag = true;
					//json里面有几个属性就要执行几次
					var target=0;//记录目标位置
					var leader=0;//记录当前位置
					var speed =0;//记录速度
					for(var key in json){						
						if(key=='opacity'){
							target = Math.round(json['opacity']*100)//0-100
							leader = getStyle(obj,'opacity')*100//0-100
						}
						else{
							target = parseInt(json[key]);
							leader = parseInt(getStyle(obj,key));
						}
						speed = (target-leader)/10;
						speed = speed>0?Math.ceil(speed):Math.floor(speed);
						leader = leader + speed;//0-100
						if(key=='opacity'){
							obj.style.opacity = leader/100;
							obj.style.filter = "alpha(opacity="+leader+")";
						}
						else if(key=="zIndex"){
							obj.style.zIndex = json['zIndex'];
						}
						else{
							obj.style[key] = leader+"px";
						}
						
						if(leader!=target){
							flag = false;						
						}
					}	
					if(flag){
						clearInterval(obj.timer);
						if(fn){
							fn();
						}
					}			
					
				},20)
			}
}
