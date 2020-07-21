let d = document;
let getById = 'getElementById';
let getBycls = 'getElementsByClassName';
let btn = [...d[getBycls]('btn')];
let res = d[getById]('res');
let screen = d[getById]('screen');
let inversemode = false;

setAboutText()
histSetUp();
setMode();
btn.forEach((el) => {
    el.addEventListener('click', () => {
        input(el.textContent, el);
    });
});
let delbtn = d[getById]('del');
delbtn.addEventListener('long-press', () => {
    screen.textContent = '';
    res.textContent = '';
});

function input(e, el) {
    let nExp = false;
    let sc = screen;
    el.style.backgroundColor = 'rgba(255,255,255,0.2)';
    setTimeout(function() {
        el.style.backgroundColor = '';
    }, 500);
    var cont = screen.textContent;
    e = e.trim();
    //console.log(cont);
    cont = cont + e;
    let solve = cont;
    // console.log(cont);
    let txtL = cont.trim().split("");
    let txtlen = txtL.length;
    if (txtlen) {
        let j = [...txtL].splice(-2);

        let bool = (j[0] == j[1] || j[0] == '×' || j[0] == '÷');
        let bool2 = (j[0] == j[1] || j[0] == '+' || j[0] == '-');
        if ((j[0] == '(' || j[0] == '(') && (e == '×' || e == '÷')) {
            return;
        } else if ((e == '+' || e == '-') && (bool2)) {
            let narr = [...txtL];
            let fg = narr.splice(narr.length - 2, 1);
            nExp = narr.join("");
        } else if ((e == '×' || e == '÷') && (bool)) {
            let narr = [...txtL];
            let fg = narr.splice(narr.length - 2, 1);

            nExp = narr.join("")
        }

    }

    e = (e == 'ln' ? 'ln(' : e);
    e = (e == 'sin' ? 'sin(' : e);
    e = (e == 'eⁿ' ? 'exp(' : e);
    e = (e == 'cos' ? 'cos(' : e);
    e = (e == 'log' ? 'log(' : e);
    e = (e == 'tan' ? 'tan(' : e);
    e = (e == '√' ? '√(' : e);
    e = (e == 'X²' ? '²' : e);
    e = (e == '10ⁿ' ? '10^' : e);
    // console.log(e == 'sin-1');
    e = (e == 'sin⁻¹' ? 'sin⁻¹(' : e);
    e = (e == 'cos⁻¹' ? 'cos⁻¹(' : e);
    e = (e == 'tan⁻¹' ? 'tan⁻¹(' : e);
    e = (e == '!' ? 'f(' : e);
    // e = (nExp ? nExp : e);
    if (nExp) {
        sc.innerHTML = (nExp);
    } else {
        sc.textContent += (e);
    }
    scroll(sc);
    let txt = replace(solve);
    var c = calc(txt);
    let cbool = c == +(sc.textContent);
    c = cbool ? '' : c;
    c = (c == undefined ? '' : c);
    c = (String(c) == 'NaN' ? 'Math Error' : c);
    c = (String(Number(c) - 1) == 'NaN' ? 'Math Error' : c);
    res.textContent = c;
    saveToHistory();
}

function scroll(el) {
    let pos = (el.scrollWidth - el.clientWidth);
    el.scroll({ top: 0, left: pos, behavior: 'smooth' });
}

function sin(i) {
    let mode = localStorage.mode;
    if (mode == 'RAD') {
        return Math.sin(i);
    }
    let deg = Math.sin(Math.PI * (i / 180));
    return +(toFixed(deg));
}

function ln(i) {
    let int = Math.log(i);
    return +(toFixed(int));
}

function cos(i) {
    let mode = localStorage.mode;
    if (mode == 'RAD') {
        return Math.cos(i);
    }
    let deg = Math.cos(Math.PI * (i / 180));
    return +(toFixed(deg));
}

function exp(i) {
    let int = Math.exp(i);
    return +(toFixed(int));
}

function tan(i) {
    let mode = localStorage.mode;
    if (mode == 'RAD') {
        return Math.tan(i);
    }
    let deg = Math.tan(Math.PI * (i / 180));
    return +(toFixed(deg));
}

function log(i) {
    let ans = Math.log10(i);
    return +(toFixed(ans));
}

function solve(bool, e) {
    if (bool) {
        e.style.backgroundColor = 'rgba(255,255,255,0.2)';
        setTimeout(function() {
            e.style.backgroundColor = '';
        }, 500);
    }
    var txt = screen.textContent;
    txt = replace(txt);
    var c = calc(txt);
    c = (c == undefined ? '' : c);
    c = (String(c) == 'NaN' ? 'Math Error' : c);
    res.textContent = c;
    saveToHistory();
}

function calc(fn) {
    try {
        return eval(fn);
    } catch (err) {
        return 'Math Error';
    }
}

function filt(arr) {
    let fil = arr.filter((el) => {
        return (el !== undefined);
    });
    return (fil);
}

function del() {
    let txt = screen.textContent;
    let txtL = txt.trim().split("");
    let c;
    let txtlen = txtL.length;
    if (!(txtlen - 1)) {
        screen.innerHTML = '';
        res.textContent = '';
        return;
    } else if (txtlen) {
        let diff = txtlen - 4;
        let diff2 = txtlen - 6;
        let diff3 = txtlen - 3;
        let diff4 = txtlen - 2;
        let newArr = txtL.slice(diff);
        let newArr2 = txtL.slice(diff2);
        let newArr3 = txtL.slice(diff3);
        let newArr4 = txtL.slice(diff4);
        //console.log('new' + newArr);
        let s = newArr.join("");
        let s2 = newArr2.join("");
        let s3 = newArr3.join("");
        let s4 = newArr4.join("");
        //  	console.log(s.test(/[a-z]{3}\(/));
        let reg = /^sin\(|log\(|tan\(|cos\(|exp\($/ig;
        let reg2 = /^sin⁻¹\(|cos⁻¹\(|tan⁻¹\($/ig;
        let reg3 = /^ln\($/ig;
        let reg4 = /^√\(|f\($/ig;
        let bool2 = reg2.test(s2);
        let bool3 = reg3.test(s3);
        let bool4 = reg4.test(s4);
        //console.log(bool2);
        let bool = reg.test(s);
        if (bool) {
            c = txtL.slice(0, diff);
            c = c.join("");
            screen.textContent = c;
            retSolve(c, res.textContent);
            return;
            //console.log(c);
        } else if (bool2) {
            c = txtL.slice(0, diff2);
            c = c.join("");
            screen.textContent = c;
            retSolve(c, res);
            return;
        } else if (bool3) {
            c = txtL.slice(0, diff3);
            c = c.join("");
            screen.textContent = c;
            retSolve(c, res);
            return;
        } else if (bool4) {
            c = txtL.slice(0, diff4);
            c = c.join("");
            screen.textContent = c;
            retSolve(c, res);
            return;
        } else {
            //console.log(txtL);
            c = txtL.slice(0, txtlen - 1);
            c = c.join("");
            screen.textContent = c;
            retSolve(c, res);
        }
        //screen.innerHTML = c;
    }
}

function retSolve(solve, sc) {
    let s = solve;
    let txt = replace(solve);
    var c = calc(txt);
    let bool = JSON.stringify(String(c)) == JSON.stringify(s);
    let cbool = String(c) == (sc);
    c = (bool) ? '' : c;
    c = (c == undefined ? '' : c);
    c = (String(c) == 'NaN' ? 'Math Error' : c);
    c = (String(Number(c) - 1) == 'NaN' ? 'Math Error' : c);
    res.textContent = c;
}

function swipe(el) {
    let e = d[getById]('swipeCont');
    let symb = d[getById]('symb');
    let swiped = e.classList.contains('swiped');
    if (swiped) {
        symb.classList.remove('_swiped');
        symb.classList.add('not_swiped');
        e.classList.remove('swiped');
        e.classList.add('notSwiped');
        el.style.transform = '';
        d[getById]('lay').style.visibility = 'hidden';
        setTimeout(function() {
            d[getById]('sfn').style.visibility = 'hidden';
        }, 100);

        return;
    }
    symb.classList.remove('not_swiped');
        symb.classList.add('_swiped');
    d[getById]('lay').style.visibility = 'visible';
    el.style.transform = 'rotateY(180deg)';
    d[getById]('sfn').style.visibility = 'visible';
    e.classList.add('swiped');
    e.classList.remove('notSwiped');
    return;
}

function setMode() {
    let mode = localStorage.mode;
    if (!mode) {
        localStorage.mode = 'RAD';
        d[getById]('modeC').textContent = localStorage.mode;
    } else if (mode == 'RAD') {
        d[getById]('modeCo').textContent = 'DEG';
        d[getById]('modeC').textContent = mode;
    } else {
        d[getById]('modeC').textContent = 'DEG';
        d[getById]('modeCo').textContent = 'RAD';
    }

}

function histSetUp() {
    let historyExist = localStorage.historyExist;
    if (historyExist != 'true') {
        localStorage.history = JSON.stringify([]);
    }
}

function changeMode(e) {
    e.style.backgroundColor = 'rgba(255,255,255,0.2)';
    setTimeout(function() {
        e.style.backgroundColor = '';
    }, 500);
    let txtL, txtlen;
    let cont = screen;
    if (cont.textContent) {
        txtL = cont.textContent.split("");
        txtlen = txtL.length;
    }
    let mode = localStorage.mode;
    if (mode == 'RAD') {
        localStorage.mode = 'DEG';
        setMode();
        if (txtlen) {
            solve();
        }
        return;
    }
    localStorage.mode = 'RAD';
    setMode();
    if (txtlen) {
        solve();
    }
}

function percent(e) {
    e = e.textContent.trim();
    let val = screen.textContent;
    val = replace(val);
    if (!val) {
        return;
    }
    let calc = ((Number(eval(val))) / 100);
    calc = String(calc) == 'NaN' ? 'Math Error' : calc;
    res.textContent = calc;

}

function showOpt() {
    d[getById]('optCont').style.display = 'block';
    setTimeout(function() {
        d[getById]('optCont').style.boxShadow = '-1px 1px 3px 2px rgba(0,0,0,0.2)';
        d[getById]('optCont').style.width = '55%';
    }, 100);
    d[getById]('bdcont').addEventListener('click', () => {
        hideOpt();
    });
}

function showHistOpt() {
    let histClear = d[getById]('histClear');
    histClear.style.display = 'block';
    setTimeout(function() {
        histClear.style.width = '35%';
        setTimeout(function() {
            histClear.style.marginRight = '40px';
        }, 100);
    }, 100);
    d[getById]('bdcont').addEventListener('click', () => {
        hideHistOpt();
    });
}

function hideHistOpt() {
    let histClear = d[getById]('histClear');
    histClear.style.marginRight = '-10px';
    histClear.style.width = 0;
    //d[getById]('optCont').style.height = 0;
    setTimeout(function() {
        //histClear.style.display = 'none';
        screen.removeEventListener('click', () => {});
    }, 1000);
    //histClear.style.display = 'none';
}

function replace(txt) {
    //let reg = /([a-z]{3} ?)(\(.+?)+\)+/ig;
    txt = txt.replace(/÷/g, '/');
    txt = txt.replace(/×/g, '*');
    txt = txt.replace(/√/g, 'Math.sqrt');
    txt = txt.replace(/\^/g, '**');
    txt = txt.replace(/(π)/g, 'Math.PI');

    txt = txt.replace(/\b(e)\b/ig, Math.E);
    txt = txt.replace(/⁻¹/ig, '_1');
    txt = txt.replace(/²/ig, '**2');
    txt = txt.replace(/ⁿ/ig, '**');
    txt = txt.replace(/\(/ig, '*(');
    txt = txt.replace(/\)/ig, ')*');
    //console.log(replaceB(txt));
    txt = replaceB(txt);
    //txt = txt.replace(, )
    // console.log(txt);
    return txt;
}

function replaceB(t) {
    if (t.includes('**(')) {
        let arr = t.split('**(');
        t = (arr.join('*('));
    }
    if (t.includes(')**')) {
        let arr = t.split(')**');
        t = (arr.join(')*'));
    }
    if (t.includes('*(') || t.includes(')*')) return trimB(t);
    return t;
}

function trimB(t) {
    let leftcheck = t.split('*(');
    let rightcheck;
    let strType = (+leftcheck[0] + 1);
    let reg = /[+|-|]/.test(leftcheck[0]);
    let bool = ((!leftcheck[0]) || (!strType)) || reg;
    console.log(typeof + leftcheck[0] + 1);
    console.log(+leftcheck[0] + 1)
    if (bool) {
        leftcheck = leftcheck.join('(');
        rightcheck = leftcheck;
    }
    rightcheck = rightcheck ?
        rightcheck.split(')*') :
        leftcheck.join('*(').split(')*');
    if (!rightcheck[1]) {
        return (rightcheck.join(')'));
    }
    return rightcheck.join(')*');

}

function hideOpt() {
    d[getById]('optCont').style.boxShadow = "";
    d[getById]('optCont').style.width = 0;
    //d[getById]('optCont').style.height = 0;
    setTimeout(function() {
        d[getById]('optCont').style.display
        screen.removeEventListener('click', () => {});
    }, 1000);
}

function saveToHistory() {
    let history = (localStorage.history);
    history = JSON.parse(history);
    let math = screen.textContent;
    let result = res.textContent;
    if (math.trim() == result.trim() || +(math.trim()) == +(result.trim())) return;
    if (result.trim() == 'Math Error') return;
    if (!result.trim()) return;
    if (`(${result})` == `${math}`) return;
    let date = new Date();
    let ex = {
        exp: math,
        ans: result,
        date: date,
    };
    let len = gtLen(history);
    if (!len) {
        history.push(ex);
        localStorage.historyExist = true;
        localStorage.history = JSON.stringify(history);
        //console.log(localStorage.history);
        return;
    }
    history.push(ex);
    localStorage.history = JSON.stringify(history);
    let histArr = JSON.parse(localStorage.history);
    if (histArr.length >= 50) {
        let arr = [...histArr.reverse()];
        arr = arr.slice(0, 50);
        arr = [...arr.reverse()];
        localStorage.history = JSON.stringify(arr);
    }
    //console.log(localStorage.history);
}

function gtLen(arr) {
    return arr.length;
}

function trunc(e) {
    if (!e) {
        return 0;
    }
    return e.split('+')[0];
}

function json(act, para) {
    act = (act == 's' ? 'stringify' : 'parse');
    return J(para);
}

function inv(el) {
    let sin = d[getById]('sin');
    let cos = d[getById]('cos');
    let tan = d[getById]('tan');
    let sqr = d[getById]('sqr');
    let log = d[getById]('log');
    let inn = d[getById]('in');
    let arr = [sin, cos, tan, sqr, log, inn];
    if (!inversemode) {
        arr.forEach((e) => {
            e.style.fontWeight = 'bold';
        });
        el.style.backgroundColor = 'rgba(255,255,255,0.2)';
        inversemode = true;
        sin.innerHTML = 'sin⁻¹';
        cos.innerHTML = 'cos⁻¹';
        tan.innerHTML = 'tan⁻¹'
        sqr.innerHTML = 'X²';
        log.innerHTML = '10ⁿ';
        inn.innerHTML = 'eⁿ'
        return;
    }
    arr.forEach((e) => {
        e.style.fontWeight = 'normal';
    });
    el.style.backgroundColor = '';
    inversemode = false;
    sin.innerHTML = 'sin(';
    cos.innerHTML = 'cos(';
    tan.innerHTML = 'tan(';
    sqr.innerHTML = '√';
    log.innerHTML = 'log';
    inn.innerHTML = 'In';
}

function sin_1(i) {
    let mode = localStorage.mode;
    if (mode == 'RAD') {
        let rad = Math.asin(i);
        return +(toFixed(deg));
    }
    let deg = Math.asin(i) * (180 / Math.PI);
    return +(toFixed(deg));
}

function cos_1(i) {
    let mode = localStorage.mode;
    if (mode == 'RAD') {
        let rad = Math.acos(i);
        return +(toFixed(rad));
    }
    let deg = Math.cos(i) * (180 / Math.PI);
    return +(toFixed(deg));
}

function tan_1(i) {
    let mode = localStorage.mode;
    if (mode == 'RAD') {
        let rad = Math.atan(i);
        return +(toFixed(rad));
    }
    let deg = Math.atan(i) * (180 / Math.PI);
    return +(toFixed(deg));
}

function mTrunc(int, digit) {
    return (int.toFixed(digit));
}

function toFixed(val) {
    let precision = 13;
    return (val.toFixed(precision));
}

function showHistory() {
    let noHistCov = d[getById]('noHistCov');
    let histcov = d[getById]('histCov');
    let history = (localStorage.history);
    let histArr = history = JSON.parse(history);
    if (!histArr.length) {
        histcov.style.display = 'none';
        noHistCov.style.display = 'block';
        //return;
        displayHistCont();
    } else {

        histcov.innerHTML = "";
        histcov.style.display = 'block';
        noHistCov.style.display = 'none';
        let currentExp = res.textContent.trim().split("");
        let checkScreen = screen.textContent.trim().split("");
        let slen = checkScreen.length;
        let strr = !(!(currentExp.length) && (slen)) ? "" : `
	<div class='table currentExp'>
  			<div class='tr'>
  			<div class ='dateTd td'>
		    <div align='left'>
		      Current Expression
		    </div>
		  </div>
		  </div>
		  <div class='tr'>
		    <div class='td'>
		     <div class='etxt' align='right'>
		       ${screen.textContent}
		     </div>
		   </div>
		 </div>`;
        let str = "";
        histArr.forEach(function(el) {
            let date = new Date(el['date']);
            date = formatDate(date);
            str += `<div class='histTb table'>`;
            str += `<div class='tr'>`;
            str += `
		  <div class ='dateTd td'>
		    <div align='left'>
		      ${date}
		    </div>
		  </div>
		  </div>
		  <div class='tr'>
		    <div class='td'>
		     <div class='histExp' align='right'>
		       ${el['exp']}
		     </div>
		   </div>
		 </div>
		 <div class='tr'>
		    <div class='td'>
		     <div class='histAns' align='right'>
		       ${el['ans']}
		     </div>
		   </div>
		 </div>
		 </div>
		  `;
        });
        //console.log(str);

        histcov.innerHTML = str + strr;
        displayHistCont();
        histScroll();
        str = "";
    }

}

function displayHistCont() {
    let histCont = d[getById]('histCont');
    histCont.style.display = 'block';
    setTimeout(() => {
        histCont.style.bottom = '0%';
        histCont.style.bottom = 'fixed';
    }, 100);
}

function hide(el, ell) {
    let divCont = d[getById](el);
    let e = d[getById]('histCovD');
    e = ell ? d[getById](ell) : e;
    let pos = (e.clientHeight);
    e.scroll({ top: 0, left: 0, behavior: 'smooth' });

    setTimeout(() => {
        divCont.style.bottom = '62%';
        setTimeout(() => {
            divCont.style.display = 'none';
        }, 100);
    }, 500);
}

function showAbout() {
    let abtcov = d[getById]('abtCont');
    abtcov.style.display = 'block';
    setTimeout(() => {
        abtcov.style.bottom = '0%';
    }, 100);
}

function showDev() {
    let abtdev = d[getById]('devCont');
    abtdev.style.display = 'block';
    setTimeout(() => {
        abtdev.style.bottom = '0%';
    }, 100);
}

function f(r) {
    r = JSON.stringify(r);
    //alert(",");
    //alert(JSON.stringify(r));
    let bool = r.includes(".");
    if (bool) return "";
    let i = Number(eval(r));
    let ans = function fact(i) {
        return (i > 1 ? i * fact(i - 1) : 1);
    }
    let t = ans(i);
    return t; //(tt == -1 ? t : '');
}

function showFLay() {
    let lay = d[getById]('fLay');
    lay.style.background = "";
    lay.style.display = 'block';
    setTimeout(() => {
        lay.style.background = 'rgba(0,0,0,0.4)';
    }, 100);
}

function dismiss() {
    let lay = d[getById]('fLay');
    lay.style.background = "";
    setTimeout(() => {
        lay.style.display = 'none';
    }, 200);
}

function clearHist() {
    let noHistCov = d[getById]('noHistCov');
    let histcov = d[getById]('histCov');
    localStorage.historyExist = 'false';
    histSetUp();
    dismiss();
    histcov.innerHTML = "";
    histcov.style.display = 'none';
    noHistCov.style.display = "block";
}

function formatDate(d) {
    let date = new Date();
    let dateB = new Date(d);
    let dateDiff = date - dateB
    let date1Str = d.toDateString();
    let date2Str = date.toDateString();
    let remDays = Math.floor(dateDiff.valueOf() / 1000 / 60 / 60 / 24);
    if (date1Str == date2Str) {
        return 'Today';
    } else if ((date.getDate() - dateB.getDate()) == 1) {
        return 'Yesterday';
    }
    return date1Str;
}

function histScroll() {
    let el = d[getById]('histCovD');
    let pos = (el.scrollHeight - el.clientHeight);
    el.scroll({ top: pos, left: 0, behavior: 'smooth' });
}

function setAboutText() {
    let str = `
  <div>
    This Calculator is designed to be <wbr>  used by everyone.
    <br>
    The developer is not liable for any problem that may arise from the use of this product.
    <br>
    It was designed with the objective to imitate <b>CRCalc</b> (Google's calc.) functionalities and design (User Interface).
    <br>
    It supports only portrait mode.
    <br>
    <br>
    <u class='abtHead'><b>Features</b></u>
    <ul>
    <li> This calculator supports two 
    angle units, the default being
     <b>RAD</b> (radians) and <b>DEG</b> (degree) being the second angle unit. the current angle unit can be found on the top left corner of the screen.
     <br>
     you can also change the current angle unit by clicking '>>' button and selecting <b> DEG </b> or <b>RAD</b> depending on your current angle unit.
    </li>
    <li> History in this calculator stores up to 50 calculations.
    </li>
    <li> Press and hold Del button to wipe the screen at once </li>
    <li>
    This calculator displays answers in decimal.
    </li>
    <li>
    <b> ! = f(x) </b> solves factorials where 'x' maybe a whole number or an expression but not a decimal.
    </li>
    <li>
    <b> Trig(x) </b> solves trigonometry where 'x' maybe a whole number, an expression or decimal.
    Trig can be Tan, Cos, Sin or their inverse.
    </li>
    <li>
    <b> √(x) </b> solves the square root of x.
    </li>
    </ul>
    <br>
    <br>
    <u class='abtHead'><b> Cautions </b></u>
    <ul>
    <li> Always endeavour to check the angle unit before any calculation.
    
    </li>
    <li>
    Always close brackets.
    </li>
    </ul>
    </div>
    `;
    abtCov.innerHTML = str;
}