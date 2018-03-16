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
	
	initArranger();
	
	initSectionEditor();
})

// random notify example
//		$.notify({message: 'Started...'},{placement: {align: 'center'},delay: 200,});
