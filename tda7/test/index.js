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
$('#cats').hide();
$('#cont').css('visibility', 'hidden');
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

function sprite_change(name,ns){{
    $(`#${name}`).fadeOut(250, 'linear', ()=>{
        $(`#${name}`).attr('src', `sprites/${name+ns}.png`);
        $(`#${name}`).fadeIn(250);
    });
    
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
function print(txt,fn){
    $('d:first').text('');
    let p=0;
    let print = setInterval(() => {
        $('d:first').text($('d:first').text() + txt[p]);
        let txtsound = new Audio('sound/txt_sound.mp3'); 
        txtsound.play();
        p++
        if(p==txt.length) {
            clearInterval(print);
            fn();
        }
    }, 30);
}
function dialog(step){
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
    print(txt,()=>{answers_change(step)});
}
function cutscenes(){
    let i = 0;
    $('#dwind').animate({top: '150%'},1000,'swing',()=>$('#dwind').css({visibility: 'hidden'}));
    $('#sf_border').animate({left: '-150px'},1000);
    $('.dansw').fadeOut(100);
    // $('#dwind').fadeOut(500);
    $('#idkwtf').css({background: 'radial-gradient( #00000000, 65%, black)'})
    $('#idkwtf').animate({opacity: '1'}, 700);
    $('d:first').text('');
    $('#dwind').animate({top: '75%'},1000,'swing',()=>print(cats[i],()=>$('#cont').css({visibility: 'visible'})));
    sprite_change('cats', i);
    $('#cont').click(()=>{
        i++;
        $('#cont').css('visibility', 'hidden');
        if(cats[i]!=0){
            sprite_change('cats', i);
            print(cats[i],()=>{
                $('#cont').css({visibility: 'visible'});
            });
        } else {
            $('#cont').fadeOut(250);
            $('#dwind').animate({top: '120%'},1000,'swing',()=>$('#dwind').css({visibility: 'visible'}));
            $('#dwind').animate({top: '62%'},1000);
            $('#sf_border').animate({left: '10px'},1000);
            $('.dansw').fadeIn(1000);
            $('#idkwtf').animate({opacity: '0'}, 700);
            $('#idkwtf').css({background: 'radial-gradient( #00000000, 65%, #ffafbc71)'})
            dialog(cats[i].slice(1));
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
        dialog(step);
    }
});