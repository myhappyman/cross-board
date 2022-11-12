# Challenge Result🚀
URL : https://myhappyman.github.io/cross-board
니콜라스 선생님과 같이 진행해본 ToDo리스트에 이어서 기능들을 추가해보았습니다.

1. ToDo, DOING, DONE 이외에 카테고리 추가 및 삭제 기능
2. 카테고리 이름 수정 기능
3. 카테고리 내 항목리스트 쓰레기통에 집어넣어서 삭제 기능
4. localStorage를 활용하여 데이터 임시 저장 기능
5. 카테고리인 카드덩어리끼리 순서 변경가능하도록 Droppable 및 Draggable 영역 하나 더 감싸기

(* 기존 3개씩 내려가는 grid형태로 구성하였으나, beautiful-dnd에서는 grid자체에서 제대로 동작하지 않음.
차후 grid용도 사용해볼 예정. 현 UI상에선 flex nowrap형태로 옆으로 늘어나도록 구성함)
<br/>

# 1. Set Selector
이전장까지 recoil의 atom을 알아보고 state management를 사용해보았다.
또한 기존의 atom이 생성해둔 state는 건들지 않고 selector를 사용하여 원형의 데이터를 가공하여 원하는 형태로 변경하는 get함수로 데이터를 표출을 해봤는데 이번장에서 set을 알아본다.

set에는 첫번째 파라미터에 `{set}` 형태로 함수를 받을 수 있고, 해당 set함수를 사용하여 atom의 값을 변경할 수 있다.
두번째 파라미터는 외부에서 전달받는 새롭게 값을 받을수 있다.

```Javascript
set: ({set}, newValue) => {}
```

이렇게 세팅이 끝나면 selector도 atom과 마찬가지로 useRecoilState를 통해 get으로 value값을 받고 set으로 set함수를 받아서
```Javascript
const [value, setValue] = useRecoilState(selector);
```
로 사용할 수 있게 된다.
<br/>

# 2. Drag and Drop
드래그 앤 드롭을 처리하기에 용이한 라이브러리 `react-beautiful-dnd`를 사용해보도록 한다.

```
npm i react-beautiful-dnd
npm i --save-dev @types/react-beautiful-dnd
```

설치를 먼저 한다.

관련 문서 자료: https://www.npmjs.com/package/react-beautiful-dnd
<br/>

#### `- <DragDropContext/>`
드래그 또는 드롭을 하고싶은 영역을 나타내는 부분을 정의한다.
##### *** 필수 입력해야 할 Props
##### `- onDragEnd`
필수값으로 유저가 드래그를 끝낸 시점에 불려지는 함수다.
<br/>

#### `- <Droppable/>`
어떤 것들을 드롭할 수 있는 영역
##### *** 필수 입력해야 할 Props
##### `- droppableId`
필수값으로 id를 적어준다. 내부에는 드랍할 영역의 코드가 필요한데, react문법은 알아먹지 못하여서 `{()=><div></div>}` 형태인 함수로 정의해줘야한다.

사실 이런형태는 react에서 자주 쓰이진 않지만 요소를 전달해주는 처리때문에 해당 방식으로 개발이 이루어졌다고 한다.
(가끔 몇몇 라이브러리들이 해당 형태인 함수형태로 jsx를 뱉도록 설계하였다고 함.)

#### `- <Draggable/>`
드래그하는것들의 영역을 말한다.
<br/>

# 3. Drag and Drop
#### `- <Droppable/>`
`<Droppable/>`을 만들고 children 요소들을 만들때 함수형으로 정의하였는데 이때 첫번째 파라미터에는 provider라는것이 들어간다.
일명 magic이라고 불린다.
<br/>

#### `- <Draggable/>`
마찬가지로 첫번째 파라미터에 provider가 들어가는데 magic라고 부르겠다.

Draggable은 2가지의 props를 가지고 있다.
`draggableProps`와 `dragHandleProps`이다.

##### `- draggableProps`
요소가 기본적으로 드래그 되기를 원한다면 해당 props를 쓴다.

##### `- dragHandleProps`
따로 설정을 하지않으면 영역 전체가 클릭 후 드래그하여 이벤트를 처리 할 수 있는 어느부분은 드래그가 안되고 특정부분만 눌러서 드래그가 하고싶다면 해당 props를 사용한다.
(handle, noHandle)

이벤트 처리가 끝났는데 잘 안된다면 Strict모드를 지우기(index.tsx)

지금까지 들은걸 어느정도 정리를 해보자면 아래와 같다.

---
`{...magic.draggableProps}`
해당 처리를 하면 드래그 드랍이 됐을 때 움직일 덩어리 자체가 된다.
`{...magic.dragHandleProps}`
해당 처리를 하면 드래그가 가능한 부분을 설정할 수 있다.
이것을 제외한 부모요소들은 드래그가 불가능해진다.(전체가 옮겨지긴함.)

# 4. style처리 및 placeholder(사이즈 고정시키기)
typescript를 쓰는 덕택에 vscode와 타입스크립트의 도움으로 각 함수의 파라미터들 즉 object의 type을 볼수가 있다. 궁금한 부분의 오른쪽 클릭 후 형식 정의로 이동을 누르면 정의된 내용을 볼 수 있다.

#### `- placeholder`
`<Droppable/>`이 끝날 때 두는 어떤 것
`{magic.placeholder}`
해당 처리를 영역 마지막 부분에 두는것으로 더 이상 사이즈가 줄어들었다가 늘어났다하지 않는 것을 볼 수 있다.

# 5. reOrdering
#### `- onDragEnd`
`<DragDropContext />`의 props인 `onDragEnd`는 드래그 앤 드랍이 끝나면 동작되는 함수이다.

해당 함수의 첫번째 파라미터를 찍어보면 굉장히 많은 드래그 앤 드랍 처리에 대한 값들이 나오는데 어떤 데이터를 가지고 몇번째에 떨궜는지
어떤 보드에 내려놨는지 다 구분이 될 수 있도록 알려주고 있다.


# 6. reOrdering2
splice를 통해 실제 atom의 state값을 변형 시키는데 성공했다.

> 1. 원래값을 복사한다 [...array]
> 2. 복사한 배열에 source.index로 없어져야 할 위치의 값을 지운다.
> 3. destination.index 위치에 새로 넣을 draggableId을 넣는다.
> 4. set에서 처리하고 return한다.

다만, 해당 방법을 하다보면 오류가 발생하는 것이 draggable key는
draggableId와 같아야해서 오류가 발생한다.

그 동안 map을 만들때 key는 index값으로 처리했지만, dnd에서는 draggableId와 똑같이 처리해준다.

# 7. Performance
#### `- React.memo활용`
`<Draggable />`영역을 따로 컴포넌트로 나눠서 새로 작성 후 `console.log()`를 통해 첫 로드후와 드래그 드랍 이벤트 처리할때 얼마나 많은 렌더링이 일어나고 있는지 보았다.

state에 변화가 있었기 때문에 react에서는 새롭게 그리기 위해 카드영역들의 전체를 다시 그리면서 렌더링이 일어나서 카드의 수가 많거나 복잡하면 그만큼 덜덜 떨리거나 느려지는 상황이 발생할수도 있을것이다.

React 기초에서 배웠던 `react memo`를 사용하면 컴포넌트로부터 prop이 바뀌지 않는다면 렌더링하지 말라고 처리를 해줄 수 있다.

<b>state가 변경되었다고 무조건 다시 생성해야할 필요가 없는 최적화를 진행해야할경우 `react memo`는 이런 행위를 도와줄 것이다.</b>

# 11. Droppable Snapshot
`- Snapshot`

Droppable에는 하위 children을 생성할때
첫번째 인자로 magic, 두번째는 snapshot의 파라미터를 받는다.

#### `전달 가능한 Props`

##### `- isDraggingOver`
드래그 중인 곳에 true, 아닌곳에 false값을 준다.

##### `- draggingFromThisWith`
드래그를해서 해당 영역을 벗어나면 발생 즉, 기존의 영역을 벗어난곳에 어떤 문자열을 준다.

# 12. finish Styles
Draggable에도 마찬가지로 2번째 인자를 자식 생성하는 위치에서 받을 수 있는데, 다양한 기능들을 제공한다.

# 13. Refs
react의 `useRef`는 기존 vanilla js에서 document.getElementById등을 통해 요소 자체를 받아오던것과 비슷한 행위다.
<b>그 요소를 받아와서 focus나 blur와 같은 특정 강제 행위를 처리할 수 있다.</b>

즉, <b>reference란 HTML의 어떤 요소를 가져와서 변형할 수 있도록 하는것을 말한다.</b>
여기서 처리하는 ref, useRef는 react이지만 그외에 실제 처리하는부분들은 react가 아닌 전부 vanilla js들이다.