let speakerId = null;
let textConf = null;
const synth = window.speechSynthesis;



const handOverHoverGeneral = async (elem) => {
    if ("speechSynthesis" in window) {
        if ((speakerId === null || speakerId !== elem.id)) {
            console.log(speakerId);
            speakerId = elem.id;
            if (textConf === null) {
                let response = await fetch("script/text.conf.json");
                textConf = await response.json();
                prepareVoices();
            }
            synth.cancel();
            speaker(textConf[elem.id].hover);
            speakerId=null;
        }
    }
    else alert("Browser does not support text to speech");
};
const speaker = (speechInstance) => {
    console.log(speechInstance)
    synth.speak(speechInstance);
};

const prepareVoices = () => {
    if (textConf) {
        let voice = synth.getVoices()[4];
        console.log("Preparing voices");
        for (const [key, value] of Object.entries(textConf)) {
            let hoverMessage = new SpeechSynthesisUtterance();
            hoverMessage.text =  textConf[key].hover;
            hoverMessage.voice =  voice;
            textConf[key].hover = hoverMessage;
        }
        console.log("Finished preparing voices");
    }
};

let s1 = document.getElementById("s1");
let s2 = document.getElementById("s2");
let s3 = document.getElementById("s3");
let s4 = document.getElementById("s4");
let s5 = document.getElementById("s5");
let s6 = document.getElementById("s6");

s1.addEventListener("mouseover", () => {
    handOverHoverGeneral(s1);
});
s2.addEventListener("mouseover", () => {
    handOverHoverGeneral(s2);
});
s3.addEventListener("mouseover", () => {
    handOverHoverGeneral(s3);
});
s4.addEventListener("mouseover", () => {
    handOverHoverGeneral(s4);
});
s5.addEventListener("mouseover", () => {
    handOverHoverGeneral(s5);
});
s6.addEventListener("mouseover", () => {
    handOverHoverGeneral(s6);
});