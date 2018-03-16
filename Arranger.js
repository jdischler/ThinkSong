// Common song section names: intro, outro, pre-chorus, chorus, refrain, verse, bridge, solo, interlude, segue
{
	// $('#someDivToMakeIntoSection'), //
	// 'convenienceIDforNewSection', // may not be needed if this class can be extended to ease using this crap 
	// {buttonDefs:data,title:string,editable:boolean}
	// buttonDef: {id: 'button-id', fa: 'font-awesome-tag', help: 'tooltip text'}
	//--------------------------------------------------------------------------
	ArrangerSection = function(jqueryEl, sectionDivID, options) {
		if (this instanceof ArrangerSection) { // allows it to be constructed with or without 'new'
		} 
		else {
			return new ArrangerSection(jqueryEl, sectionDivID, options);
		}
		
		// Blerf, manage defaults....
		options['title'] = options.title || 'Title'
		options['bootstrapColClasses'] = options.bootstrapColClasses || 'col-md-6'
		options['buttons'] = options.buttons || false
		options['editableTitle'] = options.editableTitle || false
		
		this._el = jqueryEl;
		this._options = options;
		
	  	var button = undefined;
	  	forEach(options.buttons, function(item) {
	  		if (item) {
	  		 	button = button ? button + '&nbsp; &nbsp;' : ''
	  			button += `<i id="${item.id}" class="pull-right button fa ${item.fa}"`;
	  			button += ` data-toggle="tooltip" data-placement="top" title="${item.help}"></i>`;
	  		}
	  	});
	  	button = "<div class='col-xs-3' style='padding:0;'>" + (button || '') + "</div>"; 
		var titleClass = options.editableTitle ? 'edit-text' : 'not-text'; 
		var div = `<div class="${options.bootstrapColClasses}">` +
					'<div class="row unselectable section-header">' +
						`<div class='${titleClass} col-xs-9 header-title'>${options.title}</div>${button}` +
					'</div>' +
					'<div class="section-content">' +
						'<div class="container constrained-container"></div>' +
					'</div></div>';
		this._el.append(div); // or replace?
		if (options.editableTitle) {
			this._el.on('click', "div.header-title", function() { 	
				allowStartToggle = false;
				var $lbl = $(this), origText = $lbl.text(),
				$txt = $('<input type="text" class="col-xs-9 editable-label-text" value="'+origText+'" />');
				$lbl.replaceWith($txt);
				$txt.focus();
				
				$txt.blur(function() {
					var no = $(this).val();
					$lbl.text(no);
					$txt.replaceWith($lbl);
					allowStartToggle = true;
				}).keydown(function(evt) {
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
		var content = `<div id="${sectionDivID}" class="row min-height"></div>`
		this._el.find('.constrained-container').append(content);
		
		return this;
	};

	Tone.extend(ArrangerSection);

	ArrangerSection.prototype.setTitle = function(title) {
		this._el.find('.header-title').html(title);
	}

	ArrangerSection.prototype.getBounds = function(child) {
		var el = this._el[0];
		if (child) {
			el = this._el.find(child);
			el = el[0];
		} 
		return el.getBoundingClientRect()
	}
}

function initArranger() {

	var config = {
		connectToSortable: "#song-drop-area",
		helper: 'clone',
		containment: 'body',
		revert: 'invalid',
		// erf, sort of a magical number. can't go much about 50 without running into zindex problems with modals
		zIndex: 50 
		
	};

	// FIXME: ERF: GROSS. Some weird issue interacting with sortables..uses a patch defined in a patch.js file..
	$.ui.draggable.prototype.plugins['drag'][0][1] = draggable_patch;

	//--------------------------------------------------------------------------
	// The actual Song
	//--------------------------------------------------------------------------
	_SongDefinition = ArrangerSection($('#song-section'), 
		'song-drop-area', { 
			title: 'Song Title', 
			buttons: [{
				id: "play-start", fa: "fa-play-circle-o", help: "Play song"
			},{
				id: "song-configure", fa: "fa-cog", help: "Song settings"
			}],
			editableTitle: true
		}
	);

	var sortOrStop = function(evt, ui) {
		var b1 = _SongDefinition.getBounds('.section-content'),
			o = ui.offset;
		if (o.top < b1.top - 70 || o.top > b1.bottom - 25 || o.left < b1.left - 70 || o.left > b1.right - 5) {
			$(ui.item).addClass('ghost');
		}
		else {
			$(ui.item).removeClass('ghost');
		}
	}
	
	// Control placement in song drop area
	$("#song-drop-area").sortable({
		containment: 'body',
		placeholder: 'skinny',
		revert: 100,
		sort: function(evt, ui) {
			var b1 = _SongDefinition.getBounds('.section-content'), o = ui.offset;
			if (o.top < b1.top - 70 || o.top > b1.bottom - 25 || o.left < b1.left - 70 || o.left > b1.right - 5) 
				$(ui.item).addClass('ghost');
			else $(ui.item).removeClass('ghost');
		},
		stop: function(evt, ui) {
			var b1 = _SongDefinition.getBounds('.section-content'), o = ui.offset;
			if (o.top < b1.top - 70 || o.top > b1.bottom - 25 || o.left < b1.left - 70 || o.left > b1.right - 5) 
				$(ui.item).remove();
			else $(ui.item).removeClass('ghost');
		},
		start: function() {},
		receive: function (e, ui) {}
	}).disableSelection();

	function toggleStart() {
		if (!allowStartToggle) return;
		var playButton = $('#play-start')
		if (Tone.Transport.state != "started") {
			playButton.addClass('button-active');
			playButton.removeClass('fa-play-circle-o');
			playButton.addClass('fa-stop-circle-o');
			Tone.Transport.start("+0.1");
			
			// TODO: probably just have some sort of callback on song end instead of scheduling??
			Tone.Transport.schedule(function() {
				Tone.Transport.stop();
				playButton.removeClass('button-active');
				playButton.removeClass('fa-stop-circle-o');
				playButton.addClass('fa-play-circle-o');
			}, '18m'); // TODO: get actual song length
		} 
		else {
			Tone.Transport.stop();
			playButton.removeClass('button-active');
			playButton.removeClass('fa-stop-circle-o');
			playButton.addClass('fa-play-circle-o');
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

	_SongSettings = SongSettings();
	$('#song-configure').click(function() {
		_SongSettings.doModal();
	});

	//--------------------------------------------------------------------------
	// What the song could be made of...
	//--------------------------------------------------------------------------
	_SongElementBrowser = ArrangerSection($('#section-browser'),
		'sb-inner', {// TODO, choose better div name?
			title: 'Section Browser', 
			buttons: {
				id: "add-new-section", fa: "fa-plus-square-o", help: 'New section'
			}
		}
	); 
	
	var counter = 1;
	var colors = ['green','blue','red','cyan','orange']
	$('#add-new-section').click(function() {
		var newS = $('#sb-inner');
		var name = `New Section ${counter}`
		var color = colors[counter % colors.length]
		counter++
		var el = $(`<div class="sb-draggable col-xs-1 song-section ${color}"><div class="unselectable song-section-title">${name}</div></div>`);
		newS.append(el);
		$(el).draggable(config).disableSelection();
	})		
		
};
