const controller = document.querySelector('.controller');
let original = true;
controller.addEventListener('click',(e)=>{
    if(original){
        e.target.style.justifyContent = "flex-end";
        e.target.style.backgroundColor = "silver";
    }else{
        e.target.style.justifyContent = "flex-start";
        e.target.style.backgroundColor = "";
    }
    original = !original
})