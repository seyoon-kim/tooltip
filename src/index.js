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
            }
        });
    }

    var _addToolTipText = function(target) {
        var eleBody = document.body;
        var eleToolTipText = document.createElement("DIV");
        Domclass.addClass(eleToolTipText, "toolTipText");
        eleToolTipText.innerText = target.getAttribute("data-contents");
        eleBody.appendChild(eleToolTipText);
    }


    var _addEventToolTipMouseOut = function() {
        var eleBody = document.body;
        var self = this;
        var target;
        Eventutil.addHandler(eleBody, "mouseout", function(e){
            e = e || window.event;
            target = e.target || e.srcElement;

            if (Domclass.hasClass(target, "toolTip")) {
                _removeToolTipText();
            }
        });
    }

    var _removeToolTipText = function() {
        var eleBody = document.body;
        var eleToolTipText = Domutil.querySelector(".toolTipText")[0];
        eleBody.removeChild(eleToolTipText);
    }

    var init = function(arrEleObj) {
        var i = 0;
        var arrEleObjLength = arrEleObj.length;

        for (; i < arrEleObjLength; i += 1) {
            //console.log(arrEleObj[i])
            arrToolTipObj.push(new ToolTip(arrEleObj[i]));
        }
        //console.log(arrToolTipObj)

        _addEventToolTip();

    };


    return {
        init: init,

        _addToolTipText: _addToolTipText,
        _removeToolTipText: _removeToolTipText
    };
})();
