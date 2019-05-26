
function frac(a,b)  {
    var str  = '&#92';
    str +='frac{'+a+'}{'+b+'}';
    return str;    
}
function sqrt(a) {
    var str = '&#92';
    str +='sqrt{'+a+'}';
    return str;        
}
function sum(a,b) {
    var str  = '&#92';
    str +='sum_{'+a+'}^{'+b+'}';
    return str;        
}

var cdot = '&#92'; //знак множення
cdot+='cdot ';
var infty = '&#92';
infty +='infty ';
var sigma = '&#92';
sigma +='sigma ';
var newline  = '&#92';
newline += '&#92 ';   
var approx  = '&#92';
approx += 'approx ' //приблизно
function latex (string) {
    var str = '&#92';
    str += string; 
    return str;
}
var Distribution = function (values,probs,name) {
	if (typeof arguments[2] == 'undefined') {
		this.name = 'X'
	} else {
		this.name = name;
	}
    var arrProbs  = [];

	if (typeof probs[0] !='string') {
		this.probabilities = probs;
		this.values = values;
		for (var i = 0;i<values.length;i++) {
			this.values[i] = +values[i];
		}
		this.dimension = this.probabilities.length;
		return
	}
	if (values.length ==probs.length) {
        this.values = values;
		
		for (var i=0;i<probs.length;i++){
			this.values[i] = +(this.values[i])
			//console.log( typeof +probs[i])
			if (probs[i].indexOf('/')==-1) {
				probs[i]=+(probs[i]);
			} else {
				var slash = probs[i].indexOf('/');
				var numerator = +(probs[i]).slice(0,slash)
				
				var denominator = +(probs[i]).slice(slash+1,probs[i].length);
				probs[i]= new Fraction(numerator,denominator);
			}
		}
		
        this.probabilities = probs;
        this.dimension = this.values.length;
    } else {
        console.log('помилка, масиви не співадають')
    }
} 
Distribution.prototype.average = function() {
    var average = 0;
    for (var i=0;i<this.dimension;i++) {
        average = addFraction(average,multFraction(this.values[i],this.probabilities[i]))	
	}
	
    if (typeof average =='number') {
        average = roundTo4(average)
    }
    return average;
}
//(add fractionLibrary.js)
Distribution.prototype.getMx2 = function () {
    var average2 = 0;
    for (var i=0;i<this.dimension;i++) {
        average2 = addFraction(average2,multFracs(this.values[i],this.values[i],this.probabilities[i]))
    }
    if (typeof average2 =='number') {
        average2 = roundTo4(average2)
    }
    return average2;
}
Distribution.prototype.dispersion = function () {
    var disp = substrationFraction(this.getMx2(),multFracs(this.average(),this.average()))
    if(typeof disp == 'number') {
        disp=roundTo4(disp)
    }
    return disp;
}
Distribution.prototype.deviation = function ()  {
    if (typeof this.dispersion() == 'number') {
        return roundTo4(Math.sqrt(this.dispersion())) 
    } else {
        return roundTo4(Math.sqrt(this.dispersion().numerator/this.dispersion().denominator))
    }
}
Distribution.prototype.calculateAverage = function(where) {
    var str = 'M('+this.name+')='+sum('i=1',this.dimension)+this.name.toLowerCase()+'_i'+cdot+' p_i'+'=';
	for (var i =0;i<this.probabilities.length;i++) {
        str+=correctMinus(this.values[i])+cdot+this.probabilities[i];
        if (i!=(this.dimension-1)) {
            str+='+';
        }
    }    
	
    str+='='+this.average();
    recordElement(str,where,'div')
	return this.average()
}
Distribution.prototype.calculateMx2 = function(where) {
    var str = 'M('+this.name+'^2)='+sum('i=1',this.dimension)+this.name.toLowerCase()+'^2_i'+cdot+' p_i'+'=';
    for (var i =0;i<this.dimension;i++) {
        str+=correctMinus(this.values[i])+'^2'+cdot+this.probabilities[i];
        if (i!=(this.dimension-1)) {
            str+='+';
        }
    }
        str+='='+this.getMx2();
    recordTasc(where,str)
}
Distribution.prototype.calculateDispAndDeviation = function(where) {
    var str = 'D('+this.name+')=M('+this.name+'^2)-(M('+this.name+'))^2='+this.getMx2()+'-('+this.average()+')^2='+this.dispersion()
    var str1 = sigma+'(X)='+sqrt(this.dispersion()) + approx + this.deviation()
    var result  = str + newline + str1;
    recordTasc(where,result)
}
Distribution.prototype.showDistribution = function (where) {
    var table = document.createElement('table');
    var trValues = [];
    var trProbabilities = [];
    var tr = document.createElement('tr')
    var tr1 = document.createElement('tr')
    for (var i =0 ;i<=this.dimension;i++) {
        if (i==0)  {
            trValues[i] = document.createElement('th');
            trProbabilities[i] = document.createElement('th');
            trValues[0].innerHTML=createFormula(this.name+'_k');
            trProbabilities[0].innerHTML=createFormula('p_k');            
        } else {
            trValues[i] = document.createElement('td');
            trProbabilities[i] = document.createElement('td');
            trValues[i].innerHTML = createFormula(this.values[i-1])
            trProbabilities[i].innerHTML = createFormula(this.probabilities[i-1])
        }
        tr.appendChild(trValues[i])
        tr1.appendChild(trProbabilities[i])
    }
    table.appendChild(tr)
    table.appendChild(tr1)
    table.setAttribute('border','2')
    table.style.borderCollapse = 'collapse';
    table.style.marginRight  = 'auto';
    table.style.marginLeft  = 'auto';
    document.querySelector(where).appendChild(table)
} 
Distribution.prototype.rerordFunctionOfDistribution = function (where) {
    var accumulatedProb = 0;
    var stringForEmpire ='F_{d}('+this.name.toLowerCase()+')='+'&#92'+'left'+'&#92'+'{'+'&#92'+'begin{matrix}'+ '0,'+this.name.toLowerCase()+'&#92'+'leq'+this.values[0]+' &#92'+'&#92 ';
    for (var i =0;i<this.values.length;i++) {
        if(i==(this.values.length-1)) {
            stringForEmpire+='1,'+this.name.toLowerCase()+'>'+this.values[i];
            break;
        }
		if (typeof this.probabilities[i] == 'number') {
        	accumulatedProb+=(this.probabilities[i]);
        	accumulatedProb=Math.round(accumulatedProb*100)/100;
		} else {
			accumulatedProb = addFracs(accumulatedProb,this.probabilities[i]);
		}
		stringForEmpire+=accumulatedProb+','+this.values[i]+'&lt;'+this.name.toLowerCase()+ ' &#92'+ 'leq ' +this.values[i+1]+' &#92'+'&#92 ';
    }
    stringForEmpire +='&#92'+'end{matrix}'+'&#92'+'right.';
    recordTasc(where,stringForEmpire)
}
Distribution.prototype.probabilityFromTo  = function(Interval,where) {
    var strValues = 'P('+this.name.toLowerCase()+latex('in')+Interval.showInterval()+')=';
    var strProbabilities = '';
    var result = 0;
    for (var i=0;i<this.dimension;i++) {
        if (Interval.contain(this.values[i])) {
            result = addFracs(result,this.probabilities[i]);
            strValues+='P('+this.name+'='+this.values[i]+')'
            strProbabilities+=this.probabilities[i]
            strValues+='+';
            strProbabilities+='+';
        }
    }
    if (typeof result == 'number') { 
        result = roundTo4(result) 
    }
	strValues = strValues.slice(0,strValues.length-1) + '=';
	strProbabilities = strProbabilities.slice(0,strProbabilities.length-1) +'=';
    var str = strValues+strProbabilities+result;
    recordTasc(where,str)
}
Distribution.prototype.grafFunctionDistribution = function(where) {
    var arrayOfInterval = [];
    arrayOfInterval[0] = {
        x:[this.values[0]-3,this.values[0]],
        y:[0,0],
        type:'lines',
        mode:'lines'
    }
    var pointArray = [];
    var pointArrayValue = [];
    var accumulated = 0;
    for(var i =1;i<this.values.length;i++) {
		if (typeof this.probabilities[i-1]=='number') {
        	accumulated+=this.probabilities[i-1]; 
		}  else {
			accumulated = accumulated +roundTo4(this.probabilities[i-1].numerator/this.probabilities[i-1].denominator)
		}
        arrayOfInterval[i] = {
            x:[this.values[i-1],this.values[i]],
            y:[accumulated,accumulated],
            type:'lines',
            mode:'lines',
        }

        pointArray[i-1] = this.values[i-1]
        pointArrayValue[i-1] = accumulated;
//        pointArray[i-1] = {
//            x: this.values[i-1],
//            y: accumulated,
//            type: 'markers',
//            mode: 'markers'
//        }
    }
    pointArray[pointArray.length] = this.values[this.values.length-1]
    pointArrayValue[pointArrayValue.length] = 1;
    arrayOfInterval[this.values.length] = {
        x:[this.values[this.values.length-1],this.values[this.values.length-1]+1],
        y:[1,1],
        type:'lines',
        mode:'lines'
    }
    arrayOfInterval[this.values.length+1] = {
        x: pointArray,
        y: pointArrayValue,
        uid: 'black',
        type: 'markers',
        mode: 'markers'
    }

    var layout = {
      showlegend: false,
      xaxis: {
        rangemode: 'tozero',
        autorange: true
      },
      yaxis: {
        rangemode: 'nonnegative',
        autorange: true
      }
    };
    Plotly.newPlot(where, arrayOfInterval, layout);
}

Distribution.prototype.polygon = function(where) {
	var arr = [];
	for (var i = 0;i<this.probabilities.length;i++) {
		if ((typeof this.probabilities[i] == 'number')||(typeof this.probabilities[i] == 'text')) {
			arr[i] = this.probabilities[i];
		} else {
//			console.log(this.probabilities.length)
			console.log(i)
			console.log(this.probabilities[i])
			arr[i] = roundTo4(this.probabilities[i].result(4));			
		}
	}
    var data = [ {
        x: this.values,
        y: arr, 
        type: 'scatter'
    } ];
    var layout = {
      showlegend: false,
      xaxis: {
        rangemode: 'tozero',
        autorange: true
      },
      yaxis: {
        rangemode: 'nonnegative',
        autorange: true
      }
    };
    Plotly.newPlot(where, data, layout);
}
//var values = [1,2,3,4];
//var prob = [0.4,0.2,0.1,0.3]
//var dis = new Distribution(values,prob,'Y')
//dis.calculateAverage('#solver')