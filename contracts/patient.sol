// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Patient {
    address public ownerAddress = msg.sender;

    uint private initialPatientID = 0;

    struct PatientInfo {
        uint id;
        address ethereumAddress;
        uint age;
        Gender gender;
        VaccineStatus vaccine_status;
        string district;
        string symptoms_details;
        bool is_dead;
        address owner;
        Role role;
    }

    PatientInfo[] public patientList;
    mapping(address => uint) isAdmin;
    mapping(string => uint) districtPatientsCount;

    enum Gender {
        Male,
        Female,
        Other
    }

    enum VaccineStatus {
        not_vaccinated,
        one_dose,
        two_dose
    }

    enum Role {
        admin,
        patient
    }

    constructor() {
        isAdmin[msg.sender] = 1;
        patientList.push(
            PatientInfo(
                1,
                msg.sender,
                25,
                Gender.Male,
                VaccineStatus.not_vaccinated,
                "admin",
                "admin",
                false,
                msg.sender,
                Role.admin
            )
        );
    }

    // Store patient data 
    function storePatientData(
        uint256 _age,
        uint256 _gender, 
        string memory _district,
        string memory _symptoms_details
    ) public {
        require(_gender >= 0 && _gender <= 2, "Invalid gender");

        PatientInfo memory temporaryPatient = PatientInfo(
            initialPatientID + 1,
            msg.sender,
            _age,
            Gender(_gender),
            VaccineStatus.not_vaccinated,
            _district,
            _symptoms_details,
            false,
            msg.sender,
            Role.patient
        );

        patientList.push(temporaryPatient);
        initialPatientID++;

        districtPatientsCount[_district]++;
    }

    modifier onlyAdminAccess() {
        require(
            isAdmin[msg.sender] == 1,
            "Only admin can access this function"
        );
        _;
    }

    function updateVaccineStatus(
        uint _id,
        VaccineStatus _vaccineStatus
    ) public onlyAdminAccess {
        require(_id < patientList.length, "Patient ID does not exist");
        patientList[_id].vaccine_status = _vaccineStatus;
    }

    function updateDeadStatus(
        uint _patientID, 
        bool _deadStatus
    ) public onlyAdminAccess {
        require(_patientID < patientList.length, "Patient ID does not exist");
        patientList[_patientID].is_dead = _deadStatus;
    }
    
    function updatePatientSymptoms(
        uint _patientID, 
        string memory _symptoms
    ) public onlyAdminAccess {
        require(_patientID < patientList.length, "Patient ID does not exist");
        patientList[_patientID].symptoms_details = _symptoms;
    }

    function updatePatientDistrict(
        uint _patientID, 
        string memory _district
    ) public onlyAdminAccess {
        require(_patientID < patientList.length, "Patient ID does not exist");
        patientList[_patientID].district = _district;
    }

    function updatePatientAge(
        uint _patientID, 
        uint _age
    ) public onlyAdminAccess {
        require(_patientID < patientList.length, "Patient ID does not exist");
        patientList[_patientID].age = _age;
    }

    // Function to calculate average death rate per day combined all the districts
    function calculateAverageDeathRate() public view returns (uint) {
        uint totalDeadPatients = 0;
        for (uint i = 0; i < patientList.length; i++) {
            if (patientList[i].is_dead) {
                totalDeadPatients++;
            }
        }
        return totalDeadPatients / patientList.length;
    }

    // Function to find the district with the highest number of covid patients
    function findDistrictWithHighestCovidPatient() public view returns (string memory) {
        string memory districtWithHighestPatients;
        uint highestPatientCount = 0;
        
        for (uint i = 0; i < patientList.length; i++) {
            if (districtPatientsCount[patientList[i].district] > highestPatientCount) {
                highestPatientCount = districtPatientsCount[patientList[i].district];
                districtWithHighestPatients = patientList[i].district;
            }
        }
        return districtWithHighestPatients;
    }

    // Function to calculate the median age of covid patients in each district
    function calculateMedianAge(string memory _district) public view returns (uint) {
        uint[] memory ages = new uint[](patientList.length);
        uint count = 0;
        for (uint i = 0; i < patientList.length; i++) {
            if (keccak256(abi.encodePacked(patientList[i].district)) == keccak256(abi.encodePacked(_district))) {
                ages[count++] = patientList[i].age;
            }
        }
        if (count == 0) {
            return 0; // No patients in the district
        }
        // Sort the ages array
        sort(ages, count);
        
        uint middle = count / 2;
        if (count % 2 == 1) {
            return ages[middle];
        } else {
            return (ages[middle - 1] + ages[middle]) / 2;
        }
    }

    // Function to sort an array in ascending order (using bubble sort)
    function sort(uint[] memory data, uint length) private pure {
        for (uint i = 0; i < length - 1; i++) {
            for (uint j = 0; j < length - i - 1; j++) {
                if (data[j] > data[j + 1]) {
                    (data[j], data[j + 1]) = (data[j + 1], data[j]); // Swap elements
                }
            }
        }
    }

    // Function to calculate the percentage of Children, Teenage, Young and Elder patients
    function calculateAgeGroupPercentage() public view returns (uint, uint, uint, uint) {
        uint childrenCount;
        uint teenageCount;
        uint youngCount;
        uint elderCount;
        
        for (uint i = 0; i < patientList.length; i++) {
            if (patientList[i].age < 13) {
                childrenCount++;
            } else if (patientList[i].age >= 13 && patientList[i].age < 20) {
                teenageCount++;
            } else if (patientList[i].age >= 20 && patientList[i].age < 50) {
                youngCount++;
            } else {
                elderCount++;
            }
        }
        
        uint totalPatients = patientList.length;
        
        uint childrenPercentage = (childrenCount * 100) / totalPatients;
        uint teenagePercentage = (teenageCount * 100) / totalPatients;
        uint youngPercentage = (youngCount * 100) / totalPatients;
        uint elderPercentage = (elderCount * 100) / totalPatients;
        
        return (childrenPercentage, teenagePercentage, youngPercentage, elderPercentage);
    }

    // Function to generate a vaccine certificate for patients who received two doses
    function generateVaccineCertificate(uint _id) public view returns (string memory) {
        require(patientList[_id].vaccine_status == VaccineStatus.two_dose, "Patient has not received two doses yet");
        
        string memory certificate = "This is to certify that patient with ID ";
        certificate = string(abi.encodePacked(certificate, uintToString(patientList[_id].id)));
        certificate = string(abi.encodePacked(certificate, " has been fully vaccinated with two doses."));
        return certificate;
    }

    // Helper function to convert uint to string
    function uintToString(uint v) internal pure returns (string memory) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i); // i + 1 is inefficient, just do i
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - j - 1]; // to avoid the off-by-one error
        }
        string memory str = string(s); // memory isn't implicitly convertible to storage
        return str;
    }

    // Function to update the death rate automatically
    function updateDeathRateAutomatically(uint _id, bool _isDead) public onlyAdminAccess {
        patientList[_id].is_dead = _isDead;
    }
}
