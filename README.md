# Lumize Switch Controller

A rack-mountable device for receiving input from physical wall switches and using it in a home automation situation

## Goal

When designing the home automation system for a reasonably sized attic, I came to the conclusion
that there aren't any good commercial solutions for reliably reading button input from switches mounted
in regular wall boxes. So I decided to design my own.

To avoid the complication (and waste of space) of having a network connected microcontroller in
each wall box, I chose to implement a solution based on a central device, with cables running to each button.
This poses the challenge of bringing upwards of four signals all the way from each corner of the floor
to a central location. The only cheap and easy to come by cable that has enough conductors is UTP cable,
usually used for ethernet networks. The cable is terminated as RJ45 male inside the wall box, and into a
patch panel at the central location.

## Switches

For my system, I wanted to use regular italian style wall switches, so I needed a way of interfacing
the RJ45 to some bare wire to be plugged into the buttons. This is done with a simple PCB i call the
"Switch Terminator Board", which exposes the connections as screw terminals.
