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
        mytooltip._showToolTipText();
        expect(Domutil.querySelector('.toolTipText').length).toBe(1);
    });
});
