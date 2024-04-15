var PatientManagement = artifacts.require("./patient.sol");

module.exports = function(deployer) {
    deployer.deploy(PatientManagement);
};