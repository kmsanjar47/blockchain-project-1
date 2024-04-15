const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const Patient = await ethers.getContractFactory("Patient");
  console.log("Deploying Patient contract...");
  const patient = await Patient.deploy();
  await patient.deployed();
  console.log("Patient contract deployed to:", patient.address);

  // Save contract address to a JSON file
  const data = {
    address: patient.address,
  };
  fs.writeFileSync("./artifacts/patient-address.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
