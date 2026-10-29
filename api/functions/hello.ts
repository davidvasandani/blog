// Vercel Function behind /hello (rewritten in vercel.json), matching
// netlify/functions/hello for every method.
export default {
  fetch() {
    return new Response("Hello, world!");
  },
};
