import Cookie from 'js-cookie';
import config from '../config';

export const getMatches = async () => {
  const token = Cookie.get('authToken'); 
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(`${config.apiBaseUrl}/matches`, requestOptions);
  const data = await response.json();
  const matches = data?.data;
  // console.log(matches);
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user matches');
  }

  return matches;
};

export async function getTeamPlayers(teamId: number) {
  console.log("Called once");
  const token = Cookie.get('authToken');
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(`${config.apiBaseUrl}/teams/${teamId}`, requestOptions);
  const data = (await response.json()).data;
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch team players');
  }
      return data;
}
