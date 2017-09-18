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

    // init함수 실행시 해당 요소에 toolTip class가 추가 되었는지 확인.
    it('should be have .toolTip', function() {
        var eleFirst = Domutil.querySelectorAll('#first')[0];
        var eleSecond = Domutil.querySelectorAll('.second')[0];
        expect(Domclass.hasClass(eleFirst, 'toolTip')).toBe(true);
        expect(Domclass.hasClass(eleSecond, 'toolTip')).toBe(true);
    });

    // toolTip class를 가지고 있는 요소에 mouseover 할 경우 body태그에 toolTipText를 만들어 추가 하였는지 확인
    it('If mouseover, body append toolTipText element', function() {
        var eleSecond = Domutil.querySelectorAll('.second')[0];
        mytooltip._addToolTipText(eleSecond);
        expect(Domutil.querySelector('.toolTipText').length).toBe(1);
    });

    // toolTip class를 가지고 있는 요소에 mouseout 할 경우 body태그의 toolTipText 를 제거하였는지 확인
    it('If mouseout, body remove toolTipText element', function() {
        var eleSecond = Domutil.querySelectorAll('.second')[0];
        mytooltip._addToolTipText(eleSecond);
        expect(Domutil.querySelector('.toolTipText').length).toBe(1);
        mytooltip._removeToolTipText(eleSecond);
        expect(Domutil.querySelector('.toolTipText').length).toBe(0);
    });

    // toolTip class를 가지고 있는 요소의 data-contents값과 mouseover 할 경우 body 태그의 toolTiptex의 innerText 값이 같은지 확인
    it('If mouseover, data-contents of toolTip ele be equal InnerText of toolTipText element', function() {
        var eleSecond = Domutil.querySelectorAll('.second')[0];
        mytooltip._addToolTipText(eleSecond);
        var eleToolTipText = Domutil.querySelector('.toolTipText')[0];
        expect(eleToolTipText.innerText).toEqual(eleSecond.getAttribute('data-contents'));
    });

    // toolTip class를 가지고 있는 요소 mouseover 할 경우 body 태그의 toolTiptex가 delay만큼 이후에 나타나는가 확인
    it('If mouseover, toolTip ele append toolTipText element after delay', function() {
        jasmine.clock().install();
        var eleFirst = Domutil.querySelectorAll('#first')[0];
        mytooltip._addToolTipText(eleFirst);
        expect(Domutil.querySelector('.toolTipText').length).toBe(0);
        jasmine.clock().tick(500);
        expect(Domutil.querySelector('.toolTipText').length).toBe(1);
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

    // edit함수를 이용해 해당 내용을 변경 후, toolTip class를 가지고 있는 요소 mouseover 할 경우 body 태그의 toolTiptex가 변경 delay만큼 이후에 나타나는가 확인
    it('If mouseover, toolTip ele append toolTipText element after changed delay', function() {
        jasmine.clock().install();
        var eleFirst = Domutil.querySelectorAll('#first')[0];
        mytooltip._addToolTipText(eleFirst);
        expect(Domutil.querySelector('.toolTipText').length).toBe(0);
        jasmine.clock().tick(1000);
        expect(Domutil.querySelector('.toolTipText').length).toBe(1);
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
            delay: 1000
        });
    });

    // add함수를 이용해 해당하는 엘리멘트 요소를 toolTip으로 추가한다.
    it('If mouseover, toolTip ele append toolTipText element after changed delay', function() {
        var eleMyImg = Domutil.querySelectorAll('.my-img')[0];
        expect(Domclass.hasClass(eleMyImg, 'toolTip')).toBe(true);
    });
});
