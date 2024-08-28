const envs = {
  API: {
    FRANCHISOR: import.meta.env.VITE_API_FRANCHISOR_URL,
    FRANCHISEE: import.meta.env.VITE_API_FRANCHISEE_URL,
    REPORTS: import.meta.env.VITE_API_REPORTS_URL,
    TERMINAL_EVENT: import.meta.env.VITE_API_TERMINAL_EVENT_URL,
    PORTAL_EVENT: import.meta.env.VITE_API_PORTAL_EVENT_URL,
  },
  COGNITO: {
    FRANCHISOR: {
      AUTH_URL: import.meta.env.VITE_FRANCHISOR_COGNITO_AUTH_URL,
      CLIENT_ID: import.meta.env.VITE_FRANCHISOR_COGNITO_CLIENT_ID,
      USER_POOL_ID: import.meta.env.VITE_FRANCHISOR_COGNITO_USER_POOL_ID,
      AWS_REGION: import.meta.env.VITE_FRANCHISOR_AWS_REGION,
    },
    FRANCHISE: {
      AUTH_URL: import.meta.env.VITE_FRANCHISE_COGNITO_AUTH_URL,
      CLIENT_ID: import.meta.env.VITE_FRANCHISE_COGNITO_CLIENT_ID,
      USER_POOL_ID: import.meta.env.VITE_FRANCHISE_COGNITO_USER_POOL_ID,
      AWS_REGION: import.meta.env.VITE_FRANCHISE_AWS_REGION,
    },
  },
  S3_IMAGES_URL: import.meta.env.VITE_API_S3_IMAGES_URL,
};

export default envs;
