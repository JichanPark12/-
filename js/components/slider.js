function slider() {
    const $slider = document.querySelector("main");
    const $dotBox = document.querySelector(".dot-box");
    const $dotList = document.querySelectorAll(".dot-button");
    const maxCount = document.querySelectorAll(".main").length - 1;
    let count = 0;

    function dotClcik(target) {
        if ($slider.classList.contains("transition")) {
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
            }
        }
        count = currentCount;

        if (count <= maxCount) {
            $dotBox.classList.remove("opacity");
        } else {
            $dotBox.classList.add("opacity");
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
            }
        }
        count = currentCount;
        if (count > 0) {
            $dotBox.classList.remove("opacity");
        } else {
            $dotBox.classList.add("opacity");
        }
    }
    function handleTransitionEnd() {
        $slider.classList.remove("transition");
    }
    $slider.addEventListener("transitionend", handleTransitionEnd);
    window.addEventListener("wheel", function (event) {
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

    $dotBox.addEventListener("click", (e) => {
        dotClcik(e.target);
    });
}

export default slider;
