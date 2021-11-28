/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import '../assets/scss/layouts/modules.scss';

$(() => {
  $('div.details').on('click', () => {
    $(this).toggleClass('clicked').css('transition-duration', '0.8s');
    $('ul li .details').not('.clicked').toggleClass('.notSelected');
  });

  $('div#basic1').on('click', () => {
    const div = document.getElementById('exercise1');

    $(this).toggleClass('slideRight');
    $('.smallcard').toggleClass('show');
    $('#basic2').toggleClass('hide');

    $(div).addClass('hide');
    $('.notselected').css('pointer-events', 'auto');
  });

  $('div#set1').one('click', () => {
    $(this).css('transform', 'translate(5.5%, 15%) scale(1.1)');
    const html = `
		  <div id="exercise1" class="hide">
		    <div class="dashed-circle exercise1">Exercise 1</div>
		    <div class="dashed-circle exercise2">Exercise 2</div>
		    <div class="dashed-circle exercise3">Exercise 3</div>
		    <div class="dashed-circle exercise4">Exercise 4</div>
      <div class="fourth-face dice test">
				<div class="column">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					
				</div>
				<span style="color:white;font-size:40;text-align:center">Final test</span>
				<div class="column">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
			</div>

		</div>
		
		`;
    $(this).after(html);
  });

  $('div#set1').on('click', () => {
    $('#exercise1').toggleClass('hide');
    $('.exercise1').on('click', () => {
      window.open('http://localhost:3000/page/exercise1', '_parent');
    });
    $('.exercise2').on('click', () => {
      window.open('http://localhost:3000/page/exercise2', '_parent');
    });
    $('.exercise3').on('click', () => {
      window.open('http://localhost:3000/page/exercise3', '_parent');
    });
    $('.test').on('click', () => {
      window.open('http://localhost:3000/page/Set1Test', '_parent');
    });
  });
});
