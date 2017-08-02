/*
* author:ls
* email:liusaint@gmail.com
* date:2016年9月
*/
// 绘制背景
function drawBg(){

	var cxt = document.getElementById('skyPic').getContext("2d");
	var bgColor = '#1290f4';
	var whiteColor = '#91cef9';
	var scaleBgColor = '#5cb7f7';
	var scaleColor = '#ccc';
	var RADIUS = 180;//最外半径

	cxt.clearRect(0,0,390,390);//清空画布
	cxt.fillStyle= bgColor;
	cxt.fillRect(0,0,390,390);


	
	cxt.save();	//保存状态

	cxt.translate(15,15);//坐标原点移动，留出边界值，让可能出现在最外层的信息能显示

	// 1.画最外层圈.白色。
	cxt.beginPath();
	cxt.fillStyle = whiteColor;
	cxt.arc(RADIUS, RADIUS, RADIUS, Math.PI*2*7/16, Math.PI*2*1/16, false);

	cxt.lineTo(RADIUS, RADIUS);
	cxt.fill();

	// 2.白色圈中画最第二层圈.背景色。 外层圆环完成。
	cxt.beginPath();
	cxt.fillStyle =bgColor;
	cxt.arc(RADIUS, RADIUS, RADIUS-5, 0, Math.PI*2, false);
	cxt.lineTo(RADIUS, RADIUS);
	cxt.fill();

	// 3.白色圈。
	cxt.beginPath();
	cxt.fillStyle =scaleBgColor;
	cxt.arc(RADIUS, RADIUS, RADIUS-20, Math.PI*2*7/16, Math.PI*2*1/16, false);
	cxt.lineTo(RADIUS, RADIUS);
	cxt.fill();


	cxt.save();	//保存状态

	//4.通过旋转的方式画圆中的分割线，外层小刻度
	
	cxt.strokeStyle = scaleColor;
	cxt.translate(RADIUS,RADIUS);

	cxt.rotate(Math.PI/180*22.5);
	cxt.rotate(Math.PI/180*45);
	cxt.lineWidth = 0.5;
	for(var i=0;i<29;i++){
		cxt.rotate(Math.PI/180*7.5);
		cxt.beginPath();
		cxt.moveTo(0,0);
		cxt.lineTo(0,RADIUS-20);
		cxt.stroke();
	}
	

	cxt.restore();
	cxt.save();	//保存状态

	// 5.小一点的白色圆。
	cxt.beginPath();
	cxt.fillStyle =scaleBgColor;

	cxt.arc(RADIUS, RADIUS, RADIUS-28, Math.PI*2*7/16, Math.PI*2*1/16, false);
	cxt.lineTo(RADIUS, RADIUS);
	cxt.fill();

	//6.大刻度
	cxt.strokeStyle = scaleColor;
	cxt.translate(RADIUS,RADIUS);

	cxt.rotate(Math.PI/180*22.5);
	cxt.rotate(Math.PI/180*45);
	cxt.lineWidth = 1;
	for(var i=0;i<4;i++){
		cxt.rotate(Math.PI/180*45);
		cxt.beginPath();
		cxt.moveTo(0,0);
		cxt.lineTo(0,RADIUS-20);
		cxt.stroke();
	}
	

	cxt.restore();

	//7.内层背景色圆
	cxt.beginPath();
	cxt.fillStyle =bgColor;
	cxt.arc(RADIUS, RADIUS, RADIUS-35, 0, Math.PI*2, false);
	cxt.lineTo(RADIUS, RADIUS);
	cxt.fill();

	cxt.restore();

}





function changeCir(end,number,time){
	//小圆的移动
	var start = -22.75;
	var cirDom = document.querySelector('.cir-wrap');
	cirDom.style.transition = time+'ms';

	setTimeout(function(){
		cirDom.style.transform = 'rotate('+end+'deg)';
	},0)
	

	//数字的增加
	var numberDom =  document.querySelector('.number');
	var numberGap = number - 350;
	var timer;

	// //方法一.递归settimeout。受机器和浏览器影响比较大。可能会因为dom操作过慢，容易出现css3结束之后，数字还没变化 完的情况。
	//导致在多个浏览器中数字增长太慢。 
	// var callback = function(){
	// 	numberDom.innerText = parseInt(numberDom.innerText)+1;
	// 	if(numberDom.innerText<number){
	// 		setTimeout(callback, time/numberGap);
	// 	}
	// }
	// setTimeout(callback, time/numberGap);


	//方法二使用Interval的方式-begin。效果稍好。
	// var callback = function(){
	// 	var num = numberDom.innerText;
	// 	if(num<number){
	// 		numberDom.innerText = parseInt(numberDom.innerText)+1;			
	// 	}else{
	// 		clearInterval(timer);
	// 	}			
	// }

	// timer = setInterval(callback, Math.floor(time/numberGap));
	//使用Interval的方式-end


	//方法三。效果最好。使用timeout队列的方式-begin
	var timerArr = [];
	var callback = function(){
		var num = numberDom.innerText;
		if(num<number){
			numberDom.innerText = parseInt(numberDom.innerText)+1;
			timerArr.pop();
		}else{
			for (var i = 0; i < timerArr.length; i++) {
				clearTimeout(timerArr[i]);
			}
		}

	}

	for (var i = 0; i < numberGap; i++) {
		(function(i){
			timer = setTimeout(callback, i*time/numberGap);
			timerArr.push(timer);
		})(i);	
	}
	////使用timeout队列的方式-end
}


drawBg();
changeCir(157.5,700,1500);
