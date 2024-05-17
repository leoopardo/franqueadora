const envs = {
  API: {
    FRANCHISOR: import.meta.env.VITE_API_FRANCHISOR_URL,
    FRANCHISEE: import.meta.env.VITE_API_FRANCHISEE_URL,
    TERMINAL_EVENT: import.meta.env.VITE_API_TERMINAL_EVENT_URL,
    PORTAL_EVENT: import.meta.env.VITE_API_PORTAL_EVENT_URL,
  },
  COGNITO: {
    AUTH_URL: import.meta.env.VITE_COGNITO_AUTH_URL,
    CLIENT_ID: import.meta.env.VITE_COGNITO_CLIENT_ID,
    USER_POOL_ID: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    AWS_REGION: import.meta.env.VITE_AWS_REGION,
  },
};

export default envs;
