var mytooltip = (function() {
    //var arrToolTipObj = [];
    var idSetTimeoutOfDelay = 0;


    // var ToolTip = function(eleObj) {
    //   //console.log(eleObj)
    //     this.selectorName = eleObj.element;
    //     this.contents = eleObj.contents;
    //     this.delay = eleObj.delay || 0;
    //
    //     var arrHasToolTip = Domutil.querySelectorAll(this.selectorName);
    //
    //     var i = 0;
    //     var arrHasToolTipLength = arrHasToolTip.length;
    //
    //     for (; i < arrHasToolTipLength; i += 1) {
    //          Domclass.addClass(arrHasToolTip[i], "toolTip");
    //          arrHasToolTip[i].setAttribute("data-contents", this.contents);
    //
    //          arrHasToolTip[i].setAttribute("data-delay", this.delay);
    //
    //     }
    // }

    var _makeToolTip = function(eleObj) {
        var selectorName = eleObj.element;
        var contents = eleObj.contents;
        var delay = eleObj.delay || 0;
        var arrHasToolTip = Domutil.querySelectorAll(selectorName);

        var i = 0;
        var arrHasToolTipLength = arrHasToolTip.length;
        for (; i < arrHasToolTipLength; i += 1) {
             Domclass.addClass(arrHasToolTip[i], "toolTip");
             arrHasToolTip[i].setAttribute("data-contents", contents);
             arrHasToolTip[i].setAttribute("data-delay", delay);
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


            clearTimeout(idSetTimeoutOfDelay);

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

        var targetDelay = target.getAttribute("data-delay");

        if(targetDelay > 0){
            idSetTimeoutOfDelay = setTimeout(function (){
                eleBody.appendChild(eleToolTipText);
                return;
            }, targetDelay)
        } else {

            eleBody.appendChild(eleToolTipText);
        }

    }


    var _addEventToolTipMouseOut = function() {
        var eleBody = document.body;
        var self = this;
        var target;
        Eventutil.addHandler(eleBody, "mouseout", function(e){
            e = e || window.event;
            target = e.target || e.srcElement;

            clearTimeout(idSetTimeoutOfDelay);

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
      console.log("!")
        var i = 0;
        var arrEleObjLength = arrEleObj.length;

        for (; i < arrEleObjLength; i += 1) {
            _makeToolTip(arrEleObj[i]);
        }

        _addEventToolTip();
    };

    var edit = function(selector, objInfo) {

        var arrToolTip = Domutil.querySelectorAll(selector);
        for (var i = 0; i < arrToolTip.length; i += 1) {
            if (objInfo.delay) {
                arrToolTip[i].setAttribute("data-delay", objInfo.delay);
            }

            if (objInfo.contents) {
                arrToolTip[i].setAttribute("data-contents", objInfo.contents);
            }
        }
    }

    var add = function(selector, objInfo) {
        var arrEleObj = [{
            "element" : selector
        }];

        if(objInfo.contents){
          arrEleObj[0].contents = objInfo.contents;
        }

        if(objInfo.delay){
          arrEleObj[0].delay = objInfo.delay;
        }

        _makeToolTip(arrEleObj[0]);
    }


    return {
        init: init,
        edit: edit,
        add: add,

        _addToolTipText: _addToolTipText,
        _removeToolTipText: _removeToolTipText
    };
})();
