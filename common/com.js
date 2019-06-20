

function runAnimate(percent,dom){

    var totalTime = 3;
    var $circleAnimate = dom.find('#circleAnimate');
    var per = percent/100;
    var durTime = totalTime * per;

    $circleAnimate[0].setAttribute('repeatDur', durTime + 's');
    $circleAnimate[0].beginElement();
}


function narrow(){
    if(window.innerWidth<1000||window.innerHeight<1200){

    }
    let scale = 1/3;
    let width = $('html').width()*scale;
    let height = $('html').height()*scale;
    $('html').css({
        position: 'absolute',
        transform:'scale('+scale+')',
        left:-width,
        top:-height
    });
}

