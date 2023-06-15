const config = {
  baseApi: import.meta.env.VITE_BASE_API,
  basePath: import.meta.env.VITE_BASE_PATH,
  baseSupabases: import.meta.env.VITE_BASE_SUPABASE,
};

const configApiBackend = {
  login: import.meta.env.VITE_LOGIN,
  googleAuth: import.meta.env.VITE_GOOGLEAUTH,
  forgotPassword: import.meta.env.VITE_FORGOTPASSWORD,
  changePassword: import.meta.env.VITE_CHANGE_PASSWORD,
  users: import.meta.env.VITE_USERS,
  refreshAccessToken: import.meta.env.VITE_REFRESH_ACCESS_TOKEN,
  pets: import.meta.env.VITE_PETS,
};

const configJwt = {
  access: import.meta.env.VITE_ACCESS,
  refresh: import.meta.env.VITE_REFRESH,
};

export { config, configApiBackend, configJwt };
