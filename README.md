7.1 Set Selector;
이전장까지 recoil의 atom을 알아보고 state management를 사용해보았다.
또한 기존의 atom이 생성해둔 state는 건들지 않고 selector를 사용하여 원형의 데이터를 가공하여 원하는 형태로 변경하는 get함수로 데이터를 표출을 해봤는데 이번장에서 set을 알아본다.

set에는 첫번째 파라미터에 {set} 형태로 함수를 받을 수 있고, 해당 set함수를 사용하여 atom의 값을 변경할 수 있다.
두번째 파라미터는 외부에서 전달받는 새롭게 값을 받을수 있다.
set: ({set}, newValue) => {}

이렇게 세팅이 끝나면 selector도 atom과 마찬가지로 useRecoilState를 통해 get으로 value값을 받고 set으로 set함수를 받아서
const [value, setValue] = useRecoilState(selector);
로 사용할 수 있게 된다.

7.2 Drag and Drop
드래그 앤 드롭을 처리하기에 용이한 라이브러리 react-beautiful-dnd를 사용해보도록 한다.

> npm i react-beautiful-dnd
> npm i --save-dev @types/react-beautiful-dnd

설치를 먼저 한다.

관련 문서 자료: https://www.npmjs.com/package/react-beautiful-dnd
<DragDropContext/> : 드래그 또는 드롭을 하고싶은 영역을 나타내는 부분을 정의한다.
!props

- onDragEnd : 필수값으로 유저가 드래그를 끝낸 시점에 불려지는 함수다.

<Droppable/> : 어떤 것들을 드롭할 수 있는 영역
!props
-droppableId : 필수값으로 id를 적어준다.
내부에는 드랍할 영역의 코드가 필요한데, react문법은 알아먹지 못하여서
{()=><div></div>} 형태인 함수로 정의해줘야한다.

사실 이런형태는 react에서 자주 쓰이진 않지만 요소를 전달해주는 처리때문에 해당 방식으로 개발이 이루어졌다고 한다.
(가끔 몇몇 라이브러리들이 해당 형태인 함수형태로 jsx를 뱉도록 설계하였다고 함.)

<Draggable/> : 드래그하는것들의 영역을 말한다.
