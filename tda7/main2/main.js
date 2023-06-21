setInterval(() => $('#wrapper').fadeTo(500, 0.8, ()=>$('#wrapper').fadeTo(500, 1)), 300);
setInterval(() => $('#flud').text(Number($('#flud').text())+1), 950)
$('#incontact').hide();