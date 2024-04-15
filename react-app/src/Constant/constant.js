// constant.js

const contractAddress = "0x590853E16B09F636a83D9f11a7766151B4e54C61";

const ContractABI = [
  // Contract ABI definitions
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "calculateAgeGroupPercentage",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "calculateAverageDeathRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_district",
        "type": "string"
      }
    ],
    "name": "calculateMedianAge",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "findDistrictWithHighestCovidPatient",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "generateVaccineCertificate",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ownerAddress",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "patientList",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "enum Patient.Gender",
        "name": "gender",
        "type": "uint8"
      },
      {
        "internalType": "enum Patient.VaccineStatus",
        "name": "vaccine_status",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "district",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symptoms_details",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "is_dead",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "enum Patient.Role",
        "name": "role",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_gender",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_district",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symptoms_details",
        "type": "string"
      }
    ],
    "name": "storePatientData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientID",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_deadStatus",
        "type": "bool"
      }
    ],
    "name": "updateDeadStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_isDead",
        "type": "bool"
      }
    ],
    "name": "updateDeathRateAutomatically",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      }
    ],
    "name": "updatePatientAge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_district",
        "type": "string"
      }
    ],
    "name": "updatePatientDistrict",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_symptoms",
        "type": "string"
      }
    ],
    "name": "updatePatientSymptoms",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "enum Patient.VaccineStatus",
        "name": "_vaccineStatus",
        "type": "uint8"
      }
    ],
    "name": "updateVaccineStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export { contractAddress, ContractABI };
