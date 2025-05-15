// 버튼들을 btns 변수에 담아준다
const btns = document.querySelectorAll(".btn");
// 계산기 화면에 숫자 넣기위해 해당노드불러왔으ㅜㅁ
const num = document.getElementById("num");
// 현재 값을 저장합니다
let value = "0";

//의도적으로 값을 비웠음음 명시하기위해 null사용
// 첫 번째 피연산자를 저장할 변수입니다.
let firstOperand = null;
// 두 번째 피연산자를 저장할 변수입니다.
let secondOperand = null;
// 연산자를 저장할 변수입니다.
let operator = null;
let result = null;

//사칙연산 함수를 변수에 할당
const calculate = (first, operator, second) => {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return first / second;
    default:
      break;
  }
};

// 계산기의 버튼을 누르면 forEach문이 작동한다. 전역에 존재하는 forEach는 초기로딩시 한번만 실행되기에 성능에 영향을 주지않음
// 즉 forEach는 초기에 버튼에 클릭이벤트를 등록해주는 역할. 버튼을 클릭하면 이미 등록된 이벤트가 실행되는것.
btns.forEach((btn) => {
  // 클릭시 이벤트 발생
  btn.addEventListener("click", (e) => {
    // 클릭한 버튼의 textContent 받아온다.
    value = e.target.textContent;
    // console.log(value);

    switch (true) {
      // class가 number인 클래스일 경우에만 숫자 출력되게
      case btn.classList.contains("number"):
        if (num.textContent === "0") {
          num.textContent = value;
        } else {
          num.textContent += value;
        }
        break;
      // c를 누르면 display 숫자가 0으로 되고 피연산자와 연산자의 값을 null로 바꿈
      case value === "C":
        num.textContent = "0";
        firstOperand = null;
        secondOperand = null;
        operator = null;
        break;

      case value === ".":
        // "."을 num가 포함하고 있지않으면 추가해줌, includes는 배열이나 문자열에서 특정 문자열이나 값이 포함되어있는지
        //  확일할 때 사용, contains는 dom요소에 특정 노드가 포함되어있는지.
        if (!num.textContent.includes(".")) {
          num.textContent += value;
        }
        break;

      //연산기호 구현하기
      case btn.classList.contains("operator"):
        //첫번째 피연산자가 null이면
        if (firstOperand === null) {
          //num에 들어가 있는 글자를 첫번째 피연산자에 할당하고
          firstOperand = parseFloat(num.textContent);
          //연산자에는 방금 입력된 연산자를 할당
          operator = value;
          console.log("first operand:", firstOperand);
          console.log("Operator:", operator);
          num.textContent = secondOperand;
          // operator와 first값이 이미 존재하는 상태에서 연산자 버튼이 클릭이 다시 된다면
        } else if (operator !== null && firstOperand !== null) {
          // 두번째 피연산자에는 지금 입력되어있는
          secondOperand = parseFloat(num.textContent);
          operator = value;
          firstOperand = calculate(firstOperand, operator, secondOperand);
          num.textContent = firstOperand;
          console.log("firstOperand", firstOperand);
          console.log("secondOperand", secondOperand);
        }
        break;

      case value === "=":
        if (firstOperand !== null && operator !== null) {
          secondOperand = num.textContent;
          //result에는 calculate함수를 할당해주고 인자로 firstOperand, operator, secondOperand 보내준다
          result = calculate(firstOperand, operator, secondOperand);

          //calculate를 호출해서 받은 결과를 num에 넣어주면
          num.textContent = result;

          console.log(
            `first: ${firstOperand} ${operator} second ${secondOperand}: `,
            result
          );

          firstOperand = result;
          secondOperand = null;
          operator = null;
          console.log("first", firstOperand);
          console.log("second", secondOperand);
        }
        break;

      default:
        break;
    }
  });
});

// 백스페이스 키 누르면 맨 뒤에 글자가 지워지게
window.addEventListener("keydown", (e) => {
  if (e.code === "Backspace") {
    num.textContent = num.textContent.slice(0, -1);
    console.log(e.code);
  }
  // 다 지우고 남은 값이 없으면 화면을 0으로 만들기
  if (num.textContent === "") {
    num.textContent = "0";
  }
});
