function generateControls(selector='#app') {
    generateDDL(selector,'countries');
    generateDDL(selector,'fields');
    generateDDL(selector,'methods');
}

function generateDDL(selector,purpose) {
    ddlconfig = {

        fields: {
            placeholder:{
                en:'Select field ... ',
                cs:'Vyberte obor ... '
            },
            width:'300px',
            multiple:true,
            allowClear:true
        },
        countries: {
            placeholder:{
                en:'Select country ... ',
                cs:'Vyberte zemi ... '
            },
            width:'300px',
            multiple:true,
            allowClear:true
        },
        methods: {
            placeholder:{
                en:'Select method ... ',
                cs:'Vyberte metodu ... '
            },
            width:'300px',
            multiple:true,
            allowClear:true
        }
    };

    let ddlid = 'ddl_' + purpose;
    $(selector).append($('<select />',{id:ddlid}));
    let ajaxobj  = query_dll_inputs(purpose);
    $.post(ajaxobj.url,ajaxobj.data,function (result,status) {
        let ddldata = result.data[purpose].map((x,i)=>({id:i,text:x.name,code:x.id}));
        $('#' + ddlid).select2({
            placeholder: ddlconfig[purpose].placeholder[lang],
            allowClear:ddlconfig.allowClear,
            data:ddldata,
            width:ddlconfig[purpose].width,
            multiple:ddlconfig[purpose].multiple
        });
    })
}
