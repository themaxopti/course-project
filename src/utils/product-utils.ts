export function calculatePercentage(max: number, min: number) {
  if (min > max) {
    throw new Error(
      "The smaller number cannot be greater than the larger number."
    );
  }

  return (min / max) * 100;
}

export function calculateValueFromPercentage(
  number: number,
  percentage: number
) {
  if (percentage < 0 || percentage > 100) {
    throw new Error("Percentage must be between 0 and 100.");
  }

  return (percentage / 100) * number;
}

export function makeDiscount(price: number, percentage: number) {
  const percentValue = calculateValueFromPercentage(price, percentage);
  return price - percentValue;
}
