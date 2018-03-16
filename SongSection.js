//--------------------------------------------------------------------------
//
//TODO: consider renaming entirely, including dumping the 'Tone.' prefix
//
// Tone.Section
//
//--------------------------------------------------------------------------
//function() /{
{
	//--------------------------------------------------------------------------
	Tone.Section = function() {
		// allows it to be constructed with or without 'new'
		if (this instanceof Tone.Section) {
			this._drummer = new Tone.Drummer();
		} 
		else {
			return new Tone.Section();
		}
		return this;
	};

	Tone.extend(Tone.Section);

	//--------------------------------------------------------------------------
	Tone.Section.prototype._createEvents = function() {
// TODO:
// Notes: Cbb3, Cb3, C3, C#3, Cx3
// '16n', '8n', '4n', '2n', '1m' or '1n', '8t', '8n.'
		var evts = [{
			"n":"C3","time":'0:0',"v":1,"d":'0:1'},
				{"n":"E4","time":'0:1',"v":1,"d":'0:1'},
					{"n":"G4","time":'0:2',"v":1,"d":'0:2'
		},{
			"n":"A3","time":'1:0',"v":1,"d":'0:1'},
				{"n":"E4","time":'1:1',"v":1,"d":'0:1'},
					{"n":"C4","time":'1:2',"v":1,"d":'0:2'
		},{
			"n":"D3","time":'2:0',"v":1,"d":'0:1'},
				{"n":"F4","time":'2:1',"v":1,"d":'0:1'},
					{"n":"A4","time":'2:2',"v":1,"d":'0:2'
		},{
			"n":"G3","time":'3:0',"v":1,"d":'0:1'},
				{"n":"B4","time":'3:1',"v":1,"d":'0:1'},
					{"n":"D4","time":'3:2',"v":1,"d":'0:2'
		}]
		return evts;
	}
	
	//--------------------------------------------------------------------------
	Tone.Section.prototype.toPart = function(start) {
		if (!this._backingInstrument) {
			console.log('Backing Instrument not set');
			return;
		}
		if (this._part) {
			this._part.dispose();
		}
		var evts = this._createEvents();
		var i = this._backingInstrument;
		
		this._part = new Tone.Part(function(time, note) {
			i.triggerAttackRelease(note.n, note.d, time, note.v)
	  	}, evts).start(start);
	 
	  	// Drummer
		if (this._drummerPart) {
			this._drummerPart.dispose();
		}
		
		var drumEvts = this._drummer.eventsForSection(4);
		var di = Drums; // a global...
		
		this._drummerPart = new Tone.Part(function(time, note) {
			di.triggerAttackRelease(note.n, note.d, time, note.v)
	  	}, drumEvts).start(start);
	}

	//--------------------------------------------------------------------------
	Object.defineProperty(Tone.Section.prototype, "backingInstrument", {
		get : function() {
			return this._backingInstrument;
		},
		set : function(instrument) {
			this._backingInstrument = instrument;
		}
	});

	//  Clean up
	//--------------------------------------------------------------------------
	Tone.Section.prototype.dispose = function() {
		this._backingInstrument = null;
		if (this._part) {
			this._part.dispose();
			this._part = null;
		}
		if (this._drummerPart) {
			this._drummerPart.dispose();
			this._drummerPart = null;
		}
	};

	//return Tone.Section;
};