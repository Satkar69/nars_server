const fs = require('fs');
const path = require('path');

// Define file paths
const inputFilePath = path.join(__dirname, 'hospital-raw.json');
const outputFilePath = path.join(__dirname, 'hospital-data.json');

// Read the JSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const hospitalData = JSON.parse(data);

    // Log total records before filtering
    console.log(`Total records before filtering: ${hospitalData.length}`);

    // Function to pick only required keys
    const pickRequiredAttributes = ({
      name,
      amenity,
      longitude,
      latitude,
    }) => ({
      name,
      amenity,
      longitude,
      latitude,
    });

    // Filter hospitals and keep only required attributes
    const hospitals = hospitalData
      .filter((item) => item.amenity === 'hospital')
      .map(pickRequiredAttributes);

    // Log total records after filtering
    console.log(`Total records after filtering: ${hospitals.length}`);

    // Write filtered data to a new JSON file
    fs.writeFile(outputFilePath, JSON.stringify(hospitals, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log(`Filtered data saved as ${outputFilePath}`);
      }
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
