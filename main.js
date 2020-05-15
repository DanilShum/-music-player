const listing = document.querySelector('.player__listing')
const li = listing.querySelectorAll('li')
const a = listing.querySelectorAll('li > a')
const playBtn = document.querySelector('.player__play')
const audio = new Audio();
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

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
})
