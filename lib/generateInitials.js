// export function generateInitials(fullName) {
//   // Split the full name into an array of words
//   const words = fullName.split(/\s+/);
//   // Get the first letter of each word and join them
//   const initials = words.map((word) => word.charAt(0)).join('');
//   // Ensure the initials are in uppercase
//   return initials.toUpperCase();
// }
export function generateInitials(fullName) {
  // Handle undefined, null, or non-string inputs
  if (!fullName || typeof fullName !== 'string') {
    return ''; // Return empty string for safety
  }
  
  // Split the full name into an array of words
  const words = fullName.split(/\s+/);
  // Filter out empty words and get the first letter of each word, then join them
  const initials = words
    .filter(word => word.length > 0)
    .map((word) => word.charAt(0))
    .join('');
  // Ensure the initials are in uppercase
  return initials.toUpperCase();
}

// Example usage:
// const fullName = "Md Abdussamad";
// const initials = generateInitials(fullName);
// console.log(initials); // Output: "MA"