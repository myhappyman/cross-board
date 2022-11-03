7.1 Set Selector;
이전장까지 recoil의 atom을 알아보고 state management를 사용해보았다.
또한 기존의 atom이 생성해둔 state는 건들지 않고 selector를 사용하여 원형의 데이터를 가공하여 원하는 형태로 변경하는 get함수로 데이터를 표출을 해봤는데 이번장에서 set을 알아본다.

set에는 첫번째 파라미터에 {set} 형태로 함수를 받을 수 있고, 해당 set함수를 사용하여 atom의 값을 변경할 수 있다.
두번째 파라미터는 외부에서 전달받는 새롭게 값을 받을수 있다.
set: ({set}, newValue) => {}

이렇게 세팅이 끝나면 selector도 atom과 마찬가지로 useRecoilState를 통해 get으로 value값을 받고 set으로 set함수를 받아서
const [value, setValue] = useRecoilState(selector);
로 사용할 수 있게 된다.
