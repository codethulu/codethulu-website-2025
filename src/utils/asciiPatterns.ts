// Helper function to convert string-based ASCII art to intensity grid
const convertAsciiArtToGrid = (asciiArt: string): number[][] => {
    const lines = asciiArt.trim().split('\n');

    // Find the maximum line length to normalize the grid
    const maxLength = Math.max(...lines.map(line => line.length));

    // Create a normalized grid
    return lines.map(line => {
        // Pad shorter lines with spaces to ensure a rectangular grid
        const paddedLine = line.padEnd(maxLength, ' ');

        return [...paddedLine].map(char => {
            if (char === ' ') return 0;
            if (char === '.') return 1;
            if (char === '-') return 2;
            if (char === '+') return 3;
            if (char === '*') return 5;
            if (char === '#') return 7;
            if (char === '@') return 9;
            return 1; // Default value for other characters
        });
    });
};

// CODETHULU ASCII art pattern
const codethulu = `
   @@@@@   @@@@@  @@@@@@  @@@@@@@ @@@@@  @   @  @    @   @   @ 
  @       @     @ @     @ @         @    @   @  @    @   @   @ 
  @       @     @ @     @ @         @    @   @  @    @   @   @ 
  @       @     @ @     @ @@@@@     @    @@@@@  @    @   @   @ 
  @       @     @ @     @ @         @    @   @  @    @   @   @ 
  @       @     @ @     @ @         @    @   @  @    @   @   @ 
   @@@@@   @@@@@  @@@@@@  @@@@@@@   @    @   @  @@@@@@    @@@  
`;

// Cube ASCII art pattern
const cube = `
          +----------+
         /|         /|
        / |        / |
       +----------+  |
       |  |       |  |
       |  +-------|--+
       | /        | /
       |/         |/
       +----------+
`;

export const CODETHULU_ASCII = convertAsciiArtToGrid(codethulu);
export const CUBE_ASCII = convertAsciiArtToGrid(cube);