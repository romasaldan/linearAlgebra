var Matrix = function (name) {
    this.name = name;
    this.elements = [];

	if (typeof arguments[1][0] =='object') {
		for (var i = 1;i<=arguments[1].length;i++) {
			this.elements[i-1] = arguments[1][i-1];
		}
		return;
	}
	for (var i = 0;i<arguments.length-1;i++) {
		this.elements[i] = [];
	}
    for (var i=1;i<arguments.length;i++) {
        this.elements[i-1] = arguments[i];
    }
} //обєкт матриця
// name is necessarily
var Determinant = function (name) {
    this.name = name;
    this.elements = [];
	if (typeof arguments[1] == 'object') {
		if (typeof arguments[1][0] =='object') {
			for (var i = 1;i<=arguments[1].length;i++) {
				this.elements[i-1] = arguments[1][i-1];
			}
			return;
		}	
	}
	if (typeof arguments[1]=='undefined') {
		return;
	}
    for (var i=0;i<arguments.length-1;i++) {
    //    console.log(arguments[i])
		this.elements[i] = arguments[i+1];
    }
    if (this.elements.length !=this.elements[0].length ) {
		var err = new Error('не співпадає кількість рядків і стовпців у визначнику');	
	}    
} //обєкт визначник
// name is necessarily
Matrix.prototype.showMatrix = function (where,onlyCod) {
	//recordElement(,where,'div')
	var str = this.name+'='+'&#92'+'begin{pmatrix}';
	for (var i = 0;i<this.elements.length;i++) {
		for (var j = 0;j<this.elements[i].length;j++) {
			str +=this.elements[i][j]+'&'
		}
		if (i==this.elements.length-1) {
			break;
		}
		str+='&#92'+'&#92 '
	}
	str+=' &#92'+'end{pmatrix}';
	if (!onlyCod)  {
		recordElement(str,where,'div');
	} else {
		return str;
	}
}

//there arr is two-dimensional array
function writeAnyMatrix (arr) {
	var str ='&#92'+'begin{pmatrix}';
	for (var i = 0;i<arr.length;i++) {
		for (var j = 0;j<arr[i].length;j++) {
			str +=arr[i][j]+'&'
		}
		if (i==arr.length-1) {
			break;
		}
		str+='&#92'+'&#92 '
	}
	str+=' &#92'+'end{pmatrix}';	
	return str;
}
// Matrix.prototype.goToDeterminant can have some problems 
Matrix.prototype.goToDeterminant = function () {
	var det = new Determinant('det('+this.name+')')
	for (var i=0;i<this.elements.length;i++) {
		det.elements[i] = this.elements[i];
	}
	return det;
}
Matrix.prototype.getTransposedMatrix = function () {
	var n = this.elements.length;
	var m = this.elements[0].length;
	var arr = [];
	for (var i = 0;i<m;i++) {
		arr[i] = [];
		for (var j =0;j<n;j++)   {
			arr[i][j] = this.elements[j][i]
		}
	}
	return new Matrix(this.name+'^T',arr)
}
//if you want to get only object Matrix then variable "where" can be type data of undefined 
// if add=true then we get m1+m2 if add=false m1+m2; 
function addMatrix(m1,m2,add,where) {
	var arr = [] 
	var arrStr = [];
	if ((m1.elements.length==m2.elements.length)&&(m1.elements[0].length==m2.elements[0].length)) {
		for (var i=0;i<m1.elements.length;i++) {
			arr[i] = [];
			arrStr[i] = [];
			for (var j =0;j<m1.elements[i].length;j++) {
				if (add) {
					var name  = m1.name+'+'+m2.name
					arr[i][j] = addFraction(m1.elements[i][j],m2.elements[i][j]);
					arrStr[i][j] = m1.elements[i][j]+'+'+correctMinus(m2.elements[i][j]); 
				} else {
					var name = m1.name+'-'+m2.name;
					arr[i][j] = substrationFraction(m1.elements[i][j],m2.elements[i][j]);
					arrStr[i][j] = m1.elements[i][j]+'-'+correctMinus(m2.elements[i][j]); 
				}
			}
		}
	} else {
		return TypeError('ці матриці не можемо додавати чи віднімати, так як розмірності не співпадають');
	}
	if (typeof where == 'undefined') {
		return new Matrix(name,arr);
	} else {
		recordElement(m1.name+'+'+m2.name+'='+writeAnyMatrix(arrStr)+'='+writeAnyMatrix(arr),where,'div');
		return new Matrix(name,arr);
	}
}
// scalar can be type data number or Fraction
Matrix.prototype.multiplicationByScalar = function (scalar) {
	var arr = [];
	for (var i = 0;i<this.elements.length;i++) {
		arr[i] = [];
		for (var j = 0;j<this.elements[i].length;j++) {
			arr[i][j]=multFracs(scalar,this.elements[i][j]);
		}
	}
	return new Matrix(this.name+'_{'+'*'+scalar+'}',arr)
}
//where is selector 
Matrix.prototype.calculateInverseMatrix = function (where) {
	var arr = [];
	for (var i = 0;i<this.elements.length;i++) {
		arr[i] = [];
		for (var j=0;j<this.elements[i].length;j++) {
			arr[i][j]= this.name+'_{'+(i+1)+''+(j+1)+'}'
		}
	}
	recordtext('Обчислимо обернену матрицю за формулою:',where,'div');
	recordElement(this.name+'^{-1}='+divide('1','det('+this.name+')')+'&#92'+'cdot'+writeAnyMatrix(arr)+'^T',where,'div');
	recordtext('Обчислимо алгебраїчні доповнення',where,'div');
	for (var i = 0;i<this.elements.length;i++) {
		for (var j = 0 ;j<this.elements[i].length;j++) {

			arr[i][j] = this.algebricSupplement(i,j,where);

		}
	}
	recordtext('Обчислимо визначник',where,'div');
	var det = this.goToDeterminant();
	var resDet = det.calculateDeterminant(where,false);
	if (resDet == 0) {
		recordtext('не існує оберненої матриці',where,'div');
		return false;
	}
	recordtext('Обчислимо обернену матрицю',where,'div');
	var helpMatr = new Matrix('A^{-1}^{T}',arr);
	if (typeof resDet == 'number') {
		resDet = new Fraction(1,resDet)
	} else {
		resDet = new Fraction(resDet.denominator,resDet.numerator)
	}
	var insertedMatrix =  helpMatr.getTransposedMatrix().multiplicationByScalar(resDet);
	if (typeof where != 'undefined') {
		recordElement(this.name+'^{-1}='+resDet+'&#92'+'cdot'+writeAnyMatrix(arr)+'^T'+'='+writeAnyMatrix(insertedMatrix.elements),where,'div');
	}
	return insertedMatrix;
}

//m1,m2 is Matrix, where is selector of DOM Element, where we can put calculating of product two Matrix
function multMatrix(m1,m2,where) {
	var arr = [];
	var arrStr= [];
	if (m1.elements[0].length==m2.elements.length) {
		for (var i = 0;i<m1.elements.length;i++) {
			arr[i] = [];
			arrStr[i] = [];
			for (var j=0;j<m2.elements[i].length;j++) {
				arr[i][j] = 0;
				arrStr[i][j] = '';
				for (var k=0;k<m2.elements.length;k++) {
					arr[i][j] = addFracs(multFracs(m1.elements[i][k],m2.elements[k][j]),arr[i][j]);
					arrStr[i][j]+=mult(m1.elements[i][k],m2.elements[k][j]);
					if (k!=m1.elements[i].length-1) {
						arrStr[i][j]+='+';
					}
				}
			}
		}
	} else {
		alert('Кількість стовпців першої матриці не співпадає з кількістю рядків другої матриці')
		return 
	}
	var str ='='+ writeAnyMatrix(arrStr)+'='+writeAnyMatrix(arr);
	if (typeof where == 'undefined') {
		return new Matrix(m1.name+'&#92'+'cdot '+m2.name,arr);
	} else {
		var str1 = m1.name+'&#92'+'cdot '+m2.name+'='+writeAnyMatrix(m1.elements)+'&#92'+'cdot'+writeAnyMatrix(m2.elements)+'=';
		recordElement(str1,where,'div');
		recordElement(str,where,'div');
		return new Matrix(m1.name+'&#92'+'cdot'+m2.name,arr);
	}
}
Determinant.prototype.showDeterminant = function (where,onlyCod) {
	var str = this.name+'='+'&#92'+'begin{vmatrix}';
	if (where!='') {
		for (var i = 0;i<this.elements.length;i++) {
			for (var j = 0;j<this.elements[i].length;j++) {
				str +=this.elements[i][j]+'&'
			}
			if (i==this.elements.length-1) {
				break;
			}
			str+='&#92'+'&#92 '
		}
		str+=' &#92'+'end{vmatrix}';
	}
	if (!onlyCod) {
		recordElement(str,where,'div'); 
	} else {
		return str;
	}	
}
// next function for edit my mistaken. the function write a formula without name of the Determinant
Determinant.prototype.showDeterminantForCalculating = function (where,onlyCod) {
	var str = '&#92'+'begin{vmatrix}';
	if (where!='') {
		for (var i = 0;i<this.elements.length;i++) {
			for (var j = 0;j<this.elements[i].length;j++) {
				str +=this.elements[i][j]+'&'
			}
			if (i==this.elements.length-1) {
				break;
			}
			str+='&#92'+'&#92 '
		}
		str+=' &#92'+'end{vmatrix}';
	}
	if (!onlyCod) {
		recordElement(str,where,'div'); 
	} else {
		return str;
	}	
}
// instead onlyCod write true if you want to get Latex cod but don't want image this element on page
Determinant.prototype.calculateDeterminant = function (where,onlyResult) {
	if (this.elements.length==2) {
		var det = substrationFraction(multFracs(this.elements[0][0],this.elements[1][1]),multFracs(this.elements[0][1],this.elements[1][0]));
		var str = this.showDeterminant('selector',true)+'='+mult(this.elements[0][0],this.elements[1][1])+'-'+mult(this.elements[0][1],this.elements[1][0])+'='+correctMinus(multFracs(this.elements[0][0],this.elements[1][1]))+'-'+correctMinus(multFracs(this.elements[0][1],this.elements[1][0]))+'='+roundTo6(det);
		if (onlyResult) {
			return det
		} else {
			recordElement(str,where,'div');
			return det;
		}
	}
	if (this.elements.length == 3) {
		var plus = addFracs(multFracs(this.elements[0][0],this.elements[1][1],this.elements[2][2]),multFracs(this.elements[0][2],this.elements[2][1],this.elements[1][0]),multFracs(this.elements[2][0],this.elements[0][1],this.elements[1][2]));
		var minus = addFracs(multFracs(this.elements[0][2],this.elements[1][1],this.elements[2][0]),multFracs(this.elements[2][2],this.elements[0][1],this.elements[1][0]),multFracs(this.elements[0][0],this.elements[2][1],this.elements[1][2]));
		var det = substrationFraction(plus,minus); 
		var str1 = this.showDeterminant('selector',true)+'='+mult3(this.elements[0][0],this.elements[1][1],this.elements[2][2])+'+'+mult3(this.elements[0][2],this.elements[2][1],this.elements[1][0])+'+'+mult3(this.elements[2][0],this.elements[0][1],this.elements[1][2])+'-';
		var str2 ='-'+mult3(this.elements[0][2],this.elements[1][1],this.elements[2][0])+'-'+mult3(this.elements[2][2],this.elements[0][1],this.elements[1][0])+'-'+mult3(this.elements[0][0],this.elements[2][1],this.elements[1][2])+'='+correctMinus(multFracs(this.elements[0][0],this.elements[1][1],this.elements[2][2]))+'+'+correctMinus(multFracs(this.elements[0][2],this.elements[2][1],this.elements[1][0]))+'+'+correctMinus(multFracs(this.elements[2][0],this.elements[0][1],this.elements[1][2]))+'-'+correctMinus(multFracs(this.elements[0][2],this.elements[1][1],this.elements[2][0]))+'-'+correctMinus(multFracs(this.elements[2][2],this.elements[0][1],this.elements[1][0]))+'-'+correctMinus(multFracs(this.elements[0][0],this.elements[2][1],this.elements[1][2]))+'='+roundTo(det,6);
		if (onlyResult) {
			return det;
		} else {
			recordElement(str1,where,'div');
			recordElement(str2,where,'div');
			return det;
		}
	}
}
Determinant.prototype.getMinor = function (row,column) {
	var arr = [];
	var k = 0;
	var l = 0;
	label1:
	for (var i = 0;i<this.elements.length;i++) {
		l=0;
		var help = true;
		if (i==row) {
			continue label1;
		}
		label2:
		for (var j=0;j<this.elements[i].length;j++) {
			if (help) {
				arr[k] = [];
				help = false;
			}
			if (j==column) {
				continue label2;	
			}
			arr[k][l]=this.elements[i][j];
			l++;
		}
		k++;
	}
	if (arr.length==2) {
		return new Determinant('M_{'+(row+1)+','+(column+1)+'}',arr);
	} else if (arr.length==3) {
		return new Determinant('M_{'+(row+1)+','+(column+1)+'}',arr);
	}
}
Matrix.prototype.algebricSupplement = function (row,column,where) {
	var det = this.goToDeterminant();
	var minor = det.getMinor(row,column);
	var result = multFracs(Math.pow(-1,row+column),minor.calculateDeterminant(' ',true));
	if (typeof where != 'undefined') {
		recordElement(this.name+'_{'+(row+1)+(column+1)+'}=(-1)^{('+(row+1)+'+'+(column+1)+')}'+'&#92'+'cdot '+minor.showDeterminant(' ',true)+'='+'(-1)^{('+(row+1)+'+'+(column+1)+')}'+'&#92'+'cdot'+'('+mult(minor.elements[0][0],minor.elements[1][1])+'-'+mult(minor.elements[1][0],minor.elements[0][1])+')='+result,where,'div');
		return result;
	} else {
		return result;
	}
}
function writeSystemEquation(arrValues,leftPart,nameOfVariables,where) {
	var equation = [];
	var str ='&#92'+'left'+'&#92'+'{'+'&#92'+'begin{matrix}';
	for (var i = 0;i<arrValues.length;i++) {
		equation[i] = '';
		for (var j = 0;j<arrValues[i].length;j++) {
			equation[i] +=mult(arrValues[i][j],' '+nameOfVariables[j])  
			if (j!=arrValues[i].length-1) {
				equation[i]+='+'
			}
		}
		equation[i] +='='+leftPart[i];
		str +=equation[i] + '&#92'+'&#92 ';
	}
	str+=' &#92'+'end{matrix}' + '&#92'+'right';
	recordElement(str,where,'div');
}
