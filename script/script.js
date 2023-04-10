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