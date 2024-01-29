// apiFetcher.js

async function fetchAirportsData(projectID) {
  try {
    const apiUrl = "https://academics.newtonschool.co/api/v1/bookingportals/airport";
    const headers = {
      "projectID": projectID,
    };

    const response = await fetch(apiUrl, { headers });
    const data = await response.json();

    if (data.status === "success") {
      const formattedData = data.data.airports.map(airport => ({
        "IATA_code": airport.iata_code,
        "ICAO_code": airport.icao_code,
        "airport_name": airport.name,
        "city_name": airport.city,
      }));

      return formattedData;
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default fetchAirportsData;
