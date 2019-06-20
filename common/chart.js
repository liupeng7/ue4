
(function(){

    let TiaoStyleColor = new echarts.graphic.LinearGradient(
        1, 0, 0, 0,
        [

            {offset: 0, color: '#ffb55e'},
            {offset: 1, color: '#ffb55e'}
        ]
    );

    let TiaoHoverColor = new echarts.graphic.LinearGradient(
        1, 0, 0, 0,
        [

            {offset: 0, color: '#fed39e'},
            {offset: 1, color: '#fed39e'}
        ]
    );


    let BarColorArr = [];
    let HoverColorArr = [];

    let BarColor1 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#fff6e1'},
            {offset: 0.02, color: '#ffc36a'}
        ]
    );
    let BarColor2 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#dff6fd'},
            {offset: 0.02, color: '#66c5f5'}
        ]
    );
    let BarColor3 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#cefee3'},
            {offset: 0.02, color: '#2ef772'}
        ]
    );



    BarColorArr.push(BarColor1);
    BarColorArr.push(BarColor2);
    BarColorArr.push(BarColor3);


    function PieChart(options){
        var defaultOption={
            conId:'',
            radius:'60%',
            roseType:'radius',
            center:['50%','50%'],
            name:'',
            showLegend:false,
            legendArray:[],
            legendRight:15,
            itemWidth:10,
            itemHeight:10,
            fontSize:18,
            itemGap:20,
            showLabel:false,
            showLabelLine:false,
            showLabelPer:false,
            colorArray:['#EF7663', '#1AA7B3', '#F968A9', '#F968A9', '#804FCD', '#FFB55E', '#2247B2'],
            dataArray:[],
            fn:function(){}
        };
        options = $.extend(false,defaultOption,options);
        var legendName=[];
        var labelPercent = [];
        var legendValue = null;
        for(var i=0;i<options.dataArray.length;i++){
            legendName.push(options.dataArray[i].name);
            labelPercent.push(options.dataArray[i].percent);
        }

        var option={
            tooltip : {
                formatter:function(params){
                    var index = params.dataIndex;
                    var per = labelPercent[index];
                    if(per) {
                        return params.name + ":" + params.value + " " + "(" + per + "%)"
                    }else{
                        return params.name + ":" + params.value
                    }
                }
            },
            legend: {
                show:options.showLegend,
                type: 'scroll',
                orient: 'vertical',
                top:'middle',
                itemGap:10,
                right: options.legendRight,
                itemWidth:options.itemWidth,
                itemHeight:options.itemHeight,
                textStyle:{
                    color:'rgba(255,255,255,1)',
                    fontSize:options.fontSize
                },
                formatter: function (name) {

                    for(var i=0;i<options.dataArray.length;i++){
                        var obj=options.dataArray[i];
                        if(name == obj.name){
                            legendValue = obj.value;
                        }
                    }

                    return name +'  '+ legendValue;
                },
                data:legendName,
            },

            color:options.colorArray,
            series : [
                {
                    name:options.name,
                    type:'pie',
                    center:options.center,
                    radius :options.radius,
                    roseType:options.roseType,
                    clockwise:false,
                    label: {
                        normal: {
                            show:options.showLabel,
                            fontSize:options.fontSize,
                            color:'rgba(255,255,255,0.75)',
                            formatter:function(params){
                                if(options.showLabelPer){
                                    return params.name + ':' + params.percent + '%'
                                }else{
                                    return params.name
                                }
                            }

                        },

                    },
                    labelLine: {
                        normal: {
                            show: options.showLabelLine,
                            length:8
                        }
                    },
                    itemStyle:{
                        emphasis:{
                            color:'#80fbff'
                        }
                    },
                    data:options.dataArray

                }
            ]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.setOption(option);
        myChart.on('click',options.fn)
    }



    function RingChart(options) {
        var defaultOption={
            conId:'',

            showTooltip:true,
            showLegend:true,
            itemGap:24,
            legendRight:'center',
            legendTop:'center',
            legendFont:18,
            legendColor:'rgba(255,255,255,0.6)',
            legendArray:[],

            colorArray:['#ffc569', '#74b860', '#b18af3', '#0d96ff'],
            roseType:'area',
            radius:'60%',
            center:['50%','50%'],
            labelFont:28,
            labelShow:true,
            labelLineShow:false,
            labelShowCustom:false,
            labelShowCustomF:'',
            labelLineLength:40,
            labelLineLength2:30,


            dataArray:[]
        };
        options = $.extend(false,defaultOption,options);

        var legendName = [];
        for(var i=0;i<options.dataArray.length;i++){
            legendName.push(options.dataArray[i].name)
        }
        var option = {
            tooltip:{
                show:options.showTooltip,
                formatter: function (params) {

                },
            },
            legend: {
                show:options.showLegend,
                orient: 'vertical',
                top:options.legendTop,
                right: options.legendRight,
                itemGap:options.itemGap,
                itemWidth:20,
                itemHeight:20,
                textStyle:{
                    color:options.legendColor,
                    fontSize:options.legendFont
                },
                formatter: function (name) {
                    return name
                },
                data:legendName
            },
            color:options.colorArray,
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: options.radius,
                    center:options.center,
                    roseType: options.roseType,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: options.labelShow,
                            fontSize:options.labelFont,
                            color:'rgba(255,255,255,0.6)',
                            formatter:function (pp) {
                                if(options.labelShowCustom){
                                    return pp.name+'\n'+'{font|'+pp.value+'}'

                                }else{
                                    return pp.value+'%';
                                }
                            },
                            rich:{
                                font:{
                                    fontSize:36,
                                    color:'#fff',
                                    padding:[0,0,10,0]
                                }
                            }
                        },
                        emphasis: {
                            show: true,
                        }
                    },
                    labelLine: {
                        normal: {
                            show:  options.labelLineShow,
                            length:options.labelLineLength,
                            length2:options.labelLineLength2,
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor:'#061d2d',
                            borderWidth:0
                        }
                    },
                    data:options.dataArray
                }
            ]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.setOption(option);
    }

    function BarChart(options) {
        let defaultOption={
            conId:'',
            zdyLable:{},
            name:'',
            left:0,
            fontSize:18,
            xArray:[],
            colorArray:BarColorArr,
            isShowText:true,
            isshowhover_perc:false,
            axisLine:true,
            fontWeight:'',
            barWidth:'45%',
            unit:'',
            stack:'',
            dataArray:[],
        };

        options = $.extend(false,defaultOption,options);



        var option={
            grid: {
                left: options.left,
                top:'15%',
                right:'1%',
                bottom:'5%',
                containLabel: true
            },
            tooltip : {
                formatter:function (params) {
                    if(options.unit){
                        return params.name + ': ' + params.data + options.unit;
                    }
                    if(options.isshowhover_perc == true){
                        return '● ' + params.name + ': ' +  params.data + '%';
                    }else{
                        return '● ' + params.name + ': ' + params.data ;
                    }
                }
            },
            xAxis: {

                axisTick: {
                    show:false
                },
                axisLine: {
                    show:true,
                    lineStyle:{
                        width:2,
                        color:'#828e96'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    margin:18,
                    textStyle: {
                        color: "#fff",
                        fontSize: options.fontSize,
                        fontWeight:options.fontWeight,
                    },
                    formatter:function (val) {
                        var ParamsName = "";
                        var paramsNameNumber = val.length;

                        if (paramsNameNumber > 5) {
                            ParamsName = val.substring(0, 4) + '...';
                        } else {
                            ParamsName = val;
                        }
                        return ParamsName
                    }
                },
                data: options.xArray
            },
            yAxis: [
                {
                    name:options.name,
                    nameLocation:'start',
                    nameTextStyle:{
                        color: "#fff",
                        fontSize:20,
                        fontWeight:'bold',
                        padding: [5,0,0,70],
                    },
                    type: 'value',
                    axisTick: {
                        show:false
                    },
                    axisLine: {
                        show:options.axisLine,
                        lineStyle:{
                            width:2,
                            color:'#828e96'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }

                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    itemStyle: {
                        normal:{
                            label:{
                                show:options.isShowText,
                                position: 'top',
                                padding:[0,0,5,0],
                                textStyle:{
                                    color:'#fff',
                                    fontSize:options.fontSize,
                                    fontWeight:'bold'
                                },
                                formatter:function (params){
                                    if(options.unit){
                                        return params.value+options.unit
                                    }else{
                                        return params.value
                                    }
                                },
                            },
                            barBorderRadius:[3, 3, 0, 0],
                            color:function(params){
                                if(options.colorArray.length==1){
                                    return options.colorArray[0]
                                }else{
                                    return options.colorArray[params.dataIndex]
                                }
                            }
                        }


                    },
                    barWidth: options.barWidth,
                    data: options.dataArray
                }

            ]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.setOption(option);

    }

    function LineChart(options) {
        var defaultOption={
            conId:'',
            fontSize:18,

            colorArray:['#01dafe','#58e569','#f0a54a'],

            showLegend:false,
            legendSize:12,
            legendLeft:0,
            legendTop:0,
            itemWidth:10,
            itemHeight:10,
            itemGap:10,

            gridBottom:'10%',
            gridLeft:'10%',
            gridRight:'10%',
            gridTop:'10%',

            XaxisLabelFontSize:18,
            boundaryGap:false,

            showY:false,
            splitLine:false,
            axisLabel:true,
            markLine:true,
            markLine_custom:{},
            markPoint:false,
            smooth:true,
            lineWidth:2,
            lineColor:'',
            max:null,
            showSymbol:true,
            areaStyleShow:true,
            areaStyleColor:new echarts.graphic.LinearGradient(0, 0, 0, 1,
                [{offset: 0, color: 'rgba(64,216,84,1)'},
                    {offset: 1, color: 'rgba(79,242,240,0.3)'}]),
            txtColor:'#fff',
            markLinecolor:'',


            dataArray:[],//数据
        };
        options = $.extend(false,defaultOption,options);
        let seriesData = [];
        let xAxisData = [];
        let markPoint='',markLine='';
        for(let i=0;i<options.dataArray.length;i++){
            seriesData.push(options.dataArray[i].value);
            xAxisData.push(options.dataArray[i].name)
        }
        if(options.markPoint){
            markPoint={
                data: [
                    {
                        type: 'max',
                        name: '最大值',
                        label:{
                            show:true
                        }
                    },
                    {type: 'min', name: '最小值'}
                ]
            }
        }
        if(options.markLine){
            markLine={
                data: [
                    {
                        type: 'average',
                        name: '平均值',
                        itemStyle :{
                            normal: {
                                fontSize:18,
                                color: options.markLinecolor,
                            },
                        }
                    }
                ]
            }
        }
        if(options.markLine_custom){
            markLine=options.markLine_custom
        }
        var option = {
            color:options.colorArray,
            legend:{
                show:options.showLegend,
                left:options.legendLeft,
                top:options.legendTop,
                orient:'horizontal',
                icon:'rect',
                itemWidth:options.itemWidth,
                itemHeight:options.itemHeight,
                textStyle:{
                    color:options.colorArray,
                    fontSize:options.legendSize,
                },
                itemGap:options.itemGap,

            },
            tooltip: {
                trigger:'axis',

            },
            grid: {
                left: options.gridLeft,
                right: options.gridRight,
                top: options.gridTop,
                bottom: options.gridBottom,
            },
            dataZoom:{
                type:'inside',
                start:0,
                end:100
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#b2b2b2',
                        fontSize: options.XaxisLabelFontSize,
                        baseline: 'top',
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine:{
                    show:false
                },
                boundaryGap:options.boundaryGap,
                data: xAxisData
            },
            yAxis: {
                type: 'value',
                max:options.max,
                axisLine: {
                    show: options.showY,
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                axisLabel: {
                    show: options.axisLabel,
                    showMinLabel:false,
                    textStyle: {
                        color:options.txtColor,
                        fontSize: options.fontSize,
                        baseline: 'top'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: options.splitLine,
                    lineStyle:{
                        color:"#334050",
                        type:'dotted'
                    }
                },
            },
            series: {
                name:'',
                type: 'line',
                smooth: options.smooth,
                showSymbol:options.showSymbol,
                lineStyle:{
                    normal:{
                        width:options.lineWidth,
                    }
                },
                areaStyle: {
                    show:options.areaStyleShow,
                    normal: {
                        color:options.areaStyleColor
                    }
                },
                markPoint:markPoint,
                markLine:markLine,
                symbolSize: 15,
                data: seriesData,
            }
        };
        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.clear();
        myChart.setOption(option);
    }



    function RadarChart(options){
        let defaultOption =  {
            conId:'',
            dataArray:[]
        };

        options = $.extend(false,defaultOption,options);

        let option = {
            title: {
                text: ''
            },
            tooltip: {},

            radar: [{
                center: ['55%', '50%'],
                radius: 180,
                name: {
                    show:true,
                    textStyle: {
                        fontSize: 24,
                        color: 'rgba(255,255,255,0)'
                    }
                },
                splitNumber:4,
                shape: 'polygon',
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.7)',
                        width: 2,
                        type: 'solid',
                        opacity: 0.8
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#98cde0',
                        width: 2,
                        opacity: 0.5
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(0,150,255,0.8)','rgba(1,19,33,0.8)'],
                    }
                },
                indicator: [
                    {name: '绩效指数', max:100},
                    {name: '平安指数', max:100},
                    {name: '和谐指数', max:100},
                    {name: '先锋指数', max:100},
                    {name: '服务指数', max:100},
                    {name: '活力指数', max:100} ]
            }],
            series: [{
                name: '',
                type: 'radar',
                symbol:'circle',
                symbolSize:20,
                areaStyle: {
                    normal: {
                        color: 'rgba(0,102,24,0.9)'
                    }
                },
                itemStyle:{
                    normal:{
                        color:'rgba( 255, 255, 255, 0.8 )',
                        borderColor:'rgb( 237, 89, 60 )',
                        borderWidth:4
                    }

                },
                lineStyle: {
                    normal: {
                        width:6,
                        color: 'rgba(50,255,151,0.9)',
                    }
                },
                data : [
                    {
                        value : options.dataArray,
                        name : ''
                    }
                ]
            }]
        };

        let dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        let myChart = echarts.init(dom);
        myChart.clear();
        myChart.setOption(option);
    }

    function BarLineChart(options){
        let defaultOption =  {
            conId:'',
            xData:[],
            lineData:[],
            barData: [],
            fn:function(){}
        };

        options = $.extend(false,defaultOption,options);
        let option = {
            tooltip: {
                trigger: 'axis',
                padding:10,
                textStyle:{
                    fontSize:22
                }

            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: options.xData,
                    axisPointer: {
                        show:true,
                        type: 'shadow'
                    },
                    axisLine:{
                        lineStyle: {
                            color: 'rgba(255,255,255,0.7)',
                            width: 2,
                            type: 'solid',
                            opacity: 0.8
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        margin: 18,
                        textStyle: {
                            color: "#fff",
                            fontSize: 24,
                        },
                    },
                    axisTick:{
                        show:false
                    }

                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '水量',
                    axisTick:{
                        show:false
                    },
                    axisLine:{show:false},
                    axisLabel: {
                        show:false
                    },
                    splitLine:{show:false}
                },
                {
                    type: 'value',
                    name: '温度',
                    axisTick:{
                        show:false
                    },
                    axisLine:{show:false},
                    axisLabel: {
                        show:false
                    },
                    splitLine:{show:false}
                }
            ],
            series: [
                {
                    name:'指数',
                    type:'bar',
                    barWidth:'35%',
                    itemStyle:{
                        normal:{
                            color:'#ffc46a',
                        }
                    },
                    markLine: {

                        data: [
                            {
                                type: 'average',
                                name: '平均值',
                                label:{
                                    normal:{
                                        fontSize:24
                                    }
                                }
                            }
                        ]
                    },
                    data:options.barData
                },
                {
                    name:'排名',
                    type:'line',
                    yAxisIndex: 1,
                    symbolSize:20,
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                width:6,
                                color:'rgb(1,174,253)',
                            }
                        }
                    },
                    data:options.lineData
                }
            ]
        };

        let dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        let myChart = echarts.init(dom);
        myChart.off('click');
        myChart.clear();

        myChart.setOption(option);

        myChart.on('click',options.fn)
    }

    function TwoBarChart(options){
        let defaultOption={
            conId:'',
            xArray:[],
            colorArray:[],
            barWidth:'45%',
            dataArray:[],
        };

        options = $.extend(false,defaultOption,options);


        let barData = [];

        let BarColor1 = new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [

                {offset: 0, color: '#fff6e1'},
                {offset: 1, color: '#ffc36a'}
            ]
        );
        let BarColor2 = new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [

                {offset: 0, color: '#dff6fd'},
                {offset: 1, color: '#66c5f5'}
            ]
        );

        let markerLineColor = ['#ffc36a','#66c5f5'];

        options.colorArray.push(BarColor1);
        options.colorArray.push(BarColor2);

        $.each(options.dataArray,function(i,n){

            barData.push({
                name:'',
                type:'bar',
                data:n,
                markLine: {
                    data: [
                        {
                            type: 'average',
                            name: '平均值',
                            label:{
                                normal:{
                                    fontSize:24
                                }
                            },
                            itemStyle :{
                                normal: {
                                    color:markerLineColor[i]
                                },
                            }}
                    ]
                },
                itemStyle:{
                    normal:{
                        color:function(params){
                            return options.colorArray[i]
                        }
                    }
                }
            })
        });


        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type: 'category',
                    data: options.xArray,
                    axisLabel: {
                        show: true,
                        interval: 0,
                        margin: 18,
                        textStyle: {
                            color: "#fff",
                            fontSize: 24,
                        },
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel:{show:false},
                    axisLine:{show:false},
                    axisTick:{show:false},
                    splitLine:{show:false}
                }
            ],
            series : barData
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.clear();
        myChart.setOption(option);
    }






    window.Xchart = {
        PieChart:PieChart,
        RingChart:RingChart,
        BarChart:BarChart,
        LineChart:LineChart,
        RadarChart:RadarChart,
        BarLineChart:BarLineChart,
        TwoBarChart:TwoBarChart,
    }
})();




