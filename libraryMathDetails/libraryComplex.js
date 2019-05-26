function IrrationalNumber (a) {
    this.value = a;
} 
function checkIr(a) {
    if (typeof a == 'number') {
        return a;
    } else {
        return new IrrationalNumber(a)
    }
}
IrrationalNumber.prototype.pow = function (n) {
    return new IrrationalNumber(Math.pow(this.value,n))
}
IrrationalNumber.prototype.toString = function() {
    return '\u005C'+'sqrt{'+this.value+'}'
}
IrrationalNumber.prototype.valueOf = function () {
    return Math.round(Math.sqrt(this.value)*100000)/100000
}
function Complex(Rez,Imz) {
    if (typeof Rez =='number') {
        this.re = Math.round(Rez*10000)/10000; 
    } else {
        this.re = Rez
    }
    if (typeof Imz =='number') {
        this.im = Math.round(Imz*10000)/10000; 
    } else {
        this.im = Imz
    }
    this.module = new IrrationalNumber(Math.round((this.re*this.re+this.im*this.im)*10000)/10000)
}
Complex.prototype.argument = function () {
    var cos = this.re/this.module;
    var sin = this.im/this.module;
    var argument = 0;
    if (Math.abs(cos)==1/2) {
        argument = ((cos>0)&&(sin>0))?(60):((cos>0)&&(sin<0))?(300):((cos<0)&&(sin>0))?(120):(240)
        return argument;
    }
    if (Math.abs(sin)==1/2) {
        argument = ((cos>0)&&(sin>0))?(30):((cos>0)&&(sin<0))?(330):((cos<0)&&(sin>0))?(150):(210)
        return argument;
    }
    if (Math.abs(cos)==Math.abs(sin)) {
            argument=((cos>0)&&(sin>0))?(45):((cos>0)&&(sin<0))?(315):((cos<0)&&(sin>0))?(135):(225)
            return argument;
    }
    if (this.re==0) {
        argument = (this.im>0)?(90):(270)
        return argument;
    }
    if (this.im==0) {
        argument = (this.re>0)?(0):(180)
        return argument;
    }
    if (cos>0) {
        argument = Math.round(10*Math.atan(this.im/this.re)*180/Math.PI)/10
    } else if (sin>0) {
        argument = Math.round(10*(Math.atan(this.im/this.re)+Math.PI)*180/Math.PI)/10
    } else  {
        argument = Math.round(10*(Math.atan(this.im/this.re)-Math.PI)*180/Math.PI)/10
    }
    return argument;
}
Complex.prototype.power = function (n) {
    var mod = Math.pow(this.module,n);
    var arg = this.argument()*n;
    var rez = mod*Math.cos(arg*Math.PI/180)
    var imz = mod*Math.sin(arg*Math.PI/180)
    return new Complex(rez,imz)
}
Complex.prototype.showPowering = function (n,parent) {
    recordtext('Використаємо формулу',parent,'p');
    recordElement('z^{'+' n'+'}=|z|^{'+' n'+'}(cos('+mult('\u005C'+'varphi ',' n')+')'+'+'+mult('i',' sin('+mult('\u005C'+'varphi ',' n'))+'))',parent,'div')
    recordElement('('+this+')'+'^{'+n+'}='+'('+this.module.toString()+')'+'^{'+n+'}(cos('+mult(this.representArgument(),n)+')'+'+'+mult('i',' sin('+mult(this.representArgument(),n))+'))=',parent,'div');  
    recordElement('='+this.power(n).toString(),parent,'div')
}
Complex.prototype.representArgument = function () {
    if (this.argument == 0) {
        return 0;
    }
    var frac = new Fraction(this.argument(),180)
    var str = frac.toString()
    var k1 = str.indexOf('{')
    var k2 = str.indexOf('}')
    str = str.slice(0,k1+1)+mult(str.slice(k1+1,k2),' \u005C'+'pi ')+str.slice(k2)
    return str
}
Complex.prototype.roots = function (n) {
    var arrOfRoots = [];
    for (var i= 0;i<n;i++) {
        var mod = Math.pow(this.module,1/n);
        var rez = mod*Math.cos((this.argument()*Math.PI/180+2*Math.PI*i)/n)
        var imz = mod*Math.sin((this.argument()*Math.PI/180+2*Math.PI*i)/n) 
        arrOfRoots[i] = new Complex(rez,imz)
    }
    return arrOfRoots;
}
Complex.prototype.ShowCalculateRoots  = function (n,parent) {
    recordtext('Обчислимо корені за формулою:',parent,'p')
    recordElement('z_{k}=\u005C'+'sqrt[n]{z}=\u005Csqrt[n]{|z|}(cos('+divide('\u005C'+'varphi  + 2\u005Cpi k','n')+')+isin('+divide('\u005C'+'varphi + 2\u005Cpi k','n')+'))'+'     '+'&#92:&#92:&#92:&#92:&#92:&#92:&#92:&#92:&#92:&#92:&#92:&#92:'+'k=\u005Coverline{0..n-1}',parent,'div')
    var newArg = []
    for (var i=0;i<n;i++) {
        var a = new Fraction(+this.argument(),180)
        newArg[i] = addFraction(a,2*i)
        newArg[i] = divideFraction(newArg[i],n)
    }
    for (var i=0;i<n;i++) {
        recordElement('z_{'+i+'}=\u005Csqrt['+n+']{'+this.module.toString()+'}(cos('+divide(this.representArgument()+'  +'+mult(' 2\u005Cpi',' '+i),' '+n)+')+isin('+divide(this.representArgument()+'+'+mult(' 2\u005Cpi',' '+i),' '+n)+')='+'\u005Csqrt['+(n*2)+']{'+roundTo4(this.module*this.module)+'}(cos('+newArg[i]+'\u005Cpi )+isin('+newArg[i]+'\u005Cpi ))',parent,'div')
    }
}

Complex.prototype.conjugatedComplex = function () {
    return new Complex(this.re,-this.im)
}
Complex.prototype.toString = function () {
    if (typeof this.im =='number') {
    return this.re.toString()+'+'+mult(correctMinus(this.im),' i'); } else {
        return this.re.toString()+'+'+this.im.toString()+'i';
    }
}
Complex.prototype.showTrigon = function () {
    var str =this+ ' ='+this.module.toString()+'(cos('+this.representArgument()+')+'+mult('i',' ')+'sin('+this.representArgument()+'))'
    return str;
}
Complex.prototype.showExponentForm = function () {
    return this+ ' ='+this.module.toString()+'e^{'+mult(this.representArgument(),' i')+'}'
}
function addComplex(a,b) {
    var re = a.re+b.re;
    var im = a.im+b.im;
    return new Complex(re,im);
}
function substractionComplex(a,b) {
    var re = a.re-b.re;
    var im = a.im-b.im;
    return new Complex(re,im);
}
function multComplex(a,b) {
    var re = a.re*b.re-a.im*b.im;
    var im = a.re*b.im+a.im*b.re;
    return new Complex(re,im)
}
function divideComplex(a,b){
    var sb = b.conjugatedComplex()
    var helpC = multComplex(a,sb)
    return new Complex(helpC.re/Math.pow(b.module,2),helpC.im/Math.pow(b.module,2))
}
function showDividing(a,b) {
    var numerator = multComplex(a,b.conjugatedComplex())
    var re = new Fraction(numerator.re,roundTo4(Math.pow(b.module,2)))
    var im = new Fraction(numerator.im,roundTo4(Math.pow(b.module,2)))
    var str = divide(a,b)+'='+divide(mult('('+a+')','('+b.conjugatedComplex()+')'),mult('('+b+')','('+b.conjugatedComplex()+')'))+'='+divide(multComplex(a,b.conjugatedComplex()),' '+roundTo4(b.module*b.module))+'='+re+'+'+mult(im,' i');
    return str;
}

var com1 = new Complex(new IrrationalNumber(2),new IrrationalNumber(2))
var com2 = new Complex(1,0)
var com3 = new Complex(1,new IrrationalNumber(3))

recordElement(showDividing(com2,com3),'#condition','div')
com3.showPowering(4,'#condition')
com2.ShowCalculateRoots(4,'#condition')