var mytooltip = (function() {
    var init;


    init = function(arrEleObj) {

        for (var numArrEleObj = 0; numArrEleObj < arrEleObj.length; numArrEleObj += 1) {
            var eleName = arrEleObj[numArrEleObj].element;
            var arrFounded = Domutil.querySelectorAll(eleName);
            var arrFoundedLength = arrFounded.length;

            for (var numArrFounded = 0; numArrFounded < arrFoundedLength; numArrFounded += 1) {
                 Domclass.addClass(arrFounded[numArrFounded], "toolTip");
            }
        }

    };


    return {
        init: init,
    };
})();
