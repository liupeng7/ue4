

function runAnimate(percent,dom){

    // if(percent == 0){
    //     percent = 0.1;
    // }

    var totalTime = 3;
    var $circleAnimate = dom.find('#circleAnimate');
    var per = percent/100;
    var durTime = totalTime * per;

    $circleAnimate[0].setAttribute('repeatDur', durTime + 's');
    $circleAnimate[0].beginElement();
}


function narrow(){
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

