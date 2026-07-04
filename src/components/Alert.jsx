/**
 * Reusable inline message banner.
 *
 * <Alert type="error" message="Supplier with id 99 not found" />
 * <Alert type="success" message="Medicine added successfully" />
 */
function Alert({ type = "error", message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>

      {onClose && (
        <button
          type="button"
          className="alert-close"
          onClick={onClose}
          aria-label="Dismiss message"
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default Alert;
