/**
 * Extracts a human-readable error message from an Axios error that originated
 * from the Jeevan Raksha Pharmacy backend.
 *
 * The backend wraps every error in the standard envelope:
 *   { "status": "error", "message": "Supplier with id 99 not found", "data": null }
 *
 * Validation errors (400, @Valid failures) instead put a field -> message map
 * inside "data", e.g.:
 *   { "status": "error", "message": "Validation failed...", "data": { "phone": "Phone must be 10–15 digits" } }
 *
 * This helper normalizes all of these cases (plus network errors / unexpected
 * shapes) into a single readable string, ready to be shown directly to the user.
 */
export function getErrorMessage(error) {
  if (!error) {
    return "Something went wrong. Please try again.";
  }

  // Network error — request never reached the server
  if (!error.response) {
    return "Unable to reach the server. Please check your connection and try again.";
  }

  const body = error.response.data;

  if (body) {
    // Field-level validation errors -> combine into one readable string
    if (body.data && typeof body.data === "object" && !Array.isArray(body.data)) {
      const fieldMessages = Object.entries(body.data)
        .map(([field, message]) => `${field}: ${message}`)
        .join(" | ");

      if (fieldMessages) {
        return fieldMessages;
      }
    }

    if (body.message) {
      return body.message;
    }
  }

  // Fallback to the HTTP status text
  switch (error.response.status) {
    case 401:
      return "Your session has expired. Please log in again.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
}

export default getErrorMessage;
