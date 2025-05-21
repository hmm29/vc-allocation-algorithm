// backend/controllers/allocationController.js

/**
 * Function to calculate the final investment amounts for each investor
 * based on the available allocation, their requested amounts,
 * and their historical average investment amounts.
 * 
 * @param {Object} inputData - The input data containing allocation amount and investor details
 * @returns {Object} - An object mapping investor names to their final allocated amounts
 */
function calculateAllocations(inputData) {
    // Destructure the input data
    const allocationAmount = inputData.allocation_amount;
    let remainingAllocation = allocationAmount;
  
    let investors = inputData.investor_amounts.map((investor) => ({
      name: investor.name,
      requestedAmount: investor.requested_amount,
      averageAmount: investor.average_amount,
      finalAmount: 0,
      capped: false,
    }));
  
    // Edge case: If there are no investors
    if (investors.length === 0) {
      return {};
    }
  
    // Edge case: If allocation amount is zero or negative
    if (allocationAmount <= 0) {
      let output = {};
      investors.forEach((inv) => {
        output[inv.name] = 0;
      });
      return output;
    }
  
    // Main allocation logic
    // in most cases this will run once because we iterate over the investors list in each iteration and calculate the allocation based on how much is left, then next iteration loop broken out of
    while (remainingAllocation > 0) {
      // iterate over investors again
      let investorsNeedingAllocation = investors.filter((inv) => !inv.capped && inv.requestedAmount > 0);
  
      if (investorsNeedingAllocation.length === 0) {
        break;
      }
  
      // iterate over investors again O(n) worst case if all investors need allocation
      let totalAverageAmount = investorsNeedingAllocation.reduce((sum, inv) => sum + inv.averageAmount, 0);
  
      if (totalAverageAmount === 0) {
        let equalShare = remainingAllocation / investorsNeedingAllocation.length;
  
        // iterate over again
        investorsNeedingAllocation.forEach((inv) => {
          let allocationNeeded = inv.requestedAmount - inv.finalAmount;
          let allocation = Math.min(equalShare, allocationNeeded);
  
          inv.finalAmount += allocation;
          remainingAllocation -= allocation;
  
          if (inv.finalAmount >= inv.requestedAmount) {
            inv.capped = true;
          }
        });
      } else {
        // well keep track of total allocated when we iterate through the investors needing allocation
        let totalAllocatedThisRound = 0;
  
        // for each to iterate across all of them
        investorsNeedingAllocation.forEach((inv) => {
          let allocationNeeded = inv.requestedAmount - inv.finalAmount;
          let allocation = remainingAllocation * (inv.averageAmount / totalAverageAmount);
          allocation = Math.min(allocationNeeded, allocation);
  
          inv.finalAmount += allocation;
          totalAllocatedThisRound += allocation;
  
          if (inv.finalAmount >= inv.requestedAmount) {
            inv.capped = true;
          }
        });
  
        // update the total remaining allocation after weve gone trhough all the investors needing allocation
        remainingAllocation -= totalAllocatedThisRound;
  
        // if theres nothing else being allocated then break out of the while loop
        if (totalAllocatedThisRound === 0) {
          break;
        }
      }
    }
  
    // create output object
    // iterate over one more time to add to output object, then return it.
    let output = {};
    investors.forEach((inv) => {
      output[inv.name] = parseFloat(inv.finalAmount.toFixed(5));
    });
  
    return output;
  }
  
  module.exports = calculateAllocations;