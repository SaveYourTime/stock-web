import './frequencyTable.less';
import { getColorByPriceChangeRatio } from '../utils';

const FrequencyTable = React.memo(({ items }) => (
  <table className="frequency-table">
    <thead>
      <tr>
        <th>交易日</th>
        <th>最高價</th>
        <th>收盤價</th>
        <th>漲跌幅</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => {
        const color = getColorByPriceChangeRatio(item.priceChangeRatio);
        return (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td style={{ width: 60 }}>{item.highest}</td>
            <td style={{ color, width: 60 }}>{item.closingPrice}</td>
            <td style={{ color }}>{item.priceChangeRatio}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
));
export default FrequencyTable;
