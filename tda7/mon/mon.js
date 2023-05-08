const kingost = new Audio('sound/kingost.mp3');
kingost.loop = true;
kingost.volume = 0.1;
let companionRepl;
let yourVarRepl;
 
let var_answer;
let step = -1;
let luck = 30;
let is = false;
$('#tutor').hide();
$('.dansw:eq(0)').css('top', '78.5%');
$('.dansw:eq(1)').css('top', '88%');
$('.dansw:eq(2)').css({'top': '78.5%', 'margin-left': '50.5%'});
$('.dansw:eq(3)').css({'top': '88%', 'margin-left': '50.5%'});
$('.dansw:gt(0)').hide();
$('#tutor').slideDown(500);

async function f(){
    let response = await fetch('https://tda7.onrender.com/mon/repl.txt');
    let txt = await response.text();
    companionRepl = txt.split('\n');
    response = await fetch('https://tda7.onrender.com/mon/YVarRepl.txt');
    txt = await response.text();
    yourVarRepl = txt.split('\n');
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
    let color=correct?'#ffafbc71':'#0000008a';
    luck+=correct?15:Math.ceil(-luck*0.7);
    $('#scale_fail').animate({height: `${luck}%`}, 300);
    $('#idkwtf').animate({background: `radial-gradient( #00000010 65%, ${color})`},300)
    $('#idkwtf').animate({background: 'radial-gradient( #00000010 65%, #00000000)'},300)
}
function answers_change(step) {
    let replThatFits = new Array();
    let i = 0;
    setTimeout(() => {
        for (let repl of yourVarRepl){
            if(repl.slice(0,1)==step) {
                replThatFits = repl.split('/');
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
    }, 100);
}
function print_txt(txt, step){

    $('.dansw').fadeOut(100);
    $('d:first').text('');
    let p=0;
    let print = setInterval(() => {
        $('d:first').text($('d:first').text() + txt[p]);
        let txtsound = new Audio('sound/txt_sound.mp3'); 
        txtsound.play();
        p++
        if(p==txt.length) clearInterval(print); 
    }, 40);
}

$('.dansw').click(function() {
    var_answer = Number($(this).attr('var_answer'));
    step = var_answer;
    console.log(step);
    if($(this).attr('correct')!=2){
        luck_change($(this).attr('correct'));
        console.log(1);
    }
    print_txt(Repl[step]);
    answers_change(step);
});