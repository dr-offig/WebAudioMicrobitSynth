/*
 * synth_controller.js
 *
 * This program is licensed under the MIT License.
 * Copyright 2015, aike (@aike1000)
 *
 */

// var ctrl;

var Ctrl = function() {
	this.focus = '';
	this.blinkStartButton = null;
	this.mouseDown = false;
	this.sx = 0;
	this.sy = 0;
	this.knob = null;
	this.knobVal = 0;
	this.note = null;
	this.normalKnob = true;
	this.sensitivity = 2;
	this.infomode = 0;

	this.controls = [
		{ tag: 's_glide', controllerNumber: 12, element: 'glideSwitch', type: 'switch' },
		{ tag: 'k_glide', controllerNumber: 13, element: 'glideKnob', type: 'knob' },
		{ tag: 'c_freq1', controllerNumber: 2, element: 'oscillator1FrequencyKnob', type: 'chicken' },
		{ tag: 'c_freq2', controllerNumber: 3, element: 'oscillator2FrequencyKnob', type: 'chicken' },
		{ tag: 'k_fine1', controllerNumber: 4, element: 'oscillator1FineKnob', type: 'knob' },
		{ tag: 'k_fine2', controllerNumber: 5, element: 'oscillator2FineKnob', type: 'knob' },
		{ tag: 'c_wave1', controllerNumber: 6, element: 'oscillator1WaveformKnob', type: 'chicken' },
		{ tag: 'c_wave2', controllerNumber: 7, element: 'oscillator2WaveformKnob', type: 'chicken' },
		{ tag: 'k_vol1', controllerNumber: 8, element: 'mixer1VolumeKnob', type: 'knob' },
		{ tag: 'k_vol2', controllerNumber: 9, element: 'mixer2VolumeKnob', type: 'knob' },
		{ tag: 's_osc1', controllerNumber: 10, element: 'mixer1Switch', type: 'switch' },
		{ tag: 's_osc2', controllerNumber: 11, element: 'mixer2Switch', type: 'knob' },
		{ tag: 'k_cut', controllerNumber: 1, element: 'filterCutoffKnob', type: 'knob' },
		{ tag: 'k_emp', controllerNumber: 0, element: 'filterEmphasisKnob', type: 'knob' },
		{ tag: 'k_amo', controllerNumber: 14, element: 'filterContourKnob', type: 'knob' },
		{ tag: 'k_fa', controllerNumber: 15, element: 'filterAttackKnob', type: 'knob' },
		{ tag: 'k_fd', controllerNumber: 16, element: 'filterDecayKnob', type: 'knob' },
		{ tag: 'k_fs', controllerNumber: 17, element: 'filterSustainKnob', type: 'knob' },
		{ tag: 'k_la', controllerNumber: 18, element: 'loudnessAttackKnob', type: 'knob' },
		{ tag: 'k_ld', controllerNumber: 19, element: 'loudnessDecayKnob', type: 'knob' },
		{ tag: 'k_vol', controllerNumber: 20, element: 'outputVolumeKnob', type: 'knob' },
		{ tag: 'k_dly', controllerNumber: 21, element: 'outputDelayKnob', type: 'knob' }
	];

}


Ctrl.prototype.setDspParam = function(key, val) {
	switch (key) {
	case 's_glide':
		synth.vco1.set_glide_on(val);
		synth.vco2.set_glide_on(val);
		break;
	case 'k_glide':
		synth.vco1.set_glide_time(val);
		synth.vco2.set_glide_time(val);
		break;

	case 'c_freq1':
		synth.vco1.set_pitch(val);
		break;
	case 'c_freq2':
		synth.vco2.set_pitch(val);
		break;
	case 'k_fine1':
		synth.vco1.set_fine(val);
		break;
	case 'k_fine2':
		synth.vco2.set_fine(val);
		break;
	case 'c_wave1':
		synth.vco1.set_wave(val);
		break;
	case 'c_wave2':
		synth.vco2.set_wave(val);
		break;

	case 'k_vol1':
		synth.vco1.set_gain(val);
		break;
	case 's_osc1':
		synth.vco1.set_on(val);
		break;
	case 'k_vol2':
		synth.vco2.set_gain(val);
		break;
	case 's_osc2':
		synth.vco2.set_on(val);
		break;
	case 'k_cut':
		synth.filter.set_freq(val);
		break;
	case 'k_emp':
		synth.filter.set_q(val);
		break;
	case 'k_amo':
		synth.filter.set_amount(val);
		break;
	case 'k_fa':
		synth.feg.set_a(val);
		break;
	case 'k_fd':
		synth.feg.set_d(val);
		synth.feg.set_r(val);
		break;
	case 'k_fs':
		synth.feg.set_s(val);
		break;
	case 'k_la':
		synth.eg.set_a(val);
		break;
	case 'k_ld':
		synth.eg.set_d(val);
		synth.eg.set_r(val);
		break;
	case 'k_ls':
		synth.eg.set_s(val);
		break;
	case 'k_vol':
		synth.volume.set(val);
		break;
	case 'k_dly':
		synth.delay.set(val);
		break;
	}
}


Ctrl.prototype.keyDown = function(note) {
	const kb = document.getElementById('mainKeyboard');
	kb.setNote(1, note);
}

Ctrl.prototype.keyUp = function(note) {
	const kb = document.getElementById('mainKeyboard');
	kb.setNote(0, note);
}


Ctrl.prototype.note_on = function(note) {
	synth.play(note);
	ctrl.keyDown(note);
};

Ctrl.prototype.note_off = function(note) {
	synth.stop();
	ctrl.keyUp(note);
};

Ctrl.prototype.all_note_off = function() {
	synth.stop();
	for (var i = 41; i <= 84; i++) {
		this.keyUp(i);
	}
};


Ctrl.prototype.setDefaultValues = function() {
	this.setControllerValue('s_glide', 1);
	this.setDspParam('s_glide', 100);

	this.setControllerValue('k_glide', 20);
	this.setDspParam('k_glide', 20);

	this.setControllerValue('c_freq1', 0);
	this.setDspParam('c_freq1', 0);

	this.setControllerValue('c_freq2', 50);
	this.setDspParam('c_freq2', 50);

	this.setControllerValue('k_fine1', 50);
	this.setDspParam('k_fine1', 50);

	this.setControllerValue('k_fine2', 50);
	this.setDspParam('k_fine2', 50);

	this.setControllerValue('c_wave1', 50);
	this.setDspParam('c_wave1', 50);

	this.setControllerValue('c_wave2', 50);
	this.setDspParam('c_wave2', 50);

	this.setControllerValue('k_vol1', 50);
	this.setDspParam('k_vol1', 50);

	this.setControllerValue('k_vol2', 50);
	this.setDspParam('k_vol2', 50);

	this.setControllerValue('s_osc1', 1);
	this.setDspParam('s_osc1', 100);

	this.setControllerValue('s_osc2', 1);
	this.setDspParam('s_osc2', 100);

	this.setControllerValue('k_cut', 50);
	this.setDspParam('k_cut', 50);

	this.setControllerValue('k_emp', 50);
	this.setDspParam('k_emp', 50);

	this.setControllerValue('k_amo', 50);
	this.setDspParam('k_amo', 50);

	this.setControllerValue('k_fa', 20);
	this.setDspParam('k_fa', 20);

	this.setControllerValue('k_fd', 10);
	this.setDspParam('k_fd', 10);

	this.setControllerValue('k_fs', 50);
	this.setDspParam('k_fs', 50);

	this.setControllerValue('k_la', 10);
	this.setDspParam('k_la', 10);

	this.setControllerValue('k_ld', 20);
	this.setDspParam('k_ld', 20);

	this.setControllerValue('k_ls', 100);
	this.setDspParam('k_ls', 100);

	this.setControllerValue('k_vol', 50);
	this.setDspParam('k_vol', 50);

	this.setControllerValue('k_dly', 0);
	this.setDspParam('k_dly', 0);
}


Ctrl.prototype.setControllerValue = function(tag, value) {
	const controllerObj = ctrl.controls.find((x) => { return (x.tag == tag); });
	if (controllerObj) {
		const elem = document.getElementById(controllerObj.element);
		if (controllerObj.type == 'switch') {
			elem.setValue(value > 0 ? 1 : 0);
		} else {
			elem.setValue(Math.min(100, Math.max(0, Math.round(value))));
		}

	}
}


// $(function() {
// 	ctrl = new Ctrl();
// });


