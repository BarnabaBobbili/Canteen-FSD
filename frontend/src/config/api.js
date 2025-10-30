// API Configuration
// This file centralizes the API base URL configuration
// In development: uses localhost
// In production: uses the deployed backend URL from environment variables

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export default API_BASE_URL;
