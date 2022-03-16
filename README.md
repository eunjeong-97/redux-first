# Redux First

## 참고자료

1. [react-redux](https://react-redux.js.org/introduction/getting-started)
2. [react-i18next](https://react.i18next.com/getting-started)
3. [react-redux 정리](https://13akstjq.github.io/redux/2019/12/14/redux-redux%EC%99%84%EB%B2%BD%EC%A0%95%EB%A6%AC.html)
4. [velopert redux정리](https://redux.vlpt.us/1-6-reducers.html)
5. [velopert 기술블로그](https://velopert.com/1967)
6. [Poiemaweb 사이트](https://poiemaweb.com/Front-end)

## 공부한 내용

- [React JS](/md/react.md)
- [Redux Basic](/md/redux-basic.md)
- [Redux Advanced](/md/redux-advanced.md.md)

## 기록할 내용

### 2022-03-15

- property, attribute, parameter
- `const functionName = parameter => ({})`
- vacode prettier 기본설정 정리
- 기본적인 백엔드 지식도 배워둬야겠다 (MySQL, php 등등)
- 위코드 기본세션, 생활코딩 WEBn시리즈
- `public/manifest.json,robots.txt` 역할

### 2022-03-16

#### 1. Headers

상단에 해당 페이지 이름 및 버튼이벤트가 있는 아이콘이 있는 영역을 가리킨다.

```js
export default ({title, back}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {back ?
                <TouchableWithoutFeedback onPress={backFunction}>
                    <View style={stles.iconButton}>
                        <ICO_BACK /> // svg이미지파일
                    </View>
                </TouchableWithoutFeedback>
            }
        </View>
    )
}
```

#### 2. svg파일 태그로 사용하기

2-1. 이미지 파일을 상수로 export

```js
// src/components/UI/SvgBox.js
import ICO_INFO from '../../../assets/ico/common/ico_info.svg'

export.ICO_INFO = ICO_INFO;
```

2-2. 사용하는 파일에서 import 하고 태그처럼 사용하기

```js
// 사용하는 파일
import { ICO_CLOSE } from "../../components/UI/SvgBox";
<ICO_CLOSE width={15} height={15} />;
```

#### 3. DockBar

하단에 다른 페이지로 이동할 수 있는 네비게이션 바 영역을 가리킨다.

```js
<View style={styles.dockBarWrap}>{state.routes.map((route, index) => {})}</View>
```

- [custom navigation](https://www.devh.kr/2020/React-Navigation-Custom-navigators/)

#### 4. UI 컴포넌트 만들때 export default () => {} 형태로 만드는 것

1. UI 컴포넌트 만들기

```js
// Headers.js
export default ({ title, menu, back, home, navigation, close }) => {
  return 생략;
};
```

2. 만들어진 UI컴포넌트를 사용하기

```js
import Headers from "../../UI/Headers.js";
<Headers back menu navigation={navigation} title="해당 페이지 제목" />;
```
