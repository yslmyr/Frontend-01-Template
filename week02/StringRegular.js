(?:[^"\n\\\r\u2028\u2029] -- LineTerminator
|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n) --
|\\x[0-9a-fA-F]{2} -- HexEscapeSequence
|\\u[0-9a-fA-F]{4} -- UnicodeEscapeSequence 
|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])* --NonEscapeCharacter
