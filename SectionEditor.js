
function initSectionEditor() {
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
}