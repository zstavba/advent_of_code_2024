import * as path from 'path';
import * as fs from 'fs/promises'; // Use `fs/promises` for proper asynchronous operations

// Get the current working directory and join it with the relative path to the file
const filePath = path.join(process.cwd(), 'assets', 'files', 'day_2.txt');

namespace AdventOfCode.Year2024 {
  export class Day2 {
    private input: string[] = []; // Initialize with an empty array

    constructor() {}

    public setInput = (input: string[]): void => {
      this.input = input;
    };

    public readFileAndParse = async (filePath: string): Promise<string[]> => {
      try {
        // Asynchronously read the file content
        const fileData = await fs.readFile(filePath, 'utf-8');
        // Split the file data into lines and trim
        return fileData.trim().split('\n');
      } catch (error: any) {
        console.error(`Error reading or parsing file: ${error.message}`);
        throw error;
      }
    };

    public part1(): number {
      const parsedData = this.parse();
      return parsedData.filter(report => this.isSafe(report)).length;
    }

    public part2(): number {
      const parsedData = this.parse();
      return parsedData.filter(report =>
        report.some((_, skip) =>
          this.isSafe([...report.slice(0, skip), ...report.slice(skip + 1)])
        )
      ).length;
    }

    private isSafe(report: number[]): boolean {
      if (report.length < 2) return true;

      // Determine whether the sequence is increasing or decreasing
      const increasing = report[0] < report[1];

      return report.every((_, i) => {
        if (i === 0) return true; // Skip the first element

        const diff = Math.abs(report[i] - report[i - 1]);

        // Check if levels are increasing or decreasing as expected
        const isConsistent = increasing
          ? report[i] > report[i - 1]
          : report[i] < report[i - 1];

        return isConsistent && diff >= 1 && diff <= 3;
      });
    }

    private parse(): number[][] {
      return this.input.map(line => 
        line.trim().split(/\s+/).map(Number)
      );
    }

    public readFile = async (path: string): Promise<void> => {
      try {
        const fileLines = await this.readFileAndParse(path);
        this.setInput(fileLines);
      } catch (error: any) {
        console.error(`Error setting input: ${error.message}`);
        throw error;
      }
    }
  }
}

// Example usage:
(async () => {
  const day2 = new AdventOfCode.Year2024.Day2();

  try {
    // Load input from the file
    await day2.readFile(filePath);

    // Compute results for parts 1 and 2
    console.log("Part 1 (Safe Reports):", day2.part1());
    console.log("Part 2 (Safe Reports with Skip):", day2.part2());
  } catch (error: any) {
    console.error(`Error executing Day2 logic: ${error.message}`);
  }
})();

 