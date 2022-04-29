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






