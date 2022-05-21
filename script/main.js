let reaction_timeout;

const times = [];

const colors = {
    end: "lightskyblue",
    passive: "red",
    active: "lawngreen"
}

const reaction_now = function () {
    document.body.style.backgroundColor = colors.active;
    document.body.innerText = "GO!";
    times.push(Date.now());
}

const reaction_test = function () {
    if (times.length < 5) {
        reaction_timeout = setTimeout(() => {
            reaction_now();
        }, Math.floor(Math.random() * 2000) + 1000);
    } else {
        let result = 0;
        times.forEach(e => {
            result += e;
        })
        result /= times.length;
        result |= 0;
        document.body.removeEventListener("click", response_test);
        reaction_message(colors.end, `${result}ms\nclick to restart`);
        document.body.addEventListener("click", restart);
    }
}

const reaction_message = function (str_color, message = "wait") {
    document.body.style.backgroundColor = str_color;
    document.body.innerText = message;
}

const reaction_soon = function () {
    clearTimeout(reaction_timeout);
    reaction_message(colors.passive, "too soon!\nclick to try again");
}

const response_test = function () {
    document.body.removeEventListener("click", response_test);
    if (times.length <= 5) {
        if (document.body.style.backgroundColor == colors.active) {
            reaction_message(colors.passive);
            const index = times.length - 1;
            times[index] = Date.now() - times[index];
            document.body.addEventListener("click", response_test);
            reaction_test();
        } else {
            reaction_soon();
            document.body.addEventListener("click", start);
        }
    }
}

const restart = function () {
    document.body.removeEventListener("click", restart);
    times.length = 0;
    start();
}

const start = function () {
    reaction_message(colors.passive);
    reaction_test();
    document.body.addEventListener("click", response_test);
    document.body.removeEventListener("click", start);
}

document.body.addEventListener("click", start);

reaction_message(colors.end, "click to start");