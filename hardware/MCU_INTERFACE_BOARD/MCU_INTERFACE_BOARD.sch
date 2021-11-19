EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Text Notes 7350 7500 0    55   ~ 11
Luimze Switch Controller - MCU Interface Board
$Comp
L Connector_Generic:Conn_01x10 J4
U 1 1 6192D887
P 4450 3150
F 0 "J4" H 4550 3100 50  0000 L CNN
F 1 "Conn_01x10" H 4200 2550 50  0000 L CNN
F 2 "" H 4450 3150 50  0001 C CNN
F 3 "~" H 4450 3150 50  0001 C CNN
	1    4450 3150
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x10 J5\
U 1 1 6192E0CB
P 5000 3150
F 0 "J5\\" H 5150 3100 50  0000 C CNN
F 1 "Conn_01x10" H 5000 2550 50  0000 C CNN
F 2 "" H 5000 3150 50  0001 C CNN
F 3 "~" H 5000 3150 50  0001 C CNN
	1    5000 3150
	-1   0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_02x04_Odd_Even J1
U 1 1 619A0E82
P 7000 1600
F 0 "J1" H 7050 1917 50  0000 C CNN
F 1 "IDC_02x04" H 7050 1826 50  0000 C CNN
F 2 "" H 7000 1600 50  0001 C CNN
F 3 "~" H 7000 1600 50  0001 C CNN
	1    7000 1600
	1    0    0    -1  
$EndComp
Text GLabel 6650 1800 0    50   Input ~ 0
SDA
Text GLabel 7450 1800 2    50   Input ~ 0
SCL
Wire Wire Line
	6650 1800 6800 1800
Wire Wire Line
	7300 1800 7450 1800
Text GLabel 6400 1700 0    50   Input ~ 0
TEST
Text GLabel 6650 1600 0    50   Input ~ 0
PULL
Text GLabel 7700 1700 2    50   Input ~ 0
RESET
Text GLabel 7450 1600 2    50   Input ~ 0
PUSH
Wire Wire Line
	6650 1600 6800 1600
Wire Wire Line
	6400 1700 6800 1700
Wire Wire Line
	7300 1600 7450 1600
Wire Wire Line
	7300 1700 7700 1700
$Comp
L Connector_Generic:Conn_02x04_Odd_Even J2
U 1 1 619A8DDE
P 7000 2250
F 0 "J2" H 7050 2567 50  0000 C CNN
F 1 "IDC_02x04" H 7050 2476 50  0000 C CNN
F 2 "" H 7000 2250 50  0001 C CNN
F 3 "~" H 7000 2250 50  0001 C CNN
	1    7000 2250
	1    0    0    -1  
$EndComp
Text GLabel 6650 2450 0    50   Input ~ 0
SDA
Text GLabel 7450 2450 2    50   Input ~ 0
SCL
Wire Wire Line
	6650 2450 6800 2450
Wire Wire Line
	7300 2450 7450 2450
Text GLabel 6400 2350 0    50   Input ~ 0
TEST
Text GLabel 6650 2250 0    50   Input ~ 0
PULL
Text GLabel 7700 2350 2    50   Input ~ 0
RESET
Text GLabel 7450 2250 2    50   Input ~ 0
PUSH
Wire Wire Line
	6650 2250 6800 2250
Wire Wire Line
	6400 2350 6800 2350
Wire Wire Line
	7300 2250 7450 2250
Wire Wire Line
	7300 2350 7700 2350
$Comp
L power:VCC #PWR?
U 1 1 619A9A0E
P 6650 1450
F 0 "#PWR?" H 6650 1300 50  0001 C CNN
F 1 "VCC" H 6665 1623 50  0000 C CNN
F 2 "" H 6650 1450 50  0001 C CNN
F 3 "" H 6650 1450 50  0001 C CNN
	1    6650 1450
	1    0    0    -1  
$EndComp
Wire Wire Line
	6650 1450 6650 1500
Wire Wire Line
	6650 1500 6800 1500
$Comp
L power:VCC #PWR?
U 1 1 619ACECE
P 6650 2100
F 0 "#PWR?" H 6650 1950 50  0001 C CNN
F 1 "VCC" H 6665 2273 50  0000 C CNN
F 2 "" H 6650 2100 50  0001 C CNN
F 3 "" H 6650 2100 50  0001 C CNN
	1    6650 2100
	1    0    0    -1  
$EndComp
Wire Wire Line
	6650 2100 6650 2150
Wire Wire Line
	6650 2150 6800 2150
$Comp
L power:GND #PWR?
U 1 1 619ADD36
P 8250 2500
F 0 "#PWR?" H 8250 2250 50  0001 C CNN
F 1 "GND" H 8255 2327 50  0000 C CNN
F 2 "" H 8250 2500 50  0001 C CNN
F 3 "" H 8250 2500 50  0001 C CNN
	1    8250 2500
	1    0    0    -1  
$EndComp
Wire Wire Line
	7300 1500 8250 1500
Wire Wire Line
	8250 1500 8250 2150
Wire Wire Line
	7300 2150 8250 2150
Connection ~ 8250 2150
Wire Wire Line
	8250 2150 8250 2500
Text GLabel 5350 3150 2    50   Input ~ 0
SCL
Text GLabel 5700 3250 2    50   Input ~ 0
SDA
Wire Wire Line
	5200 3150 5350 3150
Wire Wire Line
	5200 3250 5700 3250
NoConn ~ 1400 4250
$EndSCHEMATC
