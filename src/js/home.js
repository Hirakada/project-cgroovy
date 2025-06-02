$(function() {
    let $items = $('.carousel-item');
    let $audio = $('#carousel-audio')[0];
    let $title = $('.carousel-title');
    let $desc = $('.carousel-desc');
    let $muteBtn = $('#carousel-mute');
    let $muteIcon = $('#mute-icon');
    let current = 0;
    let isMuted = false;

    function showItem(idx) {
        $items.removeClass('active prev next');
        let prev = (idx - 1 + $items.length) % $items.length;
        let next = (idx + 1) % $items.length;
        $items.eq(prev).addClass('prev');
        $items.eq(idx).addClass('active');
        $items.eq(next).addClass('next');

        let audioSrc = $items.eq(idx).data('audio');
        if (audioSrc) {
            $audio.src = audioSrc;
            $audio.currentTime = 0;
            $audio.muted = isMuted;
            $audio.play();
        } else {
            $audio.pause();
            $audio.currentTime = 0;
        }

        $title.text($items.eq(idx).data('title') || '');
        $desc.text($items.eq(idx).data('desc') || '');
    }

    $('#carousel-prev').on('click', function() {
        current = (current - 1 + $items.length) % $items.length;
        showItem(current);
    });
    $('#carousel-next').on('click', function() {
        current = (current + 1) % $items.length;
        showItem(current);
    });

    $muteBtn.on('click', function() {
        isMuted = !isMuted;
        $audio.muted = isMuted;
        $muteIcon.text(isMuted ? '🔇' : '🔊');
    });
    
    showItem(current);
});

const allCards = document.querySelectorAll(".card");
window.addEventListener("mousemove", (ev) => {
    allCards.forEach((e) => {
        const blob = e.querySelector(".blob");
        const fblob = e.querySelector(".fakeblob");
        const rect = e.getBoundingClientRect();
        const rec = fblob.getBoundingClientRect();
        blob.animate(
            [
                {
                    transform: `translate(${ev.clientX - rec.left - (rec.width / 2)}px, ${ev.clientY - rec.top - (rec.height / 2)}px)`
                }
            ],
            {
                duration: 300,
                fill: "forwards"
            }
        );
    });
});