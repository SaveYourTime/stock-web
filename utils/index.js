import { RED, GREEN } from '../styles/colors';

export const getColorByPriceChangeRatio = (priceChangeRatio) => {
  let color = 'inherit';
  if (priceChangeRatio > 0) {
    color = RED;
  } else if (priceChangeRatio < 0) {
    color = GREEN;
  }
  return color;
};
