var ToolTip = function(eleToolTip) {
    var selectorName = eleToolTip.element;
    var contents = eleToolTip.contents;
    var eleSelectors = Domutil.querySelectorAll(selectorName);
    var eleToolTipText = null;

    for (var i = 0; i < eleSelectors.length; i += 1) {
        Domclass.addClass(eleSelectors[i], "toolTip");
        eleToolTipText = document.createElement("DIV");
        Domclass.addClass(eleToolTipText, "toolTipText");
        eleToolTipText.innerHTML = contents;
        eleSelectors[i].appendChild(eleToolTipText);
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
            element: "#first",
            contents: 'Duis aute irure dolor'
        }, {
            element: ".second",
            contents: 'labore et dolore magna aliqua'
        }]);
    });

    // #first ID를 가진 엘리멘트에 toolTip Class가 제대로 추가 되었는지 확인하기.
    it("should be have .toolTip", function() {
        var eleFirst = Domutil.querySelectorAll("#first")[0];
        expect(Domclass.hasClass(eleFirst, "toolTip")).toBe(true);
    });

    // .toolTip class를 가진 엘리멘트들이 각각 toolTip Class가 제대로 추가 되었는지 확인하기.
    it("should be have each .toolTip class", function() {
        var eleSecond = Domutil.querySelectorAll(".second");
        expect(Domclass.hasClass(eleSecond[0], "toolTip")).toBe(true);
        expect(Domclass.hasClass(eleSecond[1], "toolTip")).toBe(true);
    });

    // .toolTip 요소안에 .toolTipText 요소가 제대로 생겼는지 확인하기
    it("should be have .toolTipText element", function() {
        var eleToolTipText = Domutil.querySelectorAll(".toolTip .toolTipText");
        var i = 0;
        var eleToolTipTextLength = eleToolTipText.length;
        for (; i < eleToolTipTextLength; i += 1) {
            expect(Domclass.hasClass(eleToolTipText[i], "toolTipText")).toBe(true);
        }
    });

    // .toolTipText 요소안에 text값을 제대로 가지고 있는지 확인하기.
    it("Each toolTipText should be equal each contents", function() {
        var eleToolTipText = Domutil.querySelectorAll(".toolTip .toolTipText");
        expect(eleToolTipText[0].innerText).toEqual('Duis aute irure dolor');
        expect(eleToolTipText[1].innerText).toEqual('labore et dolore magna aliqua');
        expect(eleToolTipText[2].innerText).toEqual('labore et dolore magna aliqua');
    });
});
