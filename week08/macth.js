function match(element, selector) {
  if (!selector || !element.attributes) 
    return false

  let regClass = /(\.\w+)+/g
  let resClass = selector.match(regClass)

  let regId = /(#\w+)+/g
  let resId = selector.match(regId)

  if (resClass) {
    let resClassArr = []
    for (let i = 0; i < resClass.length; i ++) {
      let tempArr = resClass[i].split('.')
      for (let j = 1; j < tempArr.length; j ++) {
        resClassArr.push(tempArr[j])
      }
    }
    let classAttr = element.attributes.filter(attr => attr.name === "class")
    let classAttrRes = []
    if (classAttr && classAttr[0]) {
      classAttrRes = classAttr[0]["value"].split(" ")
    }
    let tempFlag = null
    for (let i = 0; i < resClassArr.length; i ++) {
      tempFlag = false
      let k = 0
      for (; k < classAttrRes.length; k ++) {
        if (classAttrRes[k] === resClassArr[i]) {
          tempFlag = true
          break
        }
      }
      if (!tempFlag && k === classAttrRes.length) {
        return false;
      }
    }
  }
  
  if (resId && resId[0].charAt(0) == "#") {
    const attr = element.attributes.filter(attr => attr.name === "id")[0]
    if (attr && attr.value === resId[0].replace("#", '')) {
      return true
    } else {
      return false
    }
  } else if(selector.charAt(0) !== "#" && selector.charAt(0) !== "."){ 
    if (element.tagName === selector) {
      return true
    } else {
      return false
    }
  } else if (resClass && resClass.length) {
    return true
  }
  return false
}

function specificity(selector) {
  const p = [0, 0, 0, 0]
  const selectorParts = selector.split(" ")
  let regClass = /(\.\w+)+/g
  let resClass = selector.match(regClass)
  if (resClass && resClass.length) {
    for (let i = 0; i < resClass.length; i ++) {
      let tempArr = resClass[i].split('.')
      for (let j = 1; j < tempArr.length; j ++) {
        p[2] ++
      }
    }
  }
  for (let part of selectorParts) {

    let regId = /(#\w+)+/g
    let resId = part.match(regId)
    if (resId && resId[0].charAt(0) == "#") {
      p[1] += 1
    } else if (part.charAt(0) !== "#" && part.charAt(0) !== "."){
      p[3] += 1
    }
  }
  console.log('selector', selector)
  console.log('p', p)
  return p
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0]
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1]
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2]
  }
  return sp1[3] - sp2[3]
}

function computeCSS(element) {
  const elements = stack.slice().reverse()

  if (!element.computedStyle)
    element.computedStyle = {}
  
  for (let rule of rules) {
    const selectorParts = rule.selectors[0].split(" ").reverse()

    if (!match(element, selectorParts[0]))
      continue

    let matched = false

    let j = 1

    for (let i = 0; i < elements.length; i ++) {
      if (match(elements[i], selectorParts[j])) {
        j ++
      }
    }
    if (j >= selectorParts.length) {
      matched = true
    }
    if (matched) { 
      const sp = specificity(rule.selectors[0])
      const computedStyle = element.computedStyle
      for (let declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {}
        }
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }
    }
  }
}

function emit(token) {

  let top = stack[stack.length - 1]

  if (token.type == "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for (let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    computeCSS(element)

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing)
      stack.push(element)
    
    currentTextNode = null
  } else if (token.type == "endTag") {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match")
    } else {
      if (top.tagName === "style") {
        addCSSRules(top.children[0].content)
      }
      layout(top)
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type == "text") {
    if (currentTextNode == null) {
      currentTextNode = {
        type: "text",
        content: ""
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

const EOF = Symbol("EOF")

function data(char) {
  if (char == "<") {
    return tagOpen
  } else if (char == EOF) {
    emit({
      type: "EOF"
    })
    return 
  } else {
    emit({
      type: "text",
      content: char
    })
    return data
  }
}

function tagOpen(char) {
  if (char == "/") { 
    return endTagOpen
  } else if (char.match(/^[a-zA-Z]$/)) { 
    currentToken = {
      type: "startTag",
      tagName: ""
    }
    return tagName(char)
  } else {
  }
}


function endTagOpen(char) {
  if (char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(char)
  } else if (char == ">") {
  } else if(char == EOF) {
  }
}


function tagName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName(char)
  } else if (char == "/") {
    return selfClosingStartTag
  } else if (char.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += char.toLowerCase()
    return tagName
  } else if (char == ">") {
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}


function beforeAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char == ">" || char == "/" || char == EOF) {
    return afterAttributeName(char)
  } else if (char == "=") {
    return 
  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(char)
  }
}

function afterAttributeName(char) {
  if (char == "/") {
    return selfClosingStartTag
  } else if (char.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (char == "=") {
    return beforeAttributeValue
  } else if (char == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (char == EOF) {
    return 
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(char)
  }
}

function attributeName(char) {
  if (char.match(/^[\t\n\f ]$/) || char == "/" || char == ">" || char == EOF) { 
    return afterAttributeName(char)
  } else if (char == "=") {
    return beforeAttributeValue
  } else if (char == "\u0000") {
  } else if (char == "\"" || char == "\'" || char == "<") {
    return attributeName
  } else {
    currentAttribute.name += char
    return attributeName
  }
}

function beforeAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/) || char == "/" || char == ">" || char == EOF) { 
    return beforeAttributeValue
  } else if (char == "\"") {
    return doubleQuotedAttributeValue
  } else if (char == "\'") {
    return singleQuotedAttributeValue
  } else if (char == ">") {
    emit(currentToken)
  } else {
    return UnquotedAttributeValue(char)
  }
}

function doubleQuotedAttributeValue(char) {
  if (char == "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (char == "\u0000") {
  } else if (char == EOF) {
  } else {
    currentAttribute.value += char
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(char) {
  if (char == "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (char == "\u0000") {
  } else if (char == EOF) {
  } else {
    currentAttribute.value += char
    return singleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char == "/") {
    return selfClosingStartTag
  } else if (char ==">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (char == EOF) {
  } else {
  }
}

function UnquotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (char == "/") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingStartTag
  } else if (char == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (char == "\u0000") {
  } else if (char == "\"" || char == "\'" || char == "<" || char == "=" || char == "`") {
  } else if (char == EOF) {
  } else {
    currentAttribute.value += char
    return UnquotedAttributeValue
  }
}


function selfClosingStartTag(char) {
  if (char == ">" || char == "/") {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  } else if (char == "EOF") {
  } else {
  }
}