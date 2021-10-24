$(() => {
	$('div.details').on('click', function () {
		$(this).toggleClass('clicked').css('transition-duration', '0.8s')
		$('li .details').not('.clicked').toggleClass('.notSelected')
	})
})
