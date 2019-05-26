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
	recordtext('Використаємо матричний метод','#solver','div');
	var det = matrix.goToDeterminant();
	recordElement('AX=B','#solver','div');
	recordElement('X=A^{-1}'+'&#92'+'cdot '+'B','#solver','div');
	matrix.showMatrix('#solver',false);
	leftPart.showMatrix('#solver',false);
	recordtext('Знайдемо обернену матрицю','#solver','div');
	var inverse = matrix.calculateInverseMatrix('#solver');
	inverse.name = 'A^{-1}';
	if(typeof inverse !='object') {
		recordtext('оскільки обернена матриця  не існує, то використати матричний метод не можливо','#solver','div');
		return false;
	}
	var x = multMatrix(inverse,leftPart,'#solver');
	x.name = 'X';
	recordtext("Розв'язок матиме вигляд",'#solver','div');
	x.showMatrix('#solver',false)
}
