import { UserData } from '@/types/UserData';

const USER_DATA = '@ActionICT:interviews';

function getUserData(): UserData | null {
  const data = localStorage.getItem(USER_DATA);
  return data ? JSON.parse(data) : null;
}

function setUserData(user: UserData) {
  localStorage.setItem(USER_DATA, JSON.stringify(user));
}

function removeUserData() {
  localStorage.removeItem(USER_DATA);
}

const AppStorage = {
  getUserData,
  setUserData,
  removeUserData,
};

export default AppStorage;
