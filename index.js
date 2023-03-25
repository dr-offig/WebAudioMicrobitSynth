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


// Use this section to bypass actual MIDI connections, and directly connect the microbit 'MIDI' messages to the synth
// You might do this if, for example, you don't have a virtual MIDI connection on your computer
/*
const customSerial = document.getElementById('customSerial');
if (customSerial) {
  customSerial.handleMIDI = function(val) {
    if (!synth) { return; }
    const noteOnMatch = val.match(/NoteOn (\d+) (\d+) (\d+)/);
    if (noteOnMatch && noteOnMatch.length == 4) {
        ctrl.note_on(parseInt(noteOnMatch[1]));
    }
    const noteOffMatch = val.match(/NoteOff (\d+) (\d+) (\d+)/);
    if (noteOffMatch && noteOffMatch.length == 4) {
        ctrl.note_off(parseInt(noteOffMatch[1]));
    }
    const controlChangeMatch = val.match(/ControlChange (\d+) (\d+) (\d+)/);
    if (controlChangeMatch && controlChangeMatch.length == 4) {
      const controllerNumber = parseInt(controlChangeMatch[1]);
			const controllerValue = parseInt(controlChangeMatch[2]);
			// scale midi range of 0-127 to knob range of 0-100
			var scaledValue = controllerValue / 1.27;			
			
			var controllerObj = ctrl.controls.find((x) => { return (x.controllerNumber == controllerNumber); });
			if (controllerObj) {
				ctrl.setDspParam(controllerObj.tag, scaledValue);
				ctrl.setControllerValue(controllerObj.tag, scaledValue);
			}			
		}
  }
}
*/