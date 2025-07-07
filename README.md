# Binary Pulse Game

Binary Pulse is a lightweight grid toy built with plain JavaScript and an HTML5
canvas. The board is a 10×10 grid of binary cells. Clicking on a cell toggles
its value between `0` and `1` and the grid is redrawn each frame.

## Game Overview

The goal is simply to experiment with the grid. Cells lit as `1` appear green
while `0` cells remain dark. There are no pulses, density settings or automatic
behaviours – just direct interaction with the grid.

## Local Development Setup

Install **Node.js** (version 18 or later) if you want to run the unit tests.

### Installation

1. Clone the repository.
2. Install Node dependencies:
   ```bash
   npm install
   ```

### Running the Project

Open `index.html` directly in your browser or serve the files with a static
server:

```bash
npx http-server .
```

### Running Tests

Run all Jest unit tests with:

```bash
npm test
```

This executes the tests in the `__tests__` directory.
