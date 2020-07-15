# React’s JSX: 硬币的另一面
> [来自：《React’s JSX: The Other Side of the Coin
》](https://medium.com/free-code-camp/react-s-jsx-the-other-side-of-the-coin-2ace7ab62b98#.5007n49wq)

当React发布时，许多人对JSX一无所知。这些尖括号在JavaScript中做什么？那么分离关注点呢？Facebook没有从社区中学到任何东西吗？

像许多人一样，至少可以说，我对React的JSX的最初反应是持怀疑态度的。当我开始喜欢JSX时，每当我将它介绍给新开发人员时，我都感觉自己在炫耀我丑陋的孩子。

尽管最初有戏剧性，但我已经意识到JSX毕竟不是一个激进的想法。实际上，它只是硬币的另一面。这是自然的进化过渡。要理解为什么，历史课是适当的。

## 阶段1：不干扰JavaScript

还记得jQuery的美好时光吗？不干扰JavaScript的时代正盛开。我们的HTML是纯HTML。我们的JavaScript是纯JavaScript。我们的关注完全分开了。

我们将这样编写HTML：

```html
<a class="hide">点击隐藏我</a>
```

然后，我们将这样编写JavaScript：

```javascript
$('.hide').click()function(){$()this).hide();} 
```

这似乎是个好主意。我们的HTML完全是纯文本！但是后来我们意识到了一些问题：呃，我怎么能知道这两条线是互连的？答：除非我阅读了每一行JavaScript，否则我不会。使用这种模式，如果不检查JavaScript的每一行以确保不破坏选择器，就无法更改标记行。您会看到，这里没有实际分离。当然，JS和HTML在单独的文件中，但是这两种技术在本质上是紧密结合在一起的。它们必须同步移动，否则应用程序将崩溃。

严格将HTML和JS分开实际上导致了难以维护和调试的应用程序。每次您想要更改标记行时，都会担心是否破坏jQuery选择器。也许，如果我们放宽对分离关注点的虔诚奉献，就可以减轻这种痛苦？这迎来了第二阶段…

# 阶段2：双向绑定

当前端开发人员在Knockout和Angular中看到双向绑定时，这是一个启示。我们中的许多人抛弃了对分离关注点的虔诚奉献精神，并接受了在HTML中声明绑定的功能。数据更改后，UI也会更改。UI更改后，数据也更改了。好干净 很简单。

当然，每个库和框架都有专有的方式来完成此任务，但是从根本上说，它们都在做同一件事。只需考虑以下在几个流行框架中遍历数组的简单示例：

```javascript
//Angular
<div ng-repeat=”user in users”>
//Ember
{{#each user in users}}
//Knockout
data-bind=”foreach: users”
```

但是，这里有一些有趣的事情。很少有人认识到一个非常根本的问题：我们正在将JavaScript有效地放入HTML中。这不是关注点分离。所有这些方法都做同样的事情：通过添加额外的专有标记，它们使HTML更加强大。该标记被有效地解析为JavaScript。现在我们终于可以通过这种方式将JS和HTML混合在一起了，是时候让React介入并向我们展示硬币的另一面了……

# 阶段3：JSX
React的JSX并不是一个根本性的转变。这仅仅是一个简单实现的结果：

> As an industry, we’ve already decided: HTML and JavaScript belong together.

诚然，我们没有大声说出来。但是，采用Angular，Knockout和Ember可以使我们的新偏好更加明确。如上所述，用HTML编写数据绑定代码实际上是将JS放入HTML。但是，如果我们要混合在一起，为什么我们应该选择增强像HTML这样薄弱的技术呢？自从开始以来，浏览器就松散地解释了HTML。那么HTML是声明数据绑定，循环和条件逻辑的逻辑基础吗？

Facebook认识到JavaScript是处理这两个混杂问题的更合乎逻辑且功能更强大的技术。可以归结为：

- Angular，Ember和Knockout在您的HTML中添加了“ JS”。
- React将“ HTML”放入您的JS中。

在您尝试使用React和JSX之前，此举的好处是多方面的，不一定得到赞赏。由于一些简单的原因，React的JSX在根本上优于上述所有“阶段2”样式框架：

1. **编译时错误**

当您在写HTML，您通常不知道在哪里弄错了。在许多情况下，这是一个无提示的运行时错误。例如，如果在使用Angular时键入n-repeat而不是ng-repeat，则不会发生任何事情。在Knockout中，data-bnd vs data-bind会出现同样的情况。无论哪种情况，您的应用程序都将在运行时不会提示错误。真令人沮丧。

相反，当您在JSX中输入错误时，它不会被编译。忘记关闭那个<li>标签了吗？当您在HTML中打错字时，您是否不希望获得如此丰富的反馈？

```
ReactifyError: /components/header.js: Parse Error: Line 23: Expected corresponding JSX closing tag for li while parsing file: /components/header.js
```

有了JSX，这种详细的反馈终于成为现实！很难过分强调这是多么大的胜利。这种快速的反馈循环大大提高了生产率。正如我在“清洁代码”课程中讨论的那样，精心设计的解决方案很快就会失败。

2. **利用JavaScript的全部功能**

在JavaScript中组合标记意味着您可以在使用标记时享受JavaScript的所有功能，而不是像Angular和Knockout这样的以HTML为中心的框架中提供的小型专有子集。

> Client-side frameworks shouldn’t require you to learn a proprietary syntax for declaring loops and conditionals.
> 
> 客户端框架不应该要求您学习专有的语法来声明循环和条件。

React避免了学习另一种声明循环和基本条件逻辑的专有方式的开销。如您在上面的“阶段2”部分中所见，每个双向绑定框架都使用其自己的特殊语法。相反，JSX看起来几乎与HTML相同，并且它对条件和循环之类的内容使用普通的'ol JavaScript。在像JavaScript这样零散的生态系统中，不必学习另一种专有数据绑定语法是一个不错的选择。

而且由于您将标记和关联的JavaScript数据写入同一文件中，因此在引用函数时，许多IDE都将为您提供智能感知支持。想一想在面向HTML的框架中引用函数时，您经常会打错字。

## 最后的想法
JSX不是一个疯狂的想法。这是自然的进步。因此，请不要惊慌。
> JSX isn’t revolutionary. It’s evolutionary.
> 
> JSX不是革命性的。它是进化的。

像大多数进化形式一样，这是明显的改进。
