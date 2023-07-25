const controller = document.querySelector('.controller');
const display = document.querySelector('.display');
const result = document.createElement('div');
result.classList.add('result');
const operations = document.createElement('div');
operations.classList.add('operations');
let original = true;
const buttons = document.querySelectorAll('.calculator div');
const decimal = document.querySelector('.decimal');
const answer = document.querySelector('.answer');

function addContents(e){
    let clickedContent = e.target.innerText;
    if(clickedContent !== 'DEL' && clickedContent !== 'AC' && clickedContent !== '=' 
    && clickedContent !== '.'){
        operations.innerText += clickedContent;
    }
    display.insertBefore(operations,result);
}

function deleteContent(){
    let text = operations.innerText.split('');
    if(operations.innerText !== ''){
        text.pop();
        operations.innerText = text.join('');
    }
}

function calculate(first,operator,second){
    let result = 0;
    if(operator === '+'){
        result = +first + +second;
    }else if(operator === '-'){
        result = +first - +second;
    }else if(operator === 'x'){
        result = +first * +second;
    }else if(operator === '/'){
        result = +first / +second;
    }
    if(Number.isInteger(result)) return result;
    else return result.toFixed(5);
    
}

function splitContents(text){
    let splittedArray = text.split('');
    let a = '';
    const arr = [];
    for(let i = 0; i <= splittedArray.length; i++){
        if(i === splittedArray.length && a !== ''){
            arr.push(a);
        }else if(!isNaN(splittedArray[i])||
                splittedArray[i] === '.'){
            a += splittedArray[i];
        }
        else if(a !== '' && i !== splittedArray.length){
                arr.push(a);
                a = '';
                arr.push(splittedArray[i]);
        }
    }
    return arr;
}

function displayContents(){
    const contents = splitContents(operations.innerText);
    let copy = contents.slice(0);
    while(copy.length !== 1){
        let d = calculate(copy.shift(),copy.shift(),copy.shift());
        copy.unshift(d);
    };
    result.innerText = copy.join('');
}

function clearContents(){
    result.innerText = '0.'
    operations.innerText = '';
}

function addOnceDecimal(){
    operations.innerText += '.';
    e.target.style.pointerEvents = 'none';
}

controller.addEventListener('click',(e)=>{
    if(original){
        e.target.style.justifyContent = "flex-end";
        e.target.style.backgroundColor = "springgreen";
        result.innerText = '0.';
        display.append(result);
        buttons.forEach((button) => {
            button.style.cursor = 'pointer';
            button.style.pointerEvents = ''
            button.addEventListener('click',addContents,true)
        })
        answer.addEventListener('click',displayContents,true);
        decimal.addEventListener('click',addOnceDecimal,true);
    }else{
        e.target.style.justifyContent = "flex-start";
        e.target.style.backgroundColor = "";
        result.innerText = "CASIO";
        operations.innerText = '';
        buttons.forEach((button) => {
            button.style.cursor = '';
            button.removeEventListener('click',addContents,true)
        });
        answer.removeEventListener('click',displayContents,true);
        decimal.removeEventListener('click',addOnceDecimal,true);
        setTimeout( () =>{
            result.innerText = ''
        },
        1000
        );
    }
    original = !original
})
const deletion = document.querySelector('.delete');
deletion.addEventListener('click',deleteContent);

const clear = document.querySelector('.clear');
clear.addEventListener('click',clearContents);

