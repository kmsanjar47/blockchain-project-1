import React from 'react';

const CovidTrendTable = ({ averageDeathRate, districtWithHighestPatients, medianAge, ageGroupPercentage }) => {
    return (
        <div>
            <h2>Covid Trend Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Average Death Rate per Day</td>
                        <td>{averageDeathRate}</td>
                    </tr>
                    <tr>
                        <td>District with Highest Covid Patients</td>
                        <td>{districtWithHighestPatients}</td>
                    </tr>
                    <tr>
                        <td>Median Age of Covid Patients</td>
                        <td>{medianAge}</td>
                    </tr>
                    <tr>
                        <td>Percentage of Patients by Age Group</td>
                        <td>
                            <ul>
                                <li>Children: {ageGroupPercentage.children}%</li>
                                <li>Teenagers: {ageGroupPercentage.teenagers}%</li>
                                <li>Youth: {ageGroupPercentage.youth}%</li>
                                <li>Elderly: {ageGroupPercentage.elderly}%</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CovidTrendTable;
