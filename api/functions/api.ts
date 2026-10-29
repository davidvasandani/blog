// Vercel Function behind /api/* (rewritten in vercel.json). Serves the same
// Express app as the Netlify function; Express routes on the original URL.
import { api } from "../../netlify/functions/api";

export default api;
