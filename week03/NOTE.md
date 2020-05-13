## 重学JavaScript-表达式、类型转换

__Expressions__

* Member （可写）

  > 返回 Reference 类型
  >
  > - Object
  > - key
  >
  > delete、assign 才能体现引用的特点

  - a.b

  - a[b]

  - foo_`_string_`_

    ```js
    var name = 'world'
    function foo(){
        console.log(arguments)
    }
    foo`Hello ${name}!`
    ```

  - super.b

    ```js
    class Parent {
        constructor(){
            this.a = 1
        }
    }
    
    class Child extends Parent{
        constructor(){
            super()
            console.log(this.a)
        }
    }
    Parent.a = 1
    new Child // 1
    ```

  - super['b']

  - new.target

    ```js
    function foo() {
        console.log(new.target)
    }
    foo() // undefined
    
    new foo() // f foo() {...}
    
    function bar() {
        console.log(this)
    }
    var fackObject = {}
    Object.setPrototypeOf(fackObject, bar.prototype)
    fackObject.constructor = bar
    bar.apply(fackObject)
    ```

  - new Foo()

* new Foo

* Call

  * foo()

  * super()

  * foo().b

  * foo()['b']

    ```js
    class foo {
        constructor() {
            this.b = 1
        }
    }
    
    new foo()['b'] // 1
    ```

  * foo()_`_abc_`_

* Left Handside & Right handside

  > 等号左边和等号的右边
  >
  > Left Handside - Runtime => Reference
  >
  > ​			  - Grammar => Left Handside

* Update

  > no LineTerminator here，a++ 中间不能有换行

  * a++

    ```js
    var a = 1, b = 1, c = 1;
    a
    ++
    b
    ++
    c
    [a, b, c] // [1, 2, 2]
    ```

  * a--

  * ++a

  * --a

* Unary

  * delete a.b

  * void foo()   

    > void 后面跟任何值都返回 undefined
    >
    > IIFE 推荐使用
    >
    > ```js
    > for (var i = 0; i < 10; i++) {
    >     var button = document.createElement('button');
    >     document.body.appendChild(button);
    >     button.innerHTML = i;
    >     void function(i){
    >         button.onClick = function(){
    >             console.log(i);
    >         }  
    >     }(i)
    > }
    > ```

  * typeof a

  * _+_ a

  * _-_ a

  * ~a

    > 位运算 - 按位取反

  * !a

  * await a

* Exponental

  * **  右结合

* Multiplicative

  * _*_&emsp;/&emsp;%

* Additive

  * _+_&emsp;-

* Shift

  * <<&emsp;>>&emsp;<<<

* Relationship

  * <&emsp;>&emsp;<=&emsp;>=&emsp;instanceof&emsp;in

* Equality

  * ==
  * !=
  * ===
  * !==

* Bitwise

  * &&emsp;^&emsp;|

* Logical

  * &&

  * ||

    > 短路原则

    ```js
    function foo1() {
        console.log(1)
        return false
    }
    function foo2() {
        console.log(2)
    }
    foo1() && foo2() // 1  false
    foo1() && foo2() // 1  2  undefined
    ```

* Conditional

  * ?&ensp;:

    > 短路

* Comma

  * ，

* __Boxing & Unboxing__

  ```js
  new Number(1) // Number {1}
  new String('hello') // String {"hello"}
  
  new String('hello').length // 5
  'hello'.length // 5
  
  !new String("") // false
  !"" // true
  
  // 强制类型转换
  Number('1') // 1 
  String(1) // '1'
  Boolean(1) // true
  
  Object(1) // Number {1}
  Object("hello")
  Object(true)
  Object(Symbol('x')) // 除了不能 new,其它与构造器一样
  
  Object(Symbol('x')) instanceof Symbol // true
  Object.getPrototypeOf(Object(Symbol('x'))) === Symbol.prototype // true
  
  (function(){return this}).apply(Symbol('x')) // boxing Symbol {Symbol(x)}
  ```

  * ToPremitive
  * toString &ensp;_vs_&ensp; valueOf

  ```js
  1 + {} // '1[object Object]'
  1 + { valueOf(){ return 1 } } // 2
  1 + { toString(){ return 1 } } // 2
  1 + { toString(){ return '1' } } // '11'
  1 + { valueOf() { return 1 }, toString() { return '2' } } // 2
  '1' + { valueOf() { return 1 }, toString() { return '2' } } // '11'
  
  1 + { 
      [Symbol.toPrimitive](){ return 5 }, 
      valueOf(){ return 1 }, 
      toString(){ return '2' }
  }  // 6
  
  1 + { 
      [Symbol.toPrimitive](){ return {} }, 
      valueOf(){ return 1 }, 
      toString(){ return '2' }
  }  // TypeError:Cannot convert object to primitive value
  
  1 + { valueOf() { return  }, toString() { return '2' } } // '1undefined'
  1 + { valueOf() { return {} }, toString() { return '2' } } // '12'
  ```

  __总结：__

  有 `toPrimitive` 只调 `toPrimitive` ；

  没有 `toPrimitive` 会默认执行 `toPrimitive` 代码，会先调 `valueOf` 再调 `toString`

  ```js
  // hint Number
  new Date().toJSON() "2020-04-25T03:16:26.552Z"
  ```

  **Exercise**

  * **StringToNumber**

  ```js
  function convertStringToNumber(string, x) {
      if (arguments.length < 2) x = 10
      var chars = string.split('');
      var number = 0;
      var i = 0;
      while (i < chars.length && chars[i] !== '.') {
          number *= x;
          number += chars[i].codePointAt() - '0'.codePointAt();
          i++;
      }
      if (chars[i] === '.') {
          i++;
      }
      var fraction = 1
      while (i < chars.length) {
          fraction /= x;
          fraction += chars[i].codePointAt() - '0'.codePointAt();
          i++;
      }
      
      return number+fraction;
  }
  ```

  * **StringToNumber**

  ```js
    function convertNumberToString(number, x) {
    if (arguments.length < 2) x = 10;
    var integer = Math.floor(number);
    var fraction = number - integer;
    var string = ''
    while(integer > 0) {
      string = integer % x + string;
      integer = Math.floor(integer / x);
    }
    return string;
  }
  ```





## 重学 JavaScript 语句、对象

__Statement__

Atom

Grammar

​	简单语句

​		ExpressionStatement

​		EmptyStatement

​		DebuggerStatement

​		ThrowStatement

​		ContinueStatement

​		BreakStatement

​		returnStatement

​	复合语句

​		BlockStatement

​			[[type]]：normal

​		IfStatement

​		SwitchStatement

​		IterationStatement

​			while()

​			do...while();

​			for( ; ; )	

​			for( in )

​			for( of )		

​		WithStatement

​		LabelledStatement

​		TryStatement

​	声明

​		FunctionDeclaration

​		GeneratorDeclaration

​		AsyncFunctionDeclaration

​		AsyncGeneratorDeclaration

​		variableStatement

​		ClassDeclaration

​		LexicalDeclaration

Runtime

​	Completion Record

​		[[type]]：normal，break，continue，return，or thorw

​		[[value]]：Types

​		[[target]]：label

​	Lexical Enviorment


# Special Object

## 下标运算（就是使用中括号或者点来做属性访问）或者设置原型跟普通对象不同

### Bound Function

### bind 后的 function 跟原来的函数相关联

## Array

Array 的 length 属性根据最大的下标自动发生变化

## String

为了支持下标运算，String 的正整数属性访问会去字符串里查找

## Arguments

arguments 的非负整数型下标属性跟对应的变量联动

## Module Namespace

## Object.prototype

作为所有正常对象的默认原型，不能再给它设置原型