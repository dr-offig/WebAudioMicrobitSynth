WebAudioMicrobitSynth
====
Midi-enabled browser-based synthesizer, with Microbit serial connection component

## DESCRIPTION
WebAudioMicrobitSynth is a fork of WebAudioSynthV2 by aike https://github.com/aike/webaudiosynthv2  
It is an analog style synthesizer application written in JavaScript using Web Audio API.  

This fork is primarily intended as a teaching aid. The idea is to demonstrate a browser based 
synthesiser application, that responds to Midi commands (notes and control changes).
It is intended to be run locally. For this reason the Web GL frontend in the original webaudiosynthv2
has been replaced with a simpler gui (because the original underlying libraries are not designed
to be run locally, and have trouble with CrossOriginRequest restrictions).

It includes a web component for communicating with a Micro:bit (or other microcontroller) via
a serial port. It also includes a MIDI component for routing Micro:bit messages through virtual
MIDI connections.

It is also possible to directly connect Micro:bit messages to the synth, by overriding the serial components
message handler. This is useful if, for example, you are on a computer that doesn't have virtual MIDI
connections.


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
