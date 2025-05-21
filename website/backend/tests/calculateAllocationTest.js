// backend/tests/calculateAllocationTest.js

const calculateAllocations = require('../controllers/allocationController');

// Test Inputs for Test Cases 1 to 15

// Test Case 1 Input
const inputData1 = {
    allocation_amount: 300,
    investor_amounts: [
        { name: "Investor A", requested_amount: 100, average_amount: 100 },
        { name: "Investor B", requested_amount: 50, average_amount: 50 },
        { name: "Investor C", requested_amount: 75, average_amount: 75 }
    ]
};

// Test Case 2 Input
const inputData2 = {
    allocation_amount: 100,
    investor_amounts: [
        { name: "Investor A", requested_amount: 150, average_amount: 100 },
        { name: "Investor B", requested_amount: 50, average_amount: 50 }
    ]
};

// Test Case 3 Input
const inputData3 = {
    allocation_amount: 200,
    investor_amounts: [
        { name: "Investor A", requested_amount: 50, average_amount: 100 },
        { name: "Investor B", requested_amount: 150, average_amount: 100 }
    ]
};

// Test Case 4 Input
const inputData4 = {
    allocation_amount: 100,
    investor_amounts: [
        { name: "Investor A", requested_amount: 0, average_amount: 100 },
        { name: "Investor B", requested_amount: 100, average_amount: 100 }
    ]
};

// Test Case 5 Input
const inputData5 = {
    allocation_amount: 100,
    investor_amounts: [
        { name: "Investor A", requested_amount: 50, average_amount: 0 },
        { name: "Investor B", requested_amount: 50, average_amount: 50 }
    ]
};

// Test Case 6 Input
const inputData6 = {
    allocation_amount: 300,
    investor_amounts: [
        { name: "Investor A", requested_amount: 100, average_amount: 0 },
        { name: "Investor B", requested_amount: 200, average_amount: 0 }
    ]
};

// Test Case 7 Input
const inputData7 = {
    allocation_amount: 90,
    investor_amounts: [
        { name: "Investor A", requested_amount: 60, average_amount: 50 },
        { name: "Investor B", requested_amount: 60, average_amount: 50 }
    ]
};

// Test Case 8 Input
const inputData8 = {
    allocation_amount: 100,
    investor_amounts: [
        { name: "Investor A", requested_amount: 0, average_amount: 0 },
        { name: "Investor B", requested_amount: 0, average_amount: 0 }
    ]
};

// Test Case 9 Input
const inputData9 = {
    allocation_amount: 500,
    investor_amounts: [
        { name: "Investor A", requested_amount: 100, average_amount: 100 },
        { name: "Investor B", requested_amount: 100, average_amount: 100 }
    ]
};

// Test Case 10 Input
const inputData10 = {
    allocation_amount: 1000,
    investor_amounts: [
        { name: "Investor A", requested_amount: 200, average_amount: 100 },
        { name: "Investor B", requested_amount: 300, average_amount: 150 },
        { name: "Investor C", requested_amount: 250, average_amount: 125 },
        { name: "Investor D", requested_amount: 400, average_amount: 200 }
    ]
};

// Test Case 11 Input (Zero Allocation Amount)
const inputData11 = {
    allocation_amount: 0,
    investor_amounts: [
        { name: "Investor A", requested_amount: 100, average_amount: 100 },
        { name: "Investor B", requested_amount: 50, average_amount: 50 }
    ]
};

// Test Case 12 Input
const inputData12 = {
    allocation_amount: 100,
    investor_amounts: [
        { name: "Investor A", requested_amount: 100, average_amount: 95 },
        { name: "Investor B", requested_amount: 2, average_amount: 1 },
        { name: "Investor C", requested_amount: 1, average_amount: 4 }
    ]
};

// Test Case 13 Input
const inputData13 = {
    allocation_amount: 100,
    investor_amounts: [
        { name: "Investor A", requested_amount: 100, average_amount: 95 },
        { name: "Investor B", requested_amount: 1, average_amount: 1 },
        { name: "Investor C", requested_amount: 1, average_amount: 4 }
    ]
};

// Test Case 15 Input
const inputData15 = {
    allocation_amount: 200,
    investor_amounts: [
        { name: "Investor A", requested_amount: 100, average_amount: 100 },
        { name: "Investor B", requested_amount: 25, average_amount: 25 }
    ]
};

// Expected Outputs (Rounded to five decimal places)
const expectedOutputs = [
    { "Investor A": 100, "Investor B": 50, "Investor C": 75 }, // Test Case 1
    { "Investor A": 66.66667, "Investor B": 33.33333 }, // Test Case 2
    { "Investor A": 50, "Investor B": 150 }, // Test Case 3
    { "Investor A": 0, "Investor B": 100 }, // Test Case 4
    { "Investor A": 50, "Investor B": 50 }, // Test Case 5
    { "Investor A": 100, "Investor B": 200 }, // Test Case 6
    { "Investor A": 45, "Investor B": 45 }, // Test Case 7
    { "Investor A": 0, "Investor B": 0 }, // Test Case 8
    { "Investor A": 100, "Investor B": 100 }, // Test Case 9
    { "Investor A": 173.91304, "Investor B": 260.86957, "Investor C": 217.39130, "Investor D": 347.82609 }, // Test Case 10
    { "Investor A": 0, "Investor B": 0 }, // Test Case 11
    { "Investor A": 97.96875, "Investor B": 1.03125, "Investor C": 1 }, // Test Case 12
    { "Investor A": 98, "Investor B": 1, "Investor C": 1 }, // Test Case 13
    { "Investor A": 100, "Investor B": 25 }, // Test Case 15
];

// Array of test cases
const testCases = [
    { input: inputData1, expected: expectedOutputs[0] },
    { input: inputData2, expected: expectedOutputs[1] },
    { input: inputData3, expected: expectedOutputs[2] },
    { input: inputData4, expected: expectedOutputs[3] },
    { input: inputData5, expected: expectedOutputs[4] },
    { input: inputData6, expected: expectedOutputs[5] },
    { input: inputData7, expected: expectedOutputs[6] },
    { input: inputData8, expected: expectedOutputs[7] },
    { input: inputData9, expected: expectedOutputs[8] },
    { input: inputData10, expected: expectedOutputs[9] },
    { input: inputData11, expected: expectedOutputs[10] },
    { input: inputData12, expected: expectedOutputs[11] },
    { input: inputData13, expected: expectedOutputs[12] },
    { input: inputData15, expected: expectedOutputs[13] }
];

// Function to compare outputs
function compareOutputs(actual, expected) {
    const keys = Object.keys(expected);
    for (let key of keys) {
        const actualValue = parseFloat(actual[key].toFixed(5));
        const expectedValue = parseFloat(expected[key].toFixed(5));

        // Use a small epsilon to compare floating point numbers
        const epsilon = 0.000001;
        if (Math.abs(actualValue - expectedValue) > epsilon) {
            return false;
        }
    }
    return true;
}

// Running the test cases
testCases.forEach((testCase, index) => {
    const actualOutput = calculateAllocations(testCase.input);
    const passed = compareOutputs(actualOutput, testCase.expected);
    console.log(`Test Case ${index + 1} Passed: ${passed}`);
    if (!passed) {
        console.log("Expected Output:", testCase.expected);
        console.log("Actual Output:", actualOutput);
    } else {
        console.log("Actual Output:", actualOutput);
    }
    console.log('---');
});