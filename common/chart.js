
(function(){

    let TiaoStyleColor = new echarts.graphic.LinearGradient(
        1, 0, 0, 0,
        [

            {offset: 0, color: '#ffb55e'},
            {offset: 1, color: '#ffb55e'}
        ]
    );
    //git test

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


    //饼图
    function PieChart(options){
        var defaultOption={
            conId:'', //内容id
            radius:'60%',
            roseType:'radius',
            center:['50%','50%'],
            name:'',
            showLegend:false, //是否显示图例
            legendArray:[], // 图例数据 name value (percent)
            legendRight:15,  //图例位置
            itemWidth:10,
            itemHeight:10,
            fontSize:18,
            itemGap:20,
            showLabel:false,  //显示标签
            showLabelLine:false,  // 标签线
            showLabelPer:false,
            colorArray:['#EF7663', '#1AA7B3', '#F968A9', '#F968A9', '#804FCD', '#FFB55E', '#2247B2'],
            dataArray:[], //数据
            fn:function(){}
        };
        options = $.extend(false,defaultOption,options);
        //获取数据
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

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形
        myChart.on('click',options.fn)
    }

    //条形图
    function TiaoChart(options){

        var defaultOption={
            conId:'', //内容id
            yArray:[],//y轴
            labelPercent:[],
            legendArray:[],
            fontSize:18,
            colorStyle:TiaoStyleColor,//变化的颜色
            hoverStyle:TiaoHoverColor,
            isShowText:true,
            isImportPeo:false,
            barWidth:18,
            barCategoryGap:'20%',//柱状间距
            dataArray:[]
        };

        options = $.extend(false,defaultOption,options);
        var option={
            xAxis: {
                axisTick: {
                    length: 0
                },
                axisLine: {
                    show:false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            grid: {
                left: '0',
                right: '25%',
                top:'5%',
                bottom:'0',
                containLabel: true
            },
            dataZoom:false,
            tooltip:{
                formatter:function(params){
                    var index = params.dataIndex;
                    var per = options.labelPercent[index];
                    var label = '';
                    if(options.isImportPeo){
                        label = params.name + ":" + params.value + " " + "("+ per + "‰)"
                    }else{
                        label = params.name + ":" + params.value + " " + "("+ per + "%)"
                    }
                    return label
                }
            },
            yAxis: {
                axisTick: {
                    show:false
                },
                axisLine: {
                    show:false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    margin:18,
                    textStyle: {
                        color: "rgba(255,255,255,0.75)",
                        fontSize: options.fontSize
                    },
                    formatter:function (val) {
                        var ParamsName = "";// 最终拼接成的字符串
                        var paramsNameNumber = val.length;// 实际标签的个数
                        if (paramsNameNumber > 4) {
                            ParamsName = val.substring(0, 4) + '...';
                        } else {
                            // 将旧标签的值赋给新标签
                            ParamsName = val;
                        }

                        //将最终的字符串返回
                        return ParamsName
                    }
                },
                data: options.yArray
            },
            series: [
                {
                    type: 'bar',
                    barWidth:options.barWidth,

                    itemStyle:{
                        normal:{
                            label:{
                                show:options.isShowText,
                                position: 'right',
                                textStyle:{
                                    color:'rgba(255,255,255,0.75)',
                                    fontSize:16
                                },
                                formatter:function(params){
                                    var index = params.dataIndex;
                                    var per = options.labelPercent[index];
                                    var label = '';
                                    if(options.isImportPeo){
                                        label = params.value + " " + "("+ per + "‰)"
                                    }else{
                                        label = params.value + " " + "("+ per + "%)"
                                    }
                                    return label
                                }
                            },
                            color: options.colorStyle,
                            barBorderRadius:2,
                        },
                        emphasis:{
                            color:options.hoverStyle
                        }
                    },

                    barCategoryGap:options.barCategoryGap,
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

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形
    }

    //圆环
    function RingChart(options) {
        var defaultOption={
            conId:'', //内容id

            showTooltip:true,

            showLegend:true,
            itemGap:24,
            legendRight:'center',
            legendTop:'center',
            legendFont:18,
            legendColor:'rgba(255,255,255,0.6)',
            legendArray:[],

            colorArray:['#ffc569', '#74b860', '#b18af3', '#0d96ff'], //颜色
            roseType:'area',
            radius:'60%',
            center:['50%','50%'],
            labelFont:28,
            labelShow:true,
            labelLineShow:false,

            dataArray:[] //数据

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
                            // position: 'center'
                            fontSize:options.labelFont,
                            color:'rgba(255,255,255,0.6)',
                            formatter:function (pp) {
                                let res =pp.value+'%';
                                return res
                            },
                        },
                        emphasis: {
                            show: true,
                        }
                    },
                    labelLine: {
                        normal: {
                            show:  options.labelLineShow,
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor:'#061d2d',
                            borderWidth:2
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

    //柱状图
    function BarChart(options) {
        let defaultOption={
            conId:'', //内容id
            zdyLable:{},
            name:'', //横坐标名称
            left:0, //左边距
            fontSize:18,
            xArray:[], //X轴
            colorArray:BarColorArr, //颜色
            isShowText:true,
            isshowhover_perc:false,
            axisLine:true, //Y轴
            fontWeight:'',
            barWidth:'45%', //宽度
            unit:'',   //单位
            stack:'',   //叠加效果
            dataArray:[], //series数据
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
                    //var unit = options.hover_unit ? options.hover_unit : '';
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
                        var ParamsName = "";// 最终拼接成的字符串
                        var paramsNameNumber = val.length;// 实际标签的个数

                        if (paramsNameNumber > 5) {
                            ParamsName = val.substring(0, 4) + '...';
                        } else {
                            // 将旧标签的值赋给新标签
                            ParamsName = val;
                        }

                        //将最终的字符串返回
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

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形

    }

    //折线图
    function LineChart(options) {
        var defaultOption={
            conId:'', //内容id
            title:'', //标题
            fontSize:18,
            legendSize:12,  //图例字大小
            itemWidth:10,
            itemHeight:10,
            isArea:false,
            showY:false,
            showLegend:false,
            splitLine:true,
            axisLabel:true,
            markLine:true, //是否显示平均值线
            markLine_custom:{},//自定义标注线
            markPoint:false, //是否显示最大最小值点
            smooth:true, //是否是光滑曲线
            lineWidth:2,  //折线宽度
            lineColor:'',     //折线颜色
            itemGap:10,  //图例块之间距离
            max:null,  //y轴最大刻度
            showSymbol:true, //拐点是否显示
            legendBottom:0,
            txtColor:'#fff',
            markLinecolor:'',
            gridBottom:0,
            gridLeft:'-2%',
            gridRight:'6%',
            gridTop:'10%',
            txtWidth:'100px',
            colorArray:['#01dafe','#58e569','#f0a54a'],//颜色
            dataArray:[],//数据
        };
        options = $.extend(false,defaultOption,options);
        var lineData=[];
        var xAxisData='';
        let legendName=[];

        let markPoint='',markLine='';
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
        for(var i=0;i<options.dataArray.length;i++){
            var obj=options.dataArray[i];
            legendName.push(obj.lineName);
            xAxisData = obj.name;
            if(options.isArea){
                lineData.push({
                    name:obj.lineName,
                    type: 'line',
                    smooth: options.smooth,
                    data: obj.value,
                    markPoint:markPoint,
                    markLine:markLine,
                    showSymbol:options.showSymbol,
                    lineStyle:{
                        normal:{
                            width:options.lineWidth,
                            color:options.lineColor,
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(64,216,84,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(79,242,240,0.3)'
                            }])
                        }
                    },
                    symbolSize: 15,
                })
            }else{
                lineData.push({
                    name:obj.lineName,
                    type: 'line',
                    smooth: options.smooth,
                    showSymbol:options.showSymbol,
                    lineStyle:{
                        normal:{
                            width:options.lineWidth,
                        }
                    },
                    data: obj.value,
                    markPoint:markPoint ,
                    markLine:markLine ,
                    symbolSize: 15,
                });
            }

        }
        var option = {
            legend:{
                show:options.showLegend,
                orient:'horizontal',
                data:legendName,
                icon:'rect',
                itemWidth:options.itemWidth,
                itemHeight:options.itemHeight,
                textStyle:{
                    color:options.colorArray,
                    fontSize:options.legendSize,
                },
                itemGap:options.itemGap,
                left: 'right',
                top:'0'
            },
            tooltip: {
                trigger:'axis',
                formatter:function(params){
                    var toolTip = '';
                    for(var i=0;i<params.length;i++){

                        if(options.isshowhover_perc == true){
                            toolTip += params[i].seriesName + ':' +params[i].value +'%' + '<br>';
                        }else{
                            toolTip += params[i].seriesName + ':' +params[i].value + '<br>';
                        }
                    }
                    return params[0].name + '</br> '+toolTip;
                }
            },
            grid: {
                left: options.gridLeft,
                right: options.gridRight,
                top: options.gridTop,
                bottom: options.gridBottom,
                containLabel: true
            },
            color:options.colorArray,
            dataZoom:{
                type:'inside',
                start:0,
                end:100
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    // interval: 0,
                    textStyle: {
                        color: '#b2b2b2',
                        fontSize: options.fontSize,
                        baseline: 'top',
                        width:options.txtWidth
                    }
                },
                axisLine: {
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                data: xAxisData
            },
            yAxis: {
                type: 'value',
                max:options.max,
                axisTick: {
                    show: false
                },
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
                splitLine: {
                    show: options.splitLine,
                    lineStyle:{
                        color:"#334050",
                        type:'dotted'
                    }
                },
            },
            series: lineData
        };


        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.clear();
        myChart.setOption(option); //显示图形
    }

    //气泡图
    function ScatterChart(options){
        var defaultOption={
            conId:'', //内容id
            fontSize:options.fontSize,
            top:'40%',
            xData:[],
            colorArray:['#01dafe','#58e569','#f0a54a'],//颜色
            dataArray:[]//数据
        };
        options = $.extend(false,defaultOption,options);
        var option = {
            tooltip: {
                position: 'top'
            },
            itemStyle:{
                normal:{
                    color:'#f0a54a'

                }

            },
            singleAxis: [{
                left: 50,
                right:50,
                type: 'category',
                boundaryGap: false,
                data: options.xData,
                top: options.top,
                height: 0,
                axisTick:{
                    show:false
                },
                axisLabel: {
                    interval:0,
                    color:'#fff',
                    fontSize:options.fontSize,
                    margin:50
                },
                axisLine:{
                    lineStyle:{
                        color:'#748f97'
                    }
                }
            }],
            series: [{

                coordinateSystem: 'singleAxis',
                type: 'scatter',
                label:{
                    show:true,
                    position:'inside',
                    color:'#fff'
                },
                data: options.dataArray,

                symbolSize: function (dataItem) {
                    var max = Math.max.apply(null, options.dataArray);
                    var num = 0;
                    var r = 0;
                    if(dataItem == 0){
                        r = 0;
                    }else{
                        if(max != 0){
                            num = max/80;
                        }
                        if(num !=0){
                            r = dataItem/num;
                        }
                    }

                    return r;
                }
            }]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形
    }

    //漏斗图
    function FunnelChart(options){
        var defaultOption={
            conId:'', //内容id
            dataArray:[]//数据
        };
        options = $.extend(false,defaultOption,options);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}"
            },
            calculable: true,
            series: [{
                color: ['#ffcc7d'],
                name: '',
                gap:6,
                type: 'funnel',
                width: '44%',
                height: '70%',
                x: '5%',

                minSize: '50%',
                maxSize:'98%',
                funnelAlign: 'right',

                center: ['50%', '50%'], // for pie

                data: options.dataArray[0],
                roseType: true,
                label: {
                    normal: {

                        position: 'inside',
                        color:'rgba(2,2,2,0.75)',
                        fontSize:18,
                        fontWeight:'bold',
                        formatter: function(params) {
                            return params.name + ':' + params.value
                        },
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        shadowBlur: 20,
                        shadowOffsetX: 0,
                        shadowOffsetY: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                }
            },

                {
                    color: ['#2cb5fd'],
                    name: '',
                    type: 'funnel',
                    gap:6,
                    width: '44%',
                    height: '70%',

                    x: '50%',

                    minSize: '50%',
                    maxSize:'98%',
                    funnelAlign: 'left',

                    center: ['50%', '50%'], // for pie

                    data: options.dataArray[1],
                    roseType: true,
                    label: {
                        normal: {
                            position: 'inside',
                            color:'rgba(2,2,2,0.75)',
                            fontSize:18,
                            fontWeight:'bold',
                            formatter: function(params) {
                                return params.name + ':' + params.value
                            },
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 0,
                            shadowBlur: 20,
                            shadowOffsetX: 0,
                            shadowOffsetY: 5,
                            shadowColor: 'rgba(0, 2, 0, 0.3)'
                        }
                    }
                },

            ]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形
    }

    //嵌套圆环
    function NestRingChart(dom,data,secondData){
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            series: [
                {
                    name:'一级来源',
                    color: ['#00a0e9','#ffb55d','#00dbfe','#56e168'],
                    type:'pie',
                    center:['60%','50%'],
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {

                        normal: {
                            show:false,
                            position: 'inner'
                        },
                        emphasis:{
                            show:true,
                            position: 'inner'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:data.list,
                },
                {
                    name:'二级来源',
                    color: ['#00a0e9','#00dbfe','#56e168','#ffb55d'],
                    type:'pie',
                    center:['60%','50%'],
                    radius: ['40%', '55%'],
                    label: {
                        normal: {
                            fontSize:18,
                        }
                    },

                    data:secondData,
                }
            ]
        };


        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形
    }

    //雷达图
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

            radar: [{                       // 雷达图坐标系组件，只适用于雷达图。
                center: ['55%', '50%'],             // 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
                radius: 180,                        // 圆的半径，数组的第一项是内半径，第二项是外半径。
                name: {
                    show:true,
                    textStyle: {
                        fontSize: 24,
                        color: 'rgba(255,255,255,0)'
                    }
                },
                splitNumber:4,                     // (这里是圆的环数)指示器轴的分割段数。[ default: 5 ]
                shape: 'polygon',                    // 雷达图绘制类型，支持 'polygon'(多边形) 和 'circle'(圆)。[ default: 'polygon' ]
                axisLine: {                         // (圆内的几条直线)坐标轴轴线相关设置
                    lineStyle: {
                        color: 'rgba(255,255,255,0.7)',          // 坐标轴线线的颜色。
                        width: 2,                      	 // 坐标轴线线宽。
                        type: 'solid',                   // 坐标轴线线的类型。
                        opacity: 0.8
                    }
                },
                splitLine: {                        // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
                    lineStyle: {
                        color: '#98cde0',            // 分隔线颜色
                        width: 2, 						// 分隔线线宽
                        opacity: 0.5
                    }
                },
                splitArea: {                        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                    show: true,
                    areaStyle: {                            // 分隔区域的样式设置。
                        color: ['rgba(0,150,255,0.8)','rgba(1,19,33,0.8)'],       // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
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
                areaStyle: {                // 单项区域填充样式
                    normal: {
                        color: 'rgba(0,102,24,0.9)'       // 填充的颜色。[ default: "#000" ]
                    }
                },
                itemStyle:{
                    normal:{
                        color:'rgba( 255, 255, 255, 0.8 )',
                        borderColor:'rgb( 237, 89, 60 )',
                        borderWidth:4
                    }

                },
                lineStyle: {                // 单项线条样式。
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

        let myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.clear();
        myChart.setOption(option); //显示图形
    }

    //折柱混合
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

        let myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.off('click');
        myChart.clear();

        myChart.setOption(option); //显示图形

        myChart.on('click',options.fn)
    }

    //双柱图
    function TwoBarChart(options){
        let defaultOption={
            conId:'', //内容id
            xArray:[], //X轴
            colorArray:[], //颜色
            barWidth:'45%', //宽度
            dataArray:[], //series数据
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
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.clear();
        myChart.setOption(option); //显示图形
    }

    //正负柱状图
    function PlusMinusChart(options){
        let defaultOption={
            conId:'', //内容id
            hasLast:'',
            xArray:[], //X轴
            colorArray:[], //颜色
            barWidth:'10%', //宽度
            dataArray:[], //series数据
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

                {offset: 0, color: '#f56e5b'},
                {offset: 1, color: '#dff6fd'}
            ]
        );

        let name = ['满意','不满意','满意','不满意'];

        options.colorArray.push(BarColor1);
        options.colorArray.push(BarColor2);

        $.each(options.dataArray,function(i,n){


            if(options.hasLast){
                options.colorArray = [];
                options.colorArray.push(BarColor1);
                options.colorArray.push(BarColor1);
                options.colorArray.push(BarColor2);
                options.colorArray.push(BarColor2);

                var stack = 'one';
                if(i%2){
                    stack = 'two';
                }

                barData.push({
                    name:name[i],
                    type:'bar',
                    data:n,
                    stack:stack,
                    itemStyle:{
                        normal:{
                            color:function(params){
                                return options.colorArray[i]
                            }
                        }

                    }
                })
            }else{
                barData.push({
                    name:name[i],
                    type:'bar',
                    data:n,
                    stack:'one',
                    itemStyle:{
                        normal:{
                            color:function(params){
                                return options.colorArray[i]
                            }
                        }

                    }
                })
            }


        });


        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter:function(params){
                    let tpl = '';
                    $.each(params,function(i,n){
                        if(n.value < 0 ){
                            n.value = - n.value
                        }
                        tpl += n.seriesName + ':' + n.value+'<br>'
                    });


                    return tpl
                }
            },
            grid: {
                left: '3%',
                right: '4%',
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

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.clear();
        myChart.setOption(option); //显示图形
    }




    window.Xchart = {
        PieChart:PieChart,
        TiaoChart:TiaoChart,
        RingChart:RingChart,
        BarChart:BarChart,
        LineChart:LineChart,
        ScatterChart:ScatterChart,
        FunnelChart:FunnelChart,
        NestRingChart:NestRingChart,
        RadarChart:RadarChart,
        BarLineChart:BarLineChart,
        TwoBarChart:TwoBarChart,
        PlusMinusChart:PlusMinusChart
    }
})();




