function Interval(a,b) {
    this.downLimit=a;
    this.upLimit = b;
    this.downInclude = true;
    this.upInclude = true;
}
Interval.prototype.showInterval = function() {
    var str = '';
    if (this.downInclude) {
        str+='[' 
    } else {
        str+='('
    }
    str+=this.downLimit+';'+this.upLimit;
    if(this.upInclude) {
        str+=']'
    } else {
        str+=')'
    }
    return str;
}
Interval.prototype.contain = function(a) {
    if ((this.downLimit<a)&&(this.upLimit>a)) return true;
    if ((this.downLimit==a)&&(this.downInclude)) return true; 
    if ((this.upLimit==a)&&(this.upInclude)) return true;
    return false;
}
// we process intervals that is singel-minded, and I want to get a Interval that is singel-minded
function combiningIntervals(a,b) {
	if ((typeof a != 'object')&&(typeof b != 'object')) {
		return undefined;
	}
	if (typeof a != 'object') {
		return b;
	}
	if (typeof b != 'object') {
		return a;
	}
	if((a.upLimit<b.downLimit)||(b.upLimit<a.downLimit)) {
		return 0;
	}
	var int = new Interval(0,1);
	if (a.downLimit>b.downLimit) {
		int.downLimit = b.downLimit;
		int.downInclude = b.downInclude;
	} else if (a.downLimit<b.downLimit) {
		int.downLimit = a.downLimit;
		int.downInclude = a.downInclude;		
	} else {
		int.downLimit = a.downLimit;
		if ((a.downInclude)||(b.downInclude)) {
			int.downInclude = true;
		} else {
			int.downInclude  = false;
		}
	}
	if (a.upLimit>b.upLimit) {
		int.upLimit = a.upLimit;
		int.upInclude = a.upInclude;
	} else if(a.upLimit<b.upLimit) {
		int.upLimit = b.upLimit;
		int.upInclude = b.upInclude;		
	} else {
		int.upLimit = a.upLimit;
		if ((a.upInclude)||(b.upInclude)) {
			int.upInclude = true
		} else {
			int.upInclude = false;
		}
	}
	return int;
}
//var a = new Interval(0,3)
//a.downInclude = false;
//var b = new Interval(0,2)
//b.downInclude = false;
//console.log(combiningIntervals(a,b))