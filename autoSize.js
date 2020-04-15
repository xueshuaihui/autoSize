(function autoSize(window, document, reference){
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1
  var reference = reference || 1920
  var referenceObj = "width"
  
  function setRemUnit () {
    var clientWidth = docEl.clientWidth
    var clientHeight = docEl.clientHeight
    var rem = (referenceObj === "width" ? clientWidth : clientHeight) / reference
    docEl.style.fontSize = rem + 'px'
  }
  setRemUnit()

  window.addEventListener('resize', function(){
    setRemUnit()
  })
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document, "1920"))