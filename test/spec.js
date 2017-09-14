var ToolTip = function(eleToolTip) {
    this.delay = eleToolTip.delay || 0; // delay 값이 없다면 0으로 초기화

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

        this.addHandlerMouseoverToolTip(eleSelectors[i]);
    }

}

ToolTip.prototype.addHandlerMouseoverToolTip = function(ele) {
    var that = this;
    Eventutil.addHandler(ele, "mouseover", function(e) {
        var target = e.target;
        that.mouseoverToolTip(target);
    });
}

ToolTip.prototype.mouseoverToolTip = function(target){
    var eleToolTipText;
    if (Domclass.hasClass(target, "toolTipText")) {
        Domclass.addClass(target, "on");
        return;
    }
    eleToolTipText = target.querySelector(".toolTipText");
    Domclass.addClass(eleToolTipText, "on");
}

var mytooltip = (function() {
    var arrToolTip = [];

    var init = function (arrEle){
        for (var i = 0; i < arrEle.length; i += 1) {
            arrToolTip.push(new ToolTip(arrEle[i]));
        }
    }

    var getArrToolTip = function() {
        return arrToolTip;
    }

    return {
        init : init,
        getArrToolTip : getArrToolTip
    }

})();

describe("mytooltip.init", function() {
    beforeEach(function() {
        document.body.innerHTML = '<p>test... <strong id="first">consectetur</strong> blar... blar... blar... <strong class="second">ullamco</strong>blar... <strong class="second">ullamco 0202</strong>';
        mytooltip.init([{
            element: "#first",
            contents: 'Duis aute irure dolor',
            delay: 500
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

    // .toolTipText 요소가 각각의 delay값을 가지고 있는지 확인
    it("Each toolTipText should be equal each contents", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        expect(arrToolTip[0].delay).toEqual(500);
        expect(arrToolTip[1].delay).toEqual(0);
    });

    // .toolTip 요소 위에 mouseover를 할 경우 안에 있는 toolTipText 요소에 'on' class를 추가하여 해당 요소가 노출되는지 확인
    it("If .toolTip element mouseover, toolTipText should be have 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleFirst = Domutil.querySelectorAll("#first")[0];
        var eleToolTipText;
        arrToolTip[0].mouseoverToolTip(eleFirst);
        eleToolTipText = Domutil.querySelector("#first .toolTipText")[0];
        expect(Domclass.hasClass(eleToolTipText, "on")).toBe(true);
    });

    // .toolTipText 요소 위에 mouseover를 할 경우 안에 있는 toolTipText 요소에 'on' class를 추가하여 해당 요소가 노출되는지 확인
    it("If .toolTipText element mouseover, toolTipText should be have 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleToolTipText = Domutil.querySelector("#first .toolTipText")[0];
        arrToolTip[0].mouseoverToolTip(eleToolTipText);
        eleToolTipText = Domutil.querySelector("#first .toolTipText")[0];
        expect(Domclass.hasClass(eleToolTipText, "on")).toBe(true);
    });
});
