onload = (event) => {
    if (localStorage.length) {
        document.querySelectorAll(".durable")
            .forEach((elem) => {
                switch (elem.type) {
                    case "checkbox":
                    case "radio":
                        if (localStorage.getItem(elem.id) === "true") {
                            elem.setAttribute(
                                "checked",
                                "true",
                            );
                        } else {
                            // ensure that hardcoded 'checked'
                            // get not removed
                            if (!elem.hasAttribute('checked')) {
                                elem.removeAttribute(
                                    "checked",
                                );
                            }
                        }
                        break;

                    default:
                        elem.value = localStorage.getItem(elem.id);
                }
            });

        document.body.getAnimations().forEach((animation) => {
            animation.currentTime = parseFloat(
                localStorage.getItem("currentTime"),
            );
        });
    }
};

data.oninput = (event) => {
    switch (event.target.type) {
        case "radio":
            data.elements[event.target.name]
                .forEach((elem) => {
                    localStorage.setItem(
                        elem.id,
                        elem.checked,
                    );
                });
            break;
        case "checkbox":
            localStorage.setItem(
                event.target.id,
                event.target.checked,
            );
            break;

        default:
            localStorage.setItem(
                event.target.id,
                event.target.value,
            );
    }
};

document.body.onanimationiteration = (event) => {
    localStorage.setItem("currentTime", event.elapsedTime * 1000);
};

document.body.onanimationend = (event) => {
    finished.click();
};

// NAVIGATION
const navigateNext = () => {

    if (current = document.querySelector('input.quest:checked')) {

        let seen = false;

        data.elements.visible.forEach(item => {
            if (seen) {
                seen = false;
                item.click();
            }

            seen = (current === item);
        });
    }
}

const navigatePrev = () => {

    if (current = document.querySelector('input[name=visible]:checked')) {

        let latest = null;

        data.elements.visible.forEach(item => {

            if (item === current && latest !== null) {
                latest.click();
                latest = null;
            } else {
                latest = item;
            }
        });
    }
}

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey) {
        switch (event.key) {
            case "F5": // RESET
                event.preventDefault();

                document.body.getAnimations().forEach((animation) => {
                    // animation.finish() set input.finished -> checked
                    // so reset don't working trustworthy
                    animation.pause();
                });

                data.reset();
                
                break;
            default:
            /* console.log(event); */
        }
    } else if (event.ctrlKey) {
        switch (event.key) {
            case "i":
            case "u":
                event.preventDefault();
                break;
            default:
            /* console.log(event); */
        }
    } else {
        switch (event.key) {
            default:
            /* console.log(event); */
        }
    }
});
