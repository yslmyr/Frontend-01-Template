function convertStringToNumber(NumString) {
  NumString = NumString.replace(/[\r\n\s]/, "");
  const DecReglObj = /^(0|[0-9]+|[0-9]*\.[0-9]+)$/;
  const HexRegObj = /^(0[xX][a-fA-F0-9]+)$/;
  const OctRegObj = /^(0[oO][0-8])$/;
  const BinRegObj = /^(0[bB][01])$/;
  const ScientRegObj = /^([eE][-\+]?[0-9]+|\.[0-9]+[eE][-\+]?[0-9]+|([1-9][0-9]+|0)[eE][-\+]?[0-9]+)$/;

  if (NumString === 'NaN'){
    return NaN;
  }

  if (NumString === 'Infinity'){
    return Infinity;
  }

  if (NumString === '-Infinity'){
    return -Infinity;
  }

  if (NumString === ''){
    return 0;
  }

  let postion = 0;
  let decValue = 0;
  let decPoint = 0;
  
  if (DecReglObj.test(NumString)) {
    postion = 10;
  } else if (HexRegObj.test(NumString)) {
    postion = 16;
  } else if (OctRegObj.test(NumString)) {
    postion = 8;
  } else if (BinRegObj.test(NumString)){
    postion = 2;
  }
  if (postion === 0) return NaN;
  
  for (let i = NumString.length - 1; i >= 0; i--) {
    if (NumString[i] === '.') {
      decPoint = NumString.length - 1 - i;
    } else {
      if (postion > 10) {
        if (/[A-F]/.test(NumString[i])){
          decValue = NumString.codePointAt(0) - '7'.codePointAt(0);
        } else {
          decValue = NumString.codePointAt(0) - '0'.codePointAt(0);
        }
        decValue *= postion;
      }
    }
    return decPoint / (postion ** decPoint || 0);
  }
}