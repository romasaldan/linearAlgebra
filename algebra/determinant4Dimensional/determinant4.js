function processData() {
	var arr = [];
	arr[0] = $('#firstEquation input');
	arr[1] = $('#secondEquation input');
	arr[2] = $('#thirdEquation input');
	arr[3] = $('#fourthEquation input');
	var arrMatrix = [];
	for (var i =0;i<4;i++) {
		arrMatrix[i] = [];
	}
	for (var i=0;i<arr[0].length;i++) {
		arrMatrix[0][i] = isFraction(arr[0][i].value);
		arrMatrix[1][i] = isFraction(arr[1][i].value);
		arrMatrix[2][i] = isFraction(arr[2][i].value);
		arrMatrix[3][i] = isFraction(arr[3][i].value);
	}
	var matrix = new Matrix('A',arrMatrix);
	var det =  matrix.goToDeterminant();
	//det.calculateDeterminant('#solver',false)
	var orientation = $('select[name=orientation]').val();
	var number =  (+$('input[name=sequenceNumber]').val());
	var str =det.showDeterminant(' ',true)+'='
	var minors = [];
	for (var i=0;i<arr.length;i++) {
		if(orientation=='row') {
			minors[i] = det.getMinor(number-1,i);
			if (i==0) recordtext("Обчислимо визначник 4-го порядку за допомогою розкладу за "+(number)+'-им рядком','#solver','div');
			str +=det.elements[number-1][i]+'(-1)^{('+(number)+'+'+(i+1)+')}'+'&#92'+'cdot '+minors[i].showDeterminantForCalculating('selector',true)
			if (i!=(arr.length-1)) {
				str+='+';
			}
		} else {
			minors[i] = det.getMinor(i,number-1);
			if (i==0) recordtext("Обчислимо визначник 4-го порядку за допомогою розкладу за "+(number)+'-им стовпцем','#solver','div');
			str +=det.elements[i][number-1]+'(-1)^{('+(i+1)+'+'+(number)+')}'+'&#92'+'cdot '+minors[i].showDeterminantForCalculating('selector',true);
			if (i!=(arr.length-1)) {
				str+='+';
			}			
		}
	}
	var resultOfMinor = [];
	recordElement(str,'#solver','div');
	recordtext("Обчислимо мінори",'#solver','div');
	for (var i = 0;i<arr.length;i++) {
		if(orientation=='row') {
			if(det.elements[number-1][i]==0) {
				continue;
			}
		} else {
			if(det.elements[i][number-1]==0) {
				continue;
			} 
		}
		resultOfMinor[i] = minors[i].calculateDeterminant('#solver',false);
	}
	var result =0;
	var str = det.showDeterminant(' ',true)+'=';
	var str2 =''
	for(var i=0;i<arr.length;i++) {
		
		if(orientation=='row') {
			if(det.elements[number-1][i]==0) {
				continue;
			}
			result =addFracs(multFracs(Math.pow(-1,i+number),resultOfMinor[i],det.elements[number-1][i]),result);
			str +=det.elements[number-1][i]+'(-1)^{('+(number)+'+'+(i+1)+')}'+'&#92'+'cdot '+correctMinus(resultOfMinor[i]);
			str2+=correctMinus(multFracs(Math.pow(-1,i+number),resultOfMinor[i],det.elements[number-1][i]))
			if (i!=(arr.length-1)) {
				str+='+';
				str2+='+';
			} else {
				str+='=';
				str2+='=';
			}
		} else {
			if(det.elements[i][number-1]==0) {
				continue;
			} 
			result =addFracs(multFracs(Math.pow(-1,i+number),resultOfMinor[i],det.elements[i][number-1]),result);
			str +=det.elements[i][number-1]+'(-1)^{('+(i+1)+'+'+(number)+')}'+'&#92'+'cdot '+correctMinus(resultOfMinor[i])
			str2+=correctMinus(multFracs(Math.pow(-1,i+number),resultOfMinor[i],det.elements[i][number-1]))
			if (i!=(arr.length-1)) {
				str+='+';
				str2+='+'
			}	else {
				str+='=';
				str2+='=';
			}		
		}
	}
	result = multFracs(result,-1)
	str2+=result;
	recordElement(str+str2,'#solver','div');
}