var mytooltip = (function() {
    var arrToolTipObj = [];


    var ToolTip = function(eleObj) {
      //console.log(eleObj)
        this.selectorName = eleObj.element;
        this.contents = eleObj.contents

        var arrHasToolTip = Domutil.querySelectorAll(this.selectorName);

        var i = 0;
        var arrHasToolTipLength = arrHasToolTip.length;

        for (; i < arrHasToolTipLength; i += 1) {
             Domclass.addClass(arrHasToolTip[i], "toolTip");
             arrHasToolTip[i].setAttribute("data-contents", this.contents)
        }
    }


    var _addEventToolTip = function() {
        _addEventToolTipMouseOver();
        _addEventToolTipMouseOut();
    }

    var _addEventToolTipMouseOver = function() {
        var eleBody = document.body;
        var self = this;
        var target;
        Eventutil.addHandler(eleBody, "mouseover", function(e){
            e = e || window.event;
            target = e.target || e.srcElement;

            if (Domclass.hasClass(target, "toolTip")) {
                _addToolTipText(target);
            } else if (Domclass.hasClass(target, "toolTipText")) {
                return;
            } else {
                _removeToolTipText();
            }
        });
    }

    var _addToolTipText = function(target) {
        var eleBody = document.body;
        var eleToolTipText = document.createElement("DIV");
        Domclass.addClass(eleToolTipText, "toolTipText");
        eleToolTipText.innerText = target.getAttribute("data-contents");
        var targetLeft = target.offsetLeft;
        var targetTop = target.offsetTop;
        var targetHeight = target.offsetHeight - 2;


        eleToolTipText.style.left = targetLeft + 'px';
        eleToolTipText.style.top = (targetTop + targetHeight) + 'px';
        eleToolTipText.style.display = 'block';


        eleBody.appendChild(eleToolTipText);
    }


    var _addEventToolTipMouseOut = function() {
        var eleBody = document.body;
        var self = this;
        var target;
        Eventutil.addHandler(eleBody, "mouseout", function(e){
            e = e || window.event;
            target = e.target || e.srcElement;
            if (Domclass.hasClass(target, "toolTipText")) {
                _removeToolTipText();
            }

        });
    }

    var _removeToolTipText = function() {
        var eleBody = document.body;
        var eleToolTipText = Domutil.querySelector(".toolTipText")[0];
        if (!eleToolTipText) {
            return;
        }
        eleBody.removeChild(eleToolTipText);
    }

    var init = function(arrEleObj) {
        var i = 0;
        var arrEleObjLength = arrEleObj.length;

        for (; i < arrEleObjLength; i += 1) {
            arrToolTipObj.push(new ToolTip(arrEleObj[i]));
        }

        _addEventToolTip();

    };


    return {
        init: init,

        _addToolTipText: _addToolTipText,
        _removeToolTipText: _removeToolTipText
    };
})();
