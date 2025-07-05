# Binary Pulse Game

## Purpose and Gameplay Concept

Binary Pulse is an experimental game that explores patterns produced by pulses moving across a grid. Each pulse carries a simple binary state that flips whenever it hits a node. You can set up starting pulses and watch as the grid evolves, forming rhythmic loops or chaotic cascades.

## Pulse Engine and Recursion Rules

The pulse engine drives the simulation. Pulses traverse a directed graph of nodes. When a pulse arrives at a node, the node reads the pulse's state, optionally alters it, and forwards new pulses along connected paths. These simple rules chain together recursively, allowing complex behaviors to emerge from a small set of initial pulses.

## Getting Started

### Requirements

- Python 3.10+
- Pygame (for the current 2D view)

### Running Locally

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the game:
   ```bash
   python main.py
   ```

## Roadmap

This project is a work in progress. Future features may include:

- **Null Wells** – areas that absorb or nullify pulses
- **3D View** – navigate and observe the grid in three dimensions
- **Level Editor** – design custom stages with unique pulse configurations

Contributions are welcome. Feel free to open issues or pull requests with ideas or improvements.
