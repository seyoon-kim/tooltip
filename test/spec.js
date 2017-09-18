describe('mytooltip.init', function() {
    beforeEach(function() {
        document.body.innerHTML = '<p>test... <strong id="first">consectetur</strong> blar... blar... blar... <strong class="second">ullamco</strong>blar... <strong class="second">ullamco 0202</strong>';
        mytooltip.init([{
            element: '#first',
            contents: 'Duis aute irure dolor',
            delay: 500
        }, {
            element: '.second',
            contents: 'labore et dolore magna aliqua'
        }]);
    });

    // #first ID를 가진 엘리멘트의 부모 엘리멘트 toolTip에 해당 Class가 제대로 추가 되었는지 확인하기.
    it('should be have .toolTip', function() {
        var eleToolTip = Domutil.querySelectorAll('#first')[0].parentElement;
        expect(Domclass.hasClass(eleToolTip, 'toolTip')).toBe(true);
    });

    // .toolTip class를 가진 엘리멘트의 부모 엘리멘트 toolTip에 해당 Class가 제대로 추가 되었는지 확인하기.
    it('should be have each .toolTip class', function() {
        var eleSecond = Domutil.querySelectorAll('.second');
        expect(Domclass.hasClass(eleSecond[0].parentElement, 'toolTip')).toBe(true);
        expect(Domclass.hasClass(eleSecond[1].parentElement, 'toolTip')).toBe(true);
    });

    // .toolTip 요소안에 .toolTipText 요소가 제대로 생겼는지 확인하기
    it('should be have .toolTipText element', function() {
        var eleToolTipText = Domutil.querySelectorAll('.toolTip .toolTipText');
        var i = 0;
        var eleToolTipTextLength = eleToolTipText.length;
        for (; i < eleToolTipTextLength; i += 1) {
            expect(Domclass.hasClass(eleToolTipText[i], 'toolTipText')).toBe(true);
        }
    });

    // .toolTipText 요소안에 text값을 제대로 가지고 있는지 확인하기.
    it('Each toolTipText should be equal each contents', function() {
        var eleToolTipText = Domutil.querySelectorAll('.toolTip .toolTipText');
        expect(eleToolTipText[0].innerText).toEqual('Duis aute irure dolor');
        expect(eleToolTipText[1].innerText).toEqual('labore et dolore magna aliqua');
        expect(eleToolTipText[2].innerText).toEqual('labore et dolore magna aliqua');
    });

    // .toolTipText 요소가 각각의 delay값을 가지고 있는지 확인
    it('Each toolTipText should be equal each contents', function() {
        var arrToolTip = mytooltip.getArrToolTip();
        expect(arrToolTip[0].delay).toEqual(500);
        expect(arrToolTip[1].delay).toEqual(0);
    });

    // .toolTip 요소 위에 mouseover를 할 경우 안에 있는 toolTipText 요소에 'on' class를 추가하여 해당 요소가 노출되는지 확인
    it("If .toolTip element mouseover, toolTipText should be have 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleSecond = Domutil.querySelectorAll('.second')[0];
        var eleToolTipText;
        arrToolTip[1].mouseoverToolTip(eleSecond);
        eleToolTipText = eleSecond.nextSibling;
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(true);
    });

    // .toolTipText 요소 위에 mouseover를 할 경우 안에 있는 toolTipText 요소에 'on' class를 추가하여 해당 요소가 노출되는지 확인
    it("If .toolTipText element mouseover, toolTipText should be have 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleToolTip = Domutil.querySelectorAll('#first')[0].parentElement;
        var eleToolTipText = eleToolTip.childNodes[1];
        arrToolTip[0].mouseoverToolTip(eleToolTipText);
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(true);
    });

    // .toolTip 요소 위에 mouseout을 할 경우 안에 있는 toolTipText 요소에 'on' class를 제거하여 해당 요소가 보이지 않도록 한다.
    it("If .toolTip element mouseout, toolTipText should be have not 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleSecond = Domutil.querySelectorAll('.second')[0];
        var eleToolTipText;
        arrToolTip[1].mouseoverToolTip(eleSecond);
        eleToolTipText = eleSecond.nextSibling;
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(true);
        arrToolTip[1].mouseoutToolTip(eleSecond);
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(false);
    });

    // .toolTipText 요소 위에 mouseout를 할 경우 안에 있는 toolTipText 요소에 'on' class를 제거하여 해당 요소가 보이지 않도록 한다.
    it("If .toolTipText element mouseover, toolTipText should be have 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleToolTip = Domutil.querySelectorAll('#first')[0].parentElement;
        var eleToolTipText = eleToolTip.childNodes[1];
        arrToolTip[0].mouseoverToolTip(eleToolTipText);
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(true);
        arrToolTip[0].mouseoutToolTip(eleToolTipText);
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(false);
    });

    // .toolTip 요소 위에 mouseover를 할 경우 delay 500 속성값이 있을때 안에 있는 toolTipText 요소에 'on' class가 delay시간이 흐른 뒤 추가하여 해당 요소가 노출되는지 확인
    it("If .toolTip element mouseover with delay 500 property, toolTipText should be have 'on' class", function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleSecond = Domutil.querySelectorAll('#first')[0];
        var eleToolTipText;
        jasmine.clock().install();
        arrToolTip[0].mouseoverToolTip(eleSecond);
        eleToolTipText = eleSecond.nextSibling;
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(false);
        jasmine.clock().tick(500);
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(true);
        jasmine.clock().uninstall();
    });
});

describe('mytooltip.edit', function() {
    beforeEach(function() {
        document.body.innerHTML = '<p>test... <strong id="first">consectetur</strong> blar... blar... blar... <strong class="second">ullamco</strong>blar... <strong class="second">ullamco 0202</strong>';
        mytooltip.init([{
            element: '#first',
            contents: 'Duis aute irure dolor',
            delay: 500
        }, {
            element: '.second',
            contents: 'labore et dolore magna aliqua'
        }]);

        mytooltip.edit('#first', {
            contents: 'Lorem ipsum',
            delay: 1000
        });
    });

    // #first ID를 가진 요소의 다음 엘리멘트 toolTipText의 innterText가 변경되었는지 확인
    it('should be change text of toolTipText', function() {
        var eleToolTip = Domutil.querySelectorAll('#first')[0].parentElement;
        var eleToolTipText = eleToolTip.childNodes[1];
        expect(eleToolTipText.innerText).toEqual('Lorem ipsum');
    });

    // #first ID를 가진 요소의 다음 엘리멘트 toolTipText의 delay값이 1000으로 변경되었는지 확인
    it('should be change delay property of toolTipText', function() {
        var arrToolTip = mytooltip.getArrToolTip();
        var eleFirst = Domutil.querySelectorAll('#first')[0];
        var eleToolTipText;
        jasmine.clock().install();
        arrToolTip[0].mouseoverToolTip(eleFirst);
        eleToolTipText = eleFirst.nextSibling;
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(false);
        jasmine.clock().tick(1000);
        expect(Domclass.hasClass(eleToolTipText, 'on')).toBe(true);
        jasmine.clock().uninstall();
    });
});

describe('mytooltip.add', function() {
    beforeEach(function() {
        document.body.innerHTML = '<p>test... <strong id="first">consectetur</strong> blar... blar... blar... <strong class="second">ullamco</strong>blar... <strong class="second">ullamco 0202</strong><p><img src="#" class="my-img" /></p>';
        mytooltip.init([{
            element: '#first',
            contents: 'Duis aute irure dolor',
            delay: 500
        }, {
            element: '.second',
            contents: 'labore et dolore magna aliqua'
        }]);

        mytooltip.add('.my-img', {
            contents: 'test image',
            delay: 300
        });
    });

    // my-img class를 가진 툴팁 객체를 추가할수 있는지 확인
    it('should be have my-img class', function() {
        var eleToolTip = Domutil.querySelectorAll('.my-img')[0].parentElement;
        var eleToolTipText = eleToolTip.childNodes[1];
        expect(Domclass.hasClass(eleToolTipText, 'toolTipText')).toBe(true);
    });

    // 기존의 #first tooltip이 있는 경우 다시 동일한 #first로 추가를 시도하면 추가되지 않도록 한다.
    it('should be add not #first tooltip', function() {
        var eleToolTip = Domutil.querySelectorAll('#first')[0].parentElement;
        var eleToolTipParent = eleToolTip.parentElement;
        expect(Domclass.hasClass(eleToolTipParent, 'toolTipText')).toBe(false);
    });
});

describe('mytooltip.remove', function() {
    beforeEach(function() {
        document.body.innerHTML = '<p>test... <strong id="first">consectetur</strong> blar... blar... blar... <strong class="second">ullamco</strong>blar... <strong class="second">ullamco 0202</strong><p><img src="#" class="my-img" /></p>';
        mytooltip.init([{
            element: '#first',
            contents: 'Duis aute irure dolor',
            delay: 500
        }, {
            element: '.second',
            contents: 'labore et dolore magna aliqua'
        }]);

        mytooltip.remove('.second');
    });

    // .second를 가진 요소들의 tooltip 해제
    it('parent of .second element should be have not tooltip element ', function() {
        var eleToolTip = Domutil.querySelectorAll('.second')[0].parentElement;
        var eleToolTipText = Domutil.querySelectorAll('.second')[0].nextSibling;
        expect(Domclass.hasClass(eleToolTip, 'toolTip')).toBe(false);
        expect(eleToolTipText === '<div class="toolTipText">labore et dolore magna aliqua</div>').toBe(false);
    });
});
