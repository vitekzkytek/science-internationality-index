var lang = 'en'

var sizes = {}

var waypoints;


function loadJS() {

    generateTest();

    generateControls('#testDiv')

    waypoints = waypointing();

    shareLinks();
}

function generateTest(){
    $('#app').append($('<div/>', {id:'testDiv'}))
    $('#testDiv').append('<button   >Touch me!!!</button>')
    $('#testDiv').append('<p />')

    $("#testDiv button").click(function(){
        t0 = new Date().getTime('milliseconds');
        $.post("/",
            {
                id:'queryInterindex',
                query: {
                    country_code: "CZE",
                    field_code: "All",
                    method_code: "euclid"
                }
            },
            function(result, status){
                $('#testDiv p').text("Data: " + JSON.stringify(result)+ "\n Status: " + JSON.stringify(status));
            });
        console.log(new Date().getTime('milliseconds')-t0);
    });
}

function waypointing() {
    function activatefix(selector) {
        $('.fixactive').removeClass('fixactive');
        $(selector).addClass('fixactive');
    };

    function fixBox(selector,parent,target,toppos) {
        element = $(parent+ ' ' +selector).detach();
        $(target).append(element)
        $(target  + ' ' + selector).css({top:toppos,'box-shadow':'0 0 0 0'})
    }

    function floatBox(selector,parent,target) {
        element = $(parent + ' ' + selector).detach();
        $(target).append(element)
        $(element).css({top:'0px','box-shadow': '0px 0px 20px 4px #d1d4d3'})
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

    waypoints = $('#oCemMluvime').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#moCemMluvime').addClass('storyPast')
            } else {
                $('#moCemMluvime').removeClass('storyPast')
            }},offset:'17%'});


    waypoints = $('#zJakychDat').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mzJakychDat').addClass('storyPast')
            } else {
                $('#mzJakychDat').removeClass('storyPast')
            }},offset:'17%'});


    // waypoints = $('#oCemMluvime').waypoint({handler:function(direction) {
    //     if (direction === 'down') {
    //         $('#oCemMluvime').removeClass('flow')
    //         $('#oCemMluvime').addClass('fix')
    //         activatefix('#oCemMluvime')

    //     } else {
    //         $('#oCemMluvime').css('position','float')
    //     }},offset:'0%'});



    waypoints = $('#oCemMluvime').waypoint(function(direction) {
        if (direction === 'down') {
            activatefix('#app')
        } else {
            activatefix('#intro')
        }});

    waypoints = $('#empt-app').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mapp').addClass('storyPast')
            } else {
                $('#mapp').removeClass('storyPast')
            }},offset:'17%'});


    waypoints = $('#dyk_wrap').waypoint({handler: function(direction) {
            if (direction === 'down') {
                fixBox('#didyouknow','#dyk_wrap','.fixactive .chartcontainer',$('#mainApp .controls').position().top )
            } else {
                floatBox('#didyouknow','.fixactive .chartcontainer','#dyk_wrap .chartcontainer')
            }
        },
        offset:$('#mainApp .controls').position().top
    })

    waypoints = $('#desc_wrap').waypoint({handler: function(direction) {
            if (direction === 'down') {
                fixBox('#descbox','#desc_wrap','.fixactive .chartcontainer',$('#mainApp .controls').position().top + $('#didyouknow').height()+50 )
            } else {
                floatBox('#descbox','.fixactive .chartcontainer','#desc_wrap .chartcontainer')
            }
        },
        offset:$('#mainApp .controls').position().top + $('#didyouknow').height() +50
    })



    waypoints = $('#LifeSocial').waypoint(function(direction) {
            if(direction === 'down') {
                $('#mLifeSocial').addClass('storyPast')
            } else {
                $('#mLifeSocial').removeClass('storyPast')
            }
        },
        {offset:'17%'}
    );

    waypoints = $('#avcr').waypoint(function(direction) {
            if(direction === 'down') {
                $('#mUnivAv').addClass('storyPast')
            } else {
                $('#mUnivAv').removeClass('storyPast')
            }
        },
        {offset:'17%'}
    );


    waypoints = $('#LifeSocial').waypoint(function(direction) {
            if(direction === 'down') {
                data['#mainApp'].used.fields = ['Společenské vědy','Přírodní vědy']
                data['#mainApp'].used.types = data['#mainApp'].default.types

                Redraw('#mainApp',false,false)
            } else {
                data['#mainApp'].used.fields = data['#mainApp'].default.fields
                data['#mainApp'].used.types = data['#mainApp'].default.types

                Redraw('#mainApp',false,false)
            }
        },
        {offset:'60%'}
    );

    waypoints = $('#avcr').waypoint({handler:function(direction) {
            if(direction === 'down') {
                data['#mainApp'].used.fields = data['#mainApp'].default.fields
                data['#mainApp'].used.types = ['Akademie věd ČR']

                Redraw('#mainApp',false,false)
            } else {
                data['#mainApp'].used.fields = ['Společenské vědy','Přírodní vědy']
                data['#mainApp'].used.types = data['#mainApp'].default.types;

                Redraw('#mainApp',false,false)
            }
        },offset:'60%'}    );

    waypoints = $('#univs').waypoint({handler:function(direction) {
            if(direction === 'down') {
                data['#mainApp'].used.fields = data['#mainApp'].default.fields
                data['#mainApp'].used.types = ['Vysoké školy']

                Redraw('#mainApp',false,false)
            } else {
                data['#mainApp'].used.fields = data['#mainApp'].default.fields
                data['#mainApp'].used.types = ['Akademie věd ČR']

                Redraw('#mainApp',false,false)
            }
        },offset:'60%'}    );


    waypoints = $('#conclusion').waypoint({handler:function(direction) {
            if(direction === 'down') {
                data['#mainApp'].used.fields = data['#mainApp'].default.fields
                data['#mainApp'].used.types = data['#mainApp'].default.types

                Redraw('#mainApp',false,false)
            } else {
                data['#mainApp'].used.fields = data['#mainApp'].default.fields
                data['#mainApp'].used.types = ['Vysoké školy']

                Redraw('#mainApp',false,false)
            }
        },offset:'60%'}    );




    waypoints = $('#conclusion').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mConclusion').addClass('storyPast')
            } else {
                $('#mConclusion').removeClass('storyPast')
            }},offset:'17%'});

    return waypoints;
};

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

function MoveOn(selector) {
    $('html,body').animate({
        scrollTop: $('#' +selector).offset().top - 100
    })
};


function showModal(modal) {
    $('.modalBackground').fadeIn(200,function() {$('#' + modal).addClass('modalActive')});
};

function hideModal() {
    $('.modalBackground').fadeOut(200,function() {});
    $('.modalActive').removeClass('modalActive')
};

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
