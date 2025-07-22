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
    const targetDate = new Date('2025-08-04T18:00:00+07:00');
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        // Jika countdown telah selesai, set semua nilai ke 0 dan hentikan interval
        if (diff < 0) {
            document.getElementById('timerCountDown').classList.add('hidden');
            document.getElementById('suppriseBtn').removeAttribute('disabled')
            document.getElementById('suppriseBtn').classList.remove('cursor-not-allowed')
            document.getElementById('suppriseBtn').textContent = 'Buka Dong';
            document.getElementById('hari').textContent = "0";
            document.getElementById('jam').textContent = "0";
            document.getElementById('menit').textContent = "0";
            document.getElementById('detik').textContent = "0";
            clearInterval(interval);
            return;
            }
            // Hitung hari, jam, menit, dan detik
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Perbarui tampilan countdown
            document.getElementById('hari').textContent = days;
            document.getElementById('jam').textContent = hours;
            document.getElementById('menit').textContent = minutes;
            document.getElementById('detik').textContent = seconds;
            document.getElementById('suppriseBtn').setAttribute('disabled', 'disabled')
            document.getElementById('suppriseBtn').classList.add('cursor-not-allowed')
            document.getElementById('suppriseBtn').textContent = 'Belum Saatnya 😋'
        }

        // Panggil fungsi updateCountdown setiap detik
        updateCountdown(); // Pemanggilan awal
        const interval = setInterval(updateCountdown, 1000);