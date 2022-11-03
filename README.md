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

7.3 Drag and Drop
<Droppable/>을 만들고 children 요소들을 만들때 함수형으로 정의하였는데 이때 첫번째 파라미터에는 provider라는것이 들어간다.
일명 magic이라고 불린다.

<Draggable/>
마찬가지로 첫번째 파라미터에 provider가 들어가는데 magic라고 부르겠다.
Draggable은 2가지의 props를 가지고 있다.
draggableProps와 dragHandleProps이다.
-draggableProps 요소가 기본적으로 드래그 되기를 원한다면 해당 props를 쓴다.

-dragHandleProps 따로 설정을 하지않으면 영역 전체가 클릭 후 드래그하여 이벤트를 처리 할 수 있는 어느부분은 드래그가 안되고 특정부분만 눌러서 드래그가 하고싶다면 해당 props를 사용한다.
(handle, noHandle)

이벤트 처리가 끝났는데 잘 안된다면 Strict모드를 지우기(index.tsx)

지금까지 들은걸 어느정도 정리를 해보자면 아래와 같다.
{...magic.draggableProps}을 처리하면 드래그 드랍이 됐을 때 움직일 덩어리 자체가 되고,
{...magic.dragHandleProps}을 처리하면 드래그가 가능한 부분을 설정할 수 있다. 이것을 제외한 부모요소들은 드래그가 불가능해진다.(옮겨지긴함.)

7.4 style처리 및 placeholder(사이즈 고정시키기)
typescript를 쓰는 덕택에 vscode와 타입스크립트의 도움으로 각 함수의 파라미터들 즉 object의 type을 볼수가 있다. 궁금한 부분의 오른쪽 클릭 후 형식 정의로 이동을 누르면 정의된 내용을 볼 수 있다.

-placeholder
droppable이 끝날 때 두는 어떤 것
{magic.placeholder}
해당 처리를 영역 마지막 부분에 두는것으로 더 이상 사이즈가 줄어들었다가 늘어났다하지 않는 것을 볼 수 있다.

7.5 reOrdering
DragDropContext의 props인 onDragEnd는 드래그 앤 드랍이 끝나면
동작되는 함수이다.
해당 함수의 첫번째 파라미터를 찍어보면 굉장히 많은 드래그 앤 드랍 처리에 대한 값들이 나오는데 어떤 데이터를 가지고 몇번째에 떨궜는지
어떤 보드에 내려놨는지 다 구분이 될 수 있도록 알려주고 있다.
