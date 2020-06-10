# CSS动画性能优化
[参考前端性能优化](https://segmentfault.com/a/1190000000490328)

# 原理
现代浏览器在使用CSS3动画时，以下四种情形绘制的效率较高，分别是：

* 改变位置
* 改变大小
* 旋转
* 改变透明度

# 层？重绘？回流和重布局？图层重组？

首先要了解CSS的图层的概念（Chrome浏览器）

浏览器在渲染一个页面时，会将页面分为很多个图层，图层有大有小，每个图层上有一个或多个节点。在渲染DOM的时候，浏览器所做的工作实际上是：
1. 获取DOM后分割为多个图层
2. 对每个图层的节点计算样式结果（Recalculate style--样式重计算）
3. 为每个节点生成图形和位置（Layout--回流和重布局）
4. 将每个节点绘制填充到图层位图中（Paint Setup和Paint--重绘）
5. 图层作为纹理上传至GPU
6. 符合多个图层到页面上生成最终屏幕图像（Composite Layers--图层重组）

Chrome中满足以下任意情况就会创建图层：
* 3D或透视变换（perspective transform）CSS属性
* 使用加速视频解码的video节点
* 拥有3D（WebGL）上下文或加速的2D上下文的canvas节点
* 混合插件（如Flash）
* 对自己的opacity做CSS动画或使用一个动画webkit变换的元素
* 拥有加速CSS过滤器的元素
* 元素有一个包含复合层的后代节点（一个元素拥有一个子元素，该子元素在自己的层里）
* 元素有一个z-index较低且包含一个复合层的兄弟元素（换句话说就是该元素在复合层上面渲染）

需要注意的是，如果图层中某个元素需要重绘，那么整个图层都需要重绘。比如一个图层包含很多节点，其中有个gif图，gif图的每一帧，都会重回整个图层的其他节点，然后生成最终的图层位图。所以这需要通过特殊的方式来强制gif图属于自己一个图层（translateZ(0)或者translate3d(0,0,0)），CSS3的动画也是一样（好在绝大部分情况浏览器自己会为CSS3动画的节点创建图层）

# 触发重布局的属性
有些节点，当你改变他时，会需要重新布局（这也意味着需要重新计算其他被影响的节点的位置和大小）。这种情况下，被影响的DOM树越大（可见节点），重绘所需要的时间就会越长，而渲染一帧动画的时间也相应变长。所以需要尽力避免这些属性

一些常用的改变时会触发重布局的属性：
盒子模型相关属性会触发重布局：
* width
* height
* padding
* margin
* display
* border-width
* border
* min-height

定位属性及浮动也会触发重布局：
* top
* bottom
* left
* right
* position
* float
* clear

改变节点内部文字结构也会触发重布局：
* text-align
* overflow-y
* font-weight
* overflow
* font-family
* line-height
* vertival-align
* white-space
* font-size

这么多常用属性都会触发重布局，可以看到，他们的特点就是可能修改整个节点的大小或位置，所以会触发重布局

# 别使用CSS类名做状态标记
如果在网页中使用CSS的类来对节点做状态标记，当这些节点的状态标记类修改时，将会触发节点的重绘和重布局。所以在节点上使用CSS类来做状态比较是代价很昂贵的

# 触发重绘的属性
修改时只触发重绘的属性有：
* color
* border-style
* border-radius
* visibility
* text-decoration
* background
* background-image
* background-position
* background-repeat
* background-size
* outline-color
* outline
* outline-style
* outline-width
* box-shadow

这样可以看到，这些属性都不会修改节点的大小和位置，自然不会触发重布局，但是节点内部的渲染效果进行了改变，所以只需要重绘就可以了

# 手机就算重绘也很慢
在重绘时，这些节点会被加载到GPU中进行重绘，这对移动设备如手机的影响还是很大的。因为CPU不如台式机或笔记本电脑，所以绘画巫妖的时间更长。而且CPU与GPU之间的有较大的带宽限制，所以纹理的上传需要一定时间

# CSS动画
缺点：缺乏强大的控制能力。而且很难以有意义的方式结合到一起，使得动画变得复杂且易于出问题。
优点：浏览器可以对动画进行优化。它必要时可以创建图层，然后在主线程之外运行。

# 结论
动画给予了页面丰富的视觉体验。我们应该尽力避免使用会触发重布局和重绘的属性，以免失帧。最好提前申明动画，这样能让浏览器提前对动画进行优化。由于GPU的参与，现在用来做动画的最好属性是如下几个：
* opacity
* translate
* rotate
* scale

也许会有一些新的方式使得可以使用JavaScript做出更好的没有限制的动画，而且不用担心主线程的阻塞问题。但在那之前，还是好好考虑下如何做出流畅的动画吧