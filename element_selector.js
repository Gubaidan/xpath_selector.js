javascript:(function() {
    var disabled = false;

    var newcss = ".mouseOn{background-color: #bcd5eb !important;outline: 2px solid #5166bb !important;}";
    if ('\v'=='v') /* ie only */ {
        document.createStyleSheet().cssText = newcss;
    } else {
        var tag = document.createElement('style'); tag.type = 'text/css'; document.getElementsByTagName('head')[0].appendChild(tag);
        tag[ (typeof document.body.style.WebkitAppearance=='string') /* webkit only */ ? 'innerText' : 'innerHTML'] = newcss;
    }

  prevElement = null;
  document.addEventListener('mousemove',
      function(e){
          var elem = e.target || e.srcElement;
          if (prevElement!= null) {prevElement.classList.remove("mouseOn");}
          if( !disabled )
            elem.classList.add("mouseOn");
          prevElement = elem;
      },true);

  document.addEventListener('click',
    function(e){
      if(!disabled) {
        var pathElements = [];
        var index = 0;
        var elem = e.target || e.srcElement;
        var siblings = elem.parentNode.getElementsByTagName(elem.tagName);
        for (var i=0, imax=siblings.length; i<imax; i++) {
          if (e.currentTarget === siblings[i]) {
            index = i+1; // add 1 for xpath 1-based
          }
        }

        while (elem.tagName.toLowerCase() != "html") {
          pathElements.unshift(elem.tagName);
          elem = elem.parentNode;
        }
        console.log(pathElements.join("/") + "[" + index + "]");
      }
    });

    document.onkeydown = function(evt) {
      if(evt.keyCode == 27) {
        disabled = true;
      }
    }

})();
