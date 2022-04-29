//SLIDER
const swiper = new Swiper('.swiper', {
	slidesPerView: 3,
	spaceBetween: 30,
	loop: true,
 	navigation: {
    	nextEl: '.swiper-button-next',
    	prevEl: '.swiper-button-prev',
  	},
});

//PATH
let pathAudio 				= 'audio/';
let pathPlayImg 			= 'img/player/play.svg';
let pathPauseImg 			= 'img/player/pause.svg';
let pathControlPlayImg		= 'img/player/control/play.svg';
let pathControlPauseImg		= 'img/player/control/pause.svg';

//TRACK LIST
let playList 				= [
	{
		author: '3LAU, Bright Lights',
		song: 'How You Love Me.mp3'
	},
	{
		author: 'Pink Is Punk, Benny Benassi, Bright Lights',
		song: 'Ghost.mp3'
	},
	{
		author: 'Hardwell, Dyro, Bright Lights',
		song: 'Never Say Goodbye.mp3'
	},
	{
		author: 'Zeds Dead, Dirtyphonics, Bright Lights',
		song: 'Where Are You Now.mp3'
	},
	{
		author: 'Bright Lights',
		song: 'War For Love.mp3'
	},
	{
		author: 'Zedd, Bright Lights',
		song: 'Follow You Down.mp3'
	},
]


//SELECTOR PLAYER
let playerHero 				= document.querySelector 	('.player-hero');
let playerLast 				= document.querySelector 	('.player-last');
let playHeroBtn 			= document.querySelector 	('.hero__player .player__play');
let playLastBtn 			= document.querySelector 	('.last-tracks__player .player__play');
let control 				= document.querySelector 	('.media-controls');
let controlPlayImg 			= document.querySelector 	('.media-controls__play-img');
let controlPlayBtn 			= document.querySelector 	('.media-controls__play');
let controlPrevBtn 			= document.querySelector 	('.media-controls__prev');
let controlNextBtn 			= document.querySelector 	('.media-controls__next');
let controlContainer 		= document.querySelector 	('.media-controls__progress-container');
let controlProgress 		= document.querySelector 	('.media-controls__progress');
let controlLine		 		= document.querySelector 	('.media-controls__line');
let controlFade		 		= document.querySelector 	('.media-controls__fade');
let controlTimeCurrent		= document.querySelector 	('.media-controls__time-current');
let controlTimeDuration		= document.querySelector 	('.media-controls__time-duration');
let progressContainer 		= document.querySelector 	('.player__progress-container');
let tracklist 				= document.querySelector 	('.tracklist__list');
let controlAuthor 			= document.querySelector 	('.media-controls__author');
let controlSong 			= document.querySelector 	('.media-controls__song');
let audioAll 				= document.querySelectorAll	('.player__audio');
let imgPlayAll 				= document.querySelectorAll	('.player__play-img');
let itemLastAll 			= document.querySelectorAll	('.tracklist__item');
let progressContainerAll 	= document.querySelectorAll ('.player__progress-container');
let footer 					= document.querySelector 	('.footer');

//PLAYER
let index = 0;
let imgPlay;
let flag;
let currentPlayer 			= playerHero;

//SET PROGRESS 
let checkMouseDown 			= false;
let setPos;

playerInit();
hero();
last();
showTimeDuration();

//INIT PLAYER
function playerInit() {
	playerHero.src = `${pathAudio}${playList[4].author} - ${playList[4].song}`;
	playerLast.src = `${pathAudio}${playList[index].author} - ${playList[index].song}`;
}


//STOP OTHER
function stopOther() {
	progressReset();
	audioAll.forEach(item => {
		item.pause();
		item.currentTime = 0;
		let setTime = item.parentNode.querySelector('.player__time-current');
		setTime.innerHTML = `00 : 00`;
	})
	imgPlayAll.forEach(item => {
		item.src = pathPlayImg;
	}) 
}

//PLAY
function play() {
	currentPlayer.play();
	progress();
	imgPlay.src = pathPauseImg;
	controlPlayImg.src = pathControlPauseImg;
}

//PAUSE
function pause() {
	currentPlayer.pause();
	imgPlay.src = pathPlayImg;
	controlPlayImg.src = pathControlPlayImg;
}

//PLAYER HERO
function hero() {
	flag = false;
	playHeroBtn.onclick = function() {
		imgPlay = playerHero.parentNode.querySelector('.player__play-img');
		if(currentPlayer != playerHero) {
			stopOther();
			flag = false;
		}
		currentPlayer = playerHero;
		if(flag) {
			pause();
			flag = false;
		}
		else {
			play();
			flag = true;
		}
		control.classList.remove('media-controls--active');
		footer.style.paddingBottom = 40 + 'px';
		select();
	}
}

//PLAYER LAST
function last() {
	flag = false;
	playLastBtn.onclick = function() {
		imgPlay = playerLast.parentNode.querySelector('.player__play-img');
		if(currentPlayer != playerLast) {
			stopOther();
			flag = false;
		}
		currentPlayer = playerLast;
		if(flag) {
			pause();
			flag = false;
		}
		else {
			play();
			flag = true;
		}
		control.classList.add('media-controls--active');
		footer.style.paddingBottom = control.offsetHeight + 40 + 'px';
		select();
	}
	
	//CONTROL LISTENER
	controlPlayBtn.addEventListener('click', function() {
		if(flag == true) {
			pause(currentPlayer, imgPlay);
			flag = false;
		}
		else {
			play(currentPlayer, imgPlay);
			flag = true;
		}
		select();
	})
	select();

}

//HOVER SELECT PLAY
Array.from(tracklist.children).forEach((item, i)=> {
	item.addEventListener('click', function(event) {
		let target = event.target.closest('.tracklist__item');
		if(!target) return;
		currentPlayer = playerLast;
		imgPlay = playerLast.parentNode.querySelector('.player__play-img');
		control.classList.add('media-controls--active');
		footer.style.paddingBottom = control.offsetHeight + 40 + 'px';

		index = i;

		if(!item.classList.contains('tracklist__item--play') && !item.classList.contains('tracklist__item--select')) {
			flag = true;
			stopOther();
			playerInit();
			play();
			select();
		}
		else if(item.classList.contains('tracklist__item--play')) {
			item.classList.remove('tracklist__item--play');
			pause();
			flag = false;
		}
		else if(!item.classList.contains('tracklist__item--play') && item.classList.contains('tracklist__item--select')) {
			flag = true;
			item.classList.add('tracklist__item--play');
			play();
		}
	})
})

//PREV
function prev() {
	index--;
	if(index < 0) {
		index = playList.length - 1;
	}
	playerInit();
	select();
	if(flag) {
		play();
	}
}

//NEXT
function next() {
	index++;
	if(index > playList.length - 1) {
		index = 0;
	}
	playerInit();
	select();
	if(flag) {
		play();
	}
	progressReset();
}

//PREV SONG
controlPrevBtn.addEventListener('click', prev)

//NEXT SONG
controlNextBtn.addEventListener('click', next)


//PROGRESS
function progress() {
	let progressLine 		= currentPlayer.parentNode.querySelector('.player__progress-line');
	let progressFade 		= currentPlayer.parentNode.querySelector('.player__progress-fade');
	currentPlayer.addEventListener('timeupdate', timeUpdate);
	function timeUpdate() {
		let currentTime 		= currentPlayer.currentTime;
 		let percent 			= 100 / (currentPlayer.duration / currentPlayer.currentTime);
		if(!checkMouseDown) {
			progressLine.style.width = percent + '%';
			progressFade.style.left = percent + '%';
			controlLine.style.width = percent + '%';
			controlFade.style.left = percent + '%';
			showTimeCurrent(currentTime);
		}
	}
}

//PROGRESS RESET
function progressReset() {
	audioAll.forEach(item=> {
		let progressLine = item.parentNode.querySelector('.player__progress-line');
		let progressFade = item.parentNode.querySelector('.player__progress-fade');
		progressLine.style.width = 0;
		progressFade.style.left = 0;
		controlLine.style.width = 0;
		controlFade.style.left = 0;
	})
}

//SET PROGRESS
progressContainerAll.forEach(item => {
	item.addEventListener('mousedown', setProgress);
	function setProgress(event) {
		let selectPlayer = item.parentNode.querySelector('.player__audio')
		if(selectPlayer != currentPlayer) return;
		let target = event.currentTarget;
		if(!target) return;
		checkMouseDown = true;
		let click = event.clientX - item.getBoundingClientRect().left;
		let width = item.offsetWidth;
		let setTime = currentPlayer.duration / (width / click);
		let fade = item.querySelector('.player__progress-fade');
		let line = item.querySelector('.player__progress-line');


		let setPos = Math.floor(100 / (width / click));
		if(setPos > 100) {
			setPos = 100;
		}
		else if (setPos < 0) {
			setPos = 0;
		}	
		fade.style.left = setPos + '%';
		line.style.width = setPos + '%';
		controlLine.style.width = setPos + '%';
		controlFade.style.left = setPos + '%';
		item.classList.add('player__progress-container--hover');
		showTimeCurrent(setTime);


		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);
		function mouseMove(event) {
			let clickMove = event.clientX - item.getBoundingClientRect().left;
			setTime = currentPlayer.duration / (width / clickMove);
			setPos = 100 / (width / clickMove);
			if(setPos > 100) {
			setPos = 100;
			}
			else if (setPos < 0) {
				setPos = 0;
			}	
			fade.style.left = setPos + '%';
			line.style.width = setPos + '%';
			controlLine.style.width = setPos + '%';
			controlFade.style.left = setPos + '%';
			if(setTime < 0) setTime = 0;
			if(setTime > currentPlayer.duration) setTime = currentPlayer.duration;
			showTimeCurrent(setTime);
		}
		function mouseUp(event) {
			checkMouseDown = false;
			currentPlayer.currentTime = setTime;
			fade.style.left = setPos + '%';
			line.style.width = setPos + '%';
			item.classList.remove('player__progress-container--hover');
			document.removeEventListener('mousemove', mouseMove);
			document.removeEventListener('mouseup', mouseUp);
		}
	}
})

//SET PROGRESS CONTROL
controlContainer.onmousedown = function(event) {
	let target = event.currentTarget;
	if(!target) return;
	let lastFade = playerLast.parentNode.querySelector('.player__progress-fade');
	let lastLine = playerLast.parentNode.querySelector('.player__progress-line');
	let click = event.clientX - target.getBoundingClientRect().left;
	let percent = Math.floor(100 / (target.offsetWidth / click));
	let setTime = currentPlayer.duration / (target.offsetWidth / click);
	checkMouseDown = true;
	if(percent < 0) percent = 0;
	if(percent > 100) percent = 100;
	controlLine.style.width = percent + '%'; 
	controlFade.style.left = percent + '%';
	lastLine.style.width = percent + '%'; 
	lastFade.style.left = percent + '%';
	if(setTime < 0) setTime = 0;
	if(setTime > currentPlayer.duration) setTime = currentPlayer.duration;
	controlContainer.classList.add('media-controls__progress-container--hover')
	showTimeCurrent(setTime);
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);
	function mouseMove(event) {
		let clickMove = Math.floor(event.clientX - target.getBoundingClientRect().left);
		let percent = 100 / (target.offsetWidth / clickMove);
		setTime = currentPlayer.duration / (target.offsetWidth / clickMove);
		if(percent < 0) percent = 0;
		if(percent > 100) percent = 100;
		controlLine.style.width = percent + '%'; 
		controlFade.style.left = percent + '%';
		lastLine.style.width = percent + '%'; 
		lastFade.style.left = percent + '%';
		if(setTime < 0) setTime = 0;
		if(setTime > currentPlayer.duration) setTime = currentPlayer.duration;
		showTimeCurrent(setTime);
	}
	function mouseUp() {
		controlContainer.classList.remove('media-controls__progress-container--hover')
		currentPlayer.currentTime = setTime;
		checkMouseDown = false;
		document.removeEventListener('mousemove', mouseMove);
		document.removeEventListener('mouseup', mouseUp);
	}
}

//SHOW CURRENT TIME
function showTimeCurrent(setTime) {
	let currentTimeDisplay	= currentPlayer.parentNode.querySelector('.player__time-current');
	let minute 				= Math.floor(setTime / 60);
	let second 				= Math.floor(setTime % 60);
	if(minute < 10) {
		minute = '0' + minute;
	}
	if(second < 10) {
		second = '0' + second;
	}
	currentTimeDisplay.innerHTML = `${minute} : ${second}`;
	controlTimeCurrent.innerHTML = `${minute} : ${second}`;
}

//SHOW DURATION TIME
function showTimeDuration() {
	let fullTimeLast	= playerLast.parentNode.querySelector('.player__time-duration');
	let fullTimeHero	= playerHero.parentNode.querySelector('.player__time-duration');
	playerHero.addEventListener('loadedmetadata', function() {
		let minute = Math.floor(playerHero.duration / 60);
		let second = Math.floor(playerHero.duration % 60);
		if(minute < 10) {
			minute = '0' + minute;
		}
		if(second < 10) {
			second = '0' + second;
		}
		fullTimeHero.innerHTML = `${minute} : ${second}`;
	})
	
	playerLast.addEventListener('loadedmetadata', function() {
		let minute = Math.floor(playerLast.duration / 60);
		let second = Math.floor(playerLast.duration % 60);
		if(minute < 10) {
			minute = '0' + minute;
		}
		if(second < 10) {
			second = '0' + second;
		}
		fullTimeLast.innerHTML = `${minute} : ${second}`;
		controlTimeDuration.innerHTML = `${minute} : ${second}`;
	})		
}
	
//END SONG
audioAll.forEach(item => {
	item.addEventListener('ended', function(event) {
		if(currentPlayer == playerLast) {
			next();
		}
		if(currentPlayer == playerHero) {
			stopOther();
			pause();
			flag = false;
		}
	})
})
 
//SELECT SONG
function select() {
	itemLastAll.forEach(item => {
		item.classList.remove('tracklist__item--play');
		item.classList.remove('tracklist__item--select');
	})
	itemLastAll[index].classList.add('tracklist__item--select');
	controlAuthor.innerHTML = playList[index].author;
	controlSong.innerHTML = playList[index].song.replace(/.mp3/g, '');
	if(flag) {
		if(currentPlayer == playerLast) {
			itemLastAll[index].classList.add('tracklist__item--play');
		}
	}
	showTimeDuration();
}

//SELECT HOVER STYLE
tracklist.addEventListener('mouseover', function() {
	let target = event.target.closest('.tracklist__item');
	if(!target) return;
	target.classList.add('tracklist__item--hover');
})
tracklist.addEventListener('mouseout', function() {
	let target = event.target.closest('.tracklist__item');
	if(!target) return;
	target.classList.remove('tracklist__item--hover');
})



let tmp 				= document.querySelectorAll('.player__audio');
tmp.forEach(item=> {
	item.volume = 0.5;
})


// VOLUME INIT
let volume 				= document.querySelector('.volume');
let volumeProgress 		= document.querySelector('.volume__progress');
let volumeFade 			= document.querySelector('.volume__fade');
let volumeLine 			= document.querySelector('.volume__line');


function volumeSet() {
	volumeFade.style.left = 100 / (1 / currentPlayer.volume) + '%';
	volumeLine.style.width = 100 / (1 / currentPlayer.volume) + '%';
}
volumeSet();


//VOLUME SET 
volumeProgress.onmousedown = function(event) {
	let target = event.currentTarget;
	if(!target) return;
	let click = event.clientX - target.getBoundingClientRect().left;
	let percent = Math.floor(100 / (target.offsetWidth / click));
	let volume = 1 / (target.offsetWidth / click);
	if(volume < 0) {
		volume = 0;
		volumeProgress.classList.add('volume__progress--off');
	}
	else {
		volumeProgress.classList.remove('volume__progress--off');
	}

	if(volume > 1) volume = 1;
	if(percent < 0) percent = 0;
	if(percent > 100) percent = 100;

	volumeFade.style.left = percent + '%';
	volumeLine.style.width = percent + '%';
	audioAll.forEach(item => {
		item.volume = volume;
	})
	volumeProgress.classList.add('volume__progress--hover');
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);

	function mouseMove(event) {
		let clickMove = event.clientX - target.getBoundingClientRect().left;
		let percent = Math.floor(100 / (target.offsetWidth / clickMove));
		let volume = 1 / (target.offsetWidth / clickMove);

		if(volume < 0) {
			volume = 0;
			volumeProgress.classList.add('volume__progress--off');
		}
		else {
			volumeProgress.classList.remove('volume__progress--off');
		}
		if(volume > 1) volume = 1;
		if(percent < 0) percent = 0;
		if(percent > 100) percent = 100;
		volumeFade.style.left = percent + '%';
		volumeLine.style.width = percent + '%';
		audioAll.forEach(item => {
			item.volume = volume;
		})
	}
	function mouseUp(event) {
		volumeProgress.classList.remove('volume__progress--hover');
		document.removeEventListener('mousemove', mouseMove);
		document.removeEventListener('mouseup', mouseUp);
	}
}






//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vU0xJREVSXHJcbmNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXInLCB7XHJcblx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRzcGFjZUJldHdlZW46IDMwLFxyXG5cdGxvb3A6IHRydWUsXHJcbiBcdG5hdmlnYXRpb246IHtcclxuICAgIFx0bmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICBcdHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gIFx0fSxcclxufSk7XHJcblxyXG4vL1BBVEhcclxubGV0IHBhdGhBdWRpbyBcdFx0XHRcdD0gJ2F1ZGlvLyc7XHJcbmxldCBwYXRoUGxheUltZyBcdFx0XHQ9ICdpbWcvcGxheWVyL3BsYXkuc3ZnJztcclxubGV0IHBhdGhQYXVzZUltZyBcdFx0XHQ9ICdpbWcvcGxheWVyL3BhdXNlLnN2Zyc7XHJcbmxldCBwYXRoQ29udHJvbFBsYXlJbWdcdFx0PSAnaW1nL3BsYXllci9jb250cm9sL3BsYXkuc3ZnJztcclxubGV0IHBhdGhDb250cm9sUGF1c2VJbWdcdFx0PSAnaW1nL3BsYXllci9jb250cm9sL3BhdXNlLnN2Zyc7XHJcblxyXG4vL1RSQUNLIExJU1RcclxubGV0IHBsYXlMaXN0IFx0XHRcdFx0PSBbXHJcblx0e1xyXG5cdFx0YXV0aG9yOiAnM0xBVSwgQnJpZ2h0IExpZ2h0cycsXHJcblx0XHRzb25nOiAnSG93IFlvdSBMb3ZlIE1lLm1wMydcclxuXHR9LFxyXG5cdHtcclxuXHRcdGF1dGhvcjogJ1BpbmsgSXMgUHVuaywgQmVubnkgQmVuYXNzaSwgQnJpZ2h0IExpZ2h0cycsXHJcblx0XHRzb25nOiAnR2hvc3QubXAzJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0YXV0aG9yOiAnSGFyZHdlbGwsIER5cm8sIEJyaWdodCBMaWdodHMnLFxyXG5cdFx0c29uZzogJ05ldmVyIFNheSBHb29kYnllLm1wMydcclxuXHR9LFxyXG5cdHtcclxuXHRcdGF1dGhvcjogJ1plZHMgRGVhZCwgRGlydHlwaG9uaWNzLCBCcmlnaHQgTGlnaHRzJyxcclxuXHRcdHNvbmc6ICdXaGVyZSBBcmUgWW91IE5vdy5tcDMnXHJcblx0fSxcclxuXHR7XHJcblx0XHRhdXRob3I6ICdCcmlnaHQgTGlnaHRzJyxcclxuXHRcdHNvbmc6ICdXYXIgRm9yIExvdmUubXAzJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0YXV0aG9yOiAnWmVkZCwgQnJpZ2h0IExpZ2h0cycsXHJcblx0XHRzb25nOiAnRm9sbG93IFlvdSBEb3duLm1wMydcclxuXHR9LFxyXG5dXHJcblxyXG5cclxuLy9TRUxFQ1RPUiBQTEFZRVJcclxubGV0IHBsYXllckhlcm8gXHRcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXHQoJy5wbGF5ZXItaGVybycpO1xyXG5sZXQgcGxheWVyTGFzdCBcdFx0XHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcdCgnLnBsYXllci1sYXN0Jyk7XHJcbmxldCBwbGF5SGVyb0J0biBcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXHQoJy5oZXJvX19wbGF5ZXIgLnBsYXllcl9fcGxheScpO1xyXG5sZXQgcGxheUxhc3RCdG4gXHRcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFx0KCcubGFzdC10cmFja3NfX3BsYXllciAucGxheWVyX19wbGF5Jyk7XHJcbmxldCBjb250cm9sIFx0XHRcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFx0KCcubWVkaWEtY29udHJvbHMnKTtcclxubGV0IGNvbnRyb2xQbGF5SW1nIFx0XHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcdCgnLm1lZGlhLWNvbnRyb2xzX19wbGF5LWltZycpO1xyXG5sZXQgY29udHJvbFBsYXlCdG4gXHRcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFx0KCcubWVkaWEtY29udHJvbHNfX3BsYXknKTtcclxubGV0IGNvbnRyb2xQcmV2QnRuIFx0XHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcdCgnLm1lZGlhLWNvbnRyb2xzX19wcmV2Jyk7XHJcbmxldCBjb250cm9sTmV4dEJ0biBcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXHQoJy5tZWRpYS1jb250cm9sc19fbmV4dCcpO1xyXG5sZXQgY29udHJvbENvbnRhaW5lciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFx0KCcubWVkaWEtY29udHJvbHNfX3Byb2dyZXNzLWNvbnRhaW5lcicpO1xyXG5sZXQgY29udHJvbFByb2dyZXNzIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXHQoJy5tZWRpYS1jb250cm9sc19fcHJvZ3Jlc3MnKTtcclxubGV0IGNvbnRyb2xMaW5lXHRcdCBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFx0KCcubWVkaWEtY29udHJvbHNfX2xpbmUnKTtcclxubGV0IGNvbnRyb2xGYWRlXHRcdCBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFx0KCcubWVkaWEtY29udHJvbHNfX2ZhZGUnKTtcclxubGV0IGNvbnRyb2xUaW1lQ3VycmVudFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXHQoJy5tZWRpYS1jb250cm9sc19fdGltZS1jdXJyZW50Jyk7XHJcbmxldCBjb250cm9sVGltZUR1cmF0aW9uXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcdCgnLm1lZGlhLWNvbnRyb2xzX190aW1lLWR1cmF0aW9uJyk7XHJcbmxldCBwcm9ncmVzc0NvbnRhaW5lciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFx0KCcucGxheWVyX19wcm9ncmVzcy1jb250YWluZXInKTtcclxubGV0IHRyYWNrbGlzdCBcdFx0XHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcdCgnLnRyYWNrbGlzdF9fbGlzdCcpO1xyXG5sZXQgY29udHJvbEF1dGhvciBcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXHQoJy5tZWRpYS1jb250cm9sc19fYXV0aG9yJyk7XHJcbmxldCBjb250cm9sU29uZyBcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXHQoJy5tZWRpYS1jb250cm9sc19fc29uZycpO1xyXG5sZXQgYXVkaW9BbGwgXHRcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxcdCgnLnBsYXllcl9fYXVkaW8nKTtcclxubGV0IGltZ1BsYXlBbGwgXHRcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxcdCgnLnBsYXllcl9fcGxheS1pbWcnKTtcclxubGV0IGl0ZW1MYXN0QWxsIFx0XHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbFx0KCcudHJhY2tsaXN0X19pdGVtJyk7XHJcbmxldCBwcm9ncmVzc0NvbnRhaW5lckFsbCBcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCAoJy5wbGF5ZXJfX3Byb2dyZXNzLWNvbnRhaW5lcicpO1xyXG5sZXQgZm9vdGVyIFx0XHRcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXHQoJy5mb290ZXInKTtcclxuXHJcbi8vUExBWUVSXHJcbmxldCBpbmRleCA9IDA7XHJcbmxldCBpbWdQbGF5O1xyXG5sZXQgZmxhZztcclxubGV0IGN1cnJlbnRQbGF5ZXIgXHRcdFx0PSBwbGF5ZXJIZXJvO1xyXG5cclxuLy9TRVQgUFJPR1JFU1MgXHJcbmxldCBjaGVja01vdXNlRG93biBcdFx0XHQ9IGZhbHNlO1xyXG5sZXQgc2V0UG9zO1xyXG5cclxucGxheWVySW5pdCgpO1xyXG5oZXJvKCk7XHJcbmxhc3QoKTtcclxuc2hvd1RpbWVEdXJhdGlvbigpO1xyXG5cclxuLy9JTklUIFBMQVlFUlxyXG5mdW5jdGlvbiBwbGF5ZXJJbml0KCkge1xyXG5cdHBsYXllckhlcm8uc3JjID0gYCR7cGF0aEF1ZGlvfSR7cGxheUxpc3RbNF0uYXV0aG9yfSAtICR7cGxheUxpc3RbNF0uc29uZ31gO1xyXG5cdHBsYXllckxhc3Quc3JjID0gYCR7cGF0aEF1ZGlvfSR7cGxheUxpc3RbaW5kZXhdLmF1dGhvcn0gLSAke3BsYXlMaXN0W2luZGV4XS5zb25nfWA7XHJcbn1cclxuXHJcblxyXG4vL1NUT1AgT1RIRVJcclxuZnVuY3Rpb24gc3RvcE90aGVyKCkge1xyXG5cdHByb2dyZXNzUmVzZXQoKTtcclxuXHRhdWRpb0FsbC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0aXRlbS5wYXVzZSgpO1xyXG5cdFx0aXRlbS5jdXJyZW50VGltZSA9IDA7XHJcblx0XHRsZXQgc2V0VGltZSA9IGl0ZW0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcucGxheWVyX190aW1lLWN1cnJlbnQnKTtcclxuXHRcdHNldFRpbWUuaW5uZXJIVE1MID0gYDAwIDogMDBgO1xyXG5cdH0pXHJcblx0aW1nUGxheUFsbC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0aXRlbS5zcmMgPSBwYXRoUGxheUltZztcclxuXHR9KSBcclxufVxyXG5cclxuLy9QTEFZXHJcbmZ1bmN0aW9uIHBsYXkoKSB7XHJcblx0Y3VycmVudFBsYXllci5wbGF5KCk7XHJcblx0cHJvZ3Jlc3MoKTtcclxuXHRpbWdQbGF5LnNyYyA9IHBhdGhQYXVzZUltZztcclxuXHRjb250cm9sUGxheUltZy5zcmMgPSBwYXRoQ29udHJvbFBhdXNlSW1nO1xyXG59XHJcblxyXG4vL1BBVVNFXHJcbmZ1bmN0aW9uIHBhdXNlKCkge1xyXG5cdGN1cnJlbnRQbGF5ZXIucGF1c2UoKTtcclxuXHRpbWdQbGF5LnNyYyA9IHBhdGhQbGF5SW1nO1xyXG5cdGNvbnRyb2xQbGF5SW1nLnNyYyA9IHBhdGhDb250cm9sUGxheUltZztcclxufVxyXG5cclxuLy9QTEFZRVIgSEVST1xyXG5mdW5jdGlvbiBoZXJvKCkge1xyXG5cdGZsYWcgPSBmYWxzZTtcclxuXHRwbGF5SGVyb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpbWdQbGF5ID0gcGxheWVySGVyby5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJfX3BsYXktaW1nJyk7XHJcblx0XHRpZihjdXJyZW50UGxheWVyICE9IHBsYXllckhlcm8pIHtcclxuXHRcdFx0c3RvcE90aGVyKCk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJIZXJvO1xyXG5cdFx0aWYoZmxhZykge1xyXG5cdFx0XHRwYXVzZSgpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cGxheSgpO1xyXG5cdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGNvbnRyb2wuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaWEtY29udHJvbHMtLWFjdGl2ZScpO1xyXG5cdFx0Zm9vdGVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSA0MCArICdweCc7XHJcblx0XHRzZWxlY3QoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vUExBWUVSIExBU1RcclxuZnVuY3Rpb24gbGFzdCgpIHtcclxuXHRmbGFnID0gZmFsc2U7XHJcblx0cGxheUxhc3RCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aW1nUGxheSA9IHBsYXllckxhc3QucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcucGxheWVyX19wbGF5LWltZycpO1xyXG5cdFx0aWYoY3VycmVudFBsYXllciAhPSBwbGF5ZXJMYXN0KSB7XHJcblx0XHRcdHN0b3BPdGhlcigpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRjdXJyZW50UGxheWVyID0gcGxheWVyTGFzdDtcclxuXHRcdGlmKGZsYWcpIHtcclxuXHRcdFx0cGF1c2UoKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHBsYXkoKTtcclxuXHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRjb250cm9sLmNsYXNzTGlzdC5hZGQoJ21lZGlhLWNvbnRyb2xzLS1hY3RpdmUnKTtcclxuXHRcdGZvb3Rlci5zdHlsZS5wYWRkaW5nQm90dG9tID0gY29udHJvbC5vZmZzZXRIZWlnaHQgKyA0MCArICdweCc7XHJcblx0XHRzZWxlY3QoKTtcclxuXHR9XHJcblx0XHJcblx0Ly9DT05UUk9MIExJU1RFTkVSXHJcblx0Y29udHJvbFBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGZsYWcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRwYXVzZShjdXJyZW50UGxheWVyLCBpbWdQbGF5KTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHBsYXkoY3VycmVudFBsYXllciwgaW1nUGxheSk7XHJcblx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0c2VsZWN0KCk7XHJcblx0fSlcclxuXHRzZWxlY3QoKTtcclxuXHJcbn1cclxuXHJcbi8vSE9WRVIgU0VMRUNUIFBMQVlcclxuQXJyYXkuZnJvbSh0cmFja2xpc3QuY2hpbGRyZW4pLmZvckVhY2goKGl0ZW0sIGkpPT4ge1xyXG5cdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0bGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudHJhY2tsaXN0X19pdGVtJyk7XHJcblx0XHRpZighdGFyZ2V0KSByZXR1cm47XHJcblx0XHRjdXJyZW50UGxheWVyID0gcGxheWVyTGFzdDtcclxuXHRcdGltZ1BsYXkgPSBwbGF5ZXJMYXN0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYXllcl9fcGxheS1pbWcnKTtcclxuXHRcdGNvbnRyb2wuY2xhc3NMaXN0LmFkZCgnbWVkaWEtY29udHJvbHMtLWFjdGl2ZScpO1xyXG5cdFx0Zm9vdGVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBjb250cm9sLm9mZnNldEhlaWdodCArIDQwICsgJ3B4JztcclxuXHJcblx0XHRpbmRleCA9IGk7XHJcblxyXG5cdFx0aWYoIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmFja2xpc3RfX2l0ZW0tLXBsYXknKSAmJiAhaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3RyYWNrbGlzdF9faXRlbS0tc2VsZWN0JykpIHtcclxuXHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHRcdHN0b3BPdGhlcigpO1xyXG5cdFx0XHRwbGF5ZXJJbml0KCk7XHJcblx0XHRcdHBsYXkoKTtcclxuXHRcdFx0c2VsZWN0KCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmFja2xpc3RfX2l0ZW0tLXBsYXknKSkge1xyXG5cdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3RyYWNrbGlzdF9faXRlbS0tcGxheScpO1xyXG5cdFx0XHRwYXVzZSgpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKCFpdGVtLmNsYXNzTGlzdC5jb250YWlucygndHJhY2tsaXN0X19pdGVtLS1wbGF5JykgJiYgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3RyYWNrbGlzdF9faXRlbS0tc2VsZWN0JykpIHtcclxuXHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHRcdGl0ZW0uY2xhc3NMaXN0LmFkZCgndHJhY2tsaXN0X19pdGVtLS1wbGF5Jyk7XHJcblx0XHRcdHBsYXkoKTtcclxuXHRcdH1cclxuXHR9KVxyXG59KVxyXG5cclxuLy9QUkVWXHJcbmZ1bmN0aW9uIHByZXYoKSB7XHJcblx0aW5kZXgtLTtcclxuXHRpZihpbmRleCA8IDApIHtcclxuXHRcdGluZGV4ID0gcGxheUxpc3QubGVuZ3RoIC0gMTtcclxuXHR9XHJcblx0cGxheWVySW5pdCgpO1xyXG5cdHNlbGVjdCgpO1xyXG5cdGlmKGZsYWcpIHtcclxuXHRcdHBsYXkoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vTkVYVFxyXG5mdW5jdGlvbiBuZXh0KCkge1xyXG5cdGluZGV4Kys7XHJcblx0aWYoaW5kZXggPiBwbGF5TGlzdC5sZW5ndGggLSAxKSB7XHJcblx0XHRpbmRleCA9IDA7XHJcblx0fVxyXG5cdHBsYXllckluaXQoKTtcclxuXHRzZWxlY3QoKTtcclxuXHRpZihmbGFnKSB7XHJcblx0XHRwbGF5KCk7XHJcblx0fVxyXG5cdHByb2dyZXNzUmVzZXQoKTtcclxufVxyXG5cclxuLy9QUkVWIFNPTkdcclxuY29udHJvbFByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcmV2KVxyXG5cclxuLy9ORVhUIFNPTkdcclxuY29udHJvbE5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBuZXh0KVxyXG5cclxuXHJcbi8vUFJPR1JFU1NcclxuZnVuY3Rpb24gcHJvZ3Jlc3MoKSB7XHJcblx0bGV0IHByb2dyZXNzTGluZSBcdFx0PSBjdXJyZW50UGxheWVyLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYXllcl9fcHJvZ3Jlc3MtbGluZScpO1xyXG5cdGxldCBwcm9ncmVzc0ZhZGUgXHRcdD0gY3VycmVudFBsYXllci5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJfX3Byb2dyZXNzLWZhZGUnKTtcclxuXHRjdXJyZW50UGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1lVXBkYXRlKTtcclxuXHRmdW5jdGlvbiB0aW1lVXBkYXRlKCkge1xyXG5cdFx0bGV0IGN1cnJlbnRUaW1lIFx0XHQ9IGN1cnJlbnRQbGF5ZXIuY3VycmVudFRpbWU7XHJcbiBcdFx0bGV0IHBlcmNlbnQgXHRcdFx0PSAxMDAgLyAoY3VycmVudFBsYXllci5kdXJhdGlvbiAvIGN1cnJlbnRQbGF5ZXIuY3VycmVudFRpbWUpO1xyXG5cdFx0aWYoIWNoZWNrTW91c2VEb3duKSB7XHJcblx0XHRcdHByb2dyZXNzTGluZS5zdHlsZS53aWR0aCA9IHBlcmNlbnQgKyAnJSc7XHJcblx0XHRcdHByb2dyZXNzRmFkZS5zdHlsZS5sZWZ0ID0gcGVyY2VudCArICclJztcclxuXHRcdFx0Y29udHJvbExpbmUuc3R5bGUud2lkdGggPSBwZXJjZW50ICsgJyUnO1xyXG5cdFx0XHRjb250cm9sRmFkZS5zdHlsZS5sZWZ0ID0gcGVyY2VudCArICclJztcclxuXHRcdFx0c2hvd1RpbWVDdXJyZW50KGN1cnJlbnRUaW1lKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8vUFJPR1JFU1MgUkVTRVRcclxuZnVuY3Rpb24gcHJvZ3Jlc3NSZXNldCgpIHtcclxuXHRhdWRpb0FsbC5mb3JFYWNoKGl0ZW09PiB7XHJcblx0XHRsZXQgcHJvZ3Jlc3NMaW5lID0gaXRlbS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJfX3Byb2dyZXNzLWxpbmUnKTtcclxuXHRcdGxldCBwcm9ncmVzc0ZhZGUgPSBpdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYXllcl9fcHJvZ3Jlc3MtZmFkZScpO1xyXG5cdFx0cHJvZ3Jlc3NMaW5lLnN0eWxlLndpZHRoID0gMDtcclxuXHRcdHByb2dyZXNzRmFkZS5zdHlsZS5sZWZ0ID0gMDtcclxuXHRcdGNvbnRyb2xMaW5lLnN0eWxlLndpZHRoID0gMDtcclxuXHRcdGNvbnRyb2xGYWRlLnN0eWxlLmxlZnQgPSAwO1xyXG5cdH0pXHJcbn1cclxuXHJcbi8vU0VUIFBST0dSRVNTXHJcbnByb2dyZXNzQ29udGFpbmVyQWxsLmZvckVhY2goaXRlbSA9PiB7XHJcblx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzZXRQcm9ncmVzcyk7XHJcblx0ZnVuY3Rpb24gc2V0UHJvZ3Jlc3MoZXZlbnQpIHtcclxuXHRcdGxldCBzZWxlY3RQbGF5ZXIgPSBpdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYXllcl9fYXVkaW8nKVxyXG5cdFx0aWYoc2VsZWN0UGxheWVyICE9IGN1cnJlbnRQbGF5ZXIpIHJldHVybjtcclxuXHRcdGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cdFx0aWYoIXRhcmdldCkgcmV0dXJuO1xyXG5cdFx0Y2hlY2tNb3VzZURvd24gPSB0cnVlO1xyXG5cdFx0bGV0IGNsaWNrID0gZXZlbnQuY2xpZW50WCAtIGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuXHRcdGxldCB3aWR0aCA9IGl0ZW0ub2Zmc2V0V2lkdGg7XHJcblx0XHRsZXQgc2V0VGltZSA9IGN1cnJlbnRQbGF5ZXIuZHVyYXRpb24gLyAod2lkdGggLyBjbGljayk7XHJcblx0XHRsZXQgZmFkZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnBsYXllcl9fcHJvZ3Jlc3MtZmFkZScpO1xyXG5cdFx0bGV0IGxpbmUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJfX3Byb2dyZXNzLWxpbmUnKTtcclxuXHJcblxyXG5cdFx0bGV0IHNldFBvcyA9IE1hdGguZmxvb3IoMTAwIC8gKHdpZHRoIC8gY2xpY2spKTtcclxuXHRcdGlmKHNldFBvcyA+IDEwMCkge1xyXG5cdFx0XHRzZXRQb3MgPSAxMDA7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChzZXRQb3MgPCAwKSB7XHJcblx0XHRcdHNldFBvcyA9IDA7XHJcblx0XHR9XHRcclxuXHRcdGZhZGUuc3R5bGUubGVmdCA9IHNldFBvcyArICclJztcclxuXHRcdGxpbmUuc3R5bGUud2lkdGggPSBzZXRQb3MgKyAnJSc7XHJcblx0XHRjb250cm9sTGluZS5zdHlsZS53aWR0aCA9IHNldFBvcyArICclJztcclxuXHRcdGNvbnRyb2xGYWRlLnN0eWxlLmxlZnQgPSBzZXRQb3MgKyAnJSc7XHJcblx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ3BsYXllcl9fcHJvZ3Jlc3MtY29udGFpbmVyLS1ob3ZlcicpO1xyXG5cdFx0c2hvd1RpbWVDdXJyZW50KHNldFRpbWUpO1xyXG5cclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xyXG5cdFx0ZnVuY3Rpb24gbW91c2VNb3ZlKGV2ZW50KSB7XHJcblx0XHRcdGxldCBjbGlja01vdmUgPSBldmVudC5jbGllbnRYIC0gaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG5cdFx0XHRzZXRUaW1lID0gY3VycmVudFBsYXllci5kdXJhdGlvbiAvICh3aWR0aCAvIGNsaWNrTW92ZSk7XHJcblx0XHRcdHNldFBvcyA9IDEwMCAvICh3aWR0aCAvIGNsaWNrTW92ZSk7XHJcblx0XHRcdGlmKHNldFBvcyA+IDEwMCkge1xyXG5cdFx0XHRzZXRQb3MgPSAxMDA7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoc2V0UG9zIDwgMCkge1xyXG5cdFx0XHRcdHNldFBvcyA9IDA7XHJcblx0XHRcdH1cdFxyXG5cdFx0XHRmYWRlLnN0eWxlLmxlZnQgPSBzZXRQb3MgKyAnJSc7XHJcblx0XHRcdGxpbmUuc3R5bGUud2lkdGggPSBzZXRQb3MgKyAnJSc7XHJcblx0XHRcdGNvbnRyb2xMaW5lLnN0eWxlLndpZHRoID0gc2V0UG9zICsgJyUnO1xyXG5cdFx0XHRjb250cm9sRmFkZS5zdHlsZS5sZWZ0ID0gc2V0UG9zICsgJyUnO1xyXG5cdFx0XHRpZihzZXRUaW1lIDwgMCkgc2V0VGltZSA9IDA7XHJcblx0XHRcdGlmKHNldFRpbWUgPiBjdXJyZW50UGxheWVyLmR1cmF0aW9uKSBzZXRUaW1lID0gY3VycmVudFBsYXllci5kdXJhdGlvbjtcclxuXHRcdFx0c2hvd1RpbWVDdXJyZW50KHNldFRpbWUpO1xyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gbW91c2VVcChldmVudCkge1xyXG5cdFx0XHRjaGVja01vdXNlRG93biA9IGZhbHNlO1xyXG5cdFx0XHRjdXJyZW50UGxheWVyLmN1cnJlbnRUaW1lID0gc2V0VGltZTtcclxuXHRcdFx0ZmFkZS5zdHlsZS5sZWZ0ID0gc2V0UG9zICsgJyUnO1xyXG5cdFx0XHRsaW5lLnN0eWxlLndpZHRoID0gc2V0UG9zICsgJyUnO1xyXG5cdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXllcl9fcHJvZ3Jlc3MtY29udGFpbmVyLS1ob3ZlcicpO1xyXG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xyXG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG5cclxuLy9TRVQgUFJPR1JFU1MgQ09OVFJPTFxyXG5jb250cm9sQ29udGFpbmVyLm9ubW91c2Vkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuXHRpZighdGFyZ2V0KSByZXR1cm47XHJcblx0bGV0IGxhc3RGYWRlID0gcGxheWVyTGFzdC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJfX3Byb2dyZXNzLWZhZGUnKTtcclxuXHRsZXQgbGFzdExpbmUgPSBwbGF5ZXJMYXN0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYXllcl9fcHJvZ3Jlc3MtbGluZScpO1xyXG5cdGxldCBjbGljayA9IGV2ZW50LmNsaWVudFggLSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuXHRsZXQgcGVyY2VudCA9IE1hdGguZmxvb3IoMTAwIC8gKHRhcmdldC5vZmZzZXRXaWR0aCAvIGNsaWNrKSk7XHJcblx0bGV0IHNldFRpbWUgPSBjdXJyZW50UGxheWVyLmR1cmF0aW9uIC8gKHRhcmdldC5vZmZzZXRXaWR0aCAvIGNsaWNrKTtcclxuXHRjaGVja01vdXNlRG93biA9IHRydWU7XHJcblx0aWYocGVyY2VudCA8IDApIHBlcmNlbnQgPSAwO1xyXG5cdGlmKHBlcmNlbnQgPiAxMDApIHBlcmNlbnQgPSAxMDA7XHJcblx0Y29udHJvbExpbmUuc3R5bGUud2lkdGggPSBwZXJjZW50ICsgJyUnOyBcclxuXHRjb250cm9sRmFkZS5zdHlsZS5sZWZ0ID0gcGVyY2VudCArICclJztcclxuXHRsYXN0TGluZS5zdHlsZS53aWR0aCA9IHBlcmNlbnQgKyAnJSc7IFxyXG5cdGxhc3RGYWRlLnN0eWxlLmxlZnQgPSBwZXJjZW50ICsgJyUnO1xyXG5cdGlmKHNldFRpbWUgPCAwKSBzZXRUaW1lID0gMDtcclxuXHRpZihzZXRUaW1lID4gY3VycmVudFBsYXllci5kdXJhdGlvbikgc2V0VGltZSA9IGN1cnJlbnRQbGF5ZXIuZHVyYXRpb247XHJcblx0Y29udHJvbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtZWRpYS1jb250cm9sc19fcHJvZ3Jlc3MtY29udGFpbmVyLS1ob3ZlcicpXHJcblx0c2hvd1RpbWVDdXJyZW50KHNldFRpbWUpO1xyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xyXG5cdGZ1bmN0aW9uIG1vdXNlTW92ZShldmVudCkge1xyXG5cdFx0bGV0IGNsaWNrTW92ZSA9IE1hdGguZmxvb3IoZXZlbnQuY2xpZW50WCAtIHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KTtcclxuXHRcdGxldCBwZXJjZW50ID0gMTAwIC8gKHRhcmdldC5vZmZzZXRXaWR0aCAvIGNsaWNrTW92ZSk7XHJcblx0XHRzZXRUaW1lID0gY3VycmVudFBsYXllci5kdXJhdGlvbiAvICh0YXJnZXQub2Zmc2V0V2lkdGggLyBjbGlja01vdmUpO1xyXG5cdFx0aWYocGVyY2VudCA8IDApIHBlcmNlbnQgPSAwO1xyXG5cdFx0aWYocGVyY2VudCA+IDEwMCkgcGVyY2VudCA9IDEwMDtcclxuXHRcdGNvbnRyb2xMaW5lLnN0eWxlLndpZHRoID0gcGVyY2VudCArICclJzsgXHJcblx0XHRjb250cm9sRmFkZS5zdHlsZS5sZWZ0ID0gcGVyY2VudCArICclJztcclxuXHRcdGxhc3RMaW5lLnN0eWxlLndpZHRoID0gcGVyY2VudCArICclJzsgXHJcblx0XHRsYXN0RmFkZS5zdHlsZS5sZWZ0ID0gcGVyY2VudCArICclJztcclxuXHRcdGlmKHNldFRpbWUgPCAwKSBzZXRUaW1lID0gMDtcclxuXHRcdGlmKHNldFRpbWUgPiBjdXJyZW50UGxheWVyLmR1cmF0aW9uKSBzZXRUaW1lID0gY3VycmVudFBsYXllci5kdXJhdGlvbjtcclxuXHRcdHNob3dUaW1lQ3VycmVudChzZXRUaW1lKTtcclxuXHR9XHJcblx0ZnVuY3Rpb24gbW91c2VVcCgpIHtcclxuXHRcdGNvbnRyb2xDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaWEtY29udHJvbHNfX3Byb2dyZXNzLWNvbnRhaW5lci0taG92ZXInKVxyXG5cdFx0Y3VycmVudFBsYXllci5jdXJyZW50VGltZSA9IHNldFRpbWU7XHJcblx0XHRjaGVja01vdXNlRG93biA9IGZhbHNlO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vU0hPVyBDVVJSRU5UIFRJTUVcclxuZnVuY3Rpb24gc2hvd1RpbWVDdXJyZW50KHNldFRpbWUpIHtcclxuXHRsZXQgY3VycmVudFRpbWVEaXNwbGF5XHQ9IGN1cnJlbnRQbGF5ZXIucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcucGxheWVyX190aW1lLWN1cnJlbnQnKTtcclxuXHRsZXQgbWludXRlIFx0XHRcdFx0PSBNYXRoLmZsb29yKHNldFRpbWUgLyA2MCk7XHJcblx0bGV0IHNlY29uZCBcdFx0XHRcdD0gTWF0aC5mbG9vcihzZXRUaW1lICUgNjApO1xyXG5cdGlmKG1pbnV0ZSA8IDEwKSB7XHJcblx0XHRtaW51dGUgPSAnMCcgKyBtaW51dGU7XHJcblx0fVxyXG5cdGlmKHNlY29uZCA8IDEwKSB7XHJcblx0XHRzZWNvbmQgPSAnMCcgKyBzZWNvbmQ7XHJcblx0fVxyXG5cdGN1cnJlbnRUaW1lRGlzcGxheS5pbm5lckhUTUwgPSBgJHttaW51dGV9IDogJHtzZWNvbmR9YDtcclxuXHRjb250cm9sVGltZUN1cnJlbnQuaW5uZXJIVE1MID0gYCR7bWludXRlfSA6ICR7c2Vjb25kfWA7XHJcbn1cclxuXHJcbi8vU0hPVyBEVVJBVElPTiBUSU1FXHJcbmZ1bmN0aW9uIHNob3dUaW1lRHVyYXRpb24oKSB7XHJcblx0bGV0IGZ1bGxUaW1lTGFzdFx0PSBwbGF5ZXJMYXN0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYXllcl9fdGltZS1kdXJhdGlvbicpO1xyXG5cdGxldCBmdWxsVGltZUhlcm9cdD0gcGxheWVySGVyby5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJfX3RpbWUtZHVyYXRpb24nKTtcclxuXHRwbGF5ZXJIZXJvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgbWludXRlID0gTWF0aC5mbG9vcihwbGF5ZXJIZXJvLmR1cmF0aW9uIC8gNjApO1xyXG5cdFx0bGV0IHNlY29uZCA9IE1hdGguZmxvb3IocGxheWVySGVyby5kdXJhdGlvbiAlIDYwKTtcclxuXHRcdGlmKG1pbnV0ZSA8IDEwKSB7XHJcblx0XHRcdG1pbnV0ZSA9ICcwJyArIG1pbnV0ZTtcclxuXHRcdH1cclxuXHRcdGlmKHNlY29uZCA8IDEwKSB7XHJcblx0XHRcdHNlY29uZCA9ICcwJyArIHNlY29uZDtcclxuXHRcdH1cclxuXHRcdGZ1bGxUaW1lSGVyby5pbm5lckhUTUwgPSBgJHttaW51dGV9IDogJHtzZWNvbmR9YDtcclxuXHR9KVxyXG5cdFxyXG5cdHBsYXllckxhc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBtaW51dGUgPSBNYXRoLmZsb29yKHBsYXllckxhc3QuZHVyYXRpb24gLyA2MCk7XHJcblx0XHRsZXQgc2Vjb25kID0gTWF0aC5mbG9vcihwbGF5ZXJMYXN0LmR1cmF0aW9uICUgNjApO1xyXG5cdFx0aWYobWludXRlIDwgMTApIHtcclxuXHRcdFx0bWludXRlID0gJzAnICsgbWludXRlO1xyXG5cdFx0fVxyXG5cdFx0aWYoc2Vjb25kIDwgMTApIHtcclxuXHRcdFx0c2Vjb25kID0gJzAnICsgc2Vjb25kO1xyXG5cdFx0fVxyXG5cdFx0ZnVsbFRpbWVMYXN0LmlubmVySFRNTCA9IGAke21pbnV0ZX0gOiAke3NlY29uZH1gO1xyXG5cdFx0Y29udHJvbFRpbWVEdXJhdGlvbi5pbm5lckhUTUwgPSBgJHttaW51dGV9IDogJHtzZWNvbmR9YDtcclxuXHR9KVx0XHRcclxufVxyXG5cdFxyXG4vL0VORCBTT05HXHJcbmF1ZGlvQWxsLmZvckVhY2goaXRlbSA9PiB7XHJcblx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRpZihjdXJyZW50UGxheWVyID09IHBsYXllckxhc3QpIHtcclxuXHRcdFx0bmV4dCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoY3VycmVudFBsYXllciA9PSBwbGF5ZXJIZXJvKSB7XHJcblx0XHRcdHN0b3BPdGhlcigpO1xyXG5cdFx0XHRwYXVzZSgpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxufSlcclxuIFxyXG4vL1NFTEVDVCBTT05HXHJcbmZ1bmN0aW9uIHNlbGVjdCgpIHtcclxuXHRpdGVtTGFzdEFsbC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKCd0cmFja2xpc3RfX2l0ZW0tLXBsYXknKTtcclxuXHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndHJhY2tsaXN0X19pdGVtLS1zZWxlY3QnKTtcclxuXHR9KVxyXG5cdGl0ZW1MYXN0QWxsW2luZGV4XS5jbGFzc0xpc3QuYWRkKCd0cmFja2xpc3RfX2l0ZW0tLXNlbGVjdCcpO1xyXG5cdGNvbnRyb2xBdXRob3IuaW5uZXJIVE1MID0gcGxheUxpc3RbaW5kZXhdLmF1dGhvcjtcclxuXHRjb250cm9sU29uZy5pbm5lckhUTUwgPSBwbGF5TGlzdFtpbmRleF0uc29uZy5yZXBsYWNlKC8ubXAzL2csICcnKTtcclxuXHRpZihmbGFnKSB7XHJcblx0XHRpZihjdXJyZW50UGxheWVyID09IHBsYXllckxhc3QpIHtcclxuXHRcdFx0aXRlbUxhc3RBbGxbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3RyYWNrbGlzdF9faXRlbS0tcGxheScpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzaG93VGltZUR1cmF0aW9uKCk7XHJcbn1cclxuXHJcbi8vU0VMRUNUIEhPVkVSIFNUWUxFXHJcbnRyYWNrbGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuXHRsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50cmFja2xpc3RfX2l0ZW0nKTtcclxuXHRpZighdGFyZ2V0KSByZXR1cm47XHJcblx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3RyYWNrbGlzdF9faXRlbS0taG92ZXInKTtcclxufSlcclxudHJhY2tsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcblx0bGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudHJhY2tsaXN0X19pdGVtJyk7XHJcblx0aWYoIXRhcmdldCkgcmV0dXJuO1xyXG5cdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCd0cmFja2xpc3RfX2l0ZW0tLWhvdmVyJyk7XHJcbn0pXHJcblxyXG5cclxuXHJcbmxldCB0bXAgXHRcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXJfX2F1ZGlvJyk7XHJcbnRtcC5mb3JFYWNoKGl0ZW09PiB7XHJcblx0aXRlbS52b2x1bWUgPSAwLjU7XHJcbn0pXHJcblxyXG5cclxuLy8gVk9MVU1FIElOSVRcclxubGV0IHZvbHVtZSBcdFx0XHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZvbHVtZScpO1xyXG5sZXQgdm9sdW1lUHJvZ3Jlc3MgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZvbHVtZV9fcHJvZ3Jlc3MnKTtcclxubGV0IHZvbHVtZUZhZGUgXHRcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lX19mYWRlJyk7XHJcbmxldCB2b2x1bWVMaW5lIFx0XHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZvbHVtZV9fbGluZScpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHZvbHVtZVNldCgpIHtcclxuXHR2b2x1bWVGYWRlLnN0eWxlLmxlZnQgPSAxMDAgLyAoMSAvIGN1cnJlbnRQbGF5ZXIudm9sdW1lKSArICclJztcclxuXHR2b2x1bWVMaW5lLnN0eWxlLndpZHRoID0gMTAwIC8gKDEgLyBjdXJyZW50UGxheWVyLnZvbHVtZSkgKyAnJSc7XHJcbn1cclxudm9sdW1lU2V0KCk7XHJcblxyXG5cclxuLy9WT0xVTUUgU0VUIFxyXG52b2x1bWVQcm9ncmVzcy5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0bGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0aWYoIXRhcmdldCkgcmV0dXJuO1xyXG5cdGxldCBjbGljayA9IGV2ZW50LmNsaWVudFggLSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuXHRsZXQgcGVyY2VudCA9IE1hdGguZmxvb3IoMTAwIC8gKHRhcmdldC5vZmZzZXRXaWR0aCAvIGNsaWNrKSk7XHJcblx0bGV0IHZvbHVtZSA9IDEgLyAodGFyZ2V0Lm9mZnNldFdpZHRoIC8gY2xpY2spO1xyXG5cdGlmKHZvbHVtZSA8IDApIHtcclxuXHRcdHZvbHVtZSA9IDA7XHJcblx0XHR2b2x1bWVQcm9ncmVzcy5jbGFzc0xpc3QuYWRkKCd2b2x1bWVfX3Byb2dyZXNzLS1vZmYnKTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHR2b2x1bWVQcm9ncmVzcy5jbGFzc0xpc3QucmVtb3ZlKCd2b2x1bWVfX3Byb2dyZXNzLS1vZmYnKTtcclxuXHR9XHJcblxyXG5cdGlmKHZvbHVtZSA+IDEpIHZvbHVtZSA9IDE7XHJcblx0aWYocGVyY2VudCA8IDApIHBlcmNlbnQgPSAwO1xyXG5cdGlmKHBlcmNlbnQgPiAxMDApIHBlcmNlbnQgPSAxMDA7XHJcblxyXG5cdHZvbHVtZUZhZGUuc3R5bGUubGVmdCA9IHBlcmNlbnQgKyAnJSc7XHJcblx0dm9sdW1lTGluZS5zdHlsZS53aWR0aCA9IHBlcmNlbnQgKyAnJSc7XHJcblx0YXVkaW9BbGwuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdGl0ZW0udm9sdW1lID0gdm9sdW1lO1xyXG5cdH0pXHJcblx0dm9sdW1lUHJvZ3Jlc3MuY2xhc3NMaXN0LmFkZCgndm9sdW1lX19wcm9ncmVzcy0taG92ZXInKTtcclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcclxuXHJcblx0ZnVuY3Rpb24gbW91c2VNb3ZlKGV2ZW50KSB7XHJcblx0XHRsZXQgY2xpY2tNb3ZlID0gZXZlbnQuY2xpZW50WCAtIHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG5cdFx0bGV0IHBlcmNlbnQgPSBNYXRoLmZsb29yKDEwMCAvICh0YXJnZXQub2Zmc2V0V2lkdGggLyBjbGlja01vdmUpKTtcclxuXHRcdGxldCB2b2x1bWUgPSAxIC8gKHRhcmdldC5vZmZzZXRXaWR0aCAvIGNsaWNrTW92ZSk7XHJcblxyXG5cdFx0aWYodm9sdW1lIDwgMCkge1xyXG5cdFx0XHR2b2x1bWUgPSAwO1xyXG5cdFx0XHR2b2x1bWVQcm9ncmVzcy5jbGFzc0xpc3QuYWRkKCd2b2x1bWVfX3Byb2dyZXNzLS1vZmYnKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR2b2x1bWVQcm9ncmVzcy5jbGFzc0xpc3QucmVtb3ZlKCd2b2x1bWVfX3Byb2dyZXNzLS1vZmYnKTtcclxuXHRcdH1cclxuXHRcdGlmKHZvbHVtZSA+IDEpIHZvbHVtZSA9IDE7XHJcblx0XHRpZihwZXJjZW50IDwgMCkgcGVyY2VudCA9IDA7XHJcblx0XHRpZihwZXJjZW50ID4gMTAwKSBwZXJjZW50ID0gMTAwO1xyXG5cdFx0dm9sdW1lRmFkZS5zdHlsZS5sZWZ0ID0gcGVyY2VudCArICclJztcclxuXHRcdHZvbHVtZUxpbmUuc3R5bGUud2lkdGggPSBwZXJjZW50ICsgJyUnO1xyXG5cdFx0YXVkaW9BbGwuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0aXRlbS52b2x1bWUgPSB2b2x1bWU7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRmdW5jdGlvbiBtb3VzZVVwKGV2ZW50KSB7XHJcblx0XHR2b2x1bWVQcm9ncmVzcy5jbGFzc0xpc3QucmVtb3ZlKCd2b2x1bWVfX3Byb2dyZXNzLS1ob3ZlcicpO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
