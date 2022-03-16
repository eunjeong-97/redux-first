> 목차

- [Redux Module](#redux-module)
- [useSelector 최적화](#useselector-최적화)
- [redux-thunk](#redux-thunk)
  - [Redux Middleware](#redux-middleware)

## Redux Module

리액트 프로젝트에서 리덕스를 적용하기 위해 리덕스 모듈을 만들면 좋다.
리덕스 모듈이란 `Action Type`, `Action Creator (function Type)`, `Reducer (function Type)`이 모두 포함되는 자바스크립트 파일을 말한다.
리덕스를 사용하기 위해 위 3가지 항목들은 각각의 파일에 저장해도 된다.

```bash
├──src
|  ├──actions
|  |  ├──ActionTypes.js : string타입의 action type값을 상수로 저장함
|  |  ├──authentication.js 등등의 action creator js파일
|  |
|  ├──container (선택사항)
|  |  ├──App.js
|  |  ├──CounterContainer.js 등등
|  |
|  ├──reducers
|     ├──index.js : 여러 reducer 파일들을 import해서 combineReducer()메서드로 내보냄
|     ├──다른 reducer.js 등등
|
```

> Ducks 패턴
> action과 reducer를 위와 같이 나누는 것이 아니라 하나의 파일로 모아 만드는 것을 Ducks 패턴이라고 한다.

## useSelector 최적화

[react-redux hooks](https://react-redux.js.org/api/hooks)에 따르면, `useSelector()`는 redux store의 상태를 조회하는 Hook이다.
**Presentational Components**에서는 `React.memo()`를 통해 변경된 state에 대해서만 rerendering 최적화를 하는 반면, **Container Components**에서는 기본적으로 `useSelector()` 메서드를 사용하여 redux store의 상태를 조회했을 대 바뀌지 않았다면 rerendering하지 않도록 한다. ~~[redux store 공식문서](https://redux.js.org/api/store)을 참고해보면, store는 state 트리를 보유하는 것이기 때문에 store의 상태가 곧 state를 말하는 것 같다.~~

## redux-thunk

> 참고자료
>
> - [velopert 참고자료01](https://react.vlpt.us/redux-middleware/04-redux-thunk.html)
> - [velopert 참고자료02](https://redux-advanced.vlpt.us/2/01.html)

`thunk`란, 특정 작업을 나중에 하도록 미루기 위해 함수 형태로 감싼 것이다. `thunk라는 middleware` 는 ~~action 객체 대신~~ 함수를 생성하는 `action creator함수`를 작성할 수 있게 해준다.

```js
// 일반적인 연산코드: 즉각적으로 연산작업이 실행된다.
const x = 1 + 2;

// foo()가 호출되어야 연산작업이 실행된다.
const foo() => 1 + 2;

// function 키워드 사용
function foo() {
    return 1 + 2;
}
```

보통 리덕스에서는 `dispatch(actionObject)`를 하고, 일반적인 Action Creator를 ~~저장하려는 state를~~ parameter를 가지고 action객체를 생성하는 작업만 한다.

```js
const actionCreator = (payload) => ({ action: "ACTION", payload });
```

> #### 화살표함수

[mdn errow function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions)을 보면, 화살표 함수의 유일한 문장이 `return문`일 때, `return`과 `중괄호 {}`을 생략할 수 있다. 따라서`const actionCreator = () => ({})` 화살표함수는 object타입의 return값을 가진다.

```js
cost actionCreator = payload => {
    return {action: 'ACTION', payload}
}
```

[Moderan JavaScript Arrow Function](https://poiemaweb.com/es6-arrow-function)에서 아래와 같은 화살표 함수 문법을 보니 더 이해가 잘 되었다.
화살표함수에서 매개변수를 지정할 때, 매개변수가 없다면 빈 소괄호로 표현하고, 매개변수가 한 개인 경우 소괄호를 생략할 수 있다. 하지만 매개변수가 2개 이상인 경우 소괄호를 생략할 수 없다.
또한 함수 몸체를 지정할 때, return문 한 줄만 있다면 return키워드와 중괄호를 생략할 수 있다. 다만 객체를 반환하는 경우 중괄호를 생략하는 대신, 소괄호를 사용한다.

```js
// 매개변수 지정 방법
    () => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.

// 함수 몸체 지정 방법
x => { return x * x }  // single line block
x => x * x             // 함수 몸체가 한줄의 구문이라면 중괄호를 생략할 수 있으며 암묵적으로 return된다. 위 표현과 동일하다.

() => { return { a: 1 }; }
() => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.

() => {           // multi line block.
  const x = 10;
  return x * x;
};
```

> #### 다시 thunk로 돌아와서...

만약 특정한 action이 몇초뒤에 실행하거나, 현재 상태에 따라 아예 액션을 못하게 막는 동작은 일반적인 actionCreator으로는 할 수 없다.
이러한 기능을 수행하기 위해 `redux-thunk`을 사용한다.
또한 redux-thunk middleware에서 전달받은 action이 함수형태일 때, 그 함수에 `dispatch()`와 `getState()`를 넣어서 실행하기 때문에 내부 함수에서 `dispatch()`와 `getState()`을 사용할 수 있는 것이다.

1. redux-thunk 사용예시 1: `delay`

```js
// actionType 상수로 지정
const INCREMENT_COUNTER = "INCREMENT_COUNTER";

// actionCreator
function increment() {
  return {
    type: INCREMENT_COUNTER,
  };
}

// redux-thunk
function incrementAsync() {
  return (dispatch) => {
    // dispatch 를 파라미터로 가지는 함수를 리턴한다, 파라미터가 1개라 소괄호 생략함
    setTimeout(() => {
      dispatch(increment()); // 1초뒤 dispatch한다
    }, 1000);
  };
}
```

이렇게 선언된 ~~비동기처리가 가능한~~ dispath함수를 아래와 같이 호출하면, type이 INCREMENT_COUNTER인 action이 1초뒤에 dispatch된다.

```js
// dispatch 비동기처리
store.dispatch(incrementAsync());
```

2. redux-thunk 사용예시 2: `조건에 따라` action을 dispatch()하거나 무시하도록

- 이번 경우처럼 리턴되는 함수에서 `dispatch, action`을 파라미터로 받게 되면 store의 상태(=state)에도 접근이 가능하다.
- 따라서 현재 store의 상태(=state)의 값에 따라 action이 dispatch될지 무시될지 결정된다.

```js
// actionType 상수로 지정
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

// actionCreator
function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
    return (dispatch, action) {
        const { counter } = getState();

        if (counter % 2 === 0) {
            return;
        }
        dispatch(increment());
    }
}
```

<!-- === 이해하지 못했다 ===
- 액션 생성자를 작성하면 ~~action 객체가 아닌~~ 함수가 반환된다.
- 내부 함수에서 `dispatch, getState`와 같은 method를 parameter로 받는다.
- 또한 액션을 dispatch할때 delay를 주거나 특정조건이 만족될 때만 dispatch를 하도록 할 수 있다. 이러한 `dispatch()` 를 통해 ~~동기뿐만 아니라~~ **비동기 처리**를 할 수 있다.
- 표현식을 감싸고 안의 내용의 수행을 delay시킬 수 있는 함수이다. **비동기처리**
- applyMiddleware() 함수를 사용하여 createStore() 안에서 redux와 연결한다.

```js
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));
```
-->

### Redux Middleware

실무에서는 미들웨어를 만들 일이 없긴 하지만, 직접 만들어보면 미들웨어가 어떤 역할을 하는지 훨씬 이해가 더 잘된다.

```js
// middleware templete
const middleware = (store) => (next) => (action) => {
  // 처리할 내용
};
```

이러한 템플릿을 보면, 미들웨어 또한 함수를 연달아 두번 return을 하는 함수일 뿐이라는 것을 알 수 있다.
위 함수의 코드를 더 이해하기 쉽도록 function 키워드를 사용해 작성한다면, 다음과 같이 각각의 parameter가 어떤 의미인지 알 수 있다.

```js
function middleware(store) {
  return function (next) {
    return function (action) {
      // 처리할 내용
    };
  };
}
```

> #### middleware parameter 3개

1. `store` : redux store instance

   - `dispatch()`, `getState()`, `subsrcibe()` 내장 함수를 포함한다.

2. `next` : action을 다음 middleware에 전달하는 함수

   - `next(action)`의 형태로 사용된다.
   - 만약 다음 middleware가 없다면, reducer에게 action을 전달한다.
   - 만약 next를 호출하지 않는다면, action을 reduxer에게 전달하지 않는다.

3. `action` : 현재 처리하고 있는 action 객체

![](https://i.imgur.com/fZs5yvY.png)

위 그림과 같은 구조로 작동하기 때문에 redux store는 여러 개의 middleware를 등록할 수 있다.
그리고 middleware에서 `next(action)`을 호출하게 되면 다음 middleware로 action을 전달하고, `store.dispatch()`를 호출하게 되면 다른 action을 추가적으로 발생한다.
