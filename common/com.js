

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
    let width = $('html').width()*0.25;
    let height = $('html').height()*0.25;
    $('html').css({
        position: 'absolute',
        transform:'scale(0.5)',
        left:-width,
        top:-height
    });
}

