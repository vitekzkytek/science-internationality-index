var lang = 'en';


var waypoints;


function loadJS() {
    sizes = setSizes();

    waypoints = waypointing();

    generateApp('#app');

    //shareLinks();
    //TODO loading screen
}


function generateApp(selector) {
    $(selector).append($('<div />', {id:'appCont'}));

    generateControls(selector + ' #appCont');

    generateCharts(selector + ' #appCont');

    //typesetSVGMath();

}

function typesetSVGMath() {
    MathJax.Hub.Queue(
        ["Typeset",MathJax.Hub,"genFooter"],
        ["setRenderer",MathJax.Hub,"SVG"],
        ["Typeset",MathJax.Hub,"svgLineChart"],
        ["setRenderer",MathJax.Hub,"CommonHTML"]
    );

}

function waypointing() {
    function activatefix(selector) {
        $('.fixactive').removeClass('fixactive');
        $(selector).addClass('fixactive');
    };

    function fixBox(selector,parent,target,toppos) {
        element = $(parent+ ' ' +selector).detach();
        $(target).append(element);
        $(target  + ' ' + selector).css({top:toppos,'box-shadow':'0 0 0 0'})
    }

    function floatBox(selector,parent,target) {
        element = $(parent + ' ' + selector).detach();
        $(target).append(element);
        $(element).css({top:'0px','box-shadow': '0px 0px 20px 4px #d1d4d3'})
    }

    function updChart(selCountries,selFields,selMethods) {
        $('#ddl_countries').val()
    }


    // fixing menu and adding shadow
    waypoints = $('#menu').waypoint(function(direction) {
        if(direction === 'down') {
            $('#everything').append($('<div class="stickyshadow"></div>'));
            $('#menu').addClass('sticky');
            $('#menu').removeClass('floaty');
            $('#menuempty').css('display','block')
        } else {
            $('#menu').addClass('floaty');
            $('#menu').removeClass('sticky');
            $('#menuempty').css('display','none')
            $('.stickyshadow').remove();
        }});

    waypoints = $('#context').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mContext').addClass('storyPast')
            } else {
                $('#mContext').removeClass('storyPast')
            }},offset:'17%'});

    waypoints = $('#empt-app').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mApp').addClass('storyPast')
            } else {
                $('#mApp').removeClass('storyPast')
            }},offset:'17%'});




    waypoints = $('#big7').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mCountries').addClass('storyPast')
            } else {
                $('#mCountries').removeClass('storyPast')
            }},offset:'17%'});

    waypoints = $('#advanced').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mDisciplines').addClass('storyPast')
            } else {
                $('#mDisciplines').removeClass('storyPast')
            }},offset:'17%'});





    waypoints = $('#context').waypoint(function(direction) {
        if (direction === 'down') {
            activatefix('#app')
        } else {
            activatefix('#intro')
        }});

    waypoints = $('#transition').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mEast').addClass('storyPast')
            } else {
                $('#mEast').removeClass('storyPast')
            }},offset:'17%'});


    waypoints = $('#china').waypoint(function(direction) {
            if(direction === 'down') {
                $('#mChina').addClass('storyPast')
            } else {
                $('#mChina').removeClass('storyPast')
            }
        },
        {offset:'17%'}
    );

    waypoints = $('#russia').waypoint(function(direction) {
            if(direction === 'down') {
                $('#mRussia').addClass('storyPast')
            } else {
                $('#mRussia').removeClass('storyPast')
            }
        },
        {offset:'17%'}
    );
    waypoints = $('#conclusion').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mConclusion').addClass('storyPast')
            } else {
                $('#mConclusion').removeClass('storyPast')
            }},offset:'17%'});

    waypoints = $('#broad').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['_ADV','_TRA','_DEV']).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val('All').trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["AUS", "DEU", "IDN", "ITA", "MEX", "NGA", "POL", "RUS", "TUR"]).trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);

                $('#ddl_countries select').trigger('change',[true]);
            }
        },        {offset:'60%'}
    );


    waypoints = $('#big7').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["_EU", "BRA", "CHN", "IND", "JPN", "RUS", "USA"]).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val('All').trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['_ADV','_TRA','_DEV']).trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);

                $('#ddl_countries select').trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );
    waypoints = $('#top5bottom5').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['RUS','AZE','CUB','UKR','TJK','CHN','KAZ','BLR','UZB','ROU']).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["_EU", "BRA", "CHN", "IND", "JPN", "RUS", "USA"]).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val('All').trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );


    waypoints = $('#advanced').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("_ADV").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['RUS','AZE','CUB','UKR','TJK','CHN','KAZ','BLR','UZB','ROU']).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );

    waypoints = $('#russia').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("RUS").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            } else {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("_ADV").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );


    waypoints = $('#china').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("CHN").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            } else {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("RUS").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );


    waypoints = $('#socialCentralWesternEurope').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["AUT", "CZE", "DNK", "HUN", "NLD", "POL", "SVK", "SWE", "CHE"]).trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val("top_Social").trigger('change',[true]);
            } else {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("CHN").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );

    waypoints = $('#czechia').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("CZE").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["AUT", "CZE", "DNK", "HUN", "NLD", "POL", "SVK", "SWE", "CHE"]).trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val("top_Social").trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );


    waypoints = $('#conclusion').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['_ADV','_TRA','_DEV']).trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[true]);
            } else {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("CZE").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );


    return waypoints;
}

function getSizes() {
    sizes.screen = {};
    sizes.screen.height = $('.fullscreen').height();
    sizes.screen.width = $('.fullscreen').width();

    sizes.menu = {};
    sizes.menu.height = $('#menu').height();

    sizes.chart = {};
    sizes.chart.width = (0.7*sizes.screen.height > 500) ? 0.7*sizes.screen.height : 500 ;
    sizes.chart.height = 0.7*sizes.screen.height;// +50;

}

function MoveOn(selector,adjust=100) {
    $('html,body').animate({
        scrollTop: $('#' +selector).offset().top - adjust
    })
}

function showMethodModal(method) {
    showModal('modMethods');
    displayMethod(method);
}

function showModal(modal) {
    $('.modalBackground').fadeIn(200,function() {$('#' + modal).addClass('modalActive')});
}

function hideModal() {
    $('.modalBackground').fadeOut(200,function() {});
    $('.modalActive').removeClass('modalActive')
}

function hideAndShowModal(modal) {
    hideModal();

    showModal(modal);
}

window.onclick = function(event) {
    modal = document.getElementById('modalWrap')
    if (event.target == modal) {
        id = $('.modalActive').attr('id')
        if(id != 'modRozliseni') {
            hideModal();
        }
    }
}

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        hideModal()
    }   // esc
});
