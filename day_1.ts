//import fs from 'fs';
import * as path from 'path';
import * as fs  from 'fs';
import { parse } from "csv-parse";

// Get the current working directory and join it with the relative path to the file
const filePath = path.join(process.cwd(), 'assets', 'files', 'day_1.txt');
let readFileAndParse = async (filePath: string): Promise<number[][]> => {
    try {
        // Asynchronously read the file content
        const fileData = await fs.readFileSync(filePath, 'utf-8');

        // Split the file data into lines
        const lines = fileData.trim().split('\r\n');

        // Split each line by space and convert the strings to numbers
        const records = lines.map(line => line.split(/\s+/).map(Number));

        return records;
    } catch (error) {
        throw error; // Handle the error if needed
    }
};


let calculateDataFromFile = async (path: string)  => {
    let input = await readFileAndParse(path); 
    let left: number[] = [];
    let right: number[] = [];

    // Separate the input into left and right lists
    input.forEach(([x, y]) => {
        left.push(x);
        right.push(y);
    });

    // Log the raw left and right lists for debugging
    console.log(`Raw Left List: ${left}`);
    console.log(`Raw Right List: ${right}`);

    // Sort both lists in ascending order
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    // Log the sorted lists for debugging
    console.log(`Sorted Left List: ${left}`);
    console.log(`Sorted Right List: ${right}`);

    // Validate arrays before calculation
    if (left.length !== right.length) {
        console.error("Error: Left and Right lists have different lengths.");
        return;
    }

    let totalDistance = 0;

    // Calculate the total distance
    for (let i = 0; i < left.length; i++) {
        const leftValue = left[i];
        const rightValue = right[i];

        // Ensure both values are valid numbers
        if (isNaN(leftValue) || isNaN(rightValue)) {
            console.error(`Error: Invalid value at index ${i}: left=${leftValue}, right=${rightValue}`);
            continue;
        }

        const distance = Math.abs(leftValue - rightValue);
        console.log(`Pair: (${leftValue}, ${rightValue}), Distance: ${distance}`);
        totalDistance += distance;
    }

    console.log(`Total Distance: ${totalDistance}`);


}

calculateDataFromFile(filePath);
