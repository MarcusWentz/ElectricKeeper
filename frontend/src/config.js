

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


export const ELECTRICKEEPER_CONTRACT_ADDRESS = "0x097C8609a052E99746D6C836f459dBbbA2DFB52F"
export const ELECTRICKEEPER_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "VoltageChange",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ledValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minutesToHaveOn",
				"type": "uint256"
			}
		],
		"name": "BuyElectricityTimeOn",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "LED",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Voltage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ExpirationTimeUNIX",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "LatestBuyer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TurnOffElectricity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "checkUpkeep",
		"outputs": [
			{
				"internalType": "bool",
				"name": "upkeepNeeded",
				"type": "bool"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "expirationOccured",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "performUpkeep",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]