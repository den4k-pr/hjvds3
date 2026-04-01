function formatTime(hours, minutes, seconds) {
    return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
    };
}

// ключ для кешу
const TIMER_STORAGE_KEY = 'global_timer_end';

// тривалість 24 години в мілісекундах
const DURATION = 24 * 60 * 60 * 1000;

function getOrCreateEndTime() {
    let saved = localStorage.getItem(TIMER_STORAGE_KEY);

    if (saved) {
        return parseInt(saved);
    }

    let endTime = Date.now() + DURATION;
    localStorage.setItem(TIMER_STORAGE_KEY, endTime);
    return endTime;
}

function calculateRemaining(endTime) {
    let now = Date.now();
    let diff = endTime - now;

    if (diff <= 0) {
        // перезапуск циклу
        endTime = Date.now() + DURATION;
        localStorage.setItem(TIMER_STORAGE_KEY, endTime);
        diff = endTime - Date.now();
    }

    let totalSeconds = Math.floor(diff / 1000);

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
}

function renderAllTimers(hours, minutes, seconds) {
    const formatted = formatTime(hours, minutes, seconds);

    // звичайні таймери
    document.querySelectorAll('.timer').forEach(timer => {
        timer.querySelector('.hours').textContent = formatted.hours;
        timer.querySelector('.minutes').textContent = formatted.minutes;
        timer.querySelector('.seconds').textContent = formatted.seconds;
    });

    // header таймер
    const hoursEl = document.querySelector('.hours-header');
    const minutesEl = document.querySelector('.minutes-header');
    const secondsEl = document.querySelector('.seconds-header');

    if (hoursEl && minutesEl && secondsEl) {
        hoursEl.textContent = formatted.hours;
        minutesEl.textContent = formatted.minutes;
        secondsEl.textContent = formatted.seconds;
    }
}

function updateTimer() {
    const endTime = getOrCreateEndTime();
    const { hours, minutes, seconds } = calculateRemaining(endTime);
    renderAllTimers(hours, minutes, seconds);
}

// старт
updateTimer();
let timerIntervalTimer = setInterval(updateTimer, 1000);