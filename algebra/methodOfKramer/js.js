function processData() {
	var arr = [];
	arr[0] = $('#firstEquation input');
	arr[1] = $('#secondEquation input');
	arr[2] = $('#thirdEquation input');
	var arrMatrix = [];
	for (var i =0;i<3;i++) {
		arrMatrix[i] = [];
	}
	for (var i=0;i<arr[0].length-1;i++) {
		arrMatrix[0][i] = isFraction(arr[0][i].value);
		arrMatrix[1][i] = isFraction(arr[1][i].value);
		arrMatrix[2][i] = isFraction(arr[2][i].value);
	}
	var nameVariables = [];
	if ($('#nameVariable input')[1].value == '') {
		nameVariables = ['x_1','x_2','x_3'];
	} else {
		for (var i = 0;i<$('#nameVariable input').length;i++) {
			nameVariables[i] = $('#nameVariable input')[i].value;
		}
	}
	var matrix = new Matrix('A',arrMatrix)
	//matrix.showMatrix('#solver',false)
	var arrLeftPart = [[isFraction(arr[0][i].value)],[isFraction(arr[1][i].value)],[isFraction(arr[2][i].value)]]
	var leftPart = new Matrix('B',arrLeftPart);
	//leftPart.showMatrix('#solver',false)
	writeSystemEquation(matrix.elements,leftPart.elements,nameVariables,'#solver');
	recordtext('Використаємо формулу Крамера','#solver','div');
	var det = matrix.goToDeterminant();
	var arr = [];
	//substitute is a two-dimensional array, dimension is n*1
	function changeColumn(array,substitute,column) {
		var arr = new Array();
		for (var i =0;i<array.length;i++){
			arr[i] = [];
			for (var j = 0;j<array[i].length;j++) {
				arr[i][j] = array[i][j];
			}
		}
		console.log(substitute)
		for (var i = 0;i<array.length;i++) {
			arr[i][column] = substitute[i][0];
		}
		return arr;
	}
	var delta = [];
	det.name =  '&#92'+'Delta';
	delta[0] = det.calculateDeterminant('#solver');
	if (delta[0] == 0) {
		recordtext("Визначник рівний нулю, отже ми не можемо використати метод Крамера. Не існує єдиного розв'язку",'#solver','div')
		return;
	}
	var helpArr = [];
	var helpDet = [];
	for (var i = 0;i<det.elements.length;i++) {
		helpArr[i] = changeColumn(det.elements,leftPart.elements,i);
		helpDet[i] = new Determinant('&#92'+'Delta_{'+(i+1)+'}',helpArr[i]);
		delta[i+1] = helpDet[i].calculateDeterminant('#solver');
	}
	recordtext("Розв'язки шукатимемо за формулою:",'#solver','div')
	recordElement("x_i="+divide( '&#92'+'Delta_i','&#92'+'Delta'),'#solver','div')
	var result = [];
	for (var i = 1;i<delta.length;i++) {
		if (isInteger(delta[i]/delta[0])) {
			result[i] = delta[i]/delta[0]
		} else {
			result[i] = divideFraction(delta[i],delta[0]);
		}
		recordElement(nameVariables[i-1]+'='+divide(delta[i],delta[0])+'='+result[i],'#solver','div');
	}
}