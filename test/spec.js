


var mytooltip = (function() {
    var arrToolTip = [];

    var ToolTip = function(eleToolTip) {
        this.delay = eleToolTip.delay || 0; // delay 값이 없다면 0으로 초기화
        this.selectorName = eleToolTip.element;
        this.contents = eleToolTip.contents;

        this.eleSelectors = Domutil.querySelectorAll(this.selectorName);
        var eleToolTipText = null;

        for (var i = 0; i < this.eleSelectors.length; i += 1) {
            Domclass.addClass(this.eleSelectors[i], "toolTip");
            eleToolTipText = document.createElement("DIV");
            Domclass.addClass(eleToolTipText, "toolTipText");
            eleToolTipText.innerHTML = this.contents;
            this.eleSelectors[i].appendChild(eleToolTipText);

            this.addHandlerMouseoverToolTip(this.eleSelectors[i]);
            this.addHandlerMouseoutToolTip(this.eleSelectors[i]);
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

        // delay가 존재하는 경우 해당 시간이 흐른뒤 클래스 추가
        if (this.delay === 0){
            Domclass.addClass(eleToolTipText, "on");
        }else{
            setTimeout(function(){
                Domclass.addClass(eleToolTipText, "on");
            }, this.delay);
        }
    }

    ToolTip.prototype.addHandlerMouseoutToolTip = function(ele) {
        var that = this;
        Eventutil.addHandler(ele, "mouseout", function(e) {
            var target = e.target;
            that.mouseoutToolTip(target);
        });
    }

    ToolTip.prototype.mouseoutToolTip = function(target){
        var eleToolTipText;
        if (Domclass.hasClass(target, "toolTipText")) {
            Domclass.removeClass(target, "on");
            return;
        }
        eleToolTipText = target.querySelector(".toolTipText");
        Domclass.removeClass(eleToolTipText, "on");
    }

    ToolTip.prototype.editInfo = function(objInfo) {
        this.contents = objInfo.contents;
        this.delay = objInfo.delay;
        for(var i = 0; i < this.eleSelectors.length; i += 1) {
            this.eleSelectors[i].childNodes[1].innerText = this.contents;
        }
    }

    var init = function (arrEle){
        for (var i = 0; i < arrEle.length; i += 1) {
            arrToolTip.push(new ToolTip(arrEle[i]));
        }
    }

    var edit = function(selector, objInfo) {
        for(var i = 0; i < arrToolTip.length; i += 1) {
            if (arrToolTip[i].selectorName === selector) {
                arrToolTip[i].editInfo(objInfo);
            }
        }
    }

    var getArrToolTip = function() {
        return arrToolTip;
    }

    return {
        init : init,
        edit : edit,
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
        var eleSecond = Domutil.querySelectorAll(".second")[0];
        var eleToolTipText;
        arrToolTip[1].mouseoverToolTip(eleSecond);
        eleToolTipText = Domutil.querySelector(".second .toolTipText")[0];
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

    // .toolTip 요소 위에 mouseout을 할 경우 안에 있는 toolTipText 요소에 'on' class를 제거하여 해당 요소가 보이지 않도록 한다.
    it("If .toolTip element mouseout, toolTipText should be have not 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleFirst = Domutil.querySelectorAll("#first")[0];
        var eleToolTipText;
        arrToolTip[0].mouseoutToolTip(eleFirst);
        eleToolTipText = Domutil.querySelector("#first .toolTipText")[0];
        expect(Domclass.hasClass(eleToolTipText, "on")).toBe(false);
    });

    // .toolTipText 요소 위에 mouseout를 할 경우 안에 있는 toolTipText 요소에 'on' class를 제거하여 해당 요소가 보이지 않도록 한다.
    it("If .toolTipText element mouseover, toolTipText should be have 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleToolTipText = Domutil.querySelector("#first .toolTipText")[0];
        arrToolTip[0].mouseoutToolTip(eleToolTipText);
        eleToolTipText = Domutil.querySelector("#first .toolTipText")[0];
        expect(Domclass.hasClass(eleToolTipText, "on")).toBe(false);
    });

    // .toolTip 요소 위에 mouseover를 할 경우 delay 500 속성값이 있을때 안에 있는 toolTipText 요소에 'on' class가 delay시간이 흐른 뒤 추가하여 해당 요소가 노출되는지 확인
    it("If .toolTip element mouseover with delay 500 property, toolTipText should be have 'on' class", function() {
        jasmine.clock().install();
        var arrToolTip = mytooltip.getArrToolTip();
        var eleFirst = Domutil.querySelectorAll("#first")[0];
        var eleToolTipText;
        arrToolTip[0].mouseoverToolTip(eleFirst);
        eleToolTipText = Domutil.querySelector("#first .toolTipText")[0];
        setTimeout(function() {
            expect(Domclass.hasClass(eleToolTipText, "on")).toBe(true);
        }, 500);
        jasmine.clock().uninstall();
    });
});

describe("mytooltip.edit", function() {
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

        mytooltip.edit('#first', {
            contents: 'Lorem ipsum',
            delay: 0
        });
    });

    // #first ID를 가진 요소의 toolTipText가 변경되었는지 확인
    fit("should be change toolTipText", function() {
        var eleToolTipText = Domutil.querySelector("#first .toolTipText")[0];
        expect(eleToolTipText.innerText).toEqual('Lorem ipsum');
    });
});
