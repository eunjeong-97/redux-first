# React JS

## defaultProps

- prop 인수의 기본값을 설정할 수 있는 React 구성 요소 속성이다.
- prop 속성이 전달되면 변경된다.
- 구성 요소 클래스 자체의 속성으로 정의해서 클래스의 기본 prop을 설정할 수 있다.

```js
Counter.defaultProps = {
  number: 0,
  color: "black",
  onIncrement: () => console.warn("onIncrement not defined"),
  onDecrement: () => console.warn("onDecrement not defined"),
  onSetColor: () => console.warn("onSetColor not defined"),
};
```

## PropTypes

- [참고자료](https://ko.reactjs.org/docs/typechecking-with-proptypes.html)

- React.PropTypes는 기본적으로 제공되다가 v15.5부터 라이브러리를 받아서 사용해야 한다.
- 타입 검사를 활용해서 많은 버그를 잡을 수 있다.
- 컴포넌트의 props에 타입 검사를 하면 특별한 프로퍼티인 propTypes를 선언할 수 있다.

```js
import PropTypes from "prop-types";

Counter.propTypes = {
  number: PropTypes.number,
  color: PropTypes.string,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func,
};
```

또한 `PropTypes.element`를 이용하여 컴포넌트의 자식들에 단 하나의 자식만 전달되도록 명시할 수도 있다.

```js
import PropTypes from "prop-types";

const MyComponent = ({ children }) => {
  return <div>{children}</div>;
};

MyComponent.propTypes = {
  children: PropTypes.element.isRquired,
};

export default MyComponent;
```

## `react-addons-update` 라이브러리

- [공식문서](https://ko.reactjs.org/docs/update.html)
- `$` 명령어 사용

```js
import update from "react-addons-update";

// 활용예시
const newData = update(myData, {
  x: { y: { z: { $set: 7 } } },
  a: { b: { $push: [9] } },
});

export default function authentication(state, action) {
  // state이 undefined라면, state는 초기값
  if (typeof state === "undefined") state = initialState;
  switch (action.type) {
    // action.type이 types.AUTH_LOGIN라면 매개변수 state의 login의 status값을 WAITING으로 교체한다.
    case types.AUTH_LOGIN:
      return update(state, {
        login: {
          status: { $set: "WAITING" },
        },
      });
  }
}
```
