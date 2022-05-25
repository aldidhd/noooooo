const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

//function filterFn(toDo){    //filter는 array의 모든 아이템을 통해 함수를 실행하고 true인 아이템만 가지고 새로운 array를 만들고
  //  return toDo.id === 1        //toDo.id가 1인것만 리턴함
  //우리가 원하는 것은 li에 없는 id인 toDos를 체크하고 싶다. 그것이 우리가 지우고 싶은것.
//}

let toDos = [];

function deleteToDo(event){
   // console.log(event.target.parentNode);
   const btn = event.target;        //누른 버튼을 가리킴
   const li = btn.parentNode;       //누른 버튼의 부모를 가리킴
   toDoList.removeChild(li);        //요소의 자식을 삭제하라. li의 자식인 버튼을 삭제함.
   const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);      //모든 toDos가 li의 id와 같지 않을 때.    toDo.id는 숫자고 li.id는 string, li.id는 숫자로 변환하여 array에 넣어야 함.
   });    //forEach함수 처럼 아이템 하나씩을 가져옴.
   //console.log(cleanToDos);
   toDos = cleanToDos
   saveToDos();
}


function saveToDos(){ //todos를 로컬스토리지에 저장하기
   // localStorage.setItem(TODOS_LS, toDos);      //local storage에는 자바스크립트 data를 저장할수 없어서 
    //object형태로 저장됨, 오직 string형태만 저장가능. 자바스크립트는 local storage안의 값도 string으로만 가져올수 있어
    //그래서 JSON.stringify를 통해 object를 string으로 바꿔줄 필요가 있음. 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text){
    //console.log(text);
    const ho_li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText="⛔";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    ho_li.appendChild(delBtn);  
    ho_li.appendChild(span);
    ho_li.id = newId;       //li에 id부여하기
    
    
    //span을 li안에 넣고, 버튼을 li안에 넣어야 함.
    toDoList.appendChild(ho_li);

    const toDoObj = {
        text: text,
        id: newId        //처음 비어있을때 값이 1일꺼야.
    };

    toDos.push(toDoObj);        //push를 써서 array안에 element하나 넣어줌
    saveToDos();     //toDos호출하기   
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

//function something(toDo){
 //   console.log(toDo.text);
//}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        //console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){     //parsedToDos를 하나씩 돌려주고 그 각각의 하나를 toDo라고 함.
            //console.log(toDo.text);
            paintToDo(toDo.text);
        });   
       //parsedToDos.forEach(something); //이렇게 써주고 something함수를 밖으로 빼줄수 있음. 위랑 동일한 것.


    } 

}



function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();