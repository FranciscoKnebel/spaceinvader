# Space Invader
A MelonJS Space Invaders-like game.

Inspired by the example from http://melonjs.github.io/tutorial-space-invaders/

[![Travis](https://travis-ci.org/FranciscoKnebel/spaceinvader.svg?branch=development)](https://travis-ci.org/FranciscoKnebel/spaceinvader)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/franciscoknebel/spaceinvader?branch=development)](https://ci.appveyor.com/project/FranciscoKnebel/spaceinvader)

### Development

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:

    git clone https://github.com/FranciscoKnebel/spaceinvader.git

Then in the cloned directory, simply run:

    npm install

You must also have `grunt-cli` installed globally:

    npm install -g grunt-cli

Developing the game:

	grunt dev

And you will have the game running on http://localhost:8000

## Building Release Versions

To build:

    grunt

This will create a `build` directory containing the files that can be uploaded to a server, or packaged into a mobile app.

#### Packaging a standalone desktop release via scripts

    grunt dist
    npm run build-**

Where ** can be `win32` (Windows), `linux` (Linux) and `darwin` (OSX).

#### Packaging all desktop releases

    npm run build-all

#### Building a standalone desktop release

    grunt dist

##### Running the desktop release on Windows

    .\bin\electron.exe

##### Running the desktop release on macOS

    open ./bin/Electron.app

##### Running the desktop release on Linux

    ./bin/electron

-------------------------------------------------------------------------------

### Credits


Music by Sirius Beat - Tronicles

Link: http://youtu.be/zIRo7NJ4uLE
