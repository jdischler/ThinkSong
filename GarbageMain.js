var Interface = {
	isMobile : false
};

var Piano = {
};

// Notes: Cbb3, Cb3, C3, C#3, Cx3
// '16n', '8n', '4n', '2n', '1m' or '1n', '8t'
var testNoteArrays = [
	[
		{"n":"C3","time":'0m',"v":1,"d":'4n'},{"n":"E4","time":'4n',"v":1,"d":'4n'},     {"n":"G4","time":'2n',"v":1,"d":'2n'},
		{"n":"A3","time":'1m',"v":1,"d":'4n'},{"n":"E4","time":'1m + 4n',"v":1,"d":'4n'},{"n":"C4","time":'1m + 2n',"v":1,"d":'2n'},
		{"n":"D3","time":'2m',"v":1,"d":'4n'},{"n":"F4","time":'2m + 4n',"v":1,"d":'4n'},{"n":"A4","time":'2m + 2n',"v":1,"d":'2n'},
		{"n":"G3","time":'3m',"v":1,"d":'4n'},{"n":"B4","time":'3m + 4n',"v":1,"d":'4n'},{"n":"D4","time":'3m + 2n',"v":1,"d":'2n'},
	],[
		{"n":"C3","time":'0m',"v":1,"d":'1m'},{"n":"E4","time":'0m',"v":1,"d":'1m'},{"n":"G4","time":'0m',"v":1,"d":'1m'},
		{"n":"A3","time":'1m',"v":1,"d":'1m'},{"n":"E4","time":'1m',"v":1,"d":'1m'},{"n":"C4","time":'1m',"v":1,"d":'1m'},
		{"n":"D3","time":'2m',"v":1,"d":'1m'},{"n":"F4","time":'2m',"v":1,"d":'1m'},{"n":"A4","time":'2m',"v":1,"d":'1m'},
		{"n":"G3","time":'3m',"v":1,"d":'1m'},{"n":"B4","time":'3m',"v":1,"d":'1m'},{"n":"D4","time":'3m',"v":1,"d":'1m'},
	],[
		{"n":"C3","time":'0m',"v":1,"d":'1m'},{"n":"E4","time":'0m',"v":1,"d":'1m'},{"n":"G4","time":'0m',"v":1,"d":'1m'},{"n":"D4","time":'0m',"v":0.5,"d":'1m'},
		{"n":"A3","time":'1m',"v":1,"d":'1m'},{"n":"E4","time":'1m',"v":1,"d":'1m'},{"n":"C4","time":'1m',"v":1,"d":'1m'},{"n":"G4","time":'1m',"v":0.5,"d":'1m'},
		{"n":"F3","time":'2m',"v":1,"d":'1m'},{"n":"A4","time":'2m',"v":1,"d":'1m'},{"n":"C4","time":'2m',"v":1,"d":'1m'},{"n":"E5","time":'2m',"v":0.5,"d":'1m'},
		{"n":"G3","time":'3m',"v":1,"d":'1m'},{"n":"B4","time":'3m',"v":1,"d":'1m'},{"n":"D4","time":'3m',"v":1,"d":'1m'},{"n":"A5","time":'3m',"v":0.5,"d":'1m'},
	],[
		{"n":"C3","time":'0m',"v":1,"d":'4n'},{"n":"E4","time":'4n',"v":1,"d":'4n'},     {"n":"G4","time":'2n',"v":1,"d":'2n'},
		{"n":"A3","time":'1m',"v":1,"d":'4n'},{"n":"E4","time":'1m + 4n',"v":1,"d":'4n'},{"n":"C4","time":'1m + 2n',"v":1,"d":'2n'},
		{"n":"D3","time":'2m',"v":1,"d":'4n'},{"n":"F4","time":'2m + 4n',"v":1,"d":'4n'},{"n":"A4","time":'2m + 2n',"v":1,"d":'2n'},
		{"n":"G3","time":'3m',"v":1,"d":'1m'},{"n":"B4","time":'3m',"v":1,"d":'1m'},{"n":"D4","time":'3m',"v":1,"d":'1m'},{"n":"A5","time":'3m',"v":0.5,"d":'1m'},
	],[
		{"n":"C3","time":'0m',"v":1,"d":'2m'},{"n":"E4","time":'0m',"v":1,"d":'2m'},{"n":"G4","time":'0m',"v":1,"d":'2m'},{"n":"B4","time":'0m',"v":0.5,"d":'2m'},
	]
];

	$(function() {

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			Interface.isMobile = true;
			$("body").addClass("Mobile");
			var element = $("<div>", {"id" : "MobileStart"}).appendTo("body");
			var button = $("<div>").attr("id", "Button").text("Enter").appendTo(element);
			StartAudioContext(Tone.context, button, function(){
				element.remove();
			});
		}
	
		// Bosendoerfer ripped from Logix
		Piano = new Tone.Sampler({ // .[mp3|ogg]
			'A0' : 'A0.mp3',
			'C1' : 'C1.mp3',
			'D#1' : 'Ds1.mp3',
			'F#1' : 'Fs1.mp3',
			'A1' : 'A1.mp3',
			'C2' : 'C2.mp3',
			'D#2' : 'Ds2.mp3',
			'F#2' : 'Fs2.mp3',
			'A2' : 'A2.mp3',
			'C3' : 'C3.mp3',
			'D#3' : 'Ds3.mp3',
			'F#3' : 'Fs3.mp3',
			'A3' : 'A3.mp3',
			'C4' : 'C4.mp3',
			'D#4' : 'Ds4.mp3',
			'F#4' : 'Fs4.mp3',
			'A4' : 'A4.mp3',
			'C5' : 'C5.mp3',
			'D#5' : 'Ds5.mp3',
			'F#5' : 'Fs5.mp3',
			'A5' : 'A5.mp3',
			'C6' : 'C6.mp3',
			'D#6' : 'Ds6.mp3',
			'F#6' : 'Fs6.mp3',
			'A6' : 'A6.mp3',
			'C7' : 'C7.mp3',
		}, {
			'release' : 1,
			'baseUrl' : './piano/',
		});
		
		var volume = new Tone.Volume(-18).toMaster();
	//	var chorus = new Tone.Chorus().connect(volume); chorus.wet.value = 0.05;
	//	var delay = new Tone.FeedbackDelay(1, 0.25).connect(volume); delay.wet.value = 0.025;
		var reverb = new Tone.Freeverb(0.8, 5000).connect(volume); reverb.wet.value = 0.2;
		Piano.connect(reverb);
		
		Tone.Transport.bpm.value = 140;
		
		//-------------------------------------------------------------------------- 
		// Begin Section Widget Definition
		var app_Section = {
		  options: {
			bootstrapColClasses: 'col-md-6',
			title: 'Title',
			editable: false
		  },
		  _create: function() { 
			var div = '<div class="' + this.options.bootstrapColClasses + '">' +
						'<div class="unselectable section-header">' + this.options.title + '</div>' +
							'<div class="section-content">' +
								'<div class="container constrained-container"></div>' +
							'</div></div>';
			$(this.element).append(div); // or replace?
			// FIXME:
			if (false && this.options.editable) {
				$(this.element).on('click', "div.section-header", function() { 	
					var $lbl = $(this), o = $lbl.text(),
					$txt = $('<input type="text" class="editable-label-text section-header" value="'+o+'" />');
					$lbl.replaceWith($txt);
					$txt.focus();
					
					$txt.blur(function() {
						var no = $(this).val();
						$lbl.text(no);
						$txt.replaceWith($lbl);
					})
					.keydown(function(evt ){
						if(evt.keyCode == 13) {
							var no = $(this).val();
							$lbl.text(no);
							$txt.replaceWith($lbl);
						}
					});
				}); 			
			}
		  },
		  setTitle: function(title) {
			$(this.element).find('.section-header').html(title);
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
		
		// yeeesh
		setTimeout(function() {
			$('#play-start').click(function() {
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
			})
		}, 200);
		
		
	})
 
		// What / How / Who / Where / When / Why
	function init() {

		// FIXME: ERF: GROSS. Some weird issue interacting with sortables..uses a patch defined in a patch.js file..
		$.ui.draggable.prototype.plugins['drag'][0][1] = draggable_patch;
	
		//--------------------------------------------------------------------------
		// The actual Song
		//----------------------------------------------------------------------
		$('#song-section').app_Section({title: 'Song <i id="play-start" class="pull-right button fa fa-play-circle-o"></i>',
			editable: true});
		var content = '<div id="droppable-area" class="row min-height">' +
		/*	'<div class="col-xs-1 unselectable song-section green"><div class="unsortable unselectable song-section-title">Intro</div></div>' +
			'<div class="col-xs-1 unselectable song-section blue"><div class="unsortable unselectable song-section-title">Verse</div><div class="song-section-title">Repeat: 2x</div></div>' +
			'<div class="col-xs-1 unselectable song-section red"><div class="unsortable unselectable song-section-title">Pre-Chorus</div></div>' +
			'<div class="col-xs-1 unselectable song-section cyan"><div class="unsortable unselectable song-section-title">Chorus</div></div>' +
			'<div class="col-xs-1 unselectable song-section blue"><div class="unsortable unselectable song-section-title">Verse</div><div class="song-section-title">Repeat: 2x</div></div>' +
			'<div class="col-xs-1 unselectable song-section red"><div class="unsortable unselectable song-section-title">Pre-Chorus</div></div>' +
			'<div class="col-xs-1 unselectable song-section cyan"><div class="unsortable unselectable song-section-title">Chorus</div></div>' +
			'<div class="col-xs-1 unselectable song-section cyan"><div class="unsortable unselectable song-section-title">Chorus</div><div class="song-section-title">Transpose: +1</div></div>' +
			'<div class="col-xs-1 unselectable song-section cyan"><div class="unsortable unselectable song-section-title">Chorus</div></div>' +
			'<div class="col-xs-1 unselectable song-section orange"><div class="unsortable unselectable song-section-title">Outro</div></div>' +
			*/'</div>'
  		$('#song-section').app_Section('setContent', content);
		
		// What the song could be made of...//
		//----------------------------------------------------------------------
		$('#section-browser').app_Section({title: 'Section Browser <i id="add-new-section" class="pull-right button fa fa-plus-square-o"></i>'});
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
			$(item).tonePart = new Tone.Part(function(time, note) {
				Piano.triggerAttackRelease(note.n, note.d, time, note.v)
	  		}, testNoteArrays[ii]).start((ii * 4)+ 'm');
	  		ii++;
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
  		$('#section-detail').app_Section({bootstrapColClasses: 'col-md-12', title: 'Section Detail > Intro'});
  		
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

  		// enhance Tone
  		//----------------------------------------------------------------------
		Tone.Part.prototype.addAll = function(eventArray) {
			this.removeAll();		
			// add the events
			for (var i = 0; i < eventArray.length; i++){
				if (Array.isArray(eventArray[i])){
					this.add(eventArray[i][0], eventArray[i][1]);
				} else {
					this.add(eventArray[i]);
				}
			}
			return this;
		};
		
  		//----------------------------------------------------------------------
		Tone.Part.prototype.duration = function() {
			// TODO: either figure out how to get the duration from the Part...
			//	or use a helper object that builds/manages parts and can figure
			//	out how long a part would be, etc.
			for (var i = 0; i < this._events.length; i++){
				var event = this._events[i];
			}		
		};
	}

	// Common song section names: intro, outro, pre-chorus, chorus, refrain, verse, bridge, solo, interlude, segue
