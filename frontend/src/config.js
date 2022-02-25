export const CONTRACT_ADDRESS = "0x3231A32ed0B2234Ebe88A0b1476B2b00c75BA144";
export const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payPenny",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export const ELECTRICKEEPER_CONTRACT_ADDRESS =
  "0x4d2f20f726Fe14e41b73B4439E399c82F4fB1775";
export const ELECTRICKEEPER_ABI = [
  { anonymous: false, inputs: [], name: "VoltageChange", type: "event" },
  {
    inputs: [
      { internalType: "uint256", name: "ledValue", type: "uint256" },
      { internalType: "uint256", name: "minutesToHaveOn", type: "uint256" },
    ],
    name: "BuyElectricityTimeOn",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    name: "checkUpkeep",
    outputs: [
      { internalType: "bool", name: "upkeepNeeded", type: "bool" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "ledValue", type: "uint256" }],
    name: "OwnerEmergencyDangerOff",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "ledValue", type: "uint256" }],
    name: "OwnerEmergencySafeOn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "OwnerManualExpirationOff",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "expirationOccured",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "LED",
    outputs: [
      { internalType: "uint256", name: "Voltage", type: "uint256" },
      { internalType: "uint256", name: "ExpirationTimeUNIX", type: "uint256" },
      { internalType: "address", name: "LatestBuyer", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

export const BUY_DEMO_EIGHT_MINUTES_CONTRACT_ADDRESS =
  "0xc423F95D49a4CF4B581DFCbDeE910C84aF69EDa1";
export const BUY_DEMO_EIGHT_MINUTES_ABI = [
  { anonymous: false, inputs: [], name: "VoltageChange", type: "event" },
  {
    inputs: [
      { internalType: "uint256", name: "ledValue", type: "uint256" },
      { internalType: "uint256", name: "minutesToHaveOn", type: "uint256" },
    ],
    name: "BuyElectricityTimeOn",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    name: "checkUpkeep",
    outputs: [
      { internalType: "bool", name: "upkeepNeeded", type: "bool" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "ledValue", type: "uint256" }],
    name: "OwnerEmergencyDangerOff",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "ledValue", type: "uint256" }],
    name: "OwnerEmergencySafeOn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "OwnerManualExpirationOff",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "expirationOccured",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "LED",
    outputs: [
      { internalType: "uint256", name: "Voltage", type: "uint256" },
      { internalType: "uint256", name: "ExpirationTimeUNIX", type: "uint256" },
      { internalType: "address", name: "LatestBuyer", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];
