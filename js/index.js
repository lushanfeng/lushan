
window.onload=function(){
	var slider=document.getElementById("slider");
	var imgWidth = slider.offsetWidth;
	var sliderUl=document.getElementById("sliderUl");
	var liArr=sliderUl.children;
	var sliderNav=document.getElementById("sliderNav");
	var aArr=sliderNav.children;
	var num=0//索引
	//动态生成小圆点
	for(var i=0;i<liArr.length;i++){
		liArr[i].style.left=imgWidth+"px";
	}
	aArr[0].className="current";
	liArr[0].style.left=0;
	//为每个span绑定事件
	for(var k=0;k<aArr.length;k++){
		aArr[k].index=k;
		aArr[k].onclick=function(){
				var index=this.index;
				if(index>num){
					liArr[index].style.left=imgWidth+"px";
					animation(liArr[num],{'left':-imgWidth});
					animation(liArr[index],{'left':0});
					num=index;
					light();
				}
				if(index<num){
					liArr[index].style.left=-imgWidth+"px";
					animation(liArr[num],{'left':imgWidth});
					animation(liArr[index],{'left':0});
					num=index;
					light();
				}
		}
	}
	slider.timer=setInterval(autoplay,3000);
	slider.onmouseover=function(){
		clearInterval(slider.timer);
	}
	slider.onmouseout=function(){
		clearInterval(slider.timer);
		slider.timer=setInterval(autoplay,3000);
	}
	//查看下一张图片函数
	function autoplay(){
		animation(liArr[num],{'left':-imgWidth});
		num=++num>liArr.length-1?0:num;
		liArr[num].style.left=imgWidth+"px";
		animation(liArr[num],{'left':0});
		light();
	}
	
	//点亮小圆点
	function light(){
		for(var i=0;i<aArr.length;i++){
			aArr[i].className="";
		}
		aArr[num].className="current";
	}
	
	//小说排行榜展开更多
	var mainFictionList=document.getElementById("mainFictionList");
	var mainFictionListMore=document.getElementById("mainFictionListMore");
	var mainFictionListMoreA=document.getElementById("mainFictionListMoreA");
	var mainFictionListMoreSpan=document.getElementById("mainFictionListMoreSpan");
	var clickNum=0;
	mainFictionListMore.onclick=function(){
			clickNum++;
			if(clickNum%2==1){
				moveOne(mainFictionList,583);
				mainFictionListMoreA.innerHTML="收起更多"
				mainFictionListMoreSpan.className="up";
			}else{
				moveOne(mainFictionList,420);
				mainFictionListMoreA.innerHTML="展开更多"
				mainFictionListMoreSpan.className="";
			}	
	}
	function moveOne(obj,target){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
			var speed=(obj.offsetHeight>target?-10:10);
			if(Math.abs(obj.offsetHeight-target)<10){
				//一步到位
				obj.style.height=target+"px";
				clearInterval(obj.timer);
				//clearInterval
			}else{
				obj.style.height=obj.offsetHeight+speed+"px";
			}
		},30)
	}
	
	
	//热门作品轮播图
	var json = [
				{   //  0
		            width:50,
		            height:87,
		            top:12,
		          	left:-30,
		            zIndex:1
		        },
				 {   //  0
		            width:84,
		            height:112,
		            left:0,
		            top:0,
		            zIndex:2
		        },
		        {   //  0
		            width:50,
		            height:87,
		            top:12,
		            left:64,
		            zIndex:1
		        }
		    ];
	var hotBookSilder=document.getElementById("hotBookSilder");
	var hotBookSilderTwo=document.getElementById("hotBookSilderTwo");
	var hotBookContentTop=document.getElementById("hotBookContentTop");
	var hotBookContentTopTwo=document.getElementById("hotBookContentTopTwo");
	var hotBookSilderliArr=hotBookSilder.children;
	var hotBookSilderTwoliArr=hotBookSilderTwo.children;
	var now=document.getElementById("now");
	var nowtwo=document.getElementById("nowtwo");
	var nowthree=document.getElementById("nowthree");
	var nowSecondOne=document.getElementById("nowSecondOne");
	var nowSecondTwo=document.getElementById("nowSecondTwo");
	var nowSecondThree=document.getElementById("nowSecondThree");
	
	var numfour=0;
	function move(){
		    for(var i=0;i<hotBookSilderliArr.length;i++){
		    	animation(hotBookSilderliArr[i],json[i]);
		    }
		}
	move();
	function moveTwo(){
		    for(var i=0;i<hotBookSilderTwoliArr.length;i++){
		    	animation(hotBookSilderTwoliArr[i],json[i]);
		    }
	}
	moveTwo();
	
	function movenextcontent(){
		if(numfour==0){
		    		now.className="hot-book-production-content-bottom now";
		    		nowtwo.className="none";
		    		nowthree.className="none";
		    		
		    		nowSecondOne.className="hot-book-production-content-bottom now";
		    		nowSecondTwo.className="none";
		    		nowSecondThree.className="none";
		    	}
		    	if(numfour==1){
		    		now.className="none";
		    		nowtwo.className="hot-book-production-content-bottom now";
		    		nowthree.className="none";
		    		
		    		nowSecondOne.className="none";
		    		nowSecondTwo.className="hot-book-production-content-bottom now";
		    		nowSecondThree.className="none";
		    	}
		    	if(numfour==2){
		    		now.className="none";
		    		nowtwo.className="none";
		    		nowthree.className="hot-book-production-content-bottom now";
		    		
		    		nowSecondOne.className="none";
		    		nowSecondTwo.className="none";
		    		nowSecondThree.className="hot-book-production-content-bottom now";
		    	}
	}
	function movenext(){
		var next = json.pop();
	    	json.unshift(next);
		    	move();
		    	moveTwo();
		    	numfour++;
		    	if(numfour>2){
		    		numfour=0;
		    	}
		    	movenextcontent();
	}
	
	hotBookSilder.timer=setInterval(movenext,5000);
	hotBookContentTop.onmouseenter=function(){
		clearInterval(hotBookSilder.timer);
	}
	hotBookContentTop.onmouseleave=function(){
		clearInterval(hotBookSilder.timer);
		hotBookSilder.timer=setInterval(movenext,5000);
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
	
	
	
	//nav-fixed导航栏js
	
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
				navFixed.style.display="none";
			}
	}
	var navInput=document.getElementById("navInput");
	var oneLi=document.getElementById("oneLi");
	var lastLi=document.getElementById("lastLi");
	navInput.onfocus=function(){
		navInput.style.borderWidth="2px";
	}
	navInput.onblur=function(){
		navInput.style.borderWidth="1px";
	}
	
	
	//上面轮播图开始
	
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
		    	for(var m=0;m<liArrMore.length;m++){
		    		animation(liArrMore[m],jsonmore[m]);
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
		prev.style.display="block";
		next.style.display="block";
	}
	focusToday.onmouseleave=function(){
		clearInterval(focusToday.timer);
		focusToday.timer=setInterval(movenexttwo,3000);
		prev.style.display="none";
		next.style.display="none";
	}
	
//上面轮播图结束
//喇叭那一块开始
	var noticeMore=document.getElementById("noticeMore");
	var notice=document.getElementById("notice");
	var lastA=document.getElementById("lastA");
	var lastAEm=document.getElementById("lastAEm");
	var lastAArr=['八指琴魔1230订阅了《大唐御医》','孙宗义订阅了《太浩》','太阳爱冰棒订阅了《我是杀毒软件》','放飞的人订阅了《校花的贴身高手》',
	'永夜之旅订阅了《美酒供应商》','暗夜※繁星订阅了《有扇通往地下城的门》','猫修罗订阅了《最强炊事》']
	var numthree=0;
	function lastAmove(){
		lastAEm.innerHTML=lastAArr[numthree];
		numthree++;
		if(numthree>6){
			numthree=0;
		}
	}
	clearInterval(lastA.timer);
	lastA.timer=setInterval(function(){
		lastAmove();
	},2000)
	notice.onmouseenter=function(){
		clearInterval(lastA.timer);
		clearInterval(notice.timer);
		notice.timer=setInterval(function(){
			var speed=(40-noticeMore.offsetHeight)/10;
			speed=speed>40?Math.ceil(speed):Math.floor(speed);
			noticeMore.style.height=noticeMore.offsetHeight+speed+"px";
			if(noticeMore.offsetHeight==25){
				clearInterval(notice.timer);
			}
		},50)
	}
	notice.onmouseleave=function(){
		lastA.timer=setInterval(function(){
			lastAmove();
		},2000)
		clearInterval(notice.timer);
		notice.timer=setInterval(function(){
			var speed=(0-noticeMore.offsetHeight)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			noticeMore.style.height=noticeMore.offsetHeight+speed+"px";
			if(noticeMore.offsetHeight==0){
				clearInterval(notice.timer);
			}
		},50)
	}
	var lastA=document.getElementById("lastA");
	var lastAEm=document.getElementById("lastAEm");
	var lastAArr=['八指琴魔1230订阅了《大唐御医》','孙宗义订阅了《太浩》','太阳爱冰棒订阅了《我是杀毒软件》','放飞的人订阅了《校花的贴身高手》',
	'永夜之旅订阅了《美酒供应商》','暗夜※繁星订阅了《有扇通往地下城的门》','猫修罗订阅了《最强炊事》']
	var numthree=0;
	function lastAmove(){
		lastAEm.innerHTML=lastAArr[numthree];
		numthree++;
		if(numthree>6){
			numthree=0;
		}
	}
	clearInterval(lastA.timer);
	lastA.timer=setInterval(function(){
		lastAmove();
	},2000)
//喇叭那一块结束
//定时器开始

	var timerP=document.getElementById("timerP");
//	var starday=0;
//	var starhour=23;
//	var starmin=59;
//	var	starsecond=59;
//	timerP.innerHTML=starday+"天"+starhour+":"+starmin+":"+starsecond;
//	function count(){
//		starsecond--;
//		if(starsecond<0){
//			starmin--;
//			starsecond=59;
//		}
//		//;
//	}
			var holiday=new Date('2017-8-31');
			//var sp=document.getElementsByTagName("span")[0];
			setInterval(function(){
				var now=new Date();
				var long=parseInt((holiday.getTime()-now.getTime())/1000);//求出秒
				var d;
				d=parseInt(long/(24*60*60));//秒变为天数
				var h;
				h=parseInt(long%(24*60*60)/3600);//秒变为小时
				var m;
				m=parseInt(long%3600/60)//秒变为分
				var s;
				s=long%60;

			},1000)
			function count(){
				timerP.timer=setInterval(function(){
					var now=new Date();
					var long=parseInt((holiday.getTime()-now.getTime())/1000);//求出秒
					var d;
					d=parseInt(long/(24*60*60));//秒变为天数
					var h;
					h=parseInt(long%(24*60*60)/3600);//秒变为小时
					var m;
					m=parseInt(long%3600/60)//秒变为分
					var s;
					s=long%60;
					timerP.innerHTML=d+"天"+h+"时"+m+"分"+s+"秒";
				},1000)
				
			}
			count();
//	timerP.timer=setInterval(function(){
//		starsecond--;
//		if(starsecond>10){
//			starsecond=Number("0"+starsecond);
//			count();
//		}else{
//			starsecond=starsecond;
//			count();
//		}
//		timerP.innerHTML=starday+"天"+starhour+":"+starmin+":"+starsecond;
//	},100);
	
	
//	//注册页面
//	var inputA=document.getElementById("inputA");
//	var inputImg=document.getElementById("inputA");
//	var numfive=0;
//	inputA.onclick=function(){
//		if(numfive%2==0){
//			inputImg.src="img/getImg.jpg";
//		}else{
//			inputImg.src="img/getImg1.jpg";
//		}
//	}
}
