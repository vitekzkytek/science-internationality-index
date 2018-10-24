ddlconfig = {
    fields: {
        placeholder:{
            en:'Select field ... ',
            cs:'Vyberte obor ... '
        },
        width:'100%',
        multiple:false,
        defaultVals:['All'],
        selectedVals:['All'],
        allowClear:true
    },
    countries: {
        placeholder:{
            en:'Select country ... ',
            cs:'Vyberte zemi ... '
        },
        width:'100%',
        multiple:true,
        defaultVals:['CZE'],
        selectedVals:['CZE'],
        allowClear:true
    },
    methods: {
        placeholder:{
            en:'Select method ... ',
            cs:'Vyberte metodu ... '
        },
        width:'100%',
        multiple:false,
        defaultVals:['euclid'],
        selectedVals:['euclid'],
        allowClear:true
    }
};


function generateControls(selector) {
    //controls = $('<div />', {id:'controls'}).appendTo(el);
    $(selector).append($('<div />', {id: 'controls'}));
    generateDDLs(selector + ' #controls')
}

function generateDDLs(selector) {
    generateDDL(selector,'countries');
    generateDDL(selector,'fields');
    generateDDL(selector,'methods');
}

function generateDDL(selector,purpose) {
    function ClosureFunction() {// POST request cause changing of scope of ddlel which always equal to last called GenerateDDL, because server answer is always delivered later
        ddlid = 'ddl_' + purpose;
        var div = $('<div />',{id:ddlid,class:'column'}).appendTo($(selector));
        div.append('<a class="multiswitcher" onclick="switchMultiSelect(\'' + purpose + '\')">Switch</a>');

        var ddlel = $('<select />').appendTo(div);
        ajaxobj = query_dll_inputs(purpose);
        $.post(ajaxobj.url, ajaxobj.data, function (result, status) {
            let ddldata = result.data[purpose].map((x, i) => ({id: x.id, text: x.name, code: x.id}));
            ddlel.select2({
                placeholder: ddlconfig[purpose].placeholder[lang],
                allowClear: ddlconfig.allowClear,
                data: ddldata,
                width: ddlconfig[purpose].width,
                multiple: ddlconfig[purpose].multiple
            });
            ddlel.val(ddlconfig[purpose].selectedVals).trigger('change');
            ddlel.on('change', function(e) {
                selectedVals = $(e.target).val();
                if (Array.isArray(selectedVals)) {
                    ddlconfig[purpose].selectedVals = selectedVals;
                } else {
                    ddlconfig[purpose].selectedVals = [selectedVals];
                }
                updLineChart();
            })
        })
    }
    ClosureFunction();
}


function switchMultiSelect(purpose) {
    var purposes = Object.keys(ddlconfig);
    for (i in purposes) {
        ddlconfig[purposes[i]].multiple = purposes[i] === purpose;
        if (purposes[i] !== purpose) {
            ddlconfig[purposes[i]].selectedVals = [ddlconfig[purposes[i]].selectedVals[0]]
        }
    }
    $('#app #controls').empty();
    generateDDLs('#app #controls');

    updLineChart();
}