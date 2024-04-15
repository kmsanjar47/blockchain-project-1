import React, { useState } from 'react';

const UpdatePatientForm = ({ updatePatient, provider, contractInstance }) => {
    const [id, setId] = useState('');
    const [vaccineStatus, setVaccineStatus] = useState('');
    const [isDead, setIsDead] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form validation can be added here
        
        // Create a new object representing the patient information
        const patientData = {
            id: parseInt(id), // Convert ID to integer
            vaccineStatus,
            isDead: isDead === 'true', // Convert isDead to boolean
        };

        // Pass patientData to a function responsible for saving the data
        await savePatientData(patientData);

        // Reset form fields after submission
        setId('');
        setVaccineStatus('');
        setIsDead('');
    };

    const savePatientData = async (patientData) => {
        // Check if provider and contractInstance are available
        if (!provider || !contractInstance) {
            console.error('Provider or contract instance not available');
            return;
        }

        try {
            // Get the signer
            const signer = provider.getSigner();

            // Call the contract function to store patient data
            const tx = await contractInstance.storePatientData(
                patientData.id,
                patientData.vaccineStatus,
                patientData.isDead
            );

            // Wait for the transaction to be mined
            await tx.wait();

            console.log('Patient data saved successfully');
        } catch (error) {
            console.error('Error saving patient data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Patient ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <select
                value={vaccineStatus}
                onChange={(e) => setVaccineStatus(e.target.value)}
            >
                <option value="">Select Vaccine Status</option>
                <option value="not_vaccinated">Not Vaccinated</option>
                <option value="one_dose">One Dose</option>
                <option value="two_dose">Two Dose</option>
            </select>
            <select
                value={isDead}
                onChange={(e) => setIsDead(e.target.value)}
            >
                <option value="">Select Death Status</option>
                <option value="true">Dead</option>
                <option value="false">Alive</option>
            </select>
            <button type="submit">Update Patient</button>
        </form>
    );
};

export default UpdatePatientForm;
