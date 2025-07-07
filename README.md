# Binary Pulse Game

Binary Pulse is a small puzzle/arcade experiment built with vanilla
JavaScript and rendered on an HTML5 canvas. Players fire pulses across a grid
to toggle cells between `0` and `1` in an attempt to match target patterns.
The repository currently contains the initial skeleton and will grow as the
game evolves.

## Game Overview

The game board consists of a grid of binary cells. Launching a pulse causes it
to travel in a straight line, flipping the state of each cell it touches.
Points are awarded for clearing patterns with as few pulses as possible.

## New Features

- **Directional Pulse Control** – click a cell and press an arrow key (or WASD)
  to fire in that direction. If no key is pressed within half a second the
  pulse launches to the right.
- **Null Wells** – right-click a cell to create or remove a Null Well. Pulses
  vanish when touching these voids.
- **Cell Density** – after selecting a cell, press `0-9` to set its density
  which slows pulses passing through.
- **Recursive Pulses** – pulses entering dense clusters spawn additional pulses
  creating emergent behavior.
- **Auto Mode** – toggle automatic firing using the `Auto Mode` button.
- **Rapid Fire** – hold the middle mouse button to continuously fire pulses
  from the cell under your cursor.
- **Debug Panel** – live statistics appear beside the grid showing pulse count,
  active "1" cells, Null Wells and average density.

## Roadmap

- Directional firing and cell density mechanics.
- Null Wells that absorb pulses.
- Recursive pulse generation from dense areas.
- Automatic simulation mode and debug tooling.

## Local Development Setup

The project uses both Node.js and Python. Install recent versions of each:

- **Node.js**: version 18 or later
- **Python**: version 3.10 or later

### Installation

1. Clone the repository.
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Create a Python virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

### Running the Project

Once dependencies are installed you can run the development server. Depending on
how the code is structured this might involve a Node script or a Python entry
point. Typical commands would be:

```bash
npm start              # if using a Node server
# or
python main.py         # if the application entry point is Python
```

### Running Tests

The repository uses **Jest** for unit testing. After installing the Node
dependencies, run:

```bash
npm test
```

This executes all tests in the `__tests__` directory.

## Troubleshooting

- **Version Mismatch**
  - Verify the Node.js and Python versions match the requirements above.
- **Missing Dependencies**
  - Ensure `npm install` and `pip install -r requirements.txt` have been run.
- **Virtual Environment Not Activated**
  - Activate your Python virtual environment before starting the project.
- **Port Already in Use**
  - If the development server fails to start because the default port is busy,
    set an alternative port using an environment variable or configuration
    option.

