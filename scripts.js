// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = document.querySelector(".fullscreen")

//  Build our functions
function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function updateButton() {
	const icon = this.paused ? "►" : "❚ ❚";
	toggle.innerText = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100
	progressBar.style.flexBasis = `${percent}%`

}

function scrub(e) {
	const scrubeTime = video.duration * (e.offsetX / progress.offsetWidth);
	video.currentTime = scrubeTime;
}

function toggleScreen() {
	player.classList.toggle("makefullscreen")

}
// Hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton)
video.addEventListener("timeupdate", handleProgress)


toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(slider => slider.addEventListener("change", handleRangeUpdate))

let mousedown = false;
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => mousedown && scrub(e))
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
progress.addEventListener("mouseout", () => mousedown = false);


fullScreen.addEventListener("click", toggleScreen)
window.addEventListener("keydown", (e) => {
	if (e.keyCode === 27 && player.classList.contains("makefullscreen")) toggleScreen();
})