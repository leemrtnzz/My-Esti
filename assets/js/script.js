function play() {
            var audio = new Audio('assets/music/song.mp3');
            audio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            audio.play();
        }
    document.getElementById('suppriseBtn').addEventListener('click', function () {
        document.getElementById('overlay').classList.add('hidden');
        buttonSupprise();

        document.getElementById('content').classList.remove('hidden');
    })
    function buttonSupprise() {
        play();
        const duration = 15 * 1000,
            animationEnd = Date.now() + duration,
            defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                })
            );
        }, 250);
    }