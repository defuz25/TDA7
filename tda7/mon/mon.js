const kingost = new Audio('sound/kingost.mp3');
kingost.loop = true;
kingost.volume = 0.1;
const FR = new FileReader();
let companionText;
 
let var_answer;
let step = 0;
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
    let response = await fetch('https://tda7.onrender.com/mon.txt');
    let txt = await response.text();
    companionText = txt.split('\n');
}
// async function f(){
//     let response = await fetch('http://e965137u.beget.tech/dialogs.json',
//     {
//         mode: 'no-cors',
//         method: "post",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
//     let text = await response.json();
//     if (response.ok) {
//         console.log(text);
//     }
// }
f();


$('#tutor').click(()=> {
    $('#tutor').slideUp(500);
    
})

function sprite_change(ns){
    $('#men').fadeOut(250, 'linear', ()=>$('#men').attr('src', `sprites/kn${ns}.png`));
    $('#men').fadeIn(250, 'linear');
}
function luck_change(correct){
    luck+=correct?15:Math.ceil(-luck*0.7)
    $('#scale_fail').animate({height: `${luck}%`}, 300);
}
function answers_change(a0,a1,a2,a3) {
    setTimeout(() => {
        $('d:eq(1)').text(a0);
        $('d:eq(2)').text(a1);
        $('d:eq(3)').text(a2);
        $('d:eq(4)').text(a3);
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
    print_txt(companionText[step]);
});