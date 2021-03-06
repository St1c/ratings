$(document).ready(function() {

	startTime = new Date().getTime();
	focusStart = null;
	noOfFocuses = 0;

	window.onfocus = function() {
		noOfFocuses += 1;
		focusStart = new Date().getTime();
		// console.log(noOfFocuses);
	};


	$("#scale-stars label").on('mouseover', function(){
		id 		= $(this).attr('for');
		value 	= $('#' + id).val();

		$('#rate-output').html(value + '/9');
	});

	$('#scale-stars label').on('mouseleave', function(){
		if ( $(".player-form  input[name='quality-stars']:checked").length < 1 ) {
			$('#rate-output').html('0/9');
		} else {
			 value = $(".player-form  input[name='quality-stars']:checked").val();
			 $('#rate-output').html(value + '/9');
		}
	});


	$(".player-form input[type='submit']").click( function(e) {

		e.preventDefault();
		finalTime = 0;
		
		if ( $(".player-form  input[name='qualityChange']:checked").length < 1 ) {
			$(".player-form legend.quality-change")
				.after('<div class="alert alert-danger"> \
							<button type="button" class="close" data-dismiss="alert">&times;</button> \
							You did not select whether you noticed any changes in quality! \
						</div>');
		}
		else if ( $(".player-form  input[name='quality']:checked").length < 1 ) {
			$(".player-form legend.quality")
				.after('<div class="alert alert-danger"> \
							<button type="button" class="close" data-dismiss="alert">&times;</button> \
							You did not select any quality grade! \
						</div>');
		}
		else if ( finalTime <= 20000 ) {

			$('#myModal').modal('show');
			noOfFocuses -= 2;						// Leaving modal window create onFocus event, so lower the value by 1 
			if (noOfFocuses < 0) noOfFocuses = 0;

			$("#modal-btn-continue").click(function(){
				$(".player-form input[name='noOfFocuses']").val(noOfFocuses);	// Update form value
				$(".player-form").submit();
			});

		} else {
			$(".player-form").submit();
		}

	});

});