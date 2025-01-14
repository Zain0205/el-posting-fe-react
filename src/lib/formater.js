export const formatTimeAgo = (timestamp) => {
  // Pastikan timestamp dalam format yang benar
  const now = new Date();
  const timestampDate = new Date(timestamp.replace(" ", "T")); // Convert to ISO format

  // Validasi untuk menangani invalid date
  if (isNaN(timestampDate.getTime())) {
    return "just now";
  }

  const timeDifference = Math.floor((now - timestampDate) / 1000); // Time difference in seconds

  // Handle kasus waktu di masa depan atau perbedaan sangat kecil
  if (Math.abs(timeDifference) < 5) {
    return "just now";
  }

  // Handle kasus waktu di masa depan
  if (timeDifference < 0) {
    return "just now";
  }

  if (timeDifference < 60) {
    return `${timeDifference} second${timeDifference !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 604800) {
    const days = Math.floor(timeDifference / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 2419200) {
    const weeks = Math.floor(timeDifference / 604800);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 29030400) {
    const months = Math.floor(timeDifference / 2419200);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDifference / 29030400);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};

export function getHourFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toTimeString().split(":")[0] + ":" + date.toTimeString().split(":")[1];
}
