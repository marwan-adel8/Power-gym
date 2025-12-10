// Disable all console logs to hide sensitive data
// This will prevent tokens, user data, and other sensitive information
// from appearing in the browser console

console.log = () => {};
console.debug = () => {};
console.info = () => {};
console.warn = () => {};

// Keep console.error for critical debugging
// console.error will still work to catch important errors
