var Interface = {
	isMobile : false
};

var allowStartToggle = true;

$(function() {

	// iOS requires the audio context to be created off of some kind of button push...
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		Interface.isMobile = true;
		$("body").addClass("Mobile");
		var element = $("<div>", {"id" : "MobileStart"}).appendTo("body");
		var button = $("<div>").attr("id", "Button").text("Activate Audio").appendTo(element);
		StartAudioContext(Tone.context, button, function(){
			element.remove();
			$("body").removeClass("Mobile");
		});
	}
	// Loads instruments and wires them up to some fx and the master output
	configureInstruments();
	
	Tone.Transport.bpm.value = 140;
	Tone.context.latencyHint = 'playback'; //low latency not needed and increases chance of pops/clicks
	
	//-------------------------------------------------------------------------- 
	// Begin Section Widget Definition
	var app_Section = {
	  options: {
		bootstrapColClasses: 'col-md-6',
		title: 'Title',
		button: false,
		editable: false
	  },
	  _create: function() { 
	  	var opt = this.options;
	  	var button = opt.button ? 
	  		`<i id="${opt.button.id}" class="col-xs-1 pull-right button fa ${opt.button.fa}"></i>` :
	  		''
		var titleClass = this.options.editable ? 'edit-text' : 'not-text'; 
		var div = `<div class="${this.options.bootstrapColClasses}">` +
					'<div class="row unselectable section-header">' +
						`<div class='${titleClass} col-xs-10 header-title'>${opt.title}</div>${button}` +
					'</div>' +
					'<div class="section-content">' +
						'<div class="container constrained-container"></div>' +
					'</div></div>';
		$(this.element).append(div); // or replace?
		if (this.options.editable) {
			$(this.element).on('click', "div.header-title", function() { 	
				allowStartToggle = false;
				var $lbl = $(this), origText = $lbl.text(),
				$txt = $('<input type="text" class="col-xs-5 editable-label-text" value="'+origText+'" />');
				$lbl.replaceWith($txt);
				$txt.focus();
				
				$txt.blur(function() {
					var no = $(this).val();
					$lbl.text(no);
					$txt.replaceWith($lbl);
					allowStartToggle = true;
				})
				.keydown(function(evt ){
					// if return, accept, else if ESC, revert
					if(evt.keyCode == 13 || evt.keyCode == 27) {
						var no = evt.keyCode == 13 ? $(this).val() : origText;
						$lbl.text(no);
						$txt.replaceWith($lbl);
						allowStartToggle = true;
					}
				});
			}); 			
		}
	  },
	  setTitle: function(title) {
		$(this.element).find('.header-title').html(title);
	  },
	  setContent: function(garbageDiv) {
		$(this.element).find('.constrained-container').append(garbageDiv);
	  },
	  getBounds: function(child) {
		var el = this.element[0];
		if (child) {
			el = $(this.element).find(child);
			el = el[0];
		} 
		return el.getBoundingClientRect()
	  }
	};
	// Initialize Widget
	$.widget("iP.app_Section", app_Section);
	
	// Actually init the dealio
	$( init );	
	
	function toggleStart() {
		if (!allowStartToggle) return;
		if (Tone.Transport.state != "started") {
			$('#play-start').addClass('button-active');
			$('#play-start').removeClass('fa-play-circle-o');
			$('#play-start').addClass('fa-stop-circle-o');
			Tone.Transport.start("+0.1");
			Tone.Transport.schedule(function() {
				Tone.Transport.stop();
				$('#play-start').removeClass('button-active');
				$('#play-start').removeClass('fa-stop-circle-o');
				$('#play-start').addClass('fa-play-circle-o');
			}, '18m'); // TODO: get actual song length
		} 
		else {
			Tone.Transport.stop();
			$('#play-start').removeClass('button-active');
			$('#play-start').removeClass('fa-stop-circle-o');
			$('#play-start').addClass('fa-play-circle-o');
		}
	}
	
	// yeeesh
	setTimeout(function() {
		$('#play-start').click(function() {
			toggleStart();
		})
	}, 200);
	
	$(window).keypress(function (e) {
  		if (e.keyCode === 0 || e.keyCode === 32) {
    		//e.preventDefault()
			toggleStart();
  		}
	})
	
})

	// What / How / Who / Where / When / Why
function init() {

	// FIXME: ERF: GROSS. Some weird issue interacting with sortables..uses a patch defined in a patch.js file..
	$.ui.draggable.prototype.plugins['drag'][0][1] = draggable_patch;

	//--------------------------------------------------------------------------
	// The actual Song
	//----------------------------------------------------------------------
	$('#song-section').app_Section({title: 'Song Title', button: {id: "play-start", fa: "fa-play-circle-o"},
		editable: true
	});
	var content = '<div id="droppable-area" class="row min-height"></div>'
	$('#song-section').app_Section('setContent', content);
	
	// What the song could be made of...//
	//----------------------------------------------------------------------
	$('#section-browser').app_Section({title: 'Section Browser', 
		button:{ id: "add-new-section", fa: "fa-plus-square-o"}
	});
	content = '<div id="sb-inner" class="row min-height">' +
		'<div class="sb-draggable col-xs-1 unselectable song-section green"><div class="unselectable song-section-title">Intro</div></div>' +
		'<div class="sb-draggable col-xs-1 unselectable song-section blue"><div class="unselectable song-section-title">Verse</div></div>' +
		'<div class="sb-draggable col-xs-1 unselectable song-section red"><div class="unselectable song-section-title">Pre-Chorus</div></div>' +
		'<div class="sb-draggable col-xs-1 unselectable song-section cyan"><div class="unselectable song-section-title">Chorus</div></div>' +
		'<div class="sb-draggable col-xs-1 unselectable song-section orange"><div class="unselectable song-section-title">Outro</div></div>' +
		'</div>'
	$('#section-browser').app_Section('setContent', content);
	// random notify example
	//		$.notify({message: 'Started...'},{placement: {align: 'center'},delay: 200,});
	var config = {
		connectToSortable: "#droppable-area",
		helper: 'clone',
		containment: 'body',
		revert: 'invalid',
		zIndex: 2000
	};
	var ii = 0;
	$.each( $(".sb-draggable"), function(idx, item) {
		$(item).draggable(config).disableSelection();
		var sec = new Tone.Section();
		sec.backingInstrument = Piano;
		sec.toPart(ii + ':0');
		ii += 4;
	});
	$('#add-new-section').click(function() {
		var newS = $('#sb-inner');
		console.log(newS);
		var el = $('<div class="sb-draggable col-xs-1 song-section orange"><div class="unselectable song-section-title">New Section</div></div>');
		console.log(el);
		newS.append(el);
		$(el).draggable(config).disableSelection();
	})		
			
	$("#droppable-area").sortable({
		containment: 'body',
		placeholder: 'skinny',
		revert: 100,
		sort: function(evt, ui) {
			var b1 = $('#song-section').app_Section('getBounds', '.section-content');
			if (ui.offset.top < b1.top - 70 || ui.offset.top > b1.bottom - 25 || 
				ui.offset.left < b1.left - 70 || ui.offset.left > b1.right - 5) {
				
				$(ui.item).addClass('ghost');
			}
			else {
				$(ui.item).removeClass('ghost');
			}
		},
		stop: function(evt, ui) {
			var b1 = $('#song-section').app_Section('getBounds', '.section-content');
			if (ui.offset.top < b1.top - 70 || ui.offset.top > b1.bottom - 25 || 
				ui.offset.left < b1.left - 70 || ui.offset.left > b1.right - 5) {
				
				$(ui.item).remove();
			}
			else {
				$(ui.item).removeClass('ghost');
			}
		},
		start: function() {
			//$.notify({message: 'Started...'},{placement: {align: 'center'},delay: 200,});
		},
		receive: function (e, ui) {
			//copyHelper = null;
		}
	}).disableSelection();
	
	// The Detail of a section
	//----------------------------------------------------------------------
	$('#section-detail').app_Section({bootstrapColClasses: 'col-md-12', 
		title: 'Section Detail > Intro'});
	
	// TODO
	content = '<div class="row song-section-detail green">';
	for (var i = 0 ; i < 14; i++) {
		var cls = 'col-xs-1 song-section-detail-item white ';
		cls += (i % 4 == 0) ? 'song-section-detail-item-bar-start' : '';
		cls += ((i+1) % 4 == 0) ? 'song-section-detail-item-bar-end' : '';
		
		content += '<div class="' + cls + '"></div>';
	}
	content += '</div>';
	$('#section-detail').app_Section('setContent', content);

}

// Common song section names: intro, outro, pre-chorus, chorus, refrain, verse, bridge, solo, interlude, segue
