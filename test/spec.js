var mytooltip = {
    init : function (arrEle){
        var eleFirst = Domutil.querySelectorAll(arrEle[0].element)[0];
        Domclass.addClass(eleFirst, "toolTip");
    }
}

describe("mytooltip.init", function() {
  beforeEach(function() {
    document.body.innerHTML = '<p>test... <strong id="first">consectetur</strong>';
  });

  it("should be have .toolTip", function() {
    mytooltip.init([{
      element: "#first"
    }]);

    var eleFirst = Domutil.querySelectorAll("#first")[0];
    expect(Domclass.hasClass(eleFirst, "toolTip")).toBe(true);
  });
});
