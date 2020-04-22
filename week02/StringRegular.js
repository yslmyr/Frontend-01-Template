//SingleStringCharacter :: SourceCharacter but not one of ' or \ or LineTerminator
[^'\n\\\r\u2028\u2029]
//SingleStringCharacter :: \ EscapeSequence
\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029]
//SingleStringCharacter :: \ LineContinuation
\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n) 

//DoubleStringCharacter :: SourceCharacter but not one of " or \ or LineTerminator
[^"\n\\\r\u2028\u2029]
//DoubleStringCharacter :: \ EscapeSequence
\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029]
//DoubleStringCharacter :: \ LineContinuation
\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n) 