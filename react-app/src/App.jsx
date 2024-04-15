import React, { useState, useEffect } from "react";
// import Web3 from 'web3';
import "./App.css";
import { ethers } from "ethers";
import Web3 from "web3";
import PatientManagement from "../src/Patient.json";
import { ContractABI, contractAddress } from "./Constant/constant.js";
import Login from "./Components/login.jsx";
import Connected from "./Components/Connected.jsx";
import AddPatientForm from "./Components/AddPatientForm.jsx";
import UpdatePatientForm from "./Components/UpdatePatientForm.jsx";
import CovidTrendTable from "./Components/CovidTrendTable.jsx";
import VaccineCertificate from "./Components/VaccineCertificate.jsx";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [averageDeathRate, setAverageDeathRate] = useState(null);
  const [districtWithHighestPatients, setDistrictWithHighestPatients] =
    useState("");
  const [signer, setSigner] = useState(null);
  const [medianAge, setMedianAge] = useState(null);
  const [ageGroupPercentage, setAgeGroupPercentage] = useState({
    children: 0,
    teenagers: 0,
    youth: 0,
    elderly: 0,
  });

  useEffect(() => {
    // Fetch contract
    // async function fetchContract() {
    //   // const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   // const signer = await provider.getSigner();
    //   const contract = new ethers.Contract(
    //     contractAddress,
    //     ContractABI,
    //     provider
    //   );
    //   setSigner(signer);
    //   setProvider(provider);
    //   setContract(contract);
    //   // const web3 = new Web3(window.ethereum);
    // }
    // fetchContract();
  }, [account]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  // function handleAccountsChanged(accounts) {
  //   if (accounts.length > 0 && account !== accounts[0]) {
  //     setAccount(accounts[0]);
  //   } else {
  //     setIsConnected(false);
  //     setAccount(null);
  //   }
  // }

  function handleAccountsChanged(accounts) {
    if (accounts && accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  // async function getCurrentStatus() {
  //   if (!contract) return;

  //   // Fetch and update statistical outputs
  //   const avgDeathRate = await contract.calculateAverageDeathRate();
  //   setAverageDeathRate(avgDeathRate);

  //   const districtHighestPatients =
  //     await contract.findDistrictWithHighestCovidPatient();
  //   setDistrictWithHighestPatients(districtHighestPatients);

  //   // Fetch median age
  //   const medianAge = await contract.calculateMedianAge("DistrictName"); // Pass district name here
  //   setMedianAge(medianAge);

  //   // Fetch age group percentage
  //   const ageGroupPercentage = await contract.calculateAgeGroupPercentage();
  //   setAgeGroupPercentage(ageGroupPercentage);
  // }

  // async function addPatient(formData) {
  //   if (!contract) return;

  //   try {
  //     // Call the contract function to add patient
  //     await contract
  //       .connect(signer)
  //       .storePatientData(
  //         formData.age,
  //         formData.gender,
  //         formData.district,
  //         formData.symptomsDetails
  //       );

  //     console.log("Patient added successfully");
  //   } catch (error) {
  //     console.error("Error adding patient:", error);
  //   }
  // }

  // async function updatePatient(formData) {
  //   if (!contract) return;

  //   try {
  //     // Call the contract function to update patient
  //     await contract
  //       .connect(signer)
  //       .updatePatientData(
  //         formData.id,
  //         formData.age,
  //         formData.gender,
  //         formData.vaccineStatus,
  //         formData.district,
  //         formData.symptomsDetails,
  //         formData.isDead,
  //         formData.owner,
  //         formData.role
  //       );

  //     console.log("Patient updated successfully");
  //   } catch (error) {
  //     console.error("Error updating patient:", error);
  //   }
  // }

  // async function generateCertificate(patientId) {
  //   if (!contract) return;

  //   try {
  //     // Call the contract function to generate certificate
  //     const certificate = await contract.generateVaccineCertificate(patientId);
  //     console.log("Vaccine certificate generated:", certificate);
  //   } catch (error) {
  //     console.error("Error generating certificate:", error);
  //   }
  // }

  // async function connectToMetamask() {
  //   if (window.ethereum) {
  //     try {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       setProvider(provider);
  //       await provider.send("eth_requestAccounts", []);
  //       const signer = provider.getSigner();
  //       const address = await signer.getAddress();
  //       setAccount(address);
  //       setSigner(signer);
  //       setIsConnected(true);
  //       console.log("Metamask connected:", address);
  //     } catch (error) {
  //       console.error("Error connecting to Metamask:", error);
  //     }
  //   } else {
  //     console.error("Metamask not found");
  //   }
  // }

  ////////////////////////////////// WEB3 ////////////////////////////////

  // Contract address
  const contractAddress = "0x5A7C6f054B379681A88db56B8418275342E76B31"; // Update with your contract address

  // Create contract instance
  let web3;
  async function connectMetamask() {
    web3 = new Web3(window.ethereum);

    if (window.ethereum) {
      return new Promise((resolve, reject) => {
        web3.eth.requestAccounts().then((accounts) => {
          console.log("Metamask connected successfully");
          console.log(accounts);
          resolve(accounts[0]);
          let temp_contract = new web3.eth.Contract(
            PatientManagement.abi,
            contractAddress
          );
          setContract(temp_contract);
          setIsConnected(true);
          setAccount(accounts[0]);
        });
      });
    } else {
      Promise.reject("Install Metamask");
    }
  }
  //// Methods to interact with the contract ////
  async function getCurrentStatus() {
    if (!contract) return;

    // Fetch and update statistical outputs
    const avgDeathRate = await contract.methods
      .calculateAverageDeathRate()
      .call();
    setAverageDeathRate(avgDeathRate);

    const districtHighestPatients = await contract.methods
      .findDistrictWithHighestCovidPatient()
      .call();
    setDistrictWithHighestPatients(districtHighestPatients);

    // Fetch median age
    const medianAge = await contract.methods
      .calculateMedianAge("DistrictName")
      .call(); // Pass district name here
    setMedianAge(medianAge);

    // Fetch age group percentage
    const ageGroupPercentage = await contract.methods
      .calculateAgeGroupPercentage()
      .call();
    setAgeGroupPercentage(ageGroupPercentage);
  }

  async function addPatient(formData) {
    if (!contract) return;

    try {
      // Call the contract function to add patient
      await contract.methods
        .storePatientData(
          formData.age,
          formData.gender,
          formData.district,
          formData.symptoms
        )
        .send({ from: account });

      console.log("Patient added successfully");
      await getCurrentStatus();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  }

  async function updatePatient(formData) {
    if (!contract) return;

    try {
      // Call the contract function to update patient
      await contract.methods
        .updatePatientData(
          formData.id,
          formData.age,
          formData.gender,
          formData.vaccineStatus,
          formData.district,
          formData.symptomsDetails,
          formData.isDead,
          formData.owner,
          formData.role
        )
        .send({ from: account });

      console.log("Patient updated successfully");
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  }

  async function generateCertificate(patientId) {
    if (!contract) return;

    try {
      // Call the contract function to generate certificate
      const certificate = await contract.methods
        .generateVaccineCertificate(patientId)
        .call();
      console.log("Vaccine certificate generated:", certificate);
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  }

  return (
    <div className="App">
      {isConnected ? (
        <Connected account={account} />
      ) : (
        <Login connectWallet={connectMetamask} />
      )}

      <AddPatientForm addPatient={addPatient} />

      <UpdatePatientForm updatePatient={updatePatient} />

      <CovidTrendTable
        averageDeathRate={averageDeathRate}
        districtWithHighestPatients={districtWithHighestPatients}
        medianAge={medianAge}
        ageGroupPercentage={ageGroupPercentage}
      />

      <VaccineCertificate generateCertificate={generateCertificate} />
    </div>
  );
}

export default App;
