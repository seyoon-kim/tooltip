var Domutil = (function() {
    // getElementsByClassName*() IE 8 이하 버전 호환
    var _getElementsByClassNamePolyfill = function(rootEle, selector) {
        var allElements;
        var result = [];
        var rClassName;
        var i;
        var allElementsLength;

        if (document.getElementsByClassName) {
            return rootEle.getElementsByClassName(selector);
        }

        allElements = rootEle.getElementsByTagName('*');
        rClassName = new RegExp(selector);

        i = 0;
        allElementsLength = allElements.length;
        for (i; i < allElementsLength; i += 1) {
            if (rClassName.test(allElements[i].className)) {
                result.push(allElements[i]);
            }
        }

        return result;
    };
    /*
     * 1. selector의 앞에 문자열에 따라 id, class, tagName을 구별하여 해당하는 엘리멘트들의 배열을 반환하는 함수
     * 2. rootEle, selector 두 개의 인자를 받는다. rootEle는 이전에 받은 결과값으로서 해당 값으로 다시 다음번째의 selector 값을 이용하여 값을 찾을때 사용한다.
     */
    var _findElementsOfMatchingSelector = function(rootEle, selectors) {
        var result = [];
        var rClassName = /^\./g;
        var rIdName = /^#/g;

        if (rClassName.test(selectors)) {
            selectors = selectors.replace(rClassName, '');
            result = _getElementsByClassNamePolyfill(rootEle, selectors);
            result = Array.prototype.slice.call(result);
        } else if (rIdName.test(selectors)) {
            selectors = selectors.replace(rIdName, '');
            result = document.getElementById(selectors);
            if (result === null) {
                result = [];
            } else {
                result = [result];
            }
        } else {
            result = rootEle.getElementsByTagName(selectors);
            result = Array.prototype.slice.call(result);
        }

        return result;
    };

    // from에 있는 요소 중에 중복되어 있는 요소를 제거한 배열을 반환
    var _removeSameElement = function(from) {
        var temp = [];
        var x;
        var y;
        var count;
        var fromLength;
        var tempLength;

        x = 0;
        fromLength = from.length;
        for (x; x < fromLength; x += 1) {
            if (x === 0) {
                temp.push(from[0]);
            } else {
                count = 0;
                y = 0;
                tempLength = temp.length;
                for (y; y < tempLength; y += 1) {
                    if (temp[y] === from[x]) {
                        count += 1;
                    }
                }
                if (count === 0) {
                    temp.push(from[x]);
                }
            }
        }

        return temp;
    };

    // selector를 만족 시키는 요소들을 담은 배열을 생성하여 반환
    var _makeArrayMatchingToSelctor = function(selectors) {
        var founded; // founded, from 중에서 arrSeletor의 원소에 해당하는 결과를 저장하는 값
        var from; // from, 찾아야 하는 대상이 되는 엘리멘트
        var arrSeletor; // arrSeletor, 무엇을 찾아야 하는지 알려주는 값
        var result = [];
        var i;
        var j;
        var arrSeletorLength;
        var fromLength;

        if (!selectors) {
            return [];
        }

        founded = [];
        from = [document];
        arrSeletor = selectors.split(' ');

        i = 0;
        arrSeletorLength = arrSeletor.length;
        for (i; i < arrSeletorLength; i += 1) {
            j = 0;
            fromLength = from.length;
            for (j; j < fromLength; j += 1) {
                founded = founded.concat(_findElementsOfMatchingSelector(from[j], arrSeletor[i]));
            }

            from = founded;
            founded = [];
        }

        result = _removeSameElement(from);

        return result;
    };

    var querySelector = function(selectors) {
        var from = [];
        var result = [];

        from = _makeArrayMatchingToSelctor(selectors);

        if (from.length < 1) {
            result = [];
        } else {
            result.push(from[0]);
        }

        return result;
    };

    var querySelectorAll = function(selectors) {
        var from = [];
        var result = [];

        from = _makeArrayMatchingToSelctor(selectors);

        if (from.length < 1) {
            result = [];
        } else {
            result = from;
        }

        return result;
    };

    return {
        querySelector: querySelector,
        querySelectorAll: querySelectorAll
    };
})();

var Domclass = (function() {
    var hasClass = function (el, className) {
        var result = el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        if(result){
          return true;
        }else{
          return false;
        }
    };

    var addClass = function (el, className) {
        el.className += " " + className;
    };

    var removeClass = function (el, className) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className=el.className.replace(reg, ' ');
    };

    return {
      hasClass : hasClass,
      addClass : addClass,
      removeClass : removeClass
    };
})();

// JavaScript for Web Developers 참고
var Eventutil = (function() {
    var addHandler = function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    };

    var removeHandler = function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    };

    return {
        addHandler : addHandler,
        removeHandler : removeHandler
    };
})();
