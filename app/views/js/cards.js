$(() => {
	$('div#set1').one('click', function () {
		$(this).append(
			`<div id="exercises">
			<h2>Set 1</h2>
			<p>E and Æ vowal sounds</p>
		`
		)
		console.log('clicked')
	})
	$('div.details').on('click', function () {
		$(this).toggleClass('clicked').css('transition-duration', '0.8s')
		$('ul li .details').not('.clicked').toggleClass('.notSelected')
	})

	$('div#basic1').on('click', function () {
		$(this).toggleClass('slideRight')
	})

	$('div#basic1').one('click', function () {
		$('#container').prepend(
			`<div class="smallcard" id="set1">
		<h2>Set 1</h2>
		<p>E and Æ vowal sounds</p>
	</div>
	<div class="smallcard">
		<h2>Set 2</h2>
		<p>Coming soon</p>
	</div>
	
	<div class="smallcard">
		<h2>Set 3</h2>
		<p>Coming soon</p>
	</div>
	<div class="smallcard">
		<h2>Set 4</h2>
		<p>Coming soon</p>
	</div>`
		)
	})
})
