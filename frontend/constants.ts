export const STATUS_CODE_CREATED = 201;
export const STATUS_CODE_SUCCESS = 200;
export const STATUS_CODE_CONFLICT = 409;
export const STATUS_CODE_BAD_REQUEST = 400;

// BACKEND API
const URI_BACKEND_SERVICE = process.env.URI_BACKEND || "http://localhost:8080";
const PREFIX_BACKEND_SERVICE = "/url";
export const URL_BACKEND_SERVICE = URI_BACKEND_SERVICE + PREFIX_BACKEND_SERVICE;

// FRONTEND
export const URL_FRONTEND_SERVICE =
  process.env.URI_FRONTEND || "http://localhost:3000";
