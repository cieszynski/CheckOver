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
                            elem.removeAttribute(
                                "checked",
                            );
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

const pauseAnimation = () => {

    document.body.getAnimations().forEach((animation) => {
        animation.pause();
    });
}

const playAnimation = () => {

    document.body.getAnimations().forEach((animation) => {
        animation.play();
    });
}

const finishAnimation = () => {

    document.body.getAnimations().forEach((animation) => {
        animation.finish();
    });
}

document.body.onanimationiteration = (event) => {
    localStorage.setItem("currentTime", event.elapsedTime * 1000);
};

document.body.onanimationend = (event) => {
    prefinish.checked = false;
    results.checked = true;
    //alert(8)
};

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey) {
        switch (event.key) {
            case "F5":
                event.preventDefault();

                document.body.getAnimations().forEach((animation) => {
                    animation.finish();
                });
                localStorage.clear();
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
