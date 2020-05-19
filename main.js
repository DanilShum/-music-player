const listing = document.querySelector('.player__listing')
const li = listing.querySelectorAll('li')
const a = listing.querySelectorAll('li > a')
const playBtn = document.querySelector('.player__play')
const audio = new Audio();
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

const src = a[0]
audio.src = src.href

listing.addEventListener('click', function (evt) {
    evt.preventDefault()
    for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('player__listing-target')
        li[i].classList.remove('player__listing-target')
    }
    evt.target.classList.add('player__listing-target');
    playBtn.classList.add('start')
    playBtn.classList.remove('pause')

    const src = evt.target.href
    audio.src = src
    
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


prevBtn.addEventListener('click', function (evt){
    const targetSong = document.querySelector('.player__listing-target')
    const targetParent = targetSong.parentNode
 
    if (li[0] === targetParent){
        const prevSong = li[li.length-1].querySelector('a')
        stepSong(prevSong,targetSong)
    } else {
        let sibling = targetParent.previousElementSibling
        let prevSong = sibling.firstChild
        stepSong(prevSong,targetSong)
    }
    startedSong()
})

nextBtn.addEventListener('click', function (evt){
    const targetSong = document.querySelector('.player__listing-target')
    const targetParent = targetSong.parentNode

    if (li[li.length-1] === targetParent){
        const nextSong = li[0].querySelector('a')
        stepSong(nextSong,targetSong)
        
    } else {
        let sibling = targetParent.nextElementSibling
        let nextSong = sibling.firstChild
        stepSong(nextSong,targetSong)
    }
    startedSong()
})

const stepSong = function(step,target){
        step.classList.add('player__listing-target')
        target.classList.remove('player__listing-target')
        const src = step.href
        audio.src = src
        if (count % 2 === 0) {
            audio.play()
        }
}

const startedSong = function(){
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