let c = JSON.parse(localStorage.getItem('c'));
c = c ?? 30;
$('.newm:first').html(c);
sc = JSON.stringify(c);
localStorage.setItem('c', sc);
setInterval(() => {
    $('.newm:first').html(c); 
    c++; 
    sc = JSON.stringify(c); 
    localStorage.setItem('c', sc);
}, Math.random()*1700);

$('m').hide()
$('.chat').click(function () { 
    $('.chat').removeClass('chat_active');
    $(this).addClass('chat_active');
    $(`${this} .newm`).remove();
});
function show_message(n1,n2){
    $('m').hide()
    $(`.msg:lt(${n2})`).slideDown();
    $(`.msg:lt(${n1})`).hide();
}

// show_message('msg');