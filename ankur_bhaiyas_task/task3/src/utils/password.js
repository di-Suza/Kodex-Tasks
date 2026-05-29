
import bcrypt from "bcrypt";


const generateHash = async (plainText) => {
  try {
    // Throw error if password/otp is empty
    if (!plainText) {
      throw new Error("Input text is required for hashing");
    }

    const saltRounds = 10; // Industry standard for security vs performance

    // Generate salt and hash together
    const hashedValue = await bcrypt.hash(`${plainText}`, saltRounds);

    return hashedValue;
  } catch (error) {
    console.error("Error in generateHash utility:", error.message);
    throw error; // Pass error to the controller
  }
};

const compareHash = async (plainText, hashedValue) => {
  try {
    // Edge case: Input validation
    if (!plainText || !hashedValue) {
      throw new Error("Both plain text and hash are required for comparison");
    }

    // bcrypt.compare checks salt rounds and hash pattern internally
    const isMatch = await bcrypt.compare(`${plainText}`, hashedValue);

    return isMatch;
  } catch (error) {
    console.error("Error in compareHash utility:", error.message);
    // Return false on comparison failure to avoid exposing exact errors
    return false; 
  }
};

export { generateHash, compareHash };
