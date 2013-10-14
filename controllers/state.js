app.controller('state', function ($scope, $timeout, $filter,sharedData) {
	var name=sharedData.getName();
	$scope.header=name.name;

	$scope.ok="OK";	
	
	$scope.m = [];
	$scope.mSubBytes = [];
	$scope.mShiftRows = [];
	$scope.mMixColumns = [];

	$scope.process = function(){
		$scope.m = [];
		$scope.mSubBytes = [];
		$scope.mShiftRows = [];
		$scope.mMixColumns = [];
		m = $scope.message.split('');
		for(i=0;i<$scope.message.length;i++){
			$scope.m.push({ascii:m[i],hex:asciiToHex(m[i])});
		}
		for(i=$scope.message.length;i<16;i++){
			$scope.m.push({ascii:"0",hex:"00"});
		}
		sharedData.setMessage($scope.m);
		
		$scope.mSubBytes = subBytes($scope.m);
		$scope.mShiftRows = shiftRows($scope.mSubBytes);
		$scope.mMixColumns = mixColumns($scope.mShiftRows);
		
	};
	
	var asciiToHex = function(ascii){
		return ascii.charCodeAt(0).toString(16);
	};
	
	var hexToascii = function(hex){
		return String.fromCharCode(parseInt(n, 16));
	};
	
	var hexTobinary = function(hex){
		hex = "0x"+hex;
		return (Number(hex).toString(2)); 
	};
	
	var binaryTodecimal = function(bin){
		return parseInt(bin,2);
	};
	
	var decimalTohex = function(num){
		return num.toString(16);
	};

	var toDecimal = function(hex){
		if(hex=="a"){
			hex="10";
		}
		if(hex=="b"){
			hex="11";
		}
		if(hex=="c"){
			hex="12";
		}
		if(hex=="d"){
			hex="13";
		}
		if(hex=="e"){
			hex="14";
		}
		if(hex=="f"){
			hex="15";
		}
		return hex; 
	}
	var subByte = function(byte){
		var byteArray = byte.split('');
		var x = toDecimal(byteArray[0]);
		var y = toDecimal(byteArray[1]);
		var sBox = [
		["63","7c","77","7b","f2","6b","6f","c5","30","01","67","2b","fe","d7","ab","76"],
		["ca","82","c9","7d","fa","59","47","f0","ad","d4","a2","af","9c","a4","72","c0"],
		["b7","fd","93","26","36","3f","f7","cc","34","a5","e5","f1","71","d8","31","15"],
		["04","c7","23","c3","18","96","05","9a","07","12","80","e2","eb","27","b2","75"],
		["09","83","2c","1a","1b","6e","5a","a0","52","3b","d6","b3","29","e3","2f","84"],
		["53","d1","00","ed","20","fc","b1","5b","6a","cb","be","39","4a","4c","58","cf"],
		["d0","ef","aa","fb","43","4d","33","85","45","f9","02","7f","50","3c","9f","a8"],
		["51","a3","40","8f","92","9d","38","f5","bc","b6","da","21","10","ff","f3","d2"],
		["cd","0c","13","ec","5f","97","44","17","c4","a7","7e","3d","64","5d","19","73"],
		["60","81","4f","dc","22","2a","90","88","46","ee","b8","14","de","5e","0b","db"],
		["e0","32","3a","0a","49","06","24","5c","c2","d3","ac","62","91","95","e4","79"],
		["e7","c8","37","6d","8d","d5","4e","a9","6c","56","f4","ea","65","7a","ae","08"],
		["ba","78","25","2e","1c","a6","b4","c6","e8","dd","74","1f","4b","bd","8b","8a"],
		["70","3e","b5","66","48","03","f6","0e","61","35","57","b9","86","c1","1d","9e"],
		["e1","f8","98","11","69","d9","8e","94","9b","1e","87","e9","ce","55","28","df"],
		["8c","a1","89","0d","bf","e6","42","68","41","99","2d","0f","b0","54","bb","16"]];
		
		return sBox[x][y];

	};
	var subBytes = function(array){
		var result = [];
		for(i=0;i<array.length;i++){
			result.push({ascii:array[i].ascii,hex:subByte(array[i].hex)});
		}
		return result; 
	};
	var shiftForward = function(originalArray,cut,paste){
		//copy original array to the variable we're going to manipulate
		var array = []; 
		for (var i=0;i<originalArray.length;i++){
			array[i]=originalArray[i]; 
		}
		var arrayLength = array.length;
		var a= array.splice(cut,1); 
		var b=[];
		//rebuild original array before splice, place the cut value into the paste position in this new array 
		for(i=0;i<arrayLength;i++){
			if(i<paste){
				b[i]=array[i];
			}else if (i==paste){
				b[i]=a[0];
			}else{
				b[i]=array[i-1];
			}
		}
		return b; 
	};
	
	var shiftRows = function(state){
		var matrix=[];
		for(i=0;i<state.length;i++){
			matrix[i]=state[i];
		}
		/* increment every five cells, shifting forward every fifth cell forward once and wrapping 
		 * around it every five cells. thus turning something that looks like this:
		 * ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23", "30", "31", "32", "33"]
		 * into this: 
		 * ["00", "01", "02", "03", "11", "12", "13", "10", "22", "23", "20", "21", "33", "30", "31", "32"]
		 */
		for(i=0,j=0;i<matrix.length;i=i+4,j++){
				a=matrix;
			for(k=0;k<j;k++){
				a=shiftForward(a,i,i+3);
			}
				matrix=a;
		}
		return matrix; 
	};
	
	var eightBit = function(bin){
		//makes sure the binary number is eight bits in length
		b = bin.split('');
		for(i=b.length;i<8;i++){
			b.unshift("0");
		}
		b = b.join("");
		return b; 
	};
	
	var leftShift = function(bin){
		//shifts the binary number one forward, adding a zero to the end;
		b = bin.split('');
		b.push('0');
		b.shift();
		b = b.join(""); 
		return b;
	};
	
	var rightShift = function(bin){
		//shifts the binary number one backward, adding a zero to the beginning;
		b = bin.split('');
		b.unshift('0');
		b.splice(-1,1); 
		return b.join("");			
	};
	
	var bitMultX = function(hex){
		/*
		 * multiplication of a value by x (ie. by 02) can be implemented as a 1-bit left shift 
		 * followed by a conditional bitwise XOR with (0001 1011) if the leftmost bit of the 
		 * original value (before the shift) is 1.
		 */
		left = hexTobinary(hex);
		if(left[0]==1){
			x = hexTobinary(decimalTohex(binaryTodecimal(leftShift(eightBit(hexTobinary(hex)))) ^ 27));
		}
		return x; 
	};
	
	//galois field mulitiplation
	
	var galois = {
		addition:function(bina,binb){
			bina=eightBit(bina).split('');
			binb=eightBit(binb).split('');
			binc=[];
			for(i=0;i<bina.length;i++){
				binc[i]=parseInt(bina[i] ^ binb[i],2);
			}
			return binc;
		},
		multiplication : function(bina, binb) {
			bina = eightBit(bina);
			binb = eightBit(binb);
			p = 0;
			for (i = 0; i < 8; i++) {

				if (binb[7] == 1) {
					p = p ^ (binaryTodecimal(bina));
				}
				highBit = bina[0];
				bina = (leftShift(bina));

				if (highBit == 1) {
					hexA = binaryTodecimal(bina);
					xor = hexA ^ 27;
					bina = (hexTobinary(decimalTohex(xor)));
				}

				binb = (rightShift(binb));

				if (binaryTodecimal(binb) == 0) {
					break;
				}

			}
			return eightBit(hexTobinary(decimalTohex(p)));
		},
		division:function(bina,binb){
			a = (bina).split('');
			b = (binb).split('');
			//a = [1,1,1,1,0]; //what you're trying to reduce
			//b = [1,0,1,1]; //what you're reducing by
			c = []; 
			while(true){
				for(i=0;i<b.length;i++){
					c[i]=a[i]^b[i];
				}
				a = a.slice(b.length);
				p = a.length - b.length; 

				console.log("A:"+a+"\nB:"+b+"\nC:"+c);
				c.push(a[0]);
				c.shift();
				console.log("A:"+a+"\nB:"+b+"\nC:"+c);
				if(a.length==0){
					break;
				}
				a = c;

			}
			return c.join("");	
		}
	};
	var bTrunc = function(bin){
		bin = bin.split('');
		l = bin.length;
		for(c=0;c<=l;c++){
			//console.log(c+"/"+l+"\tbin[0]="+bin[0]+"\t"+bin);

			if(bin[0]=="0"){
				bin.shift();
			}
			if(bin[0]=="1"){
				break;
			}
			
		}
		return bin.join('');
	};
	row = [["02","d4"],["03","bf"],["01","5d"],["01","30"]];
	var computeRow = function(row){
		sum = 0; 
		for(m=0;m<row.length;m++){
			product = galois.multiplication(hexTobinary(row[m][0]),hexTobinary(row[m][1]));
			product = binaryTodecimal(product);
			sum = sum ^ product; 
		}
		return decimalTohex(sum);
	};
	
	var mixColumns = function(m){
		var idMatrix = [2,3,1,1,1,2,3,1,1,1,2,3,3,1,1,2];
		//var m = [{ascii:"a", hex:"61", $$hashKey:"3XU"}, {ascii:"b", hex:"d4", $$hashKey:"3XX"}, {ascii:"c", hex:"63", $$hashKey:"3Y0"}, {ascii:"d", hex:"64", $$hashKey:"3Y3"}, {ascii:"e", hex:"65", $$hashKey:"3Y6"}, {ascii:"f", hex:"bf", $$hashKey:"3Y9"}, {ascii:"g", hex:"67", $$hashKey:"3YC"}, {ascii:"h", hex:"68", $$hashKey:"3YF"}, {ascii:"i", hex:"69", $$hashKey:"3YI"}, {ascii:"j", hex:"5d", $$hashKey:"3YL"}, {ascii:"k", hex:"6b", $$hashKey:"3YO"}, {ascii:"l", hex:"6c", $$hashKey:"3YR"}, {ascii:"m", hex:"6d", $$hashKey:"3YU"}, {ascii:"n", hex:"30", $$hashKey:"3YX"}, {ascii:"o", hex:"6f", $$hashKey:"3Z0"}, {ascii:"p", hex:"70", $$hashKey:"3Z3"}];
		var n = [];
		for(copy=0;copy<m.length;copy++){
			n[copy]=m[copy];
		}
		
		for(w=0;w<4;w++){
			var c = ["d4","bf","5d","30"];
			c[0]=m[w+0].hex;
			c[1]=m[w+4].hex;
			c[2]=m[w+8].hex;
			c[3]=m[w+12].hex;
			var result = [];
			for(x=0;x<16;x=4+x){
				column = [["",""],["",""],["",""],["",""]];
				for (y=0;y<c.length;y++){
					column[y][0]=idMatrix[y+x];
					column[y][1]=c[y];
				}
				console.log("C:\t"+column);
				result[x/4]=computeRow(column);
				

			}
			
			n[w+0] =  ({ascii:m[w+0].ascii,hex:result[0]});
			n[w+4] =  ({ascii:m[w+4].ascii,hex:result[1]});
			n[w+8] =  ({ascii:m[w+8].ascii,hex:result[2]});
			n[w+12] = ({ascii:m[w+12].ascii,hex:result[3]});
		}
		
		return n; 
	};
});