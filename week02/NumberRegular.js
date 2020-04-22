/*
  运行环境：NodeJS v12.16.1
*/
let regexObj = /[1-9][0-9]|0|[0-9]+|\.[0-9]+|[eE][-\+]?[0-9]+|\.[0-9]+[eE][-\+]?[0-9]+|([1-9][0-9]+|0)[eE][-\+]?[0-9]+|(0[bB][01]+|0[xX][a-fA-F0-9]+|0[oO][0-8])|NaN/;
//NumericLiteral :: DecimalLiteral :: DecimalIntegerLiteral
console.log(regexObj.test(0));
console.log(regexObj.test(1235622));

//NumericLiteral :: DecimalLiteral :: . DecimalDigits 
console.log(regexObj.test(.2));
console.log(regexObj.test(.01235622));

//NumericLiteral :: DecimalLiteral :: ExponentPart
console.log(regexObj.test('e+01235622'));
console.log(regexObj.test('e-01235622'));
console.log(regexObj.test('E+01235622'));
console.log(regexObj.test('E-01235622'));

//NumericLiteral :: DecimalLiteral :: . DecimalDigits ExponentPart
console.log(regexObj.test('.23232e+01235622'));
console.log(regexObj.test('.23232e-01235622'));
console.log(regexObj.test('.23232E+01235622'));
console.log(regexObj.test('.23232E-01235622'));

//NumericLiteral :: DecimalLiteral :: DecimalIntegerLiteral ExponentPart
console.log(regexObj.test('23232e+01235622'));
console.log(regexObj.test('23232e-01235622'));
console.log(regexObj.test('23232E+01235622'));
console.log(regexObj.test('23232E-01235622'));

//NumericLiteral :: HexIntegerLiteral
console.log(regexObj.test('0xA273EF'));
console.log(regexObj.test('0b10101'));
console.log(regexObj.test('0o26371534'));

//NaN
console.log(regexObj.test('NaN'));

