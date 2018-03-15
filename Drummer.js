//--------------------------------------------------------------------------
//
// Tone.Drummer
//
//--------------------------------------------------------------------------
//function() {
{
	//--------------------------------------------------------------------------
	Tone.Drummer = function() {
		// allows it to be constructed with or without 'new'
		if (this instanceof Tone.Drummer) {
		} 
		else {
			return new Tone.Drummer();
		}
		
		return this;
	};

	Tone.extend(Tone.Drummer);

	// TODO: probably pass some kind of section config?
	// Duration? Style? Fill Clues? ??
	//--------------------------------------------------------------------------
	Tone.Drummer.prototype.eventsForSection = function(measures) {
		
		// Notes: Cbb3, Cb3, C3, C#3, Cx3
		// Durations: '16n', '8n', '4n', '2n', '1m' or '1n', '8t', '8n.' '0:1:2'
		var evts = [{
			"n":"B2","time":"0:0:2","v":0.5,"d":"0.6s"
		},{ 
			"n":"B2","time":"0:1:2","v":0.7,"d":"0.6s"
		},{ 
			"n":"B2","time":"0:2:2","v":0.4,"d":"0.6s"
		},{ 
			"n":"B2","time":"0:3:2","v":0.5,"d":"0.6s"
		},{ 
			"n":"C1","time":"1:1","v":1,"d":"0.5s"
		},{ 
			"n":"C1","time":"1:2","v":1,"d":"0.5s"
		},{ 
			"n":"C1","time":"1:3:2","v":1,"d":"0.5s"
		},{ 
			"n":"C1","time":"1:3:3","v":1,"d":"0.5s"
		},{ 
			"n":"G2","time":"2:0","v":1,"d":"2.3s"
		}];
		
		for (var m=0; m < measures; m++) {
			for (var b=0; b < 4; b++) { // beats per measure (todo: configurable?)
			
				if (b == 0 || b == 2) { // kick
					evts.push({
						"n":"C1","time":m+":"+b,"v":1,"d":"0.5s"
					});
				}
				
				if (b == 1 || b == 3) { // snare
					evts.push({
						"n":"D1","time":m+":"+b,"v":1,"d":"0.4s"
					});
				}
			}
		}
		return evts;
	}
	
	//  Clean up
	//--------------------------------------------------------------------------
	Tone.Drummer.prototype.dispose = function() {
	};

	//return Tone.Drummer;
};