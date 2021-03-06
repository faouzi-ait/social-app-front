export const TOKEN =
  JSON.parse(localStorage.getItem("AIS_ADMIN_TOKEN")) || "NOT_LOGGED_IN";

export function reloadPage() {
  // 1 - DOM Loading time
  let currentDocumentTimestamp = new Date(
    performance.timing.domLoading
  ).getTime();

  // Current Timestamp
  let now = Date.now();

  // DOM loading time + 10 seconds (Unix Timestamp)
  let tenSec = 10 * 1000;
  let plusTenSec = currentDocumentTimestamp + tenSec;

  if (now > plusTenSec) {
    window.location.reload();
  }
}
