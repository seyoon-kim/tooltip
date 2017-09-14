var ToolTip = function(eleToolTip) {
    var selectorName = eleToolTip.element
    var eleSelectors = Domutil.querySelectorAll(selectorName);

    for (var i = 0; i < eleSelectors.length; i += 1) {
        Domclass.addClass(eleSelectors[i], "toolTip");
    }

}

var mytooltip = {
    init : function (arrEle){
        for (var i = 0; i < arrEle.length; i += 1) {
            new ToolTip(arrEle[i]);
        }
    }
}

describe("mytooltip.init", function() {
    beforeEach(function() {
        document.body.innerHTML = '<p>test... <strong id="first">consectetur</strong> blar... blar... blar... <strong class="second">ullamco</strong>blar... <strong class="second">ullamco 0202</strong>';
        mytooltip.init([{
            element: "#first"
        }, {
            element: ".second"
        }]);
    });

    // #first ID를 가진 엘리멘트에 toolTip Class가 제대로 추가 되었는지 확인하기.
    it("should be have .toolTip", function() {
        var eleFirst = Domutil.querySelectorAll("#first")[0];
        expect(Domclass.hasClass(eleFirst, "toolTip")).toBe(true);
    });

    // .toolTip class를 가진 엘리멘트들이 각각 toolTip Class가 제대로 추가 되었는지 확인하기.
    fit("should be have each .toolTip class", function() {
        var eleSecond = Domutil.querySelectorAll(".second");
        expect(Domclass.hasClass(eleSecond[0], "toolTip")).toBe(true);
        expect(Domclass.hasClass(eleSecond[1], "toolTip")).toBe(true);
    });
});
