import '../assets/scss/layouts/modules.scss';
import { cardFlip } from './CustomModules/cardFlip';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faQuestionCircle);

$(() => {
	$.ajax({
		url: `/build/getModules`,
		type: 'GET',
		success: function (data) {
			console.log(data);
			let firstDescription = data.modules[1].description;
			let firstSetDescription = data.modules[1].sets[0].description;
			console.log(firstDescription);
			console.log(firstSetDescription);
			$('div#basic1 > p').html(firstDescription);
			$('div#set1 > h2').html(firstSetDescription);
		},
	});
	function MakeHelpIcon() {
		let helpIcon = `<div class='helpIcon'>${
			icon({ prefix: 'fas', iconName: 'question-circle' }).html
		}</div>`;
		$('#container').append(helpIcon);
	}
	function ShowTutorialAgain() {
		$('div.helpIcon').on('click', function () {
			$('#container')
				.prepend(`<div class='curtain'></div>`)
				.prepend(`<div class='tutorial'></div>`);
			$('.tutorial').append(
				'<p>Choose the module with the subject you want to practice. After that, choose the set with the exercises you want to practice.</p>'
			);
			$('.curtain').on('click', () => {
				RemoveTutorial();
			});
		});
	}

	function RemoveTutorial() {
		return new Promise(resolve => {
			let html = $('.tutorial').html();
			$('.tutorial').remove();
			$('#tutorialbutton').remove();
			$('.curtain').remove();
			$('.speaker').append(
				icon({ prefix: 'fas', iconName: 'volume-up' }).html
			);
			resolve(html);
		});
	}

	MakeHelpIcon();
	ShowTutorialAgain();

	$('div.modules').on('click', function () {
		$(this).toggleClass('clicked').css('transition-duration', '0.8s');
	});

	$('div#basic1').on('click', function () {
		const div = document.getElementById('exercise1');

		$(this).toggleClass('slideRight');
		$('.smallcard').toggleClass('show');
		$('div#basic1 > p').toggleClass('hide');

		$('#basic2').toggleClass('hide');
		$('#basic3').toggleClass('hide');
		$('#basic4').toggleClass('hide');
		$('#special1').toggleClass('hide');

		$(div).addClass('hide');
		$('.notselected').css('pointer-events', 'auto');
	});

	$('div#set1').one('click', function () {
		$(this).append(`
		<div id="exercise1" class="hide">
		<div class="exercise exercise1"><p>Exercise 1</p></div>
		<div class="exercise exercise2"><p>Exercise 2</p></div>
		<div class="exercise exercise3"><p>Exercise 3</p></div>
		<div class="test"><p>Final test</p></div>
		</div>
		`);
	});

	$('div#set1').on('click', function () {
		$(this).toggleClass('hover');
		if ($('#exercise1').is(':visible')) {
			$('#exercise1').slideUp('slow');
			$('#set2').animate(
				{
					top: '80%',
				},
				'slow'
			);
			$('#set3').animate(
				{
					top: '120%',
				},
				'slow'
			);
		} else {
			$('#exercise1').slideDown('slow');
			$('#set2').animate(
				{
					top: '100%',
				},
				'slow'
			);
			$('#set3').animate(
				{
					top: '140%',
				},
				'slow'
			);
		}
		console.log('clicked');
		$('.exercise1').on('click', function () {
			window.open('/page/exercise1', '_parent');
		});
		$('.exercise2').on('click', function () {
			window.open('/page/exercise2', '_parent');
		});
		$('.exercise3').on('click', function () {
			window.open('/page/exercise3', '_parent');
		});

		$('.test').on('click', function () {
			window.open('/page/Set1Test', '_parent');
		});
	});
});
