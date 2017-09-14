Tooltip 구현하기
===============

# 소개

- 특정 엘리먼트에 마우스를 올린 후 일정 시간이 지나면 토글되는 툴팁을 개발한다.
- 요구사항의 전체의 TC를 미리 만드는것이 아닌 작은 단위부터 TC를 만들고 구현하는 방법으로 진행한다.

## 요구사항
- html페이지 내에서 스크립트로 지정한 엘리먼트에 마우스오버 시 말풍선 툴팁이 노출된다
- 툴팁이 노출된 상태에서 지정한 엘리먼트 또는 툴팁에서 마우스가 벗어났을 때 툴팁이 사라진다.
- 툴팁의 내용을 선택하여 복사할수 있어야 한다.(컨텍스트 메뉴를 사용한 복사는 고려하지 않는다)
- 툴팁이 노출되기까지의 delay를 설정할 수 있다. (delay 의 기본값은 0)
- 페이지 내 여러 엘리먼트에 툴팁을 적용할 수 있다.
- CSS 셀렉터를 고유한 키로 사용해서 툴팁을 추가, 수정, 제거할 수 있다.

## 예제 API 인터페이스

~~~

<p>The standard Lorem Ipsum passage, used since the 1500s</p>

<p>
"Lorem ipsum dolor sit amet, <strong id="first">consectetur</strong> adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
<strong class="second">nulla pariatur</strong>. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum."
</p>

<p><img src="#" class="my-img" /></p>

<script>
  (function() {
    // 툴팁 초기화
    mytooltip.init([
        {
          element: '#first',
          contents: 'Duis aute irure dolor',
          delay: 500
        },
        {
          element: '.second',
          contents: 'labore et dolore magna aliqua'
        }
    ]);

    // 툴팁 수정
    mytooltip.edit('#first', {
      contents: 'Lorem ipsum',
      delay: 0
    });

    // 툴팁 추가
    mytooltip.add('.my-img', {
      contents: 'test image',
      delay: 300
    });

    // 툴팁 제거
    mytooltip.remove('.second');
  })();
</script>

~~~
