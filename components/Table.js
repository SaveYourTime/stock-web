import './table.less';
import { useState, useEffect } from 'react';
import { Table, Tag, TagGroup, Tooltip, Whisper, Icon } from 'rsuite';
import dayjs from 'dayjs';
import ExpandCell from './ExpandCell';
import { weeks } from '../constants/index';
import FrequencyTable from './FrequencyTable';
import { getColorByPriceChangeRatio } from '../utils';

const { Column, HeaderCell, Cell } = Table;

const renderRowExpanded = (rowData) => {
  const { companyName, name, type, description, capital } = rowData.stock;
  const title = `${companyName ?? name} ${type ? `(${type})` : ''}`;
  return (
    <div>
      <h6>{title}</h6>
      <p>
        {capital && <small>股本：{capital}</small>}
        <br />
        {description}
      </p>
    </div>
  );
};

const renderPriceChangeRatio = (rowData) => {
  const { priceChangeRatio } = rowData;
  const color = getColorByPriceChangeRatio(priceChangeRatio);
  return <span style={{ color }}>{priceChangeRatio}</span>;
};

const renderCategory = (rowData) => {
  const { category, subcategory } = rowData.stock;
  return (
    <>
      <small>{category?.name}</small>
      {category?.name === subcategory?.name ? null : <small>{subcategory?.name}</small>}
    </>
  );
};

const renderFrequency = (rowData) => {
  const dataOfYear = rowData.previous;
  if (!dataOfYear || dataOfYear.length === 0) return null;
  const dataOfLast30Days = rowData.previous?.filter(
    (data) => dayjs().diff(dayjs(data.date), 'd') <= 31,
  );
  const dataOfLast7Days = rowData.previous?.filter(
    (data) => dayjs().diff(dayjs(data.date), 'd') <= 7,
  );
  return (
    <>
      <Whisper
        placement="left"
        trigger={['hover', 'click']}
        speaker={
          <Tooltip>
            <FrequencyTable items={dataOfLast7Days} />
          </Tooltip>
        }
        enterable
      >
        <small>
          {dataOfLast7Days?.length}／<em>週</em>
        </small>
      </Whisper>
      <br />
      <Whisper
        placement="left"
        trigger="hover"
        speaker={
          <Tooltip>
            <FrequencyTable items={dataOfLast30Days} />
          </Tooltip>
        }
        enterable
      >
        <small>
          {dataOfLast30Days?.length}／<em>月</em>
        </small>
      </Whisper>
      <br />
      <Whisper
        placement="left"
        trigger="hover"
        speaker={
          <Tooltip>
            <FrequencyTable items={dataOfYear} />
          </Tooltip>
        }
        enterable
      >
        <small>
          {dataOfYear?.length}／<em>年</em>
        </small>
      </Whisper>
    </>
  );
};

const renderTags = (rowData) => {
  const { distribution } = rowData.stock;
  if (!distribution?.lessThan50) return null;

  let color = null;
  let tips = `(${distribution.date})`;

  if (distribution.lessThan50 >= 30) {
    color = 'green';
    tips = `散戶比例高於30% ${tips}`;
  } else if (distribution.lessThan50 <= 15) {
    color = 'blue';
    tips = `散戶比例低於15% ${tips}`;
  }

  let content = '';

  if (tips) {
    content = (
      <Whisper placement="auto" trigger="hover" speaker={<Tooltip>{tips}</Tooltip>}>
        <Tag color={color}>{distribution.lessThan50}</Tag>
      </Whisper>
    );
  } else {
    content = <Tag color={color}>{distribution.lessThan50}</Tag>;
  }

  return <TagGroup>{content}</TagGroup>;
};

const MyTable = ({ date, data, top = false }) => {
  const [height, setHeight] = useState(600);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const handleExpanded = (rowData) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData['id']) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData['id']);
    }
    setExpandedRowKeys(nextExpandedRowKeys);
  };

  const renderRank = () => {
    if (!top) return null;
    return (
      <Column width={44} align="center">
        <HeaderCell>排名</HeaderCell>
        <Cell dataKey="rank">{(rowData) => rowData.rank}</Cell>
      </Column>
    );
  };

  useEffect(() => {
    setHeight(window.innerHeight - 60 - 56 - 30);
  }, []);

  const week = weeks[new Date(date).getDay()];

  return (
    <div className="table-wrapper">
      <div className="date">
        <Icon icon="calendar" /> {`${date} (${week})`}
      </div>

      <Table
        bordered
        wordWrap
        affixHeader
        rowKey="id"
        className="table"
        height={height}
        loading={false}
        data={data}
        onRowClick={(data) => console.log(data)}
        rowExpandedHeight={120}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={renderRowExpanded}
      >
        <Column width={44} align="center">
          <HeaderCell>#</HeaderCell>
          <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
        </Column>
        {renderRank()}
        <Column width={74}>
          <HeaderCell>代號</HeaderCell>
          <Cell dataKey="number">
            {(rowData) => (
              <a
                href={`https://goodinfo.tw/StockInfo/StockDetail.asp?STOCK_ID=${rowData.stock.number}`}
                target="_blank"
              >
                {rowData.stock.number}
              </a>
            )}
          </Cell>
        </Column>
        <Column>
          <HeaderCell>名稱</HeaderCell>
          <Cell dataKey="name">
            {(rowData) => (
              <a
                href={`https://www.cmoney.tw/follow/channel/stock-${rowData.stock.number}`}
                target="_blank"
              >
                {rowData.stock.name}
              </a>
            )}
          </Cell>
        </Column>
        <Column width={60} align="center">
          <HeaderCell>成交價</HeaderCell>
          <Cell dataKey="closing">{(rowData) => rowData.closingPrice}</Cell>
        </Column>
        <Column width={60} align="center">
          <HeaderCell>最高價</HeaderCell>
          <Cell dataKey="highest">{(rowData) => rowData.highest}</Cell>
        </Column>
        <Column width={60} align="center">
          <HeaderCell>漲跌幅</HeaderCell>
          <Cell dataKey="priceChangeRatio">{renderPriceChangeRatio}</Cell>
        </Column>
        <Column>
          <HeaderCell>產業類別</HeaderCell>
          <Cell dataKey="category" className="category">
            {renderCategory}
          </Cell>
        </Column>
        <Column width={68}>
          <HeaderCell>出現頻率</HeaderCell>
          <Cell dataKey="frequency" align="right">
            {renderFrequency}
          </Cell>
        </Column>
        <Column width={70}>
          <HeaderCell>其他</HeaderCell>
          <Cell dataKey="others">{renderTags}</Cell>
        </Column>
      </Table>
    </div>
  );
};

export default MyTable;
