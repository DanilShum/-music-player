const player = document.querySelector('.player')
const listing = document.querySelector('.player__listing')
const li = listing.querySelectorAll('li')
const a = listing.querySelectorAll('li > a')
const playBtn = document.querySelector('.player__play')
const audio = new Audio()
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const playerTimeLine = document.querySelector('.player__time-line')
const volumeBtn = document.querySelector('.volum')
const volumeHref = document.querySelector('.volum > svg > use')
const volumeSvg = document.querySelector('.volum > svg')
const playerVolume = document.querySelector('.player__volume')
const playTimeStart = document.querySelector('.player__start')
const playTimeEnd = document.querySelector('.player__end')
const author = document.querySelector('.author')
const nameSong = document.querySelector('.song')
const targetSong = document.querySelector('.player__listing-target')
const poster = document.querySelectorAll('.player__poster > img')
const playerPoster = document.querySelector('.player__poster')
const posterTarget = document.querySelector('.player__poster-target')

playerPoster.style.marginLeft = `${(player.clientWidth - posterTarget.clientWidth * 1.15 + 20) / 2 + 'px'}`

document.addEventListener('DOMContentLoaded', function () {
  addNameSong(targetSong.textContent)
  const src = a[0]
  audio.src = src.href
  playTimeStart.innerHTML = '0:0'
})

listing.addEventListener('click', function (evt) {
  evt.preventDefault()
  for (let i = 0; i < a.length; i++) {
    a[i].classList.remove('player__listing-target')
    li[i].classList.remove('player__listing-target')
  }
  evt.target.classList.add('player__listing-target')

  playBtn.classList.add('start')
  playBtn.classList.remove('pause')

  const src = evt.target.href
  audio.src = src
  addNameSong(evt.target.textContent)
  slider(evt.target)
  startedSong()
})

let count = 1
playBtn.addEventListener('click', function (evt) {
  console.log('клик на кнопке')
  evt.preventDefault()
  if (audio.paused) {
    playBtn.classList.remove('start')
    playBtn.classList.add('pause')
    audio.play()
  } else {
    playBtn.classList.add('start')
    playBtn.classList.remove('pause')
    audio.pause()
  }
  count++
})

prevBtn.addEventListener('click', function (evt) {
  const targetSong = document.querySelector('.player__listing-target')
  const targetParent = targetSong.parentNode

  if (li[0] === targetParent) {
    const prevSong = li[li.length - 1].querySelector('a')
    stepSong(prevSong, targetSong)
    listing.scrollTop = listing.scrollHeight
    addNameSong(prevSong.textContent)
  } else {
    const sibling = targetParent.previousElementSibling
    switchSong(sibling, targetSong)
  }
  startedSong()
})

nextBtn.addEventListener('click', function (evt) {
  const targetSong = document.querySelector('.player__listing-target')
  const targetParent = targetSong.parentNode

  if (li[li.length - 1] === targetParent) {
    const nextSong = li[0].querySelector('a')
    stepSong(nextSong, targetSong)
    listing.scrollTo(0, 0)
    addNameSong(nextSong.textContent)
  } else {
    const sibling = targetParent.nextElementSibling
    switchSong(sibling, targetSong)
  }
  startedSong()
})

audio.addEventListener('ended', function (evt) {
  const targetSong = document.querySelector('.player__listing-target')
  const targetParent = targetSong.parentNode
  const sibling = targetParent.nextElementSibling
  const nextSong = sibling.firstChild
  stepSong(nextSong, targetSong)
})

audio.addEventListener('loadedmetadata', function () {
  fullTimeSong = audio.duration
  playTimeEnd.innerHTML = Math.floor(fullTimeSong / 60) + ':' + Math.floor(fullTimeSong % 60)
  playerTimeLine.style.background = '#555'
  updateBackground(playerVolume, playerVolume.max)
})

audio.addEventListener('timeupdate', function () {
  const actualTime = audio.currentTime.toFixed()
  playTimeStart.innerHTML = Math.floor(actualTime / 60) + ':' + actualTime % 60
  fullTimeSong = audio.duration - audio.currentTime
  playTimeEnd.innerHTML = Math.floor(fullTimeSong / 60) + ':' + Math.floor(fullTimeSong % 60)

  playerTimeLine.value = audio.currentTime
  playerTimeLine.max = audio.duration
  updateBackground(playerTimeLine, playerTimeLine.max)
})

playerTimeLine.addEventListener('input', function () {
  audio.currentTime = playerTimeLine.value
})

volumeBtn.addEventListener('click', function () {
  if (audio.muted == false) {
    audio.muted = true
    volumeHref.href.baseVal = '#mute'
    volumeSvg.style.fill = '#555'
  } else {
    audio.muted = false
    volumeHref.href.baseVal = '#volume'
    volumeSvg.style.fill = '#d42671'
  }
})

playerVolume.addEventListener('input', function () {
  audio.volume = playerVolume.value / 100
  updateBackground(playerVolume, playerVolume.max)
})

const addNameSong = function (text) {
  const songFirstName = text
  var songName = songFirstName.split('-')
  author.textContent = songName[0]
  nameSong.textContent = songName[1]
}

const stepSong = function (step, target) {
  step.classList.add('player__listing-target')
  target.classList.remove('player__listing-target')
  const src = step.href
  audio.src = src

  slider(step)
}

function switchSong (sibling, target) {
  const destinationSong = sibling.firstChild
  stepSong(destinationSong, target)
  destinationSong.scrollIntoView(true)
  addNameSong(destinationSong.textContent)
}

const startedSong = function () {
  if (count % 2 > 0) {
    audio.pause()
    playBtn.classList.add('start')
    playBtn.classList.remove('pause')
  } else {
    audio.play()
    playBtn.classList.remove('start')
    playBtn.classList.add('pause')
  }
}

function updateBackground (input, maxValue) {
  const color1 = 'red'
  const color2 = '#555'
  const percent = Number(input.value) * 100 / maxValue

  input.style.background = `
      linear-gradient(
        to right,
        ${color1} ${percent}%,
        ${color2} ${percent}%
      )
    `
}

function slider (ell) {
  const targetParent = ell.parentNode
  const arr = Array.from(li).indexOf(targetParent, 0)

  if (arr === 1) {
    playerPoster.style.transform = `translate(${(poster[0].scrollWidth * -1) + 'px'})`
  } else { playerPoster.style.transform = `translate(${(poster[0].scrollWidth * -1) * (arr) + 'px'})` }

  if (arr === 0) {
    playerPoster.style.transform = `translate(${(0) + 'px'})`
  }

  targetPost(arr)
}

function targetPost (arr) {
  for (let i = 0; i < poster.length; i++) {
    poster[i].classList.remove('player__poster-target')
  }
  poster[arr].classList.add('player__poster-target')
}
