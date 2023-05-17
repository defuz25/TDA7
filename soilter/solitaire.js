const txta = document.getElementById('2');
setInterval(()=>{$('h1').animate({'font-size':'40'}, 800);$('h1').animate({'font-size':'30'}, 800);},700);
$('#ruls').hide();
const cards_m = ['\u2660', //black ♠
 '\u2661', //red ♡
  '\u2662', //red ♢
   '\u2663']; //black ♣
let cards = new Array();
let solitaire_back = {
    column1:new Array(),
    column2:new Array(),
    column3:new Array(),
    column4:new Array(),
    column5:new Array(),
    column6:new Array(),
    reserve:new Array()
};
let solitaire_front = {};
let countR = 0;
for(let m of cards_m) for (let v=13;v>=1;v--) cards.push(v+m); //колода
function plus_card(a){ //перетасовка
    if(a<=6){
        for(let c=1;c<=a;c++){
            let removed_card = cards.splice(Math.floor(Math.random()*cards.length), 1);
            solitaire_back[`column${a}`].unshift(String(removed_card));
        }
        plus_card(a+1);
    }
    solitaire_back.reserve = cards.sort(function(){return Math.random()-0.5}); //перетасовка резерва
}

function hide_cards(a){
    if(a<=6){
        for(let c=0;c<solitaire_front[`column${a}`].length-1;c++){
            solitaire_front[`column${a}`].splice(c, 1, '[-]');
        }
        hide_cards(a+1);
    }
}

function motion_card(card_col, card_pos, to_col){
    // if(card_col==0){
    //     let taken_card = solitaire_back['reserve'].slice(countR, 1); //карта из запаса
        // to_col
    // } else{
        let numTakenCards = solitaire_back[`column${card_col}`].length-card_pos+1; //число взятых карт
        let taken_card = solitaire_back[`column${card_col}`].slice(card_pos-1); //взятые карты
        let taken_cardFirst = String(solitaire_back[`column${card_col}`].slice(card_pos-1)[0]); //первая карта из взятых
    // }
    let idk = solitaire_back[`column${to_col}`]; //что это
    let idk_card = String(idk.slice(-1,String(idk).length-1)); //карта покрываемая
    if(taken_card!==undefined && taken_card!==null && taken_card!='' && String(solitaire_front[`column${card_col}`].slice(card_pos-1,card_pos))!='[-]'){ 
        //проверка: есть ли карта и не скрыта ли она
        let i1 = taken_cardFirst[taken_cardFirst.length-1]; //масть взятой символом
        let i2 = idk_card[idk_card.length-1]; //масть крытой символом
        let first = (i1!='\u2661' && i1!='\u2662'); //п: масти взятой карты
        let second = (i2!='\u2661' && i2!='\u2662'); //п: масти крытой карты
        if(!(first && second) && (first!=second)){ //сравнение мастей карт
            if(idk_card.slice(0, -1)-taken_cardFirst.slice(0, -1)==1){ //сравнение достоинств карт
                for (let u of taken_card) solitaire_back[`column${to_col}`].push(String(u));
                solitaire_back[`column${card_col}`].splice(card_pos-1,numTakenCards);
                for (let u of taken_card) solitaire_front[`column${to_col}`].push(String(u));
                solitaire_front[`column${card_col}`].splice(card_pos-1,numTakenCards);
                solitaire_front[`column${card_col}`].splice(-1,1,String(solitaire_back[`column${card_col}`].slice(-1))); //раскрытие карты
            } else $('b').text(402);
        } else $('b').text(403);
    } else $('b').text(404);
    setTimeout(()=>$('b').text(''), 1000);
}

plus_card(1);
solitaire_front = JSON.parse(JSON.stringify(solitaire_back));
function renameCards(){
for(let k in solitaire_front){
    for(let e of solitaire_front[k]){
        switch(Number(e.slice(0,-1))){
            case 1:
                solitaire_front[k].splice(solitaire_front[k].indexOf(e),1,'A'+ String(e.slice(1)));
                break;
            case 11:
                solitaire_front[k].splice(solitaire_front[k].indexOf(e),1,'J'+ String(e.slice(2)));
                break;
            case 12:
                solitaire_front[k].splice(solitaire_front[k].indexOf(e),1,'Q'+ String(e.slice(2)));
                break;
            case 13:
                solitaire_front[k].splice(solitaire_front[k].indexOf(e),1,'K'+ String(e.slice(2)));
        }
    }
}
}
renameCards();
hide_cards(1);
for(let l of solitaire_front.reserve) solitaire_front.reserve.splice(solitaire_front.reserve.indexOf(l),1,'[-]');

for(let t in solitaire_front) txta.textContent += solitaire_front[t].join(' ') + '\n';
// for(let p=0;p<6;p++){
//     for(let u in solitaire_front){
//         if(p>solitaire_front[u].length-1) txta.textContent += '   ';
//         else txta.textContent += solitaire_front[u][p]
//     }txta.textContent += '\n';
// }

$('#1').click(function () {
    txta.textContent = '';
    let m = $('input').val();
    let mov = m.split(' ');
    motion_card(mov[0], mov[1], mov[2])
    renameCards();
    for(let t in solitaire_front) txta.textContent += solitaire_front[t].join(' ') + '\n';
    $('input').val('');
});
let click = 0;
$('#how').click(()=>{
    if(!click) {$('#ruls').slideDown(); click=1; $('#how').css('color', '#7c7c7c');}
    else {$('#ruls').slideUp(); click=0; $('#how').css('color', '#acacac');}
});
$('#r').click(()=>{
    countR = (countR==solitaire_back.reserve.length-1)?0:countR;
    for(let l of solitaire_front.reserve) solitaire_front.reserve.splice(solitaire_front.reserve.indexOf(l),1,'[-]');
    solitaire_front.reserve[countR]=solitaire_back.reserve[countR];
    txta.textContent = '';
    renameCards();
    for(let t in solitaire_front) txta.textContent += solitaire_front[t].join(' ') + '\n';
    countR++;
});