/*
Unicode符号范围     |        UTF-8编码方式
(十六进制)        |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F (0-127)| 0xxxxxxx 
0000 0080-0000 07FF (128-2047)| 110xxxxx 10xxxxxx
0000 0800-0000 FFFF (2048-177777)| 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF (177778-4177777‬)| 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
*/
function utf8Encoding(str){
  let utf8Text = "";
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    const uCode = str.charCodeAt(i);
    let byteOfstr = uCode.toString(2);
    if (uCode <= 0x7F) {
      utf8Text = "0" + byteOfstr;
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
    } else if((uCode >= 0x80) && (uCode <= 0x7FF)){
      const temp1 = "00000000000";
      byteOfstr = temp1.substr(0, 11 - byteOfstr.length) + byteOfstr;
      utf8Text = "110" + byteOfstr.substr(0, 5);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
      utf8Text = "10" + byteOfstr.substr(5, 6);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
    } else if((uCode >= 0x800) && (uCode <= 0xFFFF)){
      const temp2 = "0000000000000000";
      byteOfstr = temp2.substr(0, 16 - byteOfstr.length) + byteOfstr;
      utf8Text = "1110" + byteOfstr.substr(0, 4);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
      utf8Text = "10" + byteOfstr.substr(4, 6);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
      utf8Text = "10" + byteOfstr.substr(10, 6);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
    } else if((uCode >= 0x10000) && (uCode <= 0x10FFFF)){
      const temp3 = "000000000000000000000";
      byteOfstr = temp3.substr(0, 21 - byteOfstr.length) + byteOfstr;
      utf8Text = "11110" + byteOfstr.substr(0, 3);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
      utf8Text = "10" + byteOfstr.substr(3, 6);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
      utf8Text = "10" + byteOfstr.substr(9, 6);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
      utf8Text = "10" + byteOfstr.substr(15, 6);
      utf8Text = parseInt(utf8Text, 2);
      bytes.push(utf8Text);
    }
  }
  return bytes;
}
