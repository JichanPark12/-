const $slider = document.querySelector("main");
const $dotBox = document.querySelector(".dot-box");
const $dotList = document.querySelectorAll(".dot-button");
const maxCount = document.querySelectorAll(".main").length - 1;
const $rider = document.querySelector(".rider");
const $appDownloadBtn = document.querySelector(".app-download");
const $header = document.querySelector(".header-box");
const $imageList = document.querySelectorAll(".img-ani");
const $appDownloadBox = document.querySelector(
    ".main-page__content__app-download"
);
let count = 0;
let start = 0;
let end = 0;

setTimeout(() => {
    $header.classList.remove("fade-in");
}, 1000);

function dotClcik(target) {
    if (
        $slider.classList.contains("transition") ||
        !$dotBox.classList.contains("active")
    ) {
        return;
    }

    const currentCount = target.id;
    if (count > 0 && count < maxCount) {
        $dotList[count - 1].classList.remove("current");
        $dotList[currentCount - 1].classList.add("current");
    }
    if (count - currentCount > 0) {
        slideToPrev(currentCount);
        console.log(currentCount);
    } else if (count - currentCount < 0) {
        slideToNext(currentCount);
    }
}

function slideToNext(currentCount) {
    if (count > maxCount) {
        return;
    }

    const currentTranslateY = window
        .getComputedStyle($slider)
        .getPropertyValue("transform");
    const translateY =
        parseInt(currentTranslateY.split(",")[5].trim()) -
        window.innerHeight * (currentCount - count);

    $slider.style.transform = `translateY(${translateY}px)`;
    $slider.classList.add("transition");
    if (count >= 0 && count < maxCount) {
        if (count != 0) {
            $dotList[count - 1].classList.remove("current");
        }
        if (currentCount != 0) {
            $dotList[currentCount - 1].classList.add("current");
            $imageList[currentCount - 1].classList.add("active");
        }
    }
    if (count == 0) {
        $rider.classList.add("opacity");
        $appDownloadBox.classList.add("hidden");
        $appDownloadBtn.classList.remove("hidden");
    }
    count = currentCount;

    if (count <= maxCount) {
        $dotBox.classList.remove("opacity");
        $dotBox.classList.add("active");
    } else {
        $dotBox.classList.add("opacity");
        $dotBox.classList.remove("active");
    }
    if (count === maxCount + 1) {
        $header.classList.add("opacity");
    }
}

function slideToPrev(currentCount) {
    if (count <= 0) {
        return;
    }

    const currentTranslateY = window
        .getComputedStyle($slider)
        .getPropertyValue("transform");
    const translateY =
        parseInt(currentTranslateY.split(",")[5].trim()) -
        window.innerHeight * (currentCount - count);

    $slider.style.transform = `translateY(${translateY}px)`;
    $slider.classList.add("transition");
    if (count >= 0 && count < maxCount + 1) {
        if (count != 0) {
            $dotList[count - 1].classList.remove("current");
        }

        if (currentCount != 0) {
            $dotList[currentCount - 1].classList.add("current");
            $imageList[currentCount - 1].classList.add("active");
            console.log($imageList);
        }
    }
    count = currentCount;
    if (count > 0) {
        $dotBox.classList.remove("opacity");
        $dotBox.classList.add("active");
    } else {
        $dotBox.classList.add("opacity");
        $dotBox.classList.remove("active");
    }
    if (count == 0) {
        $rider.classList.remove("opacity");
        setTimeout(() => {
            $appDownloadBox.classList.remove("hidden");
        }, 800);

        $appDownloadBtn.classList.add("hidden");
    }
    if (count !== maxCount + 1) {
        $header.classList.remove("opacity");
    }
}
function handleTransitionEnd() {
    $slider.classList.remove("transition");
}
function handleResize() {
    const he = window.innerHeight;

    const currentTranslateY = window
        .getComputedStyle($slider)
        .getPropertyValue("transform");

    const translateY = -he * count;

    $slider.style.transform = `translateY(${translateY}px)`;
}
$slider.addEventListener("transitionend", handleTransitionEnd);
window.addEventListener("wheel", (event) => {
    const deltaY = event.deltaY;
    $dotBox.classList.remove("hidden");

    if (!$slider.classList.contains("transition")) {
        if (deltaY > 0) {
            slideToNext(parseInt(count) + 1);
        } else {
            slideToPrev(parseInt(count) - 1);
        }
    }
});
window.addEventListener("resize", handleResize);

$dotBox.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        dotClcik(e.target);
    }
});
$rider.addEventListener("click", (e) => {
    if ($rider.classList.contains("opacity")) {
        e.preventDefault();
    }
});

window.addEventListener("touchstart", touchStart);
window.addEventListener("touchend", touchEnd);

function touchStart(event) {
    start = event.touches[0].pageX;
}

function touchEnd(event) {
    end = event.changedTouches[0].pageX;
    if (!$slider.classList.contains("transition")) {
        if (start > end) {
            slideToNext(parseInt(count) + 1);
        } else {
            slideToPrev(parseInt(count) - 1);
        }
    }
}
