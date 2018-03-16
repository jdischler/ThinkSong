var Piano = {
};

var Drums = {
};

// TODO: consider only loading instruments as needed

// TODO: these samples are really huge. Not necesarilly big as an .mp3 but if I understand
//	they are decompressed to webAudio buffers where the audio length becomes something to watch...
//------------------------------------------------------------------------------
function configureInstruments() {

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

	Drums = new Tone.Sampler({ // .[mp3|ogg]
//		'B0'  :	'kick.mp3', // acoustic bass drum
		'C1'  :	'kick.mp3', 
		'C#1' : 'side_stick.mp3', 
		'D1'  :	'snare.mp3', // acoustic snare
		'D#1' : 'clap.mp3', 
//		'E1'  :	'snare.mp3', // electric snare
		'F1'  :	'low_tom.mp3', // low floor tom
		'F#1' : 'hh_closed.mp3', // closed hi-hat
		'G1'  :	'low_tom.mp3', // hi floor tom
		'G#1' : 'hh_pedal.mp3', // pedal hi-hat
		'A1'  :	'mid_tom.mp3', // low tom
		'A#1' : 'hh_open.mp3', // open hi-hat
		'B1'  :	'mid_tom.mp3', // low-mid tom
		'C2'  :	'hi_tom.mp3', // hi-mid tom
		'C#2' : 'crash.mp3', // crash 1
		'D2'  :	'hi_tom.mp3', // hi tom
		'D#2' : 'ride.mp3', // ride 1
		'E2'  :	'crash.mp3', // Chinese cymbal
		'F2'  :	'ride_bell.mp3',
		'F#2' : 'tambourine.mp3', 
		'G2'  :	'crash.mp3', // splash
		'G#2' : 'cowbell.mp3',
		'A2'  :	'crash.mp3', // crash 2
//		'A#2' : 'crash.mp3', // vibraslap
		'B2'  :	'ride.mp3', // ride 2
	}, {
		//'release' : 1,
		'baseUrl' : './drumkit/',
	});
	
	var volume = new Tone.Volume(-12).toMaster();
//	var chorus = new Tone.Chorus().connect(volume); chorus.wet.value = 0.05;
//	var delay = new Tone.FeedbackDelay(1, 0.25).connect(volume); delay.wet.value = 0.025;
	var reverb = new Tone.Freeverb(0.8, 5000).connect(volume); reverb.wet.value = 0.2;
	Piano.connect(reverb);
	Drums.connect(volume);
}
