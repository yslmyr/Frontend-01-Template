// convertNumberToString
function convertNumberToString(num) {
  let numStr = '';
  if (num === NaN){
    return 'NaN';
  }
  if (num === Infinity){
    return 'Infinity';
  }
  if (num === -Infinity){
    return '-Infinity';
  }
   
  num = Math.floor(num);
  while(num > 0) {
    numStr = num % x + numStr;
    num = Math.floor(num / 10);
  }
  return numStr
}
