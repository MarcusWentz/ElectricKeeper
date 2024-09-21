// Test in :
// https://functions.chain.link/playground
const apiResponse = await Functions.makeHttpRequest({url: `https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35&lon=-85`});
if (apiResponse.error) {console.error(apiResponse.error);throw Error('Request failed');}
const { data } = apiResponse;
console.log('API response data:');
const electricityRateRaw = (data.outputs.residential);
console.log(electricityRateRaw);
const electricityRateRawIntScaled = Math.round(electricityRateRaw*100);
console.log(electricityRateRawIntScaled);
return Functions.encodeUint256(electricityRateRawIntScaled);
// Format the Function script with the following 
// tool to add quotes for each line for Solidity:
// https://onlinetexttools.com/add-quotes-to-lines

// Try on a single line with no comments:
// "const apiResponse = await Functions.makeHttpRequest({url: `https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35&lon=-85`}); if (apiResponse.error) {console.error(apiResponse.error);throw Error('Request failed');} const { data } = apiResponse; console.log('API response data:'); const electricityRateRaw = (data.outputs.residential); console.log(electricityRateRaw); const electricityRateRawIntScaled = Math.round(electricityRateRaw*100); console.log(electricityRateRawIntScaled); return Functions.encodeUint256(electricityRateRawIntScaled);"