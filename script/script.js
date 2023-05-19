let speakerId = null;
let textConf = null;
const synth = window.speechSynthesis;
let elemIds = ["s1", "s2", "s3", "s4", "s5", "s6"];

const handOverHoverGeneral = async (elem) => {
    if ("speechSynthesis" in window) {
        if ((speakerId === null || speakerId !== elem.id)) {
            speakerId = elem.id;
            if (textConf === null) {
                let response = await fetch("script/text.conf.json");
                textConf = await response.json();
                prepareVoices();
            }
            synth.cancel();
            speaker(textConf[elem.id].hover);
            speakerId = null;
        }
    }
    else alert("Browser does not support text to speech");
};
const speaker = (speechInstance) => {
    synth.speak(speechInstance);
};

const prepareVoices = () => {
    if (textConf) {
        let voice = synth.getVoices()[4];
        console.log("Preparing voices");
        for (const [key, value] of Object.entries(textConf)) {
            let hoverMessage = new SpeechSynthesisUtterance();
            hoverMessage.text = textConf[key].hover;
            hoverMessage.voice = voice;
            textConf[key].hover = hoverMessage;
        }
        console.log("Finished preparing voices");
    }
};

for (const id of elemIds) {
    let elem = document.getElementById(id);
    elem.addEventListener("mouseover", () => {
        handOverHoverGeneral(elem);
    });
}

function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

/* Please ❤ this if you like it! */

var temps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var valElement = document.querySelector('.channel__value');
var msgElement = document.querySelector('.channel__message');
let channelElement = document.querySelector('.channel');

let getRandomTemp = function () {
    let channel = {
        temp: 0,
        message: null
    };
    channel.temp = (Math.random() * Math.floor(Math.random() * temps.length) * 10).toFixed(1);
    if (channel.temp < 40) {
        channelElement.classList.remove('channel--heated');
        channelElement.classList.remove('channel--overheated');
        channelElement.classList.add('channel--cooled');
        channel.message = 'CloudVPS#1337 is <b>cooled</b> ❄️';
    } else if (channel.temp > 40 && channel.temp < 60) {
        channelElement.classList.remove('channel--cooled');
        channelElement.classList.remove('channel--overheated');
        channelElement.classList.add('channel--heated');
        channel.message = 'CloudVPS#1337 is <b>heated</b>! ⚡'
    } else if (channel.temp > 60) {
        channelElement.classList.remove('channel--cooled');
        channelElement.classList.remove('channel--heated');
        channelElement.classList.add('channel--overheated');
        channel.message = 'CloudVPS#1337 is <b>overheated</b>! 🔥';
    }

    return channel;
}

setInterval(function () {
    let channel = getRandomTemp();
    valElement.innerHTML = channel.temp;
    msgElement.innerHTML = channel.message;
}, 800)
