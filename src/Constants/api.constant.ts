const isProduction = process.env.NODE_ENV === "production";

export const DOMAIN_URL = "https://chat-full-stack-production.up.railway.app";
export const BASE_URL = `${
  isProduction ? DOMAIN_URL : "http://localhost:8000/api/v1/admin"
}`;
