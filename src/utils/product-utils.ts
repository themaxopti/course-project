export function calculatePercentage(max, min) {
  if (min > max) {
    throw new Error("Младшее число не может быть больше старшего числа.");
  }

  const percentage = (min / max) * 100;

  return percentage;
}

export function calculateValueFromPercentage(number, percentage) {
  if (percentage < 0 || percentage > 100) {
    throw new Error("Процент должен быть в диапазоне от 0 до 100.");
  }

  const value = (percentage / 100) * number;

  return value;
}

export function makeDiscount(price, percentage) {
  const procentValue = calculateValueFromPercentage(price, percentage);
  return price - procentValue;
}
