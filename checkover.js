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
                            // ensure that hard-coded 'checked'
                            // are not removed
                            if (!elem.hasAttribute('checked')) {
                                elem.removeAttribute(
                                    "checked",
                                );
                            }
                        }
                        break;

                    default:
                        // ensure that hard-coded 'values' are not removed
                        if ((value = localStorage.getItem(elem.id)) !== null) {
                            elem.value = value;
                        }
                }
            });

        document.body.getAnimations().forEach((animation) => {
            animation.currentTime = parseFloat(
                localStorage.getItem("currentTime"),
            );
        });
    }

    document.querySelectorAll("[draggable]")
        .forEach((elem) => {
            elem.onkeydown = (event) => {
                switch (event.key) {
                    case 'Tab':
                        break;
                    default:
                        event.preventDefault();
                }
            }

            // Chrome/Edge only: prevent selection
            elem.onselect = (event) => {
                event.target.selectionStart = event.target.selectionEnd;
            }

            elem.ondragstart = (event) => {
                event.dataTransfer.dropEffect = "move";
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("text/id", event.target.id);
            };

            elem.ondragover = (event) => {
                event.preventDefault(); /* important */
                event.dataTransfer.dropEffect = "move";
            };

            elem.ondragenter = (event) => {
                /* if (!event.target.value) { */
                    event.target.style.backgroundColor = 'red'
                /* } */
            }

            elem.ondragleave = (event) => {
                event.target.style.backgroundColor = 'white'
            }

            elem.ondrop = (event) => {
                event.preventDefault(); /* important */

                const id = event.dataTransfer.getData("text/id");
                event.target.style.backgroundColor = 'white'

                if (id) {
                    const elem = document.getElementById(id);
                    const tmp = event.target.value;
                    event.target.value = elem.value;
                    elem.value = tmp;
                    event.target.dispatchEvent(
                        new Event('input', {
                            bubbles: true,
                            cancelable: false
                        }));
                } else {
                    console.error('no id defined')
                }
            };

            elem.ondragend = (event) => {
                event.target.dispatchEvent(
                    new Event('input', {
                        bubbles: true,
                        cancelable: false
                    }));
            }
        });
};

const test = () => {
    // var bodyStyles = window.getComputedStyle(document.body);
    var bodyStyles = window.getComputedStyle(document.getElementById('bla'));
    var fooBar = bodyStyles.getPropertyValue('--validation-points');

    alert(fooBar)
}

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

    if (event.target.id === 'finished') {
        document.querySelectorAll('input.answer').forEach(item => {
            item.disabled = true;

            if (item.dataset.incr) switch (item.type) {
                case 'radio':
                case 'checkbox':
                    if (item.checked) {
                        points.value = (parseFloat(points.value) + parseFloat(item.dataset.incr)).toFixed(1);
                    }
                    break;
            }
        });
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

document.addEventListener('contextmenu', (event) => {
    /* FF: SHIF + right-click further possible! */
    event.preventDefault();
});

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
