const day = 'test';
let repls;
let yourVarRepl;
let correct;
let var_answer;
let cats;
let step = -1;
let luck = 30;
let is1 = false;
let isCat = false;
// $('#tutor').hide();
$('#cont').fadeOut(0);
$('.dansw:eq(0)').css('top', '78.5%');
$('.dansw:eq(1)').css('top', '88%');
$('.dansw:eq(2)').css({'top': '78.5%', 'margin-left': '50.5%'});
$('.dansw:eq(3)').css({'top': '88%', 'margin-left': '50.5%'});
$('.dansw:gt(0)').hide();
// $('#tutor').slideDown(500);

window.onload = function () {
    setTimeout(function () {
      $('#loader').fadeOut(1000);
    }, 500);
  }

async function f(){
    let response = await fetch(`https://tda7.onrender.com/${day}/repl.txt`);
    let txt = await response.text();
    repls = txt.split('\n');
    response = await fetch(`https://tda7.onrender.com/${day}/YVarRepl.txt`);
    txt = await response.text();
    yourVarRepl = txt.split('\n');
    response = await fetch(`https://tda7.onrender.com/${day}/cat.txt`);
    txt = await response.text();
    cats = txt.split('\n');
}
f();


$('#tutor').click(()=> {
    $('#tutor').slideUp(500);
})

function sprite_change(ns){
    $('#men').fadeOut(250, 'linear', ()=>$('#men').attr('src', `sprites/kn${ns}.png`));
    $('#men').fadeIn(250, 'linear');
}
function luck_change(correct){
    luck+=correct?15:Math.ceil(-luck*0.7);
    $('#scale_fail').animate({height: `${luck}%`}, 300);
    if(correct) {
        $('#idkwtf').animate({opacity: '1'}, 300);
        $('#idkwtf').animate({opacity: '0'}, 900);
    }
}
function answers_change(step) {
    let replThatFits = new Array();
    let i = 0;
    setTimeout(() => {
    if(!is1){
        for (let repl of yourVarRepl){
            replThatFits = repl.split('/');
            if(replThatFits[0]==step) {
                $(`.dansw:eq(${i})`).attr('var_answer', replThatFits[1]);
                if (replThatFits[3]==0||replThatFits[3]==1){
                    $(`.dansw:eq(${i})`).attr('correct', replThatFits[3]);
                } else {
                    $(`.dansw:eq(${i})`).attr('correct', 2);
                }
                $(`d:eq(${i+1})`).text(replThatFits[2]);
                $(`.dansw:eq(${i})`).fadeIn(300);
                i++;
            }
        }
    } else {
        $('.dansw:eq(2)').fadeIn(300);
        $(`.dansw:eq(2)`).attr('correct', 2);
    }
    }, 100);
}
function print_txt(step){
    let txt = repls[step];
    if(txt.slice(0,1)==1){
        let arrayRepl = txt.split('/');
        txt = arrayRepl[1];
        is1 = true;
        $(`.dansw:eq(2)`).attr('var_answer', arrayRepl[2]);
        $(`d:eq(3)`).text('>');
        if(arrayRepl[3]!=0) $('d:first').css('font-style','italic');
        else $('d:first').css('font-style','normal');
    } else is1 = false;
    $('.dansw').fadeOut(100);
    $('d:first').text('');
    let p=0;
    let print = setInterval(() => {
        $('d:first').text($('d:first').text() + txt[p]);
        let txtsound = new Audio('sound/txt_sound.mp3'); 
        txtsound.play();
        p++
        if(p==txt.length) {
            clearInterval(print);
            answers_change(step);
        }
    }, 30);
}
function cutscenes(){
    let i = 0;
    isCat = true;
    $('#dwind').animate({top: '150%'},1000,'swing',()=>$('#dwind').css({visibility: 'hidden'}));
    $('#sf_border').animate({right: '150%'},1000);
    $('.dansw').fadeOut(100);
    // $('#dwind').fadeOut(500);
    $('#idkwtf').css({background: 'radial-gradient( #00000000, 65%, #00000071)'})
    $('#idkwtf').animate({opacity: '1'}, 700);
    $('#dwind').animate({top: '75%'},1000);
        $('#dwind').click(()=>{
            $('#cont').fadeOut(100);
            let txt = cats[i++];
            if(typeof txt!='number'){
                $('#dwind').css('pointer_events', 'none');
                let p=0;
                let print = setInterval(() => {
                    $('d:first').text($('d:first').text() + txt[p]);
                    // let txtsound = new Audio('sound/txt_sound.mp3'); 
                    // txtsound.play();
                    p++
                    if(p==txt.length) {
                        clearInterval(print);
                        answers_change(step);
                        $('#cont').fadeIn(100);
                        $('#dwind').css('pointer_events', 'auto');
                    }
                }, 30);
            } else {
                print_txt(txt);
            }
        });
}

$('.dansw').click(function() {
    var_answer = $(this).attr('var_answer');
    if(var_answer=='c') cutscenes();
    else {
        step = var_answer;
        correct = $(this).attr('correct');
        console.log(correct);
        console.log(step);
        if(correct!=2){
            luck_change(correct);
        }
        print_txt(step);
    }
});