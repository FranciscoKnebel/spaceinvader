# Space Invader

A MelonJS Space Invaders-like space shooter game.
You can play the latest stable release right here in your browser, at https://franciscoknebel.github.io/spaceinvader/.

Instructions to create an executable for most platforms can be found below.

Inspired by the example from http://melonjs.github.io/tutorial-space-invaders/

_development_
[![Travis](https://travis-ci.org/FranciscoKnebel/spaceinvader.svg?branch=development)](https://travis-ci.org/FranciscoKnebel/spaceinvader)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/franciscoknebel/spaceinvader?branch=development)](https://ci.appveyor.com/project/FranciscoKnebel/spaceinvader)

_master_
[![Travis](https://travis-ci.org/FranciscoKnebel/spaceinvader.svg?branch=master)](https://travis-ci.org/FranciscoKnebel/spaceinvader)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/franciscoknebel/spaceinvader?branch=master)](https://ci.appveyor.com/project/FranciscoKnebel/spaceinvader)

[![Greenkeeper badge](https://badges.greenkeeper.io/FranciscoKnebel/spaceinvader.svg)](https://greenkeeper.io/)

### Development

Before anything, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file, for all the project guidelines.

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:

    git clone --recurse-submodules https://github.com/FranciscoKnebel/spaceinvader.git


Then in the cloned directory, simply run:

    npm install

Install the submodule dependencies too:

    npm run install-submodules

    Be sure to check if the module projects have any other setup on their respective README.md files.

You must also have `grunt-cli` installed globally:

    npm install -g grunt-cli

Developing the game:

	grunt dev

And you will have the game running on http://localhost:8000

## Building Release Versions

To build:

    grunt

This will create a `build` directory containing the files that can be uploaded to a server, or packaged into a mobile app.

#### Updating docs folder for web release

    npm run build-docs

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

## Credits
### Authors
<table style="text-align: center;">
  <tr>
    <td>
      <img src="https://avatars.githubusercontent.com/FranciscoKnebel?s=75">
      <br>
      <a href="https://github.com/FranciscoKnebel">Francisco Knebel</a>
    </td>
    <td>
      <a href="https://github.com/FranciscoKnebel/spaceinvader/commits?author=FranciscoKnebel">Contributions</a> by FranciscoKnebel
    </td>
  </tr>
</table>

See also the full list of [contributors](https://github.com/FranciscoKnebel/spaceinvader/contributors) who participated in this project.

### Other credited work
Music, artwork and other accreditations can be found on the [CREDITS.md](CREDITS.md) file.

Music bitrate change using MP3 Quality Modifier 2.5.3.

## License
This project is licensed under the _MIT License_ - see the [LICENSE.md](LICENSE.md) file for details.
