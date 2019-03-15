ddlconfig = {
    fields: {
        placeholder:{
            en:'Select discipline ... ',
            cs:'Vyberte obor ... '
        },
        width:'90%',
        multiple:false,
        defaultVals:["All"],
        selectedVals:["All"],
        allowClear:true,
        maximumSelectionLength:10
    },
    countries: {
        placeholder:{
            en:'Select country ... ',
            cs:'Vyberte zemi ... '
        },
        width:'90%',
        multiple:true,
        defaultVals:["AUS", "DEU", "IDN", "ITA", "MEX", "NGA", "POL", "RUS", "TUR"],
        selectedVals:["AUS", "DEU", "IDN", "ITA", "MEX", "NGA", "POL", "RUS", "TUR"],
        allowClear:true,
        maximumSelectionLength:10
    },
    methods: {
        placeholder:{
            en:'Select indicator ... ',
            cs:'Vyberte metodu ... '
        },
        width:'90%',
        multiple:false,
        defaultVals:['euclid'],
        selectedVals:['euclid'],
        allowClear:true,
        maximumSelectionLength:6
    }
};


function generateControls(selector) {
    //controls = $('<div />', {id:'controls'}).appendTo(el);
    $(selector).append($('<div />', {id: 'controls',style:`width:${sizes.chart.width + sizes.legend.width}px;`}));
    generateDDLs(selector + ' #controls')
}

function generateDDLs(selector) {
    $("<style type='text/css'> .select2-results { max-height; " + sizes.chart.height * 0.7 + "px;} </style>").appendTo("head");

    generateDDL(selector,'countries');
    generateDDL(selector,'fields');
    generateDDL(selector,'methods');
}

function generateDDL(selector,purpose) {
    // function ClosureFunction() {// POST request cause changing of scope of ddlel which always equal to last called GenerateDDL, because server answer is always delivered later
        ddlid = 'ddl_' + purpose;

        var svgcode=
            `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" >
                    <polygon points="179.456,307.2 0,307.2 0,358.4 179.456,358.4 179.456,435.2 281.6,332.8 179.456,230.4"/>
                    <polygon points="332.544,153.6 332.544,76.8 230.4,179.2 332.544,281.6 332.544,204.8 512,204.8 512,153.6"/>
                </g>
            </svg>`;
    // var svgcode=
    //     `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" >
    //         <g>
    //             <path d="M255,127.5c-71.4,0-127.5,56.1-127.5,127.5c0,71.4,56.1,127.5,127.5,127.5c71.4,0,127.5-56.1,127.5-127.5
    //             C382.5,183.6,326.4,127.5,255,127.5z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z
    //              M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z"/>
    //         </g>
    //     </svg>`;
    var svgcode=
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="${sizes.switchCompare.width}" height="${sizes.switchCompare.height}" >
            <g>
               <path d="M512,119V0H392v40h53.716L262.5,223.216L122.837,83.553L40,170.28V0H0v512h512v-40H40V345.991l77.235-81.222l80.14,80.14
			l65.125-65.125l104.5,104.5l105-105V328h40V209H392v40h53.716L367,327.716L290.784,251.5L472,70.284V119H512z M197.375,288.341
			l-80.86-80.86L40,287.944v-59.753l83.494-87.414L234.216,251.5L197.375,288.341z"/>
            </g>
        </svg>`;

        var div = $('<div />',{id:ddlid,class:'column'}).appendTo($(selector));
        switcherclass =  (ddlconfig[purpose].multiple) ? 'switchcompare multiswitcher ' :'switchcompare';

        if (purpose == 'methods') {
            div.append(`<svg width="${sizes.switchCompare.width}" height="${sizes.switchCompare.height}" />`)
        }
        else {
            div.append('<a class="' + switcherclass +'" onclick="switchMultiSelect(\'' + purpose + '\')">'+ svgcode +'</a>');
        }
        var ddlel = $('<select />').appendTo(div);
        // ajaxobj = query_dll_inputs(purpose);
        // $.post(ajaxobj.url, ajaxobj.data, function (result, status) {
            //let ddldata = Object.keys(controllers[purpose]).map((key,index) => ({id:key,text:controllers[purpose][key].name,code:key}));
            let ddldata = controllers[purpose];
            ddlel.select2({
                placeholder: ddlconfig[purpose].placeholder[lang],
                allowClear: ddlconfig.allowClear,
                data: ddldata.results,
                width: sizes.header.width - sizes.switchCompare.width - 50,
                multiple: ddlconfig[purpose].multiple,
                maximumSelectionLength: ddlconfig[purpose].maximumSelectionLength
            });

    ddlel.on("select2:select", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);

        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
    });

    ddlel.val(ddlconfig[purpose].selectedVals).trigger('change',[false]);

    ddlel.on('change',changeEvent);//,data=[true]);
    // ddlel.on("select2:select", function(evt) {
    //     let $element = $(evt.params.data.element);
    //
    //     $element.detach();
    //     $(this).append($element);
    //     $(this).trigger('change',[false])
    // })

    // })
    // }
    // ClosureFunction();
}

function changeEvent(event,update=true) {
    var purposes = Object.keys(ddlconfig);
    for (i in purposes) {
        var purpose = purposes[i];
        var ddl = $('#ddl_' + purpose + ' select');
        var selectedVals = ddl.val();
        if (Array.isArray(selectedVals)) {
            ddlconfig[purpose].selectedVals = selectedVals;
        } else {
            ddlconfig[purpose].selectedVals = [selectedVals];
        }

        ddl.val(ddlconfig[purpose].selectedVals)
    }
    if(update) {
        updLineChart();
    }
}

function switchMultiSelect(purpose,updateChart = true) {
    var purposes = Object.keys(ddlconfig);
    for (i in purposes) {
        ddlconfig[purposes[i]].multiple = purposes[i] === purpose;
        if (purposes[i] !== purpose) {
            ddlconfig[purposes[i]].selectedVals = [ddlconfig[purposes[i]].selectedVals[0]]
        }
    }
    $('#app #controls').empty();
    generateDDLs('#app #controls');
    if (updateChart) {
        updLineChart();
    }
}

function displayMethod(method) {
    method_obj = controllers.methods.results.find(x => x.id === method);

    $('.switchActive').removeClass('switchActive');
    $('#sw'+method).addClass('switchActive');
    $('#methodName').text(method_obj.full_name);
    $('#methodDescription').html(method_obj.description);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"methodDescription"]);
    // let form = (method != 'weightGini')? '$' + method_obj.formula +'$' : '$' + method_obj.formula +' $\n$' + ' g_{gini} = \\sum_{i=1}^{n} v_i *w_{i-1} - \\sum_{i=0}^{n-1} v_i *w_{i+1}$';
    // $('#methodFormula').html(form);
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"methodFormula"]);
    // $('#methodDesc').text(method_obj.short_desc);
    // $('#methodInput').text(method_obj.input);
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"methodInput"]);
    // $('#methodSource').html(method_obj.source);

}