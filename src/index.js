var mytooltip = (function() {
    var idSetTimeoutOfDelay = 0;

    var _makeToolTip = function(eleObj) {
        var selectorName = eleObj.element;
        var contents = eleObj.contents;
        var delay = eleObj.delay || 0;
        var arrHasToolTip = Domutil.querySelectorAll(selectorName);

        var i = 0;
        var arrHasToolTipLength = arrHasToolTip.length;
        for (; i < arrHasToolTipLength; i += 1) {
            Domclass.addClass(arrHasToolTip[i], 'toolTip');
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

        Domclass.addClass(eleToolTipText, 'toolTipText');
        eleToolTipText.innerText = target.getAttribute('data-contents');
        eleToolTipText.style.left = targetLeft + 'px';
        eleToolTipText.style.top = (targetTop + targetHeight) + 'px';
        eleToolTipText.style.display = 'block';

        if (targetDelay > 0) {
            idSetTimeoutOfDelay = setTimeout(function() {
                eleBody.appendChild(eleToolTipText);
            }, targetDelay);
        } else {
            eleBody.appendChild(eleToolTipText);
        }
    };

    var _removeToolTipText = function() {
        var eleBody = document.body;
        var eleToolTipText = Domutil.querySelector('.toolTipText')[0];
        if (!eleToolTipText) {
            return;
        }
        eleBody.removeChild(eleToolTipText);
    };

    var _addEventToolTipMouseOver = function() {
        var eleBody = document.body;
        var target;
        Eventutil.addHandler(eleBody, 'mouseover', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            clearTimeout(idSetTimeoutOfDelay);

            if (Domclass.hasClass(target, 'toolTip')) {
                _addToolTipText(target);
            } else if (Domclass.hasClass(target, 'toolTipText')) {
                return;
            } else {
                _removeToolTipText();
            }
        });
    };

    var _addEventToolTipMouseOut = function() {
        var eleBody = document.body;
        var target;
        Eventutil.addHandler(eleBody, 'mouseout', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            clearTimeout(idSetTimeoutOfDelay);

            if (Domclass.hasClass(target, 'toolTipText')) {
                _removeToolTipText();
            }
        });
    };

    var _addEventToolTip = function() {
        _addEventToolTipMouseOver();
        _addEventToolTipMouseOut();
    };

    var init = function(arrEleObj) {
        var i = 0;
        var arrEleObjLength = arrEleObj.length;
        for (; i < arrEleObjLength; i += 1) {
            _makeToolTip(arrEleObj[i]);
        }

        _addEventToolTip();
    };

    var edit = function(selector, objInfo) {
        var arrToolTip = Domutil.querySelectorAll(selector);
        var i = 0;
        var arrToolTipLength = arrToolTip.length;
        for (; i < arrToolTipLength; i += 1) {
            if (objInfo.delay) {
                arrToolTip[i].setAttribute('data-delay', objInfo.delay);
            }

            if (objInfo.contents) {
                arrToolTip[i].setAttribute('data-contents', objInfo.contents);
            }
        }
    };

    var add = function(selector, objInfo) {
        var arrEleObj = [{
            'element': selector
        }];

        if (objInfo.contents) {
            arrEleObj[0].contents = objInfo.contents;
        }

        if (objInfo.delay) {
            arrEleObj[0].delay = objInfo.delay;
        }

        _makeToolTip(arrEleObj[0]);
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
