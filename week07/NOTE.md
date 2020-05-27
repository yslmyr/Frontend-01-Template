# CSS语法

```
stylesheet
  : [ CHARSET_SYM STRING ';' ]?
    [S|CDO|CDC]* [ import [ CDO S* | CDC S* ]* ]*
    [ [ ruleset | media | page ] [ CDO S* | CDC S* ]* ]*
  ;
import
  : IMPORT_SYM S*
    [STRING|URI] S* media_list? ';' S*
  ;
media
  : MEDIA_SYM S* media_list '{' S* ruleset* '}' S*
  ;
media_list
  : medium [ COMMA S* medium]*
  ;
medium
  : IDENT S*
  ;
page
  : PAGE_SYM S* pseudo_page?
    '{' S* declaration? [ ';' S* declaration? ]* '}' S*
  ;
pseudo_page
  : ':' IDENT S*
  ;
operator
  : '/' S* | ',' S*
  ;
combinator
  : '+' S*
  | '>' S*
  ;
unary_operator
  : '-' | '+'
  ;
property
  : IDENT S*
  ;
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration? [ ';' S* declaration? ]* '}' S*
  ;
selector
  : simple_selector [ combinator selector | S+ [ combinator? selector ]? ]?
  ;
simple_selector
  : element_name [ HASH | class | attrib | pseudo ]*
  | [ HASH | class | attrib | pseudo ]+
  ;
class
  : '.' IDENT
  ;
element_name
  : IDENT | '*'
  ;
attrib
  : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
    [ IDENT | STRING ] S* ]? ']'
  ;
pseudo
  : ':' [ IDENT | FUNCTION S* [IDENT S*]? ')' ]
  ;
declaration
  : property ':' S* expr prio?
  ;
prio
  : IMPORTANT_SYM S*
  ;
expr
  : term [ operator? term ]*
  ;
term
  : unary_operator?
    [ NUMBER S* | PERCENTAGE S* | LENGTH S* | EMS S* | EXS S* | ANGLE S* |
      TIME S* | FREQ S* ]
  | STRING S* | IDENT S* | URI S* | hexcolor | function
  ;
function
  : FUNCTION S* expr ')' S*
  ;
/*
 * There is a constraint on the color that it must
 * have either 3 or 6 hex-digits (i.e., [0-9a-fA-F])
 * after the "#"; e.g., "#000" is OK, but "#abcd" is not.
 */
hexcolor
  : HASH S*
  ;
```

# 基本语法
## 规则
### 选择符
任何HTML元素都可以是一个CSS1的选择符。选择符仅仅是指向特别样式的元素。例如，
```
  P { text-indent: 3em }
```
当中的选择符是P。

-------

### 类选择符
单一个选择符能有不同的CLASS(类)，因而允许同一元素有不同样式。例如，一个网页制作者也许希望视其语言而定，用不同的颜色显示代码 :
```
  code.html { color: #191970 }
  code.css  { color: #4b0082 }
```
以上的例子建立了两个类，css和html，供HTML的CODE元素使用。CLASS属性是用于在HTML中以指明元素的类，例如，
```
  <P CLASS=warning>每个选择符只允许有一个类。
  例如，code.html.proprietary是无效的。</p>
```
类的声明也可以无须相关的元素:
```
  .note { font-size: small }
```
在这个例子，名为note的类可以被用于任何元素。

##### 一个良好的习惯是在命名类的时候，根据它们的功能而不是根据它们的外观。上述例子中的note类也可以命名为small，但如果网页制作者决定改变这个类的样式，使得它不再是小字体的话，那么这个名字就变得毫无意义了。

---

### ID 选择符
ID 选择符个别地定义每个元素的成分。这种选择符应该尽量少用，因为他具有一定的局限。一个ID选择符的指定要有指示符"#"在名字前面。例如，ID选择符可以指定如下:
  ```
    #svp94O { text-indent: 3em }
  ```
这点可以参考HTML中的ID属性:
  ```
    <P ID=svp94O>文本缩进3em</P>
  ```
---
### 关联选择符
关联选择符只不过是一个用空格隔开的两个或更多的单一选择符组成的字符串。这些选择符可以指定一般属性，而且因为层叠顺序的规则，它们的优先权比单一的选择符大。例如， 以下的上下文选择符
```
  P EM { background: yellow }
```
是P EM。这个值表示段落中的强调文本会是黄色背景；而标题的强调文本则不受影响。

----

### 声明
#### 属性
一个属性被指定到选择符是为了使用它的样式。属性的例子包括颜色、边界和字体。

#### 值
声明的值是一个属性接受的指定。例如，属性颜色能接受值red。

---

## 组合
为了减少样式表的重复声明，组合的选择符声明是允许的。例如，文档中所有的标题可以通过组合给出相同的声明:
```
  H1, H2, H3, H4, H5, H6 {
    color: red;
    font-family: sans-serif }
```
## 继承
实际上，所有在选择符中嵌套的选择符都会继承外层选择符指定的属性值，除非另外更改。例如，一个BODY定义了的颜色值也会应用到段落的文本中。

有些情况是内部选择符不继承周围的选择符的值，但理论上这些都是特殊的。例如，上边界属性是不会继承的；直觉上，一个段落不会有同文档BODY一样的上边界值。

## 注解
样式表里面的注解使用C语言编程中一样的约定方法去指定。CSS1注解的例子如以下格式:
```
  /* COMMENTS CANNOT BE NESTED */
```

# 伪类和伪元素

伪类和伪元素是特殊的类和元素，能自动地被支持CSS的浏览器所识别。伪类区别开不同种类的元素(例如，visited links(已访问的连接)和active links(可激活连接)描述了两个定位锚(anchors)的类型)。伪元素指元素的一部分，例如段落的第一个字母。

伪类或伪元素规则的形式如
```
  选择符:伪类 { 属性: 值 }
```
或
```
  选择符:伪元素 { 属性: 值 }
```
伪类和伪元素不应用HTML的CLASS属性来指定。一般的类可以与伪类和伪元素一起使用，如下:
```
选择符.类: 伪类 { 属性: 值 }
```
或
```
选择符.类: 伪元素 { 属性: 值 }
```
## 定位锚伪类
伪类可以指定A元素以不同的方式显示连接(links)、已访问连接(visited links)和可激活连接(active links)。定位锚元素可给出伪类link、visited或active。一个已访问连接可以定义为不同颜色的显示，甚至不同字体大小和风格。

一个有趣的效果是使当前(或“可激活”)连接以不同颜色、更大的字体显示。然后，当网页的已访问连接被重选时，又以不同颜色、更小字体显示。这个样式表的示例如下:
```
  A:link    { color: red }
  A:active  { color: blue; font-size: 125% }
  A:visited { color: green; font-size: 85% }
```
## 首行伪元素
通常在报纸上的文章，例如Wall Street Journal中的，文本的首行都会以粗印体而且全部大写地展示。CSS1包括了这个功能，将其作为一个伪元素。首行伪元素可以用于任何块级元素(例如P、H1等等)。以下是一个首行伪元素的例子:
```
  P:first-line {
    font-variant: small-caps;
    font-weight: bold }
```
## 首个字母伪元素
首个字母伪元素用于加大(drop caps)和其他效果。含有已指定值选择符的文本的首个字母会按照指定的值展示。一个首个字母伪元素可以用于任何块级元素。例如:
```
P:first-letter { font-size: 300%; float: left }
```
会比普通字体加大三倍。

# 层叠顺序
当使用了多个样式表，样式表需要争夺特定选择符的控制权。在这些情况下，总会有样式表的规则能获得控制权。以下的特性将决定互相对立的样式表的结果。

1. *!important*
  规则可以用指定的! important 特指为重要的。一个特指为重要的样式会凌驾于与之对立的其它相同权重的样式。同样地，当网页制作者和读者都指定了重要规则时，网页制作者的规则会超越读者的。以下是! important 声明的例子:
```
  BODY { background: url(bar.gif) white;
        background-repeat: repeat-x ! important }
  Origin of Rules (Author's vs. Reader's)
```
2. *Origin of Rules (Author's vs. Reader's)*
正如以前所提及的，网页制作者和读者都有能力去指定样式表。当两者的规则发生冲突，网页制作者的规则会凌驾于读者的其它相同权重的规则。而网页制作者和读者的样式表都超越浏览器的内置样式表。

网页制作者应该小心地使用! important 规则，因为它们会超越用户任何的! important 规则。例如，一个用户由于视觉关系，会要求大字体或指定的颜色，而且这样的用户会有可能声明确定的样式规则为! important，因为这些样式对于用户阅读网页是极为重要的。任何的! important 规则会超越一般的规则，所以建议网页制作者使用一般的规则以确保有特殊样式需要的用户能阅读网页。

3. *选择符规则: 计算特性*
基于它们的特性级别，样式表也可以超越与之冲突的样式表，一个较高特性的样式永远都凌驾于一个较低特性的样式。这只不过是计算选择符的指定个数的一个统计游戏。

+ 统计选择符中的ID属性个数。
+ 统计选择符中的CLASS属性个数。
+ 统计选择符中的HTML标记名格式。
最后，按正确的顺序写出三个数字，不要加空格或逗号，得到一个三位数。( 注意，你需要将数字转换成一个以三个数字结尾的更大的数。)相应于选择符的最终数字列表可以很容易确定较高数字特性凌驾于较低数字的。以下是一个按特性分类的选择符的列表:
```
#id1         {xxx} /* a=1 b=0 c=0 --> 特性 = 100 */
UL UL LI.red {xxx} /* a=0 b=1 c=3 --> 特性 = 013 */
LI.red       {xxx} /* a=0 b=1 c=1 --> 特性 = 011 */
LI           {xxx} /* a=0 b=0 c=1 --> 特性 = 001 */
```
4. 特性的顺序
为了方便使用，当两个规则具同样权重时，取后面的那个。

> 摘自[CSS 结构和规则](https://www.htmlhelp.com/zh/reference/css/structure.html)