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
    let response = await fetch('https://tda7.onrender.com/mon/replK.txt');
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
    luck+=correct?15:Math.ceil(-luck*0.7);
    $('#scale_fail').animate({height: `${luck}%`}, 300);
}
function answers_change(step) {
    setTimeout(() => {
        for(let i=0;i<=3;i++){
            let cor = yourVarRepl[step+i].slice(-1);
            let st = yourVarRepl[step+i].slice(0,1);
            $(`.dansw:eq(${i})`).attr('var_answer', yourVarRepl[step+i].slice(1,2));
            if(st==step){
                if(cor==1 || cor==0){
                    $(`d:eq(${i+1})`).text(yourVarRepl[step+i].slice(0,-1));
                    $(`.dansw:eq(${i})`).attr('correct', cor);
                }else{
                    $(`d:eq(${i+1})`).text(yourVarRepl[step+i]);
                    $(`.dansw:eq(${i})`).attr('correct', 2);
                }
            }else{
                $(`.dansw:eq(${i})`).hide();
            }
        }
    }, 100);
}
function print_txt(txt, who){
    if (who) $('d:first').css('font-family', 'Times New Roman');
    else $('d:first').css('font-family', 'monospace');
    is = false;
    $('.dansw').fadeOut(100);
    let p=0;
    $('d:first').text('');
    let print=setInterval(() => {
        $('d:first').text($('d:first').text() + txt[p]);
        let txtsound=new Audio('sound/txt_sound.mp3'); 
        txtsound.play();
        p++
        if(p==txt.length){
            is = true;
            clearInterval(print); 
            if (!who) setTimeout(() => $('.dansw').fadeIn(300), 200);
        }
    }, 40);
}

$('.dansw').click(function() {
    var_answer = Number($(this).attr('var_answer'));
    step=var_answer;
    console.log(step);
    if($(this).attr('correct')!=2){
        luck_change($(this).attr('correct'));
        console.log(1);
    }
    print_txt(companionRepl[step]);
    answers_change(step);
});