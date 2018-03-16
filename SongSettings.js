{
	// TODO: refactor and generally make this functional
	//--------------------------------------------------------------------------
	SongSettings = function() {
		if (this instanceof SongSettings) { // allows it to be constructed with or without 'new'
		} 
		else {
			return new SongSettings();
		}
		
		var BPMopts = '';
		var BPMdefault = 120;
		for (var i = 50; i <= 200; i += 5) {
			BPMopts += '<option' + (i == BPMdefault ? ' selected="selected">' : '>')
			BPMopts += i + '</option>'
		}
		BPMopts = '<div class="form-group row">' + 
			'<label for="song-bps" class="col-xs-6 col-form-label col-form-label-lg">Default BPS</label>' +
			'<div class="col-xs-3"><select id="song-bps" class="form-control form-control-lg">' +
			BPMopts +
			'</select></div>' +
			'</div>';
			
		var other = '<div class="form-group row"><label for="song-key" class="col-xs-6 col-form-label col-form-label-sm">Default Song Key</label>' +
				  '<div class="col-xs-3"><select id="song-key" class="form-control form-control-lg">' +
					  '<option>A</option>' + 
					  '<option>B</option>' + 
					  '<option>C</option>' + 
					  '<option>D</option>' + 
					  '<option selected="selected">E</option>' + 
					  '<option>F</option>' + 
					  '<option>G</option>' + 
				  '</select></div>' +
				  '<div class="col-xs-3"><select class="form-control form-control-lg">' +
					  '<option>(&#x266e;)</option>' + // none (natural)
					  '<option>&#x266d;</option>' + // b
					  '<option>&#x266f;</option>' + // #
				  '</select></div>' +
				  '</div>' +
				  
				'<div class="form-group row"><label for="song-mode" class="col-xs-6 col-form-label col-form-label-lg">Default Song Mode</label>' +
				  '<div class="col-xs-6"><select id="song-mode" class="form-control form-control-lg">' +
					  '<option>Major</option>' + 
					  '<option>Natural Minor</option>' + 
					  '<option>Harmonic Minor</option>' + 
					  '<option>Dorian (Minor)</option>' + 
					  '<option>Phyrgian (Minor)</option>' + 
					  '<option>Lydian (Major)</option>' + 
					  '<option>Mixolydian (Major)</option>' + 
				  '</select></div>' +
				  '</div>';
		
		var structure = '<div id="song-settings" class="modal fade" tabindex="-1" role="dialog">' +
			'<div class="modal-dialog" role="document">' +
				'<div class="modal-content">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
							'<span aria-hidden="true">&times;</span>' +
						'</button>' +
						'<h3 class="modal-title">Song Settings</h3>' +
					'</div>' +
					'<div class="modal-body" style="font-size:125%"><div class="container-fluid">' +
						'<form>' +
						BPMopts + other +
						'</form>' +			
					'</div></div>' +
					'<div class="modal-footer">' +
						'<button type="button" class="btn btn-lg btn-primary">Save changes</button>' +
						'<button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancel</button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		$('body').append(structure);
		this._el = $('#song-settings').modal({show: false});
		
		// TODO: bind something to the SAVE / OK button to persist the settings and then
		//	update everything in the song
		
		return this;
	}

	Tone.extend(SongSettings);

	SongSettings.prototype.doModal = function() {
		this._el.modal('show');
		
		// TODO: do something when shown, most likely ensure values shown are acurate...
	}
}
