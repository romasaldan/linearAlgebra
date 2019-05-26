function processData() {
	var arr = [];
	arr[0] = $('#firstEquation input');
	arr[1] = $('#secondEquation input');
	arr[2] = $('#thirdEquation input');
	var arrMatrix = [];
	for (var i =0;i<3;i++) {
		arrMatrix[i] = [];
	}
	for (var i=0;i<arr[0].length;i++) {
		arrMatrix[0][i] = isFraction(arr[0][i].value);
		arrMatrix[1][i] = isFraction(arr[1][i].value);
		arrMatrix[2][i] = isFraction(arr[2][i].value);
	}
	var matrix = new Matrix('A',arrMatrix);
	var det =  matrix.goToDeterminant();
	det.calculateDeterminant('#solver',false)
}