const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", 
    SHOWING_CN = "showing";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    
    form.classList.remove(SHOWING_CN);
    
    greeting.classList.add(SHOWING_CN);
  
    const date = new Date();
    const hours = date.getHours();
    let mention = 'Hello';
    if(0<= hours && hours <= 4 || 20 < hours){
       
    } else if (hours<12){
        
        mention = 'Good morning';
    } else{
        
        mention = 'Good afternoon';
    }
    // js-greeting에 innerText 넣어주기
    greeting.innerText = `${mention}, ${text}.`;
}

// 이름 불러오기
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    // 저장된 이름이 없으면 물어보기
    if(currentUser === null){
        askForName();
    }else{
        // 저장된 이름이 있으면 출력하기
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();