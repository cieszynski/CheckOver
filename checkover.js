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
                }
            });
    }
};

data.oninput = (event) => {
    console.log(event);
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
    }
};
