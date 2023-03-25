let synth;
let ctrl = new Ctrl();

// turn the synthesiser on
const startSwitch = document.getElementById("startSwitch");
startSwitch.addEventListener("click", (event) => {
    if (event.target.value) {
        synth = new WebSynth();
        // initial settings for audio parameters
        ctrl.setDefaultValues();
    } else {
        synth = null;
    }
});
    

// play notes from gui keyboard
const keyboard = document.getElementById('mainKeyboard');
keyboard.addEventListener('change', function(e) {
  if(e.note[0]) {
    if (!synth) { return; }
    synth.play(e.note[1]);
  } else {
    if (!synth) { return; }
    synth.stop();
  }
});


// set parameters from the gui controls
const guiChangeHandler = (event) => {
    if (!synth) { return; }
    const tag = event.target.getAttribute("data-tag");
    if (tag) {
        ctrl.setDspParam(tag, Math.min(100, Math.max(0, event.target.value)));
    }
} 

const controlIds = [
    'glideSwitch',
    'glideKnob',
    'oscillator1FrequencyKnob',
    'oscillator2FrequencyKnob',
    'oscillator1FineKnob',
    'oscillator2FineKnob',
    'oscillator1WaveformKnob',
    'oscillator2WaveformKnob',
    'mixer1VolumeKnob',
    'mixer2VolumeKnob',
    'mixer1Switch',
    'mixer2Switch',
    'filterCutoffKnob',
    'filterEmphasisKnob',
    'filterContourKnob',
    'filterAttackKnob',
    'filterDecayKnob',
    'filterSustainKnob',
    'loudnessAttackKnob',
    'loudnessDecayKnob',
    'outputVolumeKnob',
    'outputDelayKnob'
];


controlIds.forEach(id => { document.getElementById(id).addEventListener('change', guiChangeHandler); });
