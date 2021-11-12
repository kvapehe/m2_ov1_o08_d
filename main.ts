/**
 * Siden litt lite variasjon med kompassreting s[ er det laget to variabler. En for kompassretnignen som kan vises, og en til [ lage tone.
 * 
 * Valgte verdier her gir frekvensen |2 for alle retninger. S[ laveste frekvens er 0 Hz eller 2 Hz n[r retingen er 1 grad.
 * 
 * og maks frekvens 360|2 ) 720 Hz n[r retningen er fult Nord eller 360 grader. 
 * 
 * Her kan noe av logikken diskuteres siden 355 grader og 5 grader er like langt fra nord. Muligens kunne tonelyden hatt modulus 180 slik at aaller retninger bort fra o grader / 360 grader blir med annen tone, og der rett s;r har tonen med h;yest frekvens. Da kunne verdien v'rt | med f.eks. 4 for [ f[ like stort frekvenssprang. Ulempen med den siste metoden er at en ikke kan se om en er NW eller NE dersom lyden er den samme...
 * 
 * Som sagt fordeler og ulemper med begge metodene.
 */
input.onButtonPressed(Button.A, function () {
    debug = 0
})
input.onButtonPressed(Button.AB, function () {
    sensorverdi_raw = input.temperature()
    sensorverdi_map = Math.map(sensorverdi_raw, -5, 50, 20, 2550)
    // Bytte mellom to visninger ved A og B tastene.
    if (debug == 0) {
        // Erstatter vising av tall.
        // Verdier temperatur er fra -0 - 50 der varmest er 50.Dette gjøres om fra -5 til 50 og benytter 20 - 2550  Dette kan vises som 0% - 100%.
        // Denne testen viser verdier mellom 950 Hz og 1480 Hz som Middels temperatur.
        // Verdien 950 er ca. 15degC og verdien 1480 er ca. 27 degC
        // Alt under 950  er K (Kaldt).
        // En tone vil "speile" temperatur med en frekvens.
        // A input viser symboler og spiller tone
        // B input viser temperaturverdien omgjort til Hz og spiller tone.
        if (sensorverdi_map > 1480) {
            basic.showLeds(`
                # . . . #
                # . . . #
                # . . . #
                . # . # .
                . . # . .
                `)
        } else if (sensorverdi_map > 950) {
            basic.showLeds(`
                # . # . #
                # # # . .
                # . # . #
                # . # . #
                # . # . #
                `)
        } else {
            basic.showLeds(`
                # . . # .
                # . # . .
                # # . . .
                # . # . .
                # . . # .
                `)
        }
    } else {
        // Microbit kan kun vise et tall / tegn av gange, men å vise tal med f.eks. tone er en metode som ofte brukes for å vise et tall. Avstandssenorer kan blant annet bruke slik varsling. Bytt gjerne ut _raw med _map. Da kan en se verdiene som er benyttet i IF-testene
        basic.showNumber(sensorverdi_map)
    }
    music.playTone(sensorverdi_map, music.beat(BeatFraction.Sixteenth))
})
input.onButtonPressed(Button.B, function () {
    debug = 1
})
let sensorverdi_map = 0
let sensorverdi_raw = 0
let debug = 0
debug = 0
OLED.init(128, 64)
OLED.writeStringNewLine("Velkommen")
basic.pause(500)
let bearing = input.compassHeading()
basic.pause(500)
basic.forever(function () {
    bearing = input.compassHeading()
    sensorverdi_raw = input.compassHeading() * 2
    // bearing = 250
    // bearing = randint(0, 270)
    // bearing = randint(0, 360)
    if (bearing < 22.5 || bearing > 337.5) {
        // basic.showString("N")
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        OLED.writeNumNewLine(bearing)
    }
    if (bearing < 67.5 && bearing > 22.5) {
        // basic.showString("N")
        basic.showLeds(`
            . . # # #
            . . . # #
            . . # . #
            . # . . .
            # . . . .
            `)
        OLED.writeNumNewLine(bearing)
    }
    // basic.showArrow(ArrowNames.North)
    if (bearing < 112.5 && bearing > 67.5) {
        // basic.showString("N")
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        OLED.writeNumNewLine(bearing)
    }
    if (bearing < 157.5 && bearing > 112.5) {
        // basic.showString("N")
        basic.showLeds(`
            # . . . .
            . # . . .
            . . # . #
            . . . # #
            . . # # #
            `)
        OLED.writeNumNewLine(bearing)
    }
    if (bearing < 202.5 && bearing > 157.5) {
        // basic.showString("N")
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        OLED.writeNumNewLine(bearing)
    }
    if (bearing < 247.5 && bearing > 202.5) {
        // basic.showString("N")
        basic.showLeds(`
            . . . . #
            . . . # .
            # . # . .
            # # . . .
            # # # . .
            `)
        OLED.writeNumNewLine(bearing)
    }
    if (bearing < 292.5 && bearing > 247.5) {
        // basic.showString("N")
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        OLED.writeNumNewLine(bearing)
    }
    if (bearing < 337.5 && bearing > 292.5) {
        // basic.showString("N")
        basic.showLeds(`
            # # # . .
            # # . . .
            # . # . .
            . . . # .
            . . . . #
            `)
        OLED.writeNumNewLine(bearing)
    }
    OLED.newLine()
    OLED.writeString("Dg  ")
    OLED.writeNum(bearing)
    OLED.writeString("  Hz  ")
    OLED.writeNum(sensorverdi_raw)
    OLED.writeString(".")
    OLED.newLine()
    music.playTone(sensorverdi_raw, music.beat(BeatFraction.Sixteenth))
})
