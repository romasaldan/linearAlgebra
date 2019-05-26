function processingData() {
    var data = getAnElement('form input[type=text]').value
    var arrayElements = data.split(' ')

    for (var i =0;i<arrayElements.length;i++) {
        arrayElements[i]= (+arrayElements[i]);
    }
    
    arrayElements = bubbleSort(arrayElements)
    return  (arrayElements);
}
function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return a;
}
function StatisticDistribution(Array,array2,name) {
	if (typeof arguments[2] =='undefined') {
		this.name = 'x'
	} else {
		this.name = name;		
	}	
    if (typeof array2 =='undefined') {
        this.variationSeries = Array; 
        if (Array.length%2==0) {
            this.mediana = (Array[Array.length/2-1]+Array[Array.length/2])/2;
            this.medianaCalcul = 'M_e='+divide('X_{'+(Array.length/2)+'}'+'+'+'X_{'+(Array.length/2+1)+'}','2')+'='+divide(Array[Array.length/2-1]+'+'+Array[Array.length/2],'2')+'='+this.mediana;
        } else {
            this.mediana = Array[(Array.length-1)/2]
            this.medianaCalcul = 'M_e=X_{'+((Array.length+1)/2)+'}'+'='+this.mediana;
        }    
        this.dimension = Array.length;
        this.values= (getValues(Array));
        this.frequency = getFrequency(Array,getValues(Array)); 
    } else {
        var count = 0;
        for (var i=0;i<array2.length;i++) {
            count+=(+array2[i]);
			array2[i] =(+array2[i]);
			Array[i] = (+Array[i]);
        }

        this.dimension = count;

        this.values=Array;
        this.frequency = array2;
    }
}
function getValues (Array) {
    var heplArrr= [Array[0]];
    var k = 0;
    for (var i=0;i<Array.length;i++) {
        if (heplArrr[k]!=Array[i]) {
            k++;
            heplArrr[k]=(+Array[i])
        }
    }
    return heplArrr;
} 
function getFrequency(Array,values) {
    var helpArray = [];
    for ( var i = 0;i<values.length;i++) {
        var counter =0;
        for (var j=0;j<Array.length;j++) {
            if (values[i]==Array[j]) {
                counter++;
            }
        }
        helpArray[i] = counter;
    }
    return helpArray;
}
StatisticDistribution.prototype.showTable = function(where){
    var parent  = getAnElement(where)
    var table = parent.appendChild(document.createElement('table'))
    table.setAttribute('border','2');
    var roadValues = table.appendChild(document.createElement('tr'));
    roadValues.appendChild(document.createElement('td')).innerHTML = this.name+'<sub>k</sub>'
    var roadFrequencies = table.appendChild(document.createElement('tr'))
    roadFrequencies.appendChild(document.createElement('td')).innerHTML = 'n<sub>k</sub>'
    for (var i = 0;i<this.values.length;i++) {
        roadValues.appendChild(document.createElement('td')).innerHTML = this.values[i];
        roadFrequencies.appendChild(document.createElement('td')).innerHTML = this.frequency[i];
    }
}
StatisticDistribution.prototype.getAverage = function() {
    var average = 0;
    for (var i=0;i<this.values.length;i++) {
        average+=(this.values[i])*this.frequency[i];
    }
    return roundTo6(average/this.dimension)
}
StatisticDistribution.prototype.getDispersion = function () {
    var average2 = 0;
    for (var i=0;i<this.values.length;i++) {
        average2+=Math.pow(this.values[i],2)*this.frequency[i];
    }
    average2=(average2/this.dimension);
    return roundTo6(average2 - Math.pow(this.getAverage(),2))
}
StatisticDistribution.prototype.getCorrectDispersion = function () {
    return roundTo6(this.getDispersion()*this.dimension/(this.dimension-1))     
}
StatisticDistribution.prototype.calculateAverage = function(where) {
    recordtext('Обчислимо середнє значення вибірки',where,'p')
    recordElement('&#92'+'overline{'+this.name+'} ='+divide('1','n')+'&#92'+'sum_{i=1}^n('+this.name+'_in_i)',where,'div')
    var help = [];
    help[0] = '&#92'+'overline{'+this.name+'} ='+divide('1',this.dimension)+'(';
    var k = 0;
    for (var i = 0;i<this.values.length;i++) {
        if (i==8) {k++;
            help[k] = '+';          
        }
        help[k]+=mult(correctMinus(this.values[i]),this.frequency[i])+'+'
    }
    help[k] =help[k].slice(0,help[k].length-1)+')='+this.getAverage()
    for (var i=0;i<help.length;i++) {
        recordElement(help[i],where,'div')
    }
	return this.getAverage();
}
StatisticDistribution.prototype.calculateDispersion = function(where) {
    recordtext('Обчислимо дисперсію вибірки',where,'p')
    recordElement('&#92'+'overline{'+this.name+'^2} ='+divide('1','n')+'&#92'+'sum_{i=1}^n('+this.name+'_{i}^2n_i)',where,'div')
    var help = [];
    help[0] = '&#92'+'overline{'+this.name+'^2} ='+divide('1',this.dimension)+'(';
    var k = 0;
    for (var i = 0;i<this.values.length;i++) {
        if (i==7) {
            k++;
            help[k] = '+';  
      }
        help[k]+=mult(correctMinus(this.values[i])+'^2',this.frequency[i])+'+'
    }
    var average2 = 0;
    for (var i=0;i<this.values.length;i++) {
        average2+=Math.pow(this.values[i],2)*this.frequency[i];
    }
    average2=roundTo6(average2/this.dimension);
    help[k] =help[k].slice(0,help[k].length-1)+')='+average2;
    help[k+1]= 'S^2('+this.name+')='+'&#92'+'overline{'+this.name+'^2} '+'-'+'(&#92'+'overline{'+this.name+'})^2='+average2 +'-'+correctMinus(this.getAverage())+'^2='+this.getDispersion()
    for (var i=0;i<help.length;i++) {
        recordElement(help[i],where,'div')
    }
	return this.getDispersion();
}
StatisticDistribution.prototype.calculateCorrectDispersion = function(where) {
    recordtext('Обчислимо виправлену дисперсію вибірки',where,'p')
    var str = '&#92'+'overline{S_{'+this.name+'}^2} ='+divide('n','n-1')+'S_{'+this.name+'}^2='+divide(this.dimension,(this.dimension-1))+(this.getDispersion())+'='+this.getCorrectDispersion()
    recordElement(str,where,'div')
	return this.getCorrectDispersion();
}
function Interval(a,b) {
    this.downLimit=a;
    this.upLimit = b;
    this.downInclude = true;
    this.UpInclude = true;
}
Interval.prototype.showInterval = function() {
    var str = '';
    if (this.downInclude) {
        str+='[' 
    } else {
        str+='('
    }
    str+=this.downLimit+';'+this.upLimit;
    if(this.UpInclude) {
        str+=']'
    } else {
        str+=')'
    }
    return str;
}
Interval.prototype.toString = function () {
	return this.showInterval();
}
Interval.prototype.contain = function (a) {
    if ((this.downLimit<a)&&(this.upLimit>a)) return true;    
    if ((this.downLimit==a)&&(this.downInclude)) return true;
    if ((this.upLimit==a)&&(this.UpInclude)) return true;
    return false;
}
StatisticDistribution.prototype.trustIntervalAverage = function (prob,deviation) {
    if (typeof deviation == 'undefined') {
        var t = tdistr(this.dimension-1,1-(1+prob)/2)
        var delta = t*Math.sqrt(this.getCorrectDispersion()/this.dimension)
    } else {
        var t = inverseLaplas(prob/2)
        var delta = t*Math.sqrt(deviation)/Math.sqrt(this.dimension)        
    }
    var  down = this.getAverage()-delta;
    var  up = this.getAverage()+delta;
    var int = new Interval(down,up)
    return int;
}
StatisticDistribution.prototype.calculateTrustIntervalAverage = function (where,prob,deviation) {
    if (typeof deviation == 'undefined') {
        var t = tdistr(this.dimension-1,1-(1+prob)/2)
        var delta = t*Math.sqrt(this.getCorrectDispersion()/this.dimension)
        recordtext('обчислимо довірчий інтервал для математичного сподівання при невідомій дисперсії',where,'p')
        recordElement('P('+'&#92'+'overline{'+this.name+'} -t_'+'&#92'+'gamma '+divide('&#92'+'sqrt{'+'&#92'+'overline{S^2}'+'}','&#92'+'sqrt{n}')+'&#92'+'leq '+'m_x'+'&#92'+'leq '+'&#92'+'overline{'+this.name+'} +t_'+'&#92'+'gamma '+divide('&#92'+'sqrt{'+'&#92'+'overline{S^2}'+'}','&#92'+'sqrt n')+')='+'&#92'+'gamma',where,'div')
        recordElement('t_'+'&#92'+'gamma '+'='+'t_{'+divide('1+'+'&#92'+'gamma ','2')+',n-1'+'}=t_{'+((1+prob)/2)+','+(this.dimension-1)+'}='+t,where,'div')
        recordElement(this.getAverage()+'-'+t+divide('&#92'+'sqrt{'+this.getCorrectDispersion()+'}','&#92'+'sqrt{'+this.dimension+'}')+'&#92'+'leq  '+'m_'+this.name+'&#92'+'leq  '+this.getAverage()+'+'+t+divide('&#92'+'sqrt{'+this.getCorrectDispersion()+'}','&#92'+'sqrt{'+this.dimension+'}'),where,'div') 
        recordElement(roundTo4(this.trustIntervalAverage(prob).downLimit)+'&#92'+'leq '+'m_'+this.name+'&#92'+'leq '+roundTo4(this.trustIntervalAverage(prob).upLimit),where,'div')

    } else {
        var t = inverseLaplas(prob/2)
        var delta = t*Math.sqrt(deviation)/Math.sqrt(this.dimension)        
        recordtext('обчислимо довірчий інтервал для математичного сподівання при відомому середньому квадратичному відхиленні',where,'p')
        recordElement('P('+'&#92'+'overline{'+this.name+'} -u_'+'&#92'+'gamma '+divide('&#92'+'sigma ','&#92'+'sqrt n')+'&#92'+'leq '+'m_'+this.name+'&#92'+'leq '+'&#92'+'overline{'+this.name+'} +t_'+'&#92'+'gamma '+divide('&#92'+'sigma ','&#92'+'sqrt n')+')='+'&#92'+'gamma',where,'div')
        recordElement('2'+'&#92'+'Phi '+'(u_{'+'&#92'+'gamma '+'})'+'='+'&#92'+'gamma ',where,'p')
        recordElement('&#92'+'Phi '+'(u_{'+'&#92'+'gamma '+'})'+'='+(prob/2),where,'p')
        recordElement('u_'+'&#92'+'gamma '+'='+t,where,'p')
        recordElement(this.getAverage()+'-'+t+divide('&#92'+'sqrt{'+deviation+'}','&#92'+'sqrt{'+this.dimension+'}')+'&#92'+'leq  '+'m_'+this.name+'&#92'+'leq '+this.getAverage()+'+'+t+divide('&#92'+'sqrt{'+deviation+'}','&#92'+'sqrt{'+this.dimension+'}'),where,'div');
        recordElement(roundTo4(this.trustIntervalAverage(prob,deviation).downLimit)+'&#92'+'leq '+'m_'+this.name+'&#92'+'leq '+roundTo4(this.trustIntervalAverage(prob,deviation).upLimit),where,'div')
    }
}
StatisticDistribution.prototype.calculateTrustIntervalForDisp= function (where,prob,devSqrt) {
    recordtext('<b>Запишемо довірчий інтервал для дисперсії</b>',where,'p');
    recordElement(divide(mult('(n-1)','&#92'+'overline{S^2}'),' u_2')+'&#92'+'leq '+'&#92'+'sigma '+'^2'+'&#92'+'leq '+divide(mult('(n-1)','&#92'+'overline{S^2}'),' u_1'),where,'div')
    recordElement('u_2='+'&#92'+'chi^2_{'+'n-1,'+divide('1+'+'&#92'+'gamma','2')+'}'+'='+'&#92'+'chi^2_{'+(this.dimension-1)+','+roundTo6((1+prob)/2)+'}'+'='+chisqrdistr(this.dimension-1,(-prob+1)/2),where,'div')
    recordElement('u_1='+'&#92'+'chi^2_{'+'n-1,'+divide('1-'+'&#92'+'gamma','2')+'}'+'='+'&#92'+'chi^2_{'+(this.dimension-1)+','+roundTo6((1-prob)/2)+'}'+'='+chisqrdistr(this.dimension-1,(1+prob)/2),where,'div')
    recordElement(divide(mult((this.dimension-1),' '+this.getCorrectDispersion()),chisqrdistr(this.dimension-1,(-prob+1)/2))+'&#92'+'leq '+'&#92'+'sigma '+'^2'+'&#92'+'leq '+divide(mult((this.dimension-1),' '+this.getCorrectDispersion()),chisqrdistr(this.dimension-1,(prob+1)/2)),where,'div') 
    recordElement(this.trustIntervalforDispersion(prob).downLimit+'&#92'+'leq '+'&#92'+'sigma '+'^2'+'&#92'+'leq '+this.trustIntervalforDispersion(prob).upLimit,where,'div')
    if (devSqrt) {
        recordtext('довірчий інтервал для середнього квадратичного відхилення',where,'p')
    recordElement(roundTo6(Math.sqrt(this.trustIntervalforDispersion(prob).downLimit))+'&#92'+'leq '+'&#92'+'sigma '+'&#92'+'leq '+roundTo6(Math.sqrt(this.trustIntervalforDispersion(prob).upLimit)),where,'div') 
    }
    
}
function inverseLaplas (p) {
    return roundTo4(ltqnorm(p+0.5))
}
StatisticDistribution.prototype.trustIntervalforDispersion = function (prob) {
    var u1 = chisqrdistr(this.dimension-1,(prob+1)/2)
    var u2 = chisqrdistr(this.dimension-1,(1-prob)/2)
    var int =new Interval((this.dimension-1)*Math.pow(this.getCorrectDispersion(),1)/u2,(this.dimension-1)*Math.pow(this.getCorrectDispersion(),1)/u1)
    return int;
}
function DiscreteNotFallingFunction(arrayValues,arrayProbabilities) {
  if (arrayValues.length!=arrayProbabilities.length) {
        return false
    } else {
        return function (a) {
            var count=0;
            var i = 0;
           while (a>arrayValues[i]) {
                count+=arrayProbabilities[i];
                i++;
           }
            return count;
        }
    }
}
var ComparativeDistribution = function(values,probab) {
    this.values = values;
    this.frequency = probab;
}
ComparativeDistribution.prototype = Object.create(StatisticDistribution.prototype)
ComparativeDistribution.prototype.constructor = ComparativeDistribution;
StatisticDistribution.prototype.getComparativeDistribution = function () {
    var array = [];
    for (var i=0;i<this.values.length;i++) {
        array[i]=roundTo4(this.frequency[i]/this.dimension);
    }
    return new ComparativeDistribution(this.values,array);
}
StatisticDistribution.prototype.recordEmpFun = function (where) {
    var accumulatedProb = 0;
    var stringForEmpire ='F_{d}(x)='+'\u005C'+'left'+'\u005C'+'{'+'\u005C'+'begin{matrix}'+ '0,x'+'\u005C'+'leq'+this.values[0]+'\u005C'+'\u005C';
    for (var i =0;i<this.values.length;i++) {
        if(i==(this.values.length-1)) {
            stringForEmpire+='1,x>'+this.values[i];
            break;
        }
        accumulatedProb+=(this.frequency[i]/this.dimension);
        accumulatedProb=Math.round(accumulatedProb*100)/100;
        stringForEmpire+=accumulatedProb+','+this.values[i]+'<x'+ '\u005C'+ 'leq' +this.values[i+1]+'\u005C'+'\u005C';
    }
    stringForEmpire +='\u005C'+'end{matrix}'+'\u005C'+'right.';
    recordElement(stringForEmpire,where,'div');
}
StatisticDistribution.prototype.createIntervalDistribution = function(n) {
    var max = this.values[this.values.length-1];
    var min = this.values[0];
    var step = (max-min)/n;
    var arr = [];
    for (var i=0;i<n;i++) {
        arr[i] = new Interval(roundTo6(min),roundTo6(min+step))
        min+=roundTo6(step);
        if (i!=n-1){ arr[i].UpInclude = false; }
    }
    var arrayCount=[];
    for (var i=0;i<n;i++) {
        arrayCount[i] = 0;
        for (var j =0;j<this.frequency.length;j++) {
            if (arr[i].contain(this.values[j])) {
                arrayCount[i]+=this.frequency[j];
            }
        }    
    }
	console.log(arr)
	console.log(arrayCount)
    return new StatistscDistributionInterval(arr,arrayCount)
}
StatistscDistributionInterval.prototype.createTable = function (where) {
	
    recordtext('Запишемо інтервальний розподіл',where,'b');
    recordtext('Крок буде рівний',where,'p')
    recordElement('h='+divide('R','n')+'='+divide(roundTo6(this.values[this.values.length-1].upLimit-this.values[0].downLimit),this.values.length)+'='+((this.values[this.values.length-1].upLimit-this.values[0].downLimit)/this.values.length),where,'div')
    recordtext('сформуємо таблицю',where,'p')
    var parent  = getAnElement(where)
    var table = parent.appendChild(document.createElement('table'))
    table.setAttribute('border','2')
    var roadValues = table.appendChild(document.createElement('tr'))
    roadValues.appendChild(document.createElement('td')).innerHTML = 'X<sub>k</sub>'
    var roadFrequencies = table.appendChild(document.createElement('tr'))
    roadFrequencies.appendChild(document.createElement('td')).innerHTML = 'n<sub>k</sub>'
    for (var i = 0;i<this.values.length;i++) {
        roadValues.appendChild(document.createElement('td')).innerHTML = this.values[i].showInterval();
        roadFrequencies.appendChild(document.createElement('td')).innerHTML = this.frequency[i];
    }
}
StatisticDistribution.prototype.polygon = function (where) {

    var data = [ {
        x: this.values,
        y: this.frequency, 
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
StatisticDistribution.prototype.grafEmpireFunction = function(where) {

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
        accumulated+=this.frequency[i-1]/this.dimension;
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
    console.log(arrayOfInterval)
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
StatistscDistributionInterval.prototype.goToStatisticDistribution = function() {
    var arrayRes = [];
    for (var i=0;i<this.values.length;i++) {
        arrayRes[i] = roundTo6((this.values[i].upLimit+this.values[i].downLimit)/2);
    }
    return new StatisticDistribution(arrayRes,this.frequency)
}
StatistscDistributionInterval.prototype.histogrammaOfFrequency = function (where) {
	recordtext('Намалюємо гістограму інтервального розподілу',where,'div')
	var domElem = document.querySelector(where);
	var newDomElem = document.createElement('div');
	newDomElem.setAttribute('id','HistogrammaInervalFrequency');
	domElem.appendChild(newDomElem)
	var arrVal = [];
	var arrFr = [];
	for (var i=0;i<this.values.length;i++) {
		arrVal[i] = this.values[i].showInterval();
		arrFr[i] = (+this.frequency[i])
	}
	x = arrVal;
	y = arrFr;
	data = [
	  {
		histfunc: "sum",
		y: y,
		x: x,
		type: "histogram",
		name: "sum"
	  }
	]

	Plotly.plot('HistogrammaInervalFrequency', data)
}
StatistscDistributionInterval.prototype.histogrammaOfFrequencyRelative = function (where) {
	recordtext('Намалюємо гістограму відносних частот інтервального розподілу',where,'div')
	var domElem = document.querySelector(where);
	var newDomElem = document.createElement('div');
	newDomElem.setAttribute('id','HistogrammaInervalFrequencyRelative');
	domElem.appendChild(newDomElem)
	var arrVal = [];
	var arrFr = [];
	var dim = 0;
	for (var i =0;i<this.frequency.length;i++) {
		dim+=(+this.frequency[i])
	}
	for (var i=0;i<this.values.length;i++) {
		arrVal[i] = this.values[i].showInterval();
		arrFr[i] = (+this.frequency[i])/dim;
	}
	x = arrVal;
	y = arrFr;
	data = [
	  {
		histfunc: "sum",
		y: y,
		x: x,
		type: "histogram",
		name: "sum"
	  }
	]

	Plotly.plot('HistogrammaInervalFrequencyRelative', data)
}
StatisticDistribution.prototype.histogramma = function (where) {
	
	var d3 = Plotly.d3;
	var WIDTH_IN_PERCENT_OF_PARENT = 50,
		HEIGHT_IN_PERCENT_OF_PARENT = 60;

	var gd3 = d3.select(where)
		.append('div')
		.style({
			width: WIDTH_IN_PERCENT_OF_PARENT + '%',
			'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

			height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
			'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
		});
	var gd = gd3.node();
	Plotly.plot(gd, [{
		type: 'bar',
		x: this.values,
		y: this.frequency,
		marker: {
			color: '#eb24eb',
			line: {
				width: 2.5
			}
		}
	}], {
		title: 'Гістограма',
		font: {
			size: 16
		}
	});

	window.onresize = function() {
		Plotly.Plots.resize(gd);
	};	
}
function StatistscDistributionInterval (Array,array2) {
    this.values = Array;
    this.frequency = array2;
}
StatistscDistributionInterval.prototype.calculateModa = function(where) {
	recordtext('Знайдемо інтервал з найбільшою частотою',where,'p')
	var maxFreq = 0;
	var indexMAxFreq = 0;
	var step = this.values[0].upLimit-this.values[0].downLimit; 
	for (var i=0;i<this.frequency.length;i++) {
		if(maxFreq<this.frequency[i]) {
			maxFreq = this.frequency[i];
			indexMAxFreq = i;
		}
	}
	this.moda = roundTo4(this.values[indexMAxFreq].downLimit+step*(this.frequency[indexMAxFreq]-this.frequency[indexMAxFreq-1])/(2*this.frequency[indexMAxFreq]-this.frequency[indexMAxFreq-1]-this.frequency[indexMAxFreq+1]))
	recordtext('Даний інтервал це '+this.values[indexMAxFreq].showInterval()+' з частотою ' + maxFreq+'. Обчислимо моду за допомогою формули. Врахуємо, що нижня межа x<sub>0</sub>='+this.values[indexMAxFreq].downLimit+', a крок h='+step+'. Частоти модального, передмодального та післямодального інтервалів візьмемо із таблиці',where,'p');
	recordElement('M_0=x_0+h'+divide('f_{mo}-f_{mo-1}','(f_{mo}-f_{mo-1})'+'+'+'(f_{mo}-f_{mo+1})')+'=',where,'div');
	recordElement('='+this.values[indexMAxFreq].downLimit+'+'+step+divide(this.frequency[indexMAxFreq]+'-'+this.frequency[indexMAxFreq-1],'('+this.frequency[indexMAxFreq]+'-'+this.frequency[indexMAxFreq-1]+')'+'+'+'('+this.frequency[indexMAxFreq]+'-'+this.frequency[indexMAxFreq+1]+')')+'='+this.moda,where,'div')
}
StatistscDistributionInterval.prototype.calculateMediana = function(where) {
	var medianInterval = 0;
	var dim = 0;
	var accumulatedFrequencies = 0;
	recordtext('Знайдемо інтервал що містить медіану',where,'div')
	for (var i=0;i<this.values.length;i++) {
		dim+=(+this.frequency[i]);
	}
	//console.log(dim)
	for (var i=0;i<this.values.length;i++) {
		accumulatedFrequencies+=(+this.frequency[i]);
		if (accumulatedFrequencies>dim/2) {
			var index = i;
			medianInterval =this.values[index]; 
			accumulatedFrequencies = accumulatedFrequencies-this.frequency[i];
			break;
		}
	}
	var step = this.values[index].upLimit - this.values[index].downLimit
	//console.log(accumulatedFrequencies);
	recordtext('Медіана міститься у проміжку '+medianInterval.showInterval()+'. Використаємо формулу для обчислення медіани',where,'div');
	recordElement('M_e=x_0+h'+divide(divide('n','2')+'-S_{m-1}','f_m'),where,'div');
	recordtext('Величина x<sub>0</sub> початок медіанного інтервалу, '+' x<sub>0</sub>='+this.values[index].downLimit+'. Крок h =1',where,'p');
	recordtext('S<sub>m-1</sub> сума накопичених частот до чaстоти медіанного інтервалу. S<sub>m-1</sub>='+accumulatedFrequencies,where,'p');
	this.mediana = this.values[index].downLimit+step*(dim/2-accumulatedFrequencies)/(this.frequency[index]);
	recordElement('M_e='+this.values[index].downLimit+'+'+step+divide(divide(dim,'2')+'-'+accumulatedFrequencies,this.frequency[index])+'='+this.mediana,where,'div')
	
}
function start (){
    var array = (processingData());
    var dis = new StatisticDistribution(array);
    recordtext("Об'єм вибірки рівний "+dis.dimension,'#solve','p')
    recordtext("Обчислимо розмах вибірки ",'#solve','p')
    recordElement('R='+dis.values[dis.values.length-1]+'-'+correctMinus(dis.values[0])+'='+roundTo6(dis.values[dis.values.length-1]-dis.values[0]),'#solve','p')
    recordtext('Обчислимо медіану вибірки','#solve','p')
    recordElement(dis.medianaCalcul,'#solve','div')
    dis.showTable('#solve')
    dis.calculateAverage('#solve')
    dis.calculateDispersion('#solve')
    dis.calculateCorrectDispersion('#solve')
    dis.calculateTrustIntervalAverage('#solve',0.95)
    dis.calculateTrustIntervalAverage('#solve',0.99,3.5)
    dis.calculateTrustIntervalForDisp('#solve',0.99)
    var intervalDis = dis.createIntervalDistribution(4)

    var disFor8 = intervalDis.goToStatisticDistribution();
    intervalDis.createTable('#solve')
    console.log(intervalDis)
    recordtext('сформуємо статистичний розподіл з інтервального, за значення прийнявши середини інтервалів','#solve','p')
    disFor8.showTable('#solve')
 
    disFor8.polygon('plottingPolygon')
    var distrib = dis.getComparativeDistribution();
    var empFun = DiscreteNotFallingFunction(distrib.values,distrib.probabilities);
    disFor8.recordEmpFun('#solve')
    recordtext('Намалюємо полігон розподілу','#solve','b')
    recordtext('Намалюємо емпіричну функцію розподілу','#polygon','b')    
    disFor8.grafEmpireFunction('plottingEmpire');
}
