var mytooltip = (function() {
    var arrToolTip = [];

    var init;
    var edit;
    var add;
    var remove;
    var getArrToolTip;

    var ToolTip = function(selector) {
        this.delay = selector.delay || 0; // delay 값이 없다면 0으로 초기화
        this.selectorName = selector.element;
        this.contents = selector.contents;
        this.eleSelectors = Domutil.querySelectorAll(this.selectorName);
        this.arrToolTips = [];
        this.idSetTimeoutOfDelay = 0;

        this.initToolTip();
    };

    ToolTip.prototype.initToolTip = function() {
        var eleClone;
        var eleToolTip;
        var i = 0;
        var eleSelectorsLength = this.eleSelectors.length;

        for (; i < eleSelectorsLength; i += 1) {
            // 새로운 ToolTip 생성 한후 기존의 요소 안에 삽입
            eleClone = this.eleSelectors[i].cloneNode(true);
            eleToolTip = this.makeEleToolTip(eleClone);
            this.makeEleToolTipText(eleToolTip);
            this.eleSelectors[i].parentNode.replaceChild(eleToolTip, this.eleSelectors[i]);
            this.arrToolTips.push(eleToolTip);
            this.addEventMouse(eleToolTip);
        }
    };

    ToolTip.prototype.makeEleToolTip = function(eleClone) {
        var eleToolTip = document.createElement('DIV');

        Domclass.addClass(eleToolTip, 'toolTip');
        eleToolTip.appendChild(eleClone);

        return eleToolTip;
    };

    ToolTip.prototype.makeEleToolTipText = function(eleToolTip) {
        var eleToolTipText = document.createElement('DIV');

        Domclass.addClass(eleToolTipText, 'toolTipText');
        eleToolTipText.innerHTML = this.contents;
        eleToolTip.appendChild(eleToolTipText);
    };

    ToolTip.prototype.addEventMouse = function(eleToolTip) {
        this.addHandlerMouseoverToolTip(eleToolTip);
        this.addHandlerMouseoutToolTip(eleToolTip);
    };

    ToolTip.prototype.addHandlerMouseoverToolTip = function(ele) {
        var self = this;
        var target;

        Eventutil.addHandler(ele, 'mouseover', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            self.mouseoverToolTip(target);
        });
    };

    ToolTip.prototype.mouseoverToolTip = function(target) {
        var eleToolTipText;

        if (Domclass.hasClass(target, 'toolTipText')) {
            Domclass.addClass(target, 'on');
        } else {
            eleToolTipText = target.nextSibling;

            if (this.delay === 0) {
                Domclass.addClass(eleToolTipText, 'on');
            } else {
                this.idSetTimeoutOfDelay = setTimeout(function() {
                    Domclass.addClass(eleToolTipText, 'on');
                }, this.delay);
            }
        }
    };

    ToolTip.prototype.addHandlerMouseoutToolTip = function(ele) {
        var self = this;
        var target;

        Eventutil.addHandler(ele, 'mouseout', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            clearTimeout(self.idSetTimeoutOfDelay);
            self.mouseoutToolTip(target);
        });
    };

    ToolTip.prototype.mouseoutToolTip = function(target) {
        var eleToolTipText;

        if (Domclass.hasClass(target, 'toolTipText')) {
            Domclass.removeClass(target, 'on');
        } else {
            eleToolTipText = target.nextSibling;

            Domclass.removeClass(eleToolTipText, 'on');
        }
    };

    ToolTip.prototype.editInfo = function(objInfo) {
        var i;
        var arrToolTipsLength;
        this.contents = objInfo.contents;
        this.delay = objInfo.delay;

        i = 0;
        arrToolTipsLength = this.arrToolTips.length;
        for (; i < arrToolTipsLength; i += 1) {
            this.arrToolTips[i].childNodes[1].innerText = this.contents;
        }
    };

    ToolTip.prototype.removeToolTip = function() {
        var i = 0;
        var arrToolTipsLength = this.arrToolTips.length;
        for (; i < arrToolTipsLength; i += 1) {
            this.arrToolTips[i].parentNode.replaceChild(this.eleSelectors[i], this.arrToolTips[i]);
        }
    };

    init = function(arrEle) {
        var i = 0;
        var arrEleLength = arrEle.length;

        for (; i < arrEleLength; i += 1) {
            arrToolTip.push(new ToolTip(arrEle[i]));
        }
    };

    edit = function(selector, objInfo) {
        var i = 0;
        var arrToolTipLength = arrToolTip.length;

        for (; i < arrToolTipLength; i += 1) {
            if (arrToolTip[i].selectorName === selector) {
                arrToolTip[i].editInfo(objInfo);
            }
        }
    };

    add = function(selector, objInfo) {
        // 기존의 ToolTip과 같은 selector값을 가진 것이 있는지 중복 확인
        var i = 0;
        var arrToolTipLength = arrToolTip.length;

        for (; i < arrToolTipLength; i += 1) {
            if (arrToolTip[i].selectorName === selector) {
                return;
            }
        }

        objInfo.element = selector;
        arrToolTip.push(new ToolTip(objInfo));
    };

    remove = function(selector) {
        var i = 0;
        var arrToolTipLength = arrToolTip.length;

        for (; i < arrToolTipLength; i += 1) {
            if (arrToolTip[i].selectorName === selector) {
                arrToolTip[i].removeToolTip();
                arrToolTip.splice(i, 1);
            }
            arrToolTipLength = arrToolTip.length;
        }
    };

    getArrToolTip = function() {
        return arrToolTip;
    };

    return {
        init: init,
        edit: edit,
        add: add,
        remove: remove,
        getArrToolTip: getArrToolTip
    };
})();
