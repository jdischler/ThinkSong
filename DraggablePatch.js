var draggable_patch = function( event, ui, draggable ) {
	$.each( draggable.sortables, function() {
		var innermostIntersecting = false,
			sortable = this;

		// Copy over variables that sortable's _intersectsWith uses
		sortable.positionAbs = draggable.positionAbs;
		sortable.helperProportions = draggable.helperProportions;
		sortable.offset.click = draggable.offset.click;

		if ( sortable._intersectsWith( sortable.containerCache ) ) {
			innermostIntersecting = true;

			$.each( draggable.sortables, function() {

				// Copy over variables that sortable's _intersectsWith uses
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

		if ( innermostIntersecting ) {

			// If it intersects, we use a little isOver variable and set it once,
			// so that the move-in stuff gets fired only once.
			if ( !sortable.isOver ) {
				sortable.isOver = 1;

				// Store draggable's parent in case we need to reappend to it later.
				draggable._parent = ui.helper.parent();

				sortable.currentItem = ui.helper
					.appendTo( sortable.element )
					.data( "ui-sortable-item", true );

				// Store helper option to later restore it
				sortable.options._helper = sortable.options.helper;

				sortable.options.helper = function() {
					return ui.helper[ 0 ];
				};

				// Fire the start events of the sortable with our passed browser event,
				// and our own helper (so it doesn't create a new one)
				event.target = sortable.currentItem[ 0 ];
				sortable._mouseCapture( event, true );
				sortable._mouseStart( event, true, true );

				// Because the browser event is way off the new appended portlet,
				// modify necessary variables to reflect the changes
				sortable.offset.click.top = draggable.offset.click.top;
				sortable.offset.click.left = draggable.offset.click.left;
				sortable.offset.parent.left -= draggable.offset.parent.left -
					sortable.offset.parent.left;
				sortable.offset.parent.top -= draggable.offset.parent.top -
					sortable.offset.parent.top;

				draggable._trigger( "toSortable", event );

				// Inform draggable that the helper is in a valid drop zone,
				// used solely in the revert option to handle "valid/invalid".
				draggable.dropped = sortable.element;

				// Need to refreshPositions of all sortables in the case that
				// adding to one sortable changes the location of the other sortables (#9675)
				$.each( draggable.sortables, function() {
					this.refreshPositions();
				} );

				// Hack so receive/update callbacks work (mostly)
				draggable.currentItem = draggable.element;
				sortable.fromOutside = draggable;
			}

			if ( sortable.currentItem ) {
				sortable._mouseDrag( event );

				// Copy the sortable's position because the draggable's can potentially reflect
				// a relative position, while sortable is always absolute, which the dragged
				// element has now become. (#8809)
				ui.position = sortable.position;
			}
		} else {

			// If it doesn't intersect with the sortable, and it intersected before,
			// we fake the drag stop of the sortable, but make sure it doesn't remove
			// the helper by using cancelHelperRemoval.
			if ( sortable.isOver ) {

				sortable.isOver = 0;
				sortable.cancelHelperRemoval = true;

				// Calling sortable's mouseStop would trigger a revert,
				// so revert must be temporarily false until after mouseStop is called.
				sortable.options._revert = sortable.options.revert;
				sortable.options.revert = false;

				sortable._trigger( "out", event, sortable._uiHash( sortable ) );
				sortable._mouseStop( event, true );

				// Restore sortable behaviors that were modfied
				// when the draggable entered the sortable area (#9481)
				sortable.options.revert = sortable.options._revert;
				sortable.options.helper = sortable.options._helper;

				if ( sortable.placeholder ) {
					sortable.placeholder.remove();
				}

				// Restore and recalculate the draggable's offset considering the sortable
				// may have modified them in unexpected ways. (#8809, #10669)
				ui.helper.appendTo( draggable._parent );
	// FIXME: ERF: GROSS
				//draggable._refreshOffsets( event );
				ui.position = draggable._generatePosition( event, true );

				draggable._trigger( "fromSortable", event );

				// Inform draggable that the helper is no longer in a valid drop zone
				draggable.dropped = false;

				// Need to refreshPositions of all sortables just in case removing
				// from one sortable changes the location of other sortables (#9675)
				$.each( draggable.sortables, function() {
					this.refreshPositions();
				} );
			}
		}
	} );
}