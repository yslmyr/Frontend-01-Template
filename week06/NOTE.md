# CSS 语法解析过程(Webkit)
1. 先创建 CSSStyleSheet 对象。将 CSSStyleSheet 对象的指针存储到 CSSParser 对象中。
2. CSSParser 识别出一个 simple-selector ，形如 “div” 或者 “.class”。创建一个 CSSParserSelector 对象。
3. CSSParser 识别出一个关系符和另一个 simple-selecotr ，那么修改之前创建的 simple-selecotr, 创建组合关系符。
4. 循环第3步直至碰到逗号或者左大括号。
5. 如果碰到逗号，那么取出 CSSParser 的 reuse vector，然后将堆栈尾部的 CSSParserSelector 对象弹出存入 Vecotr 中，最后跳转至第2步。如果碰到左大括号，那么跳转至第6步。
6. 识别属性名称，将属性名称的 hash 值压入解释器堆栈。
7. 识别属性值，创建 CSSParserValue 对象，并将 CSSParserValue 对象存入解释器堆栈。
8. 将属性名称和属性值弹出栈，创建 CSSProperty 对象。并将 CSSProperty 对象存入 CSSParser 成员变量m_parsedProperties 中。
9. 如果识别处属性名称，那么转至第6步。如果识别右大括号，那么转至第10步。
10. 将 reuse vector 从堆栈中弹出，并创建 CSSStyleRule 对象。CSSStyleRule 对象的选择符就是 reuse vector, 样式值就是 CSSParser 的成员变量 m_parsedProperties 。
11. 把 CSSStyleRule 添加到 CSSStyleSheet 中。
12. 清空 CSSParser 内部缓存结果。
13. 如果没有内容了，那么结束。否则跳转值第2步。