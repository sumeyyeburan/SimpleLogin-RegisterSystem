/*
  Validates password complexity.
  Rules:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one digit
  - At least one special character (!@#$%^&*_)
  
  @param password - Password string to validate
  @returns true if password matches criteria, false otherwise
 */

export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/;
  return regex.test(password);
}

/*
  Validates email format with basic regex.
  
  @param email - Email string to validate
  @returns true if email is valid format, false otherwise
*/

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};
