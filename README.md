# Binary Pulse Game

Binary Pulse is a small puzzle/arcade experiment built with vanilla
JavaScript and rendered on an HTML5 canvas. Players fire pulses across a grid
to toggle cells between `0` and `1` in an attempt to match target patterns.
The repository currently contains the initial skeleton and will grow as the
game evolves.

## Game Overview

The game board consists of a small 2x2 grid of binary cells. Clicking a cell
fires a pulse in a random direction, flipping the state of each cell it
touches. Points are awarded for clearing patterns with as few pulses as
possible.

## New Features

- **Random Pulse Firing** – clicking a cell immediately fires a pulse in a
  random direction.
- **Cell Density** – after selecting a cell, press `0-9` to set its density
  which slows pulses passing through.
- **Recursive Pulses** – pulses entering dense clusters spawn additional pulses
  creating emergent behavior.
- **Auto Mode** – repeatedly fires pulses in random directions until paused.
- **Debug Panel** – live statistics appear beside the grid showing pulse count,
  active "1" cells and average density.

## Roadmap

- Directional firing and cell density mechanics.
- Recursive pulse generation from dense areas.
- Automatic simulation mode and debug tooling.

## Local Development Setup

The project uses Node.js for testing and optional local servers. Install a recent version:

- **Node.js**: version 18 or later

### Installation

1. Clone the repository.
2. Install Node dependencies:
   ```bash
   npm install
   ```

### Running the Project

Open `index.html` directly in your browser or serve the files with a simple static server:

```bash
npx http-server .
```

**Note:** The game imports the Three.js module from a CDN using an import map.
Ensure you have an active internet connection when opening `index.html` or
update the import map to reference a local `three.module.js` file.

### Running Tests

The repository uses **Jest** for unit testing. After installing the Node
dependencies, run:

```bash
npm test
```

This executes all tests in the `__tests__` directory.

## Troubleshooting

- **Version Mismatch**
  - Verify the Node.js version matches the requirement above.
- **Missing Dependencies**
  - Ensure `npm install` has been run.
- **Port Already in Use**
  - If the static server fails to start because the default port is busy,
    set an alternative port using an environment variable or configuration option.

