import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl;

// DEBUG ONLY
const USER = "samuel.lagarde";

const endpoints = {
  currentWeek: "/schedule/current-week?user=" + USER,
  currentWeekDev: "/schedule/current-week/data",
};

async function getWeek(date) {
  // const endpoint = API_URL + endpoints.currentWeek + "&date=" + date;
  const endpoint = API_URL + endpoints.currentWeekDev;

  console.debug("APIservice.getWeek() called @ " + endpoint);

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.debug("APIservice.getWeek() error: " + error);
    return null;
  }
}

export const APIservice = {
  getWeek,
};
