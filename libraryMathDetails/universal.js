function createFormula(elem) {
    return '<img src="https://latex.codecogs.com/gif.latex?'+elem+'" title="\Saldan Roman" />';
}
function divide(a,b) { 
    return '&#92'+'frac{'+a+'}{'+b+'}';
    
}

function getElements (selector) {
    return document.querySelectorAll(selector);
}
function setPropertyToPoint(elem,width,height,color) { //надати властивості
    elem.style.position = 'absolute';
    elem.style.width =width+'px';
    elem.style.height=height+'px';
    elem.style.backgroundColor =color;
}
function correctMinus(a) {
    if (typeof a!='number') {
		if (typeof a == 'object') {
			if (a.result(2)<0) {
				a = '('+a+')';
			}
		}
	}
	if (a<0) {
        a = '('+a+')'
    }
    return a;
}
function mult3 (a,d,c) {
    return correctMinus(a)+'&#92' +'cdot' +correctMinus(d)+'&#92' +'cdot' +correctMinus(c)
}
function mult4 (a,d,c,b) {
    return correctMinus(a)+'&#92' +'cdot'  +correctMinus(d)+'&#92' +'cdot' + correctMinus(c)+' \u005C'+ 'cdot' +correctMinus(b);
}
function vec(a) {
    return '&#92'+'overrightarrow{'+a+'}'
}
function factorial(n) { //факторіал
    var k=1;
    for (var i=1;i<n+1;i++) { 
        k=k*i;
    }
    return k;
}
function combination(n,k) { //комбінації
    return factorial(n)/(factorial(n-k)*factorial(k));
}
function roundTo4(a) {
    return Math.round(a*10000)/10000;
}function roundTo6(a) {
    return Math.round(a*1000000)/1000000;
}
function roundTo(a,n) {
	if (typeof a !='number') {
		return a;
	}
	if (typeof (+a) =='number')  {
		var roun = 1;
		for (var i=0;i<n;i++) {
			roun=roun*10;
		}
		return Math.round(a*roun)/roun; 
	} else {
		return a;
	}
}
function mult(a,b) {
    return correctMinus(a)+'&#92' +'cdot' +correctMinus(b);      
}
function getAnElement(selector) {
    return document.querySelector(selector);
}
function recordElement (str,parent,typeelement) {
    var par = document.querySelector(parent);
    var div = document.createElement(typeelement);
    div.innerHTML = createFormula(str);
    par.appendChild(div);
}
function recordtextAfter (str,parent,after,typeelement) {
    var par = document.querySelector(parent);
    var div = document.createElement(typeelement);
    var after =document.querySelector(after).nextSibling; 
    div.innerHTML = (str);
    par.insertBefore(div,after);
}
function recordElementAfter(str,parent,after,typeelement) {
    var par = document.querySelector(parent);
    var bef = document.querySelector(after).nextSibling.nextSibling;
    var div = document.createElement(typeelement);
    div.innerHTML = createFormula(str);
    par.insertBefore(div,bef);
}
function recordtext(str,parent,typeelement) {
    var par = document.querySelector(parent);
    var div = document.createElement(typeelement);
    div.innerHTML = (str);
    par.appendChild(div);
}
function recordTasc(selector,str) {
	recordElement(str,selector,'div');
}
function getFirstForm(selector) {
    return document.getElementsByName(selector)[0]
}

function correctNormEquation(str) {
    var  k1 =str.indexOf('--');
    var  k2 =str.indexOf('+-');
    var result = '';
    if ((k1!=-1)&&(k2!=-1)) {
        result=str.slice(0,k1)+'+'+str.slice(k1+2,k2)+'-'+str.slice(k2+2);
    } else if (k1!=-1) {
        result=str.slice(0,k1)+'+'+str.slice(k1+2)
    } else if (k2!=-1) {
        result = str.slice(0,k2)+'-'+str.slice(k2+2)
    } else {
        result = str;
    }
    
    return result;
}
function NSK(A)
{   
    var  n = A.length, a = Math.abs(A[0]);
    for (var i = 1; i < n; i++)
     { var b = Math.abs(A[i]), c = a;
       while (a && b){ a > b ? a %= b : b %= a; } 
       a = Math.abs(c*A[i])/(a+b);
     }
    return a;
}
function altMult(a,b) {
    if (a=='') {
        return b;
    }
    if(a=='-') {
        return '-'+b;
    }
    return a+'\u005C'+ 'cdot '+b
}
function altMult3(a,b,c) {
    return a+'\u005C'+ 'cdot '+b+'\u005C'+ 'cdot '+c
}
function takeOutOne(str){
    if(str=='1') {
        return '';
    } 
    if(str=='-1') {
        return '-';
    }      
    return str;
}
function correctNorm(condition,number) {
    for (var i=0;i<number;i++) {
        condition = correctNormEquation(condition)
    }
    return condition;
}
function determinant2(a,b,c,d) {
    var str = '\u005C'+'begin{vmatrix}'+a+'&'+b+'\u005C'+'\u005C'+c+'&'+d+'\u005C'+'end{vmatrix}'+'='+mult(correctMinus(a),correctMinus(d))+'-'+mult(correctMinus(b),correctMinus(c))+'='
    return str;
    
//    \begin{vmatrix}
//1 & 2\\ 
//3 & 4
//\end{vmatrix}
}
function writeSystemEquation(equation1,equation2) {
    return '\u005C' +'left'+'\u005C'+'{'+'\u005C'+'begin{matrix}'+equation1+'\u005C'+'\u005C'+equation2+'\u005C'+'end{matrix}'+'\u005C'+'right.'
}

function createLinearEquation (a,b,c,d) {
    if (typeof d=='undefined') {
         var x ='=0';
    } else {
        var x ='='+d;
    }
    if ((c==0) &&(a==0)) {
        var str = altMult(takeOutOne(b),'y')+x;
        str = correctNorm(str,3)
        return str;
    }    
    if ((c==0) &&(b==0)) {
        var str = altMult(takeOutOne(a),'x')+x;
        str = correctNorm(str,3)
        return str;
    }
    if (a==0) {
        var str = altMult(takeOutOne(b),'y')+'+'+c+x;
        str = correctNorm(str,3)
        return str;
    }
    if (b==0) {
        var str = altMult(takeOutOne(a),'x')+'+'+c+x;
    str = correctNorm(str,3)
    return str;
    }
    if (c==0) {
        var str = altMult(takeOutOne(a),'x')+'+'+altMult(takeOutOne(b),'y')+x;
        str = correctNorm(str,3)
        return str;
    }

    var str = altMult(takeOutOne(a),'x')+'+'+altMult(takeOutOne(b),'y')+'+'+c+x;
    str = correctNorm(str,3)
    return str;
}
function NSD(A)
{   
    var n = A.length, x = Math.abs(A[0]);
    for (var i = 1; i < n; i++)
     { var y = Math.abs(A[i]);
       while (x && y){ x > y ? x %= y : y %= x; }
       x += y;
     }
    return x;
}

    
// array is 2-dimensional,orientationOfHeadLine - is boolean, default is true(horysontal), anything else is false(vertical)
function createAndShowTable(array,where,orientationOfHeadLine) {
	var parent = document.querySelector(where);
	var table = parent.appendChild(document.createElement('table'));
	table.setAttribute('border','2')
	table.style.borderCollapse = 'collapse';
	if (typeof orientationOfHeadLine == 'undefined') {
		var bool = true;
	} else {
		var bool = false;
	}
	for (var i = 0;i<array.length;i++) {
		var tr = document.createElement('tr');
		table.appendChild(tr)
		for (var j=0;j<array[i].length;j++) {
			if ((!bool)&&(j==0)) {
				var th = document.createElement('th');
				tr.appendChild(th)
				th.innerHTML =array[i][j]; 
				continue;
			}
			if ((bool)&&(i==0)) {
				var th =document.createElement('th');
				tr.appendChild(th)
				th.innerHTML =array[i][j];
				continue;
			}  
			var td = document.createElement('td');
			tr.appendChild(td)
			td.innerHTML = array[i][j]; 				
			
		}
	}
	
}

function createTableWithForms(array,where,orientationOfHeadLine) {
	var parent = document.querySelector(where);
	var table = parent.appendChild(document.createElement('table'));
	table.setAttribute('border','2')
	table.style.borderCollapse = 'collapse';
	if (typeof orientationOfHeadLine == 'undefined') {
		var bool = true;
	} else {
		var bool = false;
	}
	for (var i = 0;i<array.length;i++) {
		var tr = document.createElement('tr');
		table.appendChild(tr)
		for (var j=0;j<array[i].length;j++) {
			if ((!bool)&&(j==0)) {
				var th = document.createElement('th');
				tr.appendChild(th)
				th.appendChild(array[i][j]); 
				continue;
			}
			if ((bool)&&(i==0)) {
				var th =document.createElement('th');
				tr.appendChild(th)
				th.appendChild(array[i][j]);
				continue;
			}  
			var td = document.createElement('td');
			tr.appendChild(td)
			td.appendChild(array[i][j]); 				
			
		}
	}
	
}
//function Fraction(a,b) {
//    var divider = NSD(new Array(a,b))
//    this.numerator = a/divider; 
//    this.denominator = b/divider;
//}
////Fraction.prototype.toString = function () {
////    return divide(this.numerator,this.denominator) 
////}
//Fraction.prototype.isNum = function () {
//    if (Math.abs(this.denominator)==1) {
//        return (-this.numerator) 
//    } else if(this.numerator==0) {
//        return 0
//    } else {
//        return this;
//    }
//}
//
//Fraction.prototype.toString = function () {
//    if (this.denominator==1) {
//        return this.numerator
//    }
//    if ((this.denominator<0)&&(this.numerator>0)) {
//        return '-'+divide(this.numerator,this.denominator*(-1))
//    }
//    if ((this.denominator>0)&&(this.numerator<0)) {
//        return '-'+divide(this.numerator*(-1),this.denominator)
//    }
//    if ((this.denominator<0)&&(this.numerator<0)) {
//        return divide(this.numerator*(-1),this.denominator*(-1))
//    }    
//    return divide(this.numerator,this.denominator)
//}
//Fraction.prototype.power = function (n) {
//    if (typeof this == 'number') {
//        return Math.pow(this,n)
//    } else {
//        return new Fraction(Math.pow(this.numerator,n),Math.pow(this.denominator,n))
//    }
//}
//function addFraction(a,b) {
//    if ((typeof a == 'number')&&(typeof b == 'number')) {
//        return a+b;
//    }
//    if (typeof a == 'number') {
//        return new Fraction(a*b.denominator+b.numerator,b.denominator)
//    }  
//    if (typeof b =='number') {
//        return new Fraction(b*a.denominator+a.numerator,a.denominator)
//    } 
//    return new Fraction(a.numerator*b.denominator+a.denominator*b.numerator,a.denominator*b.denominator)
//    
//}
//function substrationFraction(a,b) {
//    if ((typeof a == 'number')&&(typeof b == 'number')) {
//        return a-b;
//    } 
//    if (typeof a == 'number') {
//        return new Fraction(a*b.denominator-b.numerator,b.denominator)
//    } 
//    if (typeof b =='number') {
//        return new Fraction(-b*a.denominator+a.numerator,a.denominator)
//    } 
//
//    return new Fraction(a.numerator*b.denominator-a.denominator*b.numerator,a.denominator*b.denominator)
//    
//}
//function multFraction(a,b)  {
//    if ((typeof a == 'number')&&(typeof b == 'number')) {
//        return a*b 
//    } else if (typeof b =='number') {
//        return new Fraction(b*a.numerator,a.denominator)
//    } else if (typeof a == 'number') {
//        return new Fraction(a*b.numerator,b.denominator)
//    } else {
//        return new Fraction(a.numerator*b.numerator,a.denominator*b.denominator)
//    }    
//}
//function divideFraction(a,b) {
//    if (typeof a == 'number') {
//        return new Fraction(a*b.denominator,b.numerator)
//    } 
//    if (typeof b =='number') {
//        return new Fraction(a.numerator,b*a.denominator)
//    } 
//    if ((typeof a == 'number')&&(typeof b == 'number')) {
//        return a/b;
//    } 
//    return new Fraction(a.numerator*b.denominator,a.denominator*b.numerator)
//      
//}