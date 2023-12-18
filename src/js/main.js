import * as flsFunctions from "./modules/functions.js"

flsFunctions.isWebp();


import { Navigation, Pagination } from 'swiper/modules';

function sliderArrow() {
	const portfolioSlider = document.querySelectorAll('.js-swiper-slider__wrapper');

	if (portfolioSlider.length) {
		portfolioSlider.forEach((element) => {

			const twentyTwentyWrapper = element.querySelector('.portfolio-ba');
			const arrowWrapper = element.querySelectorAll('.slider-arrow-wrapper');
			const arrowWrapperHeight = twentyTwentyWrapper.clientHeight;
		
			arrowWrapper.forEach((element) => {
				element.style.setProperty('height', arrowWrapperHeight + 'px')
			})
		});
	}
}

sliderArrow()

console.log('test15');
///vdsvasvsd





