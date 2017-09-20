var mytooltip = (function() {
    var idSetTimeoutOfDelay = 0;

    var _setToolTipData = function(eleObj) {
        var selectorName = eleObj.element;
        var contents = eleObj.contents || '';
        var delay = eleObj.delay || 0;
        var arrHasToolTip = Domutil.querySelectorAll(selectorName);
        //console.log(eleObj)

        var i = 0;
        var arrHasToolTipLength = arrHasToolTip.length;
        for (; i < arrHasToolTipLength; i += 1) {
            //console.log(arrHasToolTip[i].className)

            if (!Domclass.hasClass(arrHasToolTip[i], 'toolTip')) {
                Domclass.addClass(arrHasToolTip[i], 'toolTip');
            }
            arrHasToolTip[i].setAttribute('data-contents', contents);
            arrHasToolTip[i].setAttribute('data-delay', delay);
        }
    };

    var _addToolTipText = function(target) {
        var eleBody = document.body;
        var eleToolTipText = document.createElement('DIV');
        var targetLeft = target.offsetLeft;
        var targetTop = target.offsetTop;
        var targetHeight = target.offsetHeight - 2;
        var targetDelay = target.getAttribute('data-delay');
        var eleToolTipTextStyle = eleToolTipText.style;

        Domclass.addClass(eleToolTipText, 'toolTipText');
        eleToolTipText.innerText = target.getAttribute('data-contents');
        eleToolTipTextStyle.left = targetLeft + 'px';
        eleToolTipTextStyle.top = (targetTop + targetHeight) + 'px';
        eleToolTipTextStyle.display = 'block';

        if (targetDelay > 0) {
            idSetTimeoutOfDelay = setTimeout(function() {
                eleBody.appendChild(eleToolTipText);
            }, targetDelay);
        } else {
            eleBody.appendChild(eleToolTipText);
        }
    };

    var _removeToolTipText = function() {
        var eleToolTipText = Domutil.querySelector('.toolTipText')[0];
        if (!eleToolTipText) {
            return;
        }
        document.body.removeChild(eleToolTipText);
    };

    var _addEventToolTipMouseOver = function(e) {
        var target;
        e = e || window.event;
        target = e.target || e.srcElement;

        clearTimeout(idSetTimeoutOfDelay);

        if (Domclass.hasClass(target, 'toolTip')) {
            _addToolTipText(target);
        } else if (Domclass.hasClass(target, 'toolTipText')) {

        } else {
            _removeToolTipText();
        }
    };

    var _addEventToolTipMouseOut = function(e) {
        var target;
        e = e || window.event;
        target = e.target || e.srcElement;

        clearTimeout(idSetTimeoutOfDelay);

        if (Domclass.hasClass(target, 'toolTipText')) {
            _removeToolTipText();
        }
    };

    var init = function(arrEleObj) {
        var i = 0;
        var arrEleObjLength = arrEleObj.length;
        for (; i < arrEleObjLength; i += 1) {
            _setToolTipData(arrEleObj[i]);
        }

        Eventutil.addHandler(document.body, 'mouseover', _addEventToolTipMouseOver);
        Eventutil.addHandler(document.body, 'mouseout', _addEventToolTipMouseOut);
    };

    var edit = function(selector, objInfo) {
        _setToolTipData({
            'element': selector,
            'contents': objInfo.contents,
            'delay': objInfo.delay
        });
    };

    var add = function(selector, objInfo) {
        _setToolTipData({
            'element': selector,
            'contents': objInfo.contents,
            'delay': objInfo.delay
        });
    };

    var remove = function(selector) {
        var arrEle = Domutil.querySelectorAll(selector);
        var i = 0;
        var arrEleLength = arrEle.length;
        for (; i < arrEleLength; i += 1) {
            Domclass.removeClass(arrEle[i], 'toolTip');
            arrEle[i].removeAttribute('data-delay');
            arrEle[i].removeAttribute('data-contents');
        }
    };

    return {
        init: init,
        edit: edit,
        add: add,
        remove: remove,

        _addToolTipText: _addToolTipText,
        _removeToolTipText: _removeToolTipText
    };
})();
