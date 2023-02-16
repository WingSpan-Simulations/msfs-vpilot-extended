# vPilot Extended

vPilot Extended is a companion addon for vPilot which allows you to control vPilot from within Microsoft Flight Simulator.
It removes the necessity to switch between MSFS and vPilot, allowing you to seamlessly:
 - file a flight plan
 - view active air traffic controllers, sorted and grouped by region and airport
 - broadcast and receive text messages, whether it's via private message or radio broadcast

## Licensing

This software is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA 3.0) license.
This license permits: 
 - the copying and redistribution of the software in any medium or format
 - the adaptation or modification of the software.

This is subject to the following restrictions:
 - you are required to provide appropriate credit, provide a link to the license and indicate if any changes were made in a reasonable manner, but not in a way that suggests we endorse you or your use.
 - you may not use or redistribute the software for any commercial purposes
 - you are required to distribute any modifications or adaptations you make to the software under this same license

## Architecture

vPilot Extended has two key components:
 - a vPilot plugin .dll which hooks into vPilot, launching a websocket server that allows for communication between vPilot and the msfs panel.
 - an msfs panel composed of a front-end, created using the MSFS Avionics Framework and Tailwind CSS; and a backend which communicates with the frontend using the EventBus, and the backend using the WebSocket API.

