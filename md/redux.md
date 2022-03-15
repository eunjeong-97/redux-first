# Redux

> 목차

- [Redux](#redux)
  - [Redux를 사용하는 프로젝트 구조](#redux를-사용하는-프로젝트-구조)
    - [1. Presentational 컴포넌트](#1-presentational-컴포넌트)
    - [2. Container 컴포넌트](#2-container-컴포넌트)
    - [3. 장점](#3-장점)
  - [1. Action](#1-action)
    - [Step01. ActionTypes](#step01-actiontypes)
    - [Step02. Action Creators (액션생성자)](#step02-action-creators-액션생성자)
  - [2. Reducer](#2-reducer)
    - [Step01. 초기상태 선언](#step01-초기상태-선언)
    - [Step02. Reducer 함수](#step02-reducer-함수)
  - [3. Store 만들기](#3-store-만들기)
  - [4. Provider 컴포넌트](#4-provider-컴포넌트)

## 프로젝트 구조

```bash
├──node_modules : npm install 하면 자동생성
├──public
|  ├──index.html
|  ├──manifest.json (보류)
|  ├──robots.txt (보류)
|
├──src
|  ├──actions
|  |  ├──index.js :
|  |
|  ├──container
|  |  ├──App.js
|  |  ├──CounterContainer.js
|  |
|  ├──reducers
|     ├──ActionTypes.js : string타입의 action type값을 상수로 저장함
|     ├──index.js :
|
|
├──index.js
├──.gitignore
├──package-lock.json
├──package.json
├──README.md
```

## Redux를 사용하는 프로젝트 구조

### 1. Presentational 컴포넌트

> (= Dumb 컴포넌트)

- 오직 뷰만 담당한다.
- DOM element, style을 가지고 있으며, Presentational 컴포넌트와 Container 컴포넌트를 가질 수도 있다.
- 리덕스 스토어에는 직접적인 권한이 없으며 오직 props로만 데이터를 가져올 수 있다.
- 대부분의 경우 state를 가지고 있지 않으며, 가지고 있더라도 ~~데이터에 관한 것이 아니라~~ UI에 관한 state를 가진다.
- 주로 함수형 컴포넌트로 작성된다.

### 2. Container 컴포넌트

> (=Smart 컴포넌트)

- Presentational 컴포넌트와 Container 컴포넌트를 관리한다.
- 주로 내부에 DOM element가 직접적으로 사용되지 않고 감싸는 용도로만 사용도니다.
- style은 Presentational 컴포넌트에서만 정의되어야 하기 때문에 스타일을 가지지 않는다.
- 상태를 가지고 있을 때가 많으며, Redux에 직접적으로 접근할 수 있다.

#### Container 컴포넌트 사용예시

- 페이지
- 리스트
- 헤더
- 사이드바
- 내부의 컴포넌트 때문에 props가 여러 컴포넌트를 거쳐야 하는 경우

### 3. 장점

- UI와 Data가 분리되어 프로젝트를 이해하기 쉽다.
- 컴포넌트의 재사용률을 높여준다.

## 1. Action

### Step01. ActionTypes

action은 하나의 객체이고, 모든 action 객체는 type이라는 값을 가지고 있어야 한다. 만약 액션과 함께 전달해야 할 값이 있을경우엔 추가해서 만들어주면 된다.

여기서 type은 action의 이름과도 같은 존재이다. 나중에 reducer가 action을 전달받으면 이 값에 따라 다른 작업을 한다.

```js
{type: 'INCREMENT'}
{type: 'DECREMENT'}

{type: 'SET_COLOR', color: 'black'}
```

그런데 이러한 action의 type값을 사용할 때마다 모두 문자열로 사용한다면 관리하기 힘들어지기 때문에 이러한 값들을 따로 파일을 만들어서 저장하면 편리하게 쓸 수 있다.

- path: `src/actions/ActionTypes.js`
- Action의 종류들을 상수로 선언한다.
- 앞에 export를 붙임으로서, 나중에 이러한 type들을 불러올 때, `import * as types './ActionTypes`를 할 수 있다

```js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COLOR = "SET_COLOR";
```

### Step02. Action Creators (액션생성자)

액션을 만들때마다 객체를 그때그때 부르면 힘들기 때문에 액션을 만드는 함수 (=액션생성자)를 만든다.

- path: `src/actions/index.js`

```js
import * as types from "./ActionTypes";

export const increment = () => ({ type: types.INCREMENT });
export const decrement = () => ({ type: types.DECREMENT });

// 다른 액션 생성자와 달리 parameter를 가지고 있다.
export const setColor = (color) => ({ type: types.SET_COLOR, color });
```

increment와 decrement의 경우 parameter가 없기 때문에 type만 지정이 된 객체를 만들었고,
setColor의 경우 색상을 지정해주는거라 parameter로 color값을 받고 이 값을 객체 안에 넣어준다.

리덕스의 3가지 원칙 중 변화는 언제나 순수한 Pure 함수로 이뤄져야 한다는 것이 있다.
더블 클릭을 하면 색이 랜덤으로 변하긴 하지만, 우리가 action을 RANDOMIZE_COLOR, randomizeColor 이런식으로 만들면 안된다.
왜냐하면 Random함수는 실행할 때마다 다른 값을 반환하기 때문에 순수하지 않기 때문이다.

## 2. Reducer

Reducer는 action의 type에 따라 변화를 일으키는 함수이다. 그리고 이러한 Reducer 파일에는 최초변화를 일으키기 전, 지니고 있어야 할 `초기상태`가 정의되어야 한다.

### Step01. 초기상태 선언

path: `src/reducer/index.js`

```js
import * as types from "./actions/ActionTypes";

const initialState = {
  color: "black",
  number: 0,
};
```

### Step02. Reducer 함수

Reducer 함수는 state와 action을 parameter로 가지는 함수이다.
그 내부에서 `Swtich문`을 통해 `action.type`에 따라 다른 변화를 일으키면 된다.
단, ~~state를 직접 수정하면 안되고~~ 기존 state 값에 덮어쓴, 새 상태객체를 만들어야 한다.

- path: `src/reducer/index.js`
- state와 action을 parameter로 받는 리듀서함수를 정의한다.
- state가 undefined일 때, (=스토어가 생성될 때) state의 기본값을 initialState로 사용한다.
- action.type에 따라 다른 작업을 하고, 새 상태를 만들어 `반환한다`
- state를 직접 수정하면 안되고, 기존 상태 값에 원하는값을 덮어쓴 새로운 객체를 만들어 `반환한다`

> 이때 state, action은 어떻게 넣는지 궁금하다 (reducer 함수 사용예시)

```js
export default function counter(state = initialState, action) {
  switch (action.types) {
    case types.INCREMENT:
      return {
        ...state,
        number: state.number + 1,
      };
    case types.DECREMENT:
      return {
        ...state,
        number: state.number - 1,
      };
    case types.SET_COLOR:
      return {
        ...state,
        color: state.color,
      };
    default:
      return state;
  }
}
```

## 3. Store 만들기

Store는 리덕스에서 가장 핵심적인 `인스턴스`이다.
이 안에 현재 상태를 내장하고, 구동(Subscribe) 중인 함수들이 상태가 업데이트될 때마다 다시 실행하도록 한다.

- redux 라이브러리에서 `createStore()`를 불러온 다음, 해당 함수의 parameter로 reducer를 넣는다.
- path: `src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducers from "./reducers";

import App from "./container/App";

// 스토어 생성
const store = createStore(reducers);

ReactDOM.render(<App />, document.getElementbyId("root"));
```

## 4. Provider 컴포넌트

`<Provider>`는 `react-redux` 라이브러리에 내장되어있는, 리액트 앱에서 store를 손쉽게 연동할 수 있도록 도와주는 컴포넌트이다.
`<Provider>` 컴포넌트로 연동할 컴포넌트를 감싼 다음, `<Provider>` 컴포넌트의 props로 store 값을 설정하면 된다.

- path: `src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducers from "./reducers"; // ./reducers/index.js
import { Provider } from "react-redux";

import App from "./container/App";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementbyId("root")
);
```
