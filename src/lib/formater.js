export const formatTimeAgo = (timestamp) => {
  // Handle invalid or undefined input
  if (!timestamp) {
    return "just now";
  }

  const now = new Date();
  let timestampDate;

  try {
    // First try parsing the timestamp directly
    timestampDate = new Date(timestamp);
    
    // If that fails, try converting space to T for ISO format
    if (isNaN(timestampDate.getTime()) && typeof timestamp === 'string') {
      timestampDate = new Date(timestamp.replace(" ", "T"));
    }
    
    // If still invalid, return early
    if (isNaN(timestampDate.getTime())) {
      return "just now";
    }
  } catch (error) {
    return "just now";
  }

  const timeDifference = Math.floor((now - timestampDate) / 1000); // Time difference in seconds

  // Handle very recent or future timestamps
  if (Math.abs(timeDifference) < 5 || timeDifference < 0) {
    return "just now";
  }

  const intervals = [
    { seconds: 29030400, label: 'year' },
    { seconds: 2419200, label: 'month' },
    { seconds: 604800, label: 'week' },
    { seconds: 86400, label: 'day' },
    { seconds: 3600, label: 'hour' },
    { seconds: 60, label: 'minute' },
    { seconds: 1, label: 'second' }
  ];

  for (let interval of intervals) {
    const count = Math.floor(timeDifference / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return "just now";
};

export function getHourFromTimestamp(timestamp) {
  if (!timestamp) return "";
  
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch (error) {
    return "";
  }
}