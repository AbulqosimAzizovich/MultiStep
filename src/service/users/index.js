import api from "../axios";

const headers = {
  "Content-Type": "application/json",
  verification_system: "email",
};

const useUsersApi = {
  signUp: (data) =>
    api.post("/signup/?verification_system=email", data, { headers }),
};

export default useUsersApi;
