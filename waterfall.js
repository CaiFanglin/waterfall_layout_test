/*获取所有img容器
*计算一行几个元素；
*将第一行元素的高存入数组
*求出数组的最小值及其索引值
*将后续的图片放入最小索引的下方，并改变该值
*/
window.onload=function(){
	waterfall("main","div_item");
	 var dataInt={'data':[{'src':'P_01.jpg'},{'src':'P_04.jpg'},{'src':'P_05.jpg'},{'src':'P_02.jpg'},{'src':'P_011.jpg'},{'src':'P_010.jpg'},{'src':'P_06.jpg'},{'src':'P_013.jpg'}]};
    window.onscroll=function(){
        if(checkscrollside()){
            var oParent = document.getElementById('main');// 父级对象
       
            for(var i=0;i<dataInt.data.length;i++){
                var oPin=document.createElement('div'); //添加 元素节点
                oPin.className='div_item';                   //添加 类名 name属性
                oParent.appendChild(oPin);              //添加 子节点
                var oImg=document.createElement('img');
                oImg.src='images/'+dataInt.data[i].src;
                oPin.appendChild(oImg);

                waterfall("main","div_item");
            }
           
        };
    }
}

function checkscrollside(){
    var oParent=document.getElementById('main');
    var aPin=getClassName(oParent,'div_item');
    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}

function waterfall(parent,target){

	var oParent=document.getElementById(parent);
	
	var oTarget=getClassName(oParent,target);
	var len=oTarget.length;
	var clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
	var oTarWidth = oTarget[0].offsetWidth;
	var clos = Math.floor(clientWidth / oTarWidth);

	var arr=[];
	for(var i=0;i<len;i++){
		if(i<clos){
			arr.push(oTarget[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,arr);
			var minIndex = getMinIndex(minH,arr);
			oTarget[i].style.position="absolute";
			oTarget[i].style.top=minH +"px";
			oTarget[i].style.left = oTarget[minIndex].offsetLeft+"px";
			arr[minIndex] +=oTarget[i].offsetHeight;
		}
	}
}

function getMinIndex(val,arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==val){
			return i;
		}
	}
}

function getClassName(parent,target){
	var arr=[];
	var oTarget=parent.getElementsByTagName("*");
	for(var i=0;i<oTarget.length;i++){
		// var oCls = oTarget[i].className.split(" ");
		// var len =oCls.length;
		// if(len<2 && len>0 && oCls[0]==target){
		// 	arr.push(oTarget[i]);
		// }else{
		// 	for(var j=0;j<len;j++){
		// 		if(oCls[i]==target){
		// 			arr.push(oTarget[i]);
		// 		}
		// 	}
		// }
		if(oTarget[i].className == target){
			arr.push(oTarget[i]);
		}
	}
	return arr;

}
