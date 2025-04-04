export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}

export class ValidationError extends RequestError {
  constructor(fieldErrors: Record<string, string[]>) {
    // Input: fieldErrors = {
    //   name: ["Name is required"],
    //   username: ["Username must be at least 3 characters long."],
    //   email: ["Email is required"],
    //   password: ["Password must be at least 6 characters long."]
    // }

    // Call the static method `formatFieldErrors` to convert `fieldErrors` into a single string.
    const message = ValidationError.formatFieldErrors(fieldErrors);

    // Output from `formatFieldErrors`:
    // "Name is required, Username must be at least 3 characters long, Email is required, Password must be at least 6 characters long"

    // Call the parent `RequestError` constructor:
    // 400 (HTTP status code), formatted message, and original fieldErrors
    super(400, message, fieldErrors);

    // Set the error name to "ValidationError"
    this.name = "ValidationError";

    // Store the original field errors for additional debugging or API responses
    this.errors = fieldErrors;
  }

  static formatFieldErrors(errors: Record<string, string[]>): string {
    // Input: errors = {
    //   name: ["Name is required"],
    //   username: ["Username must be at least 3 characters long."],
    //   email: ["Email is required"],
    //   password: ["Password must be at least 6 characters long."]
    // }

    // Use `Object.entries` to iterate over each key-value pair in the errors object.
    const formattedMessages = Object.entries(errors).map(
      ([field, messages]) => {
        // `field`: the key (e.g., "name", "username")
        // `messages`: an array of error messages (e.g., ["Name is required"])

        // Capitalize the first letter of the field name
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

        // Check if the first message is "Required"
        if (messages[0] === "Required") {
          // If yes, return a simple "{FieldName} is required"
          return `${fieldName} is required`;
        } else {
          // Otherwise, join all messages with " and "
          return messages.join(" and ");
        }
      }
    );

    // Output from `.map`:
    // [
    //   "Name is required",
    //   "Username must be at least 3 characters long",
    //   "Email is required",
    //   "Password must be at least 6 characters long"
    // ]

    // Combine all messages into a single string, separated by ", "
    return formattedMessages.join(", ");

    // Final Output:
    // "Name is required, Username must be at least 3 characters long, Email is required, Password must be at least 6 characters long"
  }
}

export class NotFoundError extends RequestError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string = "Forbidden") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}
