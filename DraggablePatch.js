var draggable_patch = function( event, ui, draggable ) {
	$.each( draggable.sortables, function() {
		var innermostIntersecting = false,
			sortable = this;
		sortable.positionAbs = draggable.positionAbs;
		sortable.helperProportions = draggable.helperProportions;
		sortable.offset.click = draggable.offset.click;
		if ( sortable._intersectsWith( sortable.containerCache ) ) {
			innermostIntersecting = true;
			$.each( draggable.sortables, function() {
				this.positionAbs = draggable.positionAbs;
				this.helperProportions = draggable.helperProportions;
				this.offset.click = draggable.offset.click;
				if ( this !== sortable &&
						this._intersectsWith( this.containerCache ) &&
						$.contains( sortable.element[ 0 ], this.element[ 0 ] ) ) {
					innermostIntersecting = false;
				}
				return innermostIntersecting;
			} );
		}
		if (innermostIntersecting) {
			if (!sortable.isOver) {
				sortable.isOver = 1;
				draggable._parent = ui.helper.parent();
				sortable.currentItem = ui.helper
					.appendTo( sortable.element )
					.data( "ui-sortable-item", true );
				sortable.options._helper = sortable.options.helper;
				sortable.options.helper = function() {
					return ui.helper[ 0 ];
				};
				event.target = sortable.currentItem[ 0 ];
				sortable._mouseCapture( event, true );
				sortable._mouseStart( event, true, true );
				sortable.offset.click.top = draggable.offset.click.top;
				sortable.offset.click.left = draggable.offset.click.left;
				sortable.offset.parent.left -= draggable.offset.parent.left -
					sortable.offset.parent.left;
				sortable.offset.parent.top -= draggable.offset.parent.top -
					sortable.offset.parent.top;
				draggable._trigger( "toSortable", event );
				draggable.dropped = sortable.element;
				$.each( draggable.sortables, function() {
					this.refreshPositions();
				} );
				draggable.currentItem = draggable.element;
				sortable.fromOutside = draggable;
			}
			if (sortable.currentItem) {
				sortable._mouseDrag(event);
				ui.position = sortable.position;
			}
		} else {
			if (sortable.isOver) {
				sortable.isOver = 0;
				sortable.cancelHelperRemoval = true;
				sortable.options._revert = sortable.options.revert;
				sortable.options.revert = false;
				sortable._trigger( "out", event, sortable._uiHash( sortable ) );
				sortable._mouseStop( event, true );
				sortable.options.revert = sortable.options._revert;
				sortable.options.helper = sortable.options._helper;
				if ( sortable.placeholder ) {
					sortable.placeholder.remove();
				}
				ui.helper.appendTo( draggable._parent );
				//draggable._refreshOffsets( event );
				ui.position = draggable._generatePosition( event, true );
				draggable._trigger( "fromSortable", event );
				draggable.dropped = false;
				$.each( draggable.sortables, function() {
					this.refreshPositions();
				} );
			}
		}
	} );
}