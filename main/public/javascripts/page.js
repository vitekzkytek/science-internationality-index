var lang = 'en';

var sizes = {};

var waypoints;


function loadJS() {

    waypoints = waypointing();

    generateApp('#app div.content');

    //shareLinks();
    //TODO loading screen
}


function generateApp(selector) {
    $(selector).append($('<div />', {id:'appCont'}));

    generateControls(selector + ' #appCont');

    generateCharts(selector + ' #appCont');

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


    waypoints = $('#world').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mWorld').addClass('storyPast')
            } else {
                $('#mWorld').removeClass('storyPast')
            }},offset:'17%'});


    waypoints = $('#context').waypoint(function(direction) {
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


    waypoints = $('#region').waypoint(function(direction) {
            if(direction === 'down') {
                $('#mRegion').addClass('storyPast')
            } else {
                $('#mRegion').removeClass('storyPast')
            }
        },
        {offset:'17%'}
    );

    waypoints = $('#disciplines').waypoint(function(direction) {
            if(direction === 'down') {
                $('#mDisciplines').addClass('storyPast')
            } else {
                $('#mDisciplines').removeClass('storyPast')
            }
        },
        {offset:'17%'}
    );


    // waypoints = $('#LifeSocial').waypoint(function(direction) {
    //         if(direction === 'down') {
    //             data['#mainApp'].used.fields = ['Společenské vědy','Přírodní vědy']
    //             data['#mainApp'].used.types = data['#mainApp'].default.types
    //
    //             Redraw('#mainApp',false,false)
    //         } else {
    //             data['#mainApp'].used.fields = data['#mainApp'].default.fields
    //             data['#mainApp'].used.types = data['#mainApp'].default.types
    //
    //             Redraw('#mainApp',false,false)
    //         }
    //     },
    //     {offset:'60%'}
    // );

    waypoints = $('#conclusion').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mConclusion').addClass('storyPast')
            } else {
                $('#mConclusion').removeClass('storyPast')
            }},offset:'17%'});

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
