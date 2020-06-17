let buttons = {
    nine: document.getElementById('nine'), // 9
    eight: document.getElementById('eight'), // 8
    seven: document.getElementById('seven'), // 7
    six: document.getElementById('six'), // 6
    five: document.getElementById('five'), // 5
    four: document.getElementById('four'), // 4
    three: document.getElementById('three'), // 3
    two: document.getElementById('two'), // 2
    one: document.getElementById('one'), // 1
    zero: document.getElementById('zero'), // 0    
    summation: document.getElementById('summation'), // сложение
    subtraction: document.getElementById('subtraction'), // вычитание
    multiplication: document.getElementById('multiplication'), // умножение
    division: document.getElementById('division'), // деление
    delete: document.getElementById('delete'), // ←
    comma: document.getElementById('comma'), // запятая
    persent: document.getElementById('persent'), // %
    equally: document.getElementById('equally'), // =      
    cancel: document.getElementById('cancel'), // C
    top: document.getElementById('top') //вывод чисел
}

let numbers = [
    buttons.zero,
    buttons.one, buttons.two, buttons.three,
    buttons.four, buttons.five, buttons.six,
    buttons.seven, buttons.eight, buttons.nine
] // массив для ввода цифр

let sum; //+
let sub; //-
let mult; //*
let divis; //делить
let flag = false; // для очищения строки после нажатия оператора

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        if (buttons.top.innerText.length < 7) {
            buttons.top.innerText = buttons.top.innerText + i;
        } // условие для ввода чисел последовательно, но размером не более 7 знаков
        if (flag == true) {
            buttons.top.innerText = '' + i;
            flag = false;
        } // для очищения строки после нажатия оператора
    });// в зависимости от нажатой кнопки цикл сопоставляет с индексом массива
}// цикл для ввода чисел

buttons.comma.addEventListener('click', function () {
    if (buttons.top.innerText.length < 7) {
        if (buttons.top.innerText.includes('.') == false) {
            if (buttons.top.innerText.length == 0) {
                buttons.top.innerText = buttons.top.innerText + '0.';
            } else {
                buttons.top.innerText = buttons.top.innerText + '.';
            }
        }/* includes определяет, содержит ли массив определённый элемент, 
        возвращая в зависимости от этого true или false.*/
    }
});

buttons.delete.addEventListener('click', function () {
    buttons.top.innerText = buttons.top.innerText.slice(0, -1);
    if (buttons.top.innerText == ''){
        cancel();
    }
});//последовательное удаление цифр при каждом нажатии кнопки

buttons.cancel.addEventListener('click', function () {
    cancel();
});

function cancel() {
    buttons.top.innerText = '';
    sum = null;
    sub = null;
    mult = null;
    divis = null;
    flag = false;
    roundingDivis = null;
} // для того что бы не сохранялись промежуточные значения после нажатия полной отчистки

buttons.summation.addEventListener('click', function () {
    enter (); //находит значение при повторном нажатии на оператор, для последующего вычесления
    sum = Number(buttons.top.innerText);
    flag = true;
});//после нажатия определенного оператора, сохраняет промежуточное значение и меняет флаг для отчестки строки

buttons.subtraction.addEventListener('click', function () {
    enter ();
    sub = Number(buttons.top.innerText);
    flag = true;
});

buttons.multiplication.addEventListener('click', function () {
    enter ();
    mult = Number(buttons.top.innerText);
    flag = true;
});

buttons.division.addEventListener('click', function () {
    enter ();
    divis = Number(buttons.top.innerText);
    flag = true;
});

function bigNumber(a) {
    if (a.toString().length < 7) {
        buttons.top.innerText = a;
    } else {
        let cut = a.toString().substr(0, 5);
        let e = a.toString().substring(5).length;
        buttons.top.innerText = cut + 'e' + e;
    }// для очень больших целых чисел
}

function enter () {
    if (sum != null) {
        bigNumber(sum + Number(buttons.top.innerText));
        sum = null;
    } //если сохранено знач1, то выполняется оператор сохраненного значение со знач2, знач1 удаляеся
    if (sub != null) {
        bigNumber(sub - Number(buttons.top.innerText));
        sub = null;
    }
    if (mult != null) {
        bigNumber(mult * Number(buttons.top.innerText));
        mult = null;
    }
    if (divis != null) {
        let roundingDivis = divis / Number(buttons.top.innerText);
        if (roundingDivis.toString().length < 7) {
            buttons.top.innerText = roundingDivis;
        } else {
            buttons.top.innerText = roundingDivis.toFixed(5);
        }// оставляет после заяптой 5 знаков, при этом округляя пятое значение
        divis = null;
        roundingDivis = null;
    }
}

buttons.equally.addEventListener('click', function () {
    enter();
});// для равенства

document.addEventListener('keydown', function (event) {
    if (flag == true) {
        buttons.top.innerText = '';
        flag = false;
    }
    if ((buttons.top.innerText.length < 7) && !event.shiftKey) {
        for (let i = 0; i < 10; i++) {
            keyNumbers(i);
        }
    }
    if (event.code == 'Backspace') {
        buttons.top.innerText = buttons.top.innerText.slice(0, -1);
        if (buttons.top.innerText == ''){
            cancel();
        }
    }
    if (event.code == 'Comma' || event.code == 'Period' || event.code == 'NumpadDecimal') {
        if (buttons.top.innerText.length < 7) {
            if (buttons.top.innerText.includes('.') == false) {
                if (buttons.top.innerText.length == 0) {
                    buttons.top.innerText = buttons.top.innerText + '0.';
                } else {
                    buttons.top.innerText = buttons.top.innerText + '.';
                }
            }
        }
    }
    if ((event.code == 'Equal' && event.shiftKey) || event.code == 'NumpadAdd') {
        enter ();
        sum = Number(buttons.top.innerText);
        flag = true;
    }
    if (event.code == 'Minus' || event.code == 'NumpadSubtract') {
        enter ();
        sub = Number(buttons.top.innerText);
        flag = true;
    }
    if ((event.code == 'Digit8' && event.shiftKey) || event.code == 'NumpadMultiply') {
        enter ();
        mult = Number(buttons.top.innerText);
        flag = true;
    }
    if (event.code == 'Slash' || event.code == 'NumpadDivide') {
        enter ();
        divis = Number(buttons.top.innerText);
        flag = true;
    }
    if ((event.code == 'Enter' || event.code == 'NumpadEnter' || event.code == 'Equal') && !event.shiftKey) {
        enter ();
    }
    if (event.code == 'Delete') {
        cancel();
    }
})
function keyNumbers(a) {
    if (event.code == ('Digit' + a) || event.code == ('Numpad' + a)) {
        buttons.top.innerText = buttons.top.innerText + '' + a;
    }
}

