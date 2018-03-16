var Interface = {
	isMobile: false
};

var allowStartToggle = true;

// may need some refinement but having the flexibility to allow an option to be an array of things or just a single thing
function forEach(ar, func) {
	if (ar instanceof Array) {
		ar.forEach(func);
	}
	else {
		func.call(undefined, ar);
	}
}

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
	
	// TODO: get rid of this....
	//-------------------------------------------------------------------------- 
	// Begin Section Widget Definition
	content = '<div class="row song-section-detail green">';
	for (var i = 0 ; i < 14; i++) {
		var cls = 'col-xs-1 song-section-detail-item white ';
		cls += (i % 4 == 0) ? 'song-section-detail-item-bar-start' : '';
		cls += ((i+1) % 4 == 0) ? 'song-section-detail-item-bar-end' : '';
		
		content += '<div class="' + cls + '"></div>';
	}
	content += '</div>';
	var div = '<div class="col-md-12">' +
		'<div class="row unselectable section-header">' +
			'<div class="not-text col-xs-9 header-title">Section Detail > Intro</div>' +
		'</div>' +
		'<div class="section-content">' +
			'<div class="container constrained-container">' + content + 
			'</div>' +
		'</div></div>';
	$('#section-detail').append(div); // or replace?
	
	initArranger();
})

// random notify example
//		$.notify({message: 'Started...'},{placement: {align: 'center'},delay: 200,});
