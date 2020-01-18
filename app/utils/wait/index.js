export function WaitForTime(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
