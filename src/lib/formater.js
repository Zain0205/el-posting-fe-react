export const formatTimeAgo = (timestamp) => {

  const now = Date.now();
  const timeDifference = Math.floor((now - new Date(timestamp)) / 1000); // Time difference in seconds

  if (timeDifference < 60) {
    return `${timeDifference} second${timeDifference !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 604800) { // Less than a week
    const days = Math.floor(timeDifference / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 2419200) { // Less than a month (~28 days)
    const weeks = Math.floor(timeDifference / 604800);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 29030400) { // Less than a year (~12 months)
    const months = Math.floor(timeDifference / 2419200);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDifference / 29030400); // ~12 months in a year
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};

export function getHourFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toTimeString().split(':')[0] + ':' + date.toTimeString().split(':')[1];
}



