function divide(a,b) { 
    return '&#92'+'frac{'+a+'}{'+b+'}';
    
}

function correctMinus(a) {
    if (a<0) {
        a = '('+a+')'
    }
    return a;
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
function mult(a,b) {
    return correctMinus(a)+'&#92' +'cdot ' +correctMinus(b);      
}
function factorial(n) { //факторіал
    if ((n==1)||(n==0)) {
        return 1 ;
    } else {
        return n*factorial(n-1);
    }
}
function combination(n,k) { //комбінації
    return factorial(n)/(factorial(n-k)*factorial(k));
}
function showComb (n,k) {
    return divide(n+'!',k+'!'+(n-k)+'!');
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
function Fraction(a,b) {
    var divider = NSD(new Array(a,b))
    this.numerator = a/divider; 
    this.denominator = b/divider;
}
// str is only string data types. Use for processing forms data. Str can be only number or Fraction
function isFraction(str) {
	var k =str.indexOf('/') 
	if (k==-1) {
		return +str;
	} else {
		var numerator = +(str.slice(0,k))
		var denominator = +(str.slice(k+1))
		return new Fraction(numerator,denominator);
	}
} 

Fraction.prototype.isNum = function () {
    if (Math.abs(this.denominator)==1) {
        return (-this.numerator) 
    } else if(this.numerator==0) {
        return 0
    } else {
        return this;
    }
}

Fraction.prototype.toString = function () {
    if (this.denominator==1) {
        return this.numerator
    }
	if (this.denominator==-1) {
        return this.numerator/this.denominator;
    }
	
    if ((this.denominator<0)&&(this.numerator>0)) {
        return '-'+divide(this.numerator,this.denominator*(-1))
    }
    if ((this.denominator>0)&&(this.numerator<0)) {
        return '-'+divide(this.numerator*(-1),this.denominator)
    }
    if ((this.denominator<0)&&(this.numerator<0)) {
        return divide(this.numerator*(-1),this.denominator*(-1))
    }    
    return divide(this.numerator,this.denominator)
}
Fraction.prototype.power = function (n) {
    if (typeof this == 'number') {
        return Math.pow(this,n)
    } else {
        return new Fraction(Math.pow(this.numerator,n),Math.pow(this.denominator,n))
    }
}
Fraction.prototype.result = function (n) {
    if(typeof n=='undefined') {
        return this.numerator/this.denominator;
    }
    var dec = 1;
    for(var i=0;i<n;i++) {
        dec*=10;
    }
    return Math.round( this.numerator/this.denominator*dec)/dec
} 
function isInteger (a) {
	if (roundTo(a,0)==a) {
		return true;
	} else {
		return false;
	}
}
function addFraction(a,b) {
    if ((typeof a == 'number')&&(typeof b == 'number')) {
        return roundTo6(a+b);
    }
    if ((typeof a == 'number')&&(isInteger(a))) {
        return new Fraction(a*b.denominator+b.numerator,b.denominator)
    }  else if(typeof a == 'number'){
		return roundTo(a+b.result(5),4)
	}
    if ((typeof b =='number')&&(isInteger(b))) {
        return new Fraction(b*a.denominator+a.numerator,a.denominator)
    } else if(typeof b =='number') {
		return roundTo(b+a.result(5),4);
	}
    return new Fraction(a.numerator*b.denominator+a.denominator*b.numerator,a.denominator*b.denominator)
}
function addFracs() {
    var result = 0;
    for (var i=0;i<arguments.length;i++) {
        var result = addFraction(arguments[i],result)
    }
    return result;
}
function substrationFraction(a,b) {
    if ((typeof a == 'number')&&(typeof b == 'number')) {
        return roundTo(a-b,8);
    } 
    if ((typeof a == 'number')&&(isInteger(a))) {
        return new Fraction(a*b.denominator-b.numerator,b.denominator)
    } else if(typeof a == 'number') {
		return roundTo(a-b.result(5),4)
	}
    if ((typeof b =='number')&&(isInteger(b))) {
        return new Fraction(-b*a.denominator+a.numerator,a.denominator)
    } else if (typeof b =='number') {
		return roundTo(a.result(5)-b,4);
	}
    return new Fraction((a.numerator*b.denominator-a.denominator*b.numerator),(a.denominator*b.denominator))   
}

function multFraction(a,b)  {
	if ((a==0)||(b==0)) {
		return 0;
	}
    if ((typeof a == 'number')&&(typeof b == 'number')) {
        return a*b; 
    }
	if ((typeof b =='number')&&(isInteger(b))) {
        return new Fraction(b*a.numerator,a.denominator)
    } else if(typeof b =='number') {
		return roundTo(a.result(5)*b,4);
	}
	if ((typeof a == 'number')&&(isInteger(a))) {
        return new Fraction(a*b.numerator,b.denominator)
    } else if (typeof a == 'number') {
		return roundTo(a*b.result(5),4)
	}
    return new Fraction(a.numerator*b.numerator,a.denominator*b.denominator);
}
function multFracs() {
    var result = 1;
    for (var i=0;i<arguments.length;i++) {
        var result = multFraction(arguments[i],result)
    }
    return result;
}
function divideFraction(a,b) {
    if (typeof a == 'number') {
        return new Fraction(a*b.denominator,b.numerator)
    } 
    if (typeof b =='number') {
        return new Fraction(a.numerator,b*a.denominator)
    } 
    if ((typeof a == 'number')&&(typeof b == 'number')) {
        return a/b;
    } 
    return new Fraction(a.numerator*b.denominator,a.denominator*b.numerator)     
}