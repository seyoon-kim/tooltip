var mytooltip = (function() {
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
                _addToolTipText();
            }
        });
    }

    var _addToolTipText = function() {
        var eleBody = document.body;
        var eleToolTipText = document.createElement("DIV");
        Domclass.addClass(eleToolTipText, "toolTipText");
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

        for (var numArrEleObj = 0; numArrEleObj < arrEleObj.length; numArrEleObj += 1) {
            var eleName = arrEleObj[numArrEleObj].element;
            var arrFounded = Domutil.querySelectorAll(eleName);
            var arrFoundedLength = arrFounded.length;

            for (var numArrFounded = 0; numArrFounded < arrFoundedLength; numArrFounded += 1) {
                 Domclass.addClass(arrFounded[numArrFounded], "toolTip");
            }
        }

        _addEventToolTip();
    };


    return {
        init: init,

        _addToolTipText: _addToolTipText,
        _removeToolTipText: _removeToolTipText
    };
})();
