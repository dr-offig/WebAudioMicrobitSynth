WebAudioMidiSynth
====
Midi-enabled browser-based synthesizer

## DESCRIPTION
WebAudioMidiSynth is a fork of WebAudioSynthV2 by aike https://github.com/aike/webaudiosynthv2  
It is an analog style synthesizer application written in JavaScript using Web Audio API.  

This fork is primarily intended as a teaching aid. The idea is to demonstrate a browser based 
synthesiser application, that responds to Midi commands (notes and control changes).
It is intended to be run locally. For this reason the Web GL frontend in the original webaudiosynthv2
has been replaced with a simpler gui (because the original underlying libraries are not designed
to be run locally, and have trouble with CrossOriginRequest restrictions).


## CHANGES FROM WebAudioSynthV2
- Front end GUI replaced with html page leveraging webaudio-controls. This allows the application to 
be run locally
- Midi Control Change messages enabled


## SYSTEM REQUIREMENT
WebAudioMidiSynth runs best in Chrome.

## CREDIT
WebAudioMidiSynth is licensed under MIT License.  
It borrows heavily from 
WebAudioSynthV2 by aike https://github.com/aike/webaudiosynthv2
webaudio-controls by g200k https://github.com/g200kg/webaudio-controls

Programming and GUI Design: dr-offig
