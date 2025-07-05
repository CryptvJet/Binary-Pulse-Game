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

## Roadmap

- Implement grid creation and pulse movement logic.
- Add basic keyboard/mouse controls for launching pulses.
- Track score and win conditions across multiple levels.
- Polish visuals with animations and sound effects.

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

