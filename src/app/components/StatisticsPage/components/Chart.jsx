import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';

import { longTermStatisticsSelector } from '../store/long-term-statistics/LongTermStatistics.selectors';

export const Chart = () => {
  const longTermStatistics = useSelector(longTermStatisticsSelector);

  const chartData = useMemo(
    () =>
      longTermStatistics.reduce(
        (res, item) => {
          const y = res.sum + item.newWordsCount;
          res.sum += item.newWordsCount;

          const date = new Date(item.date);
          const x = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

          res.data.push({ 'Learned Words': y, Date: x });

          return res;
        },
        { data: [], sum: 0 },
      ).data,
    [longTermStatistics],
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="Date">
          <Label value="Дата" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Количество изученных слов', angle: -90, position: 'insideBottomLeft' }} />
        <Tooltip />
        <Area type="monotone" dataKey="Learned Words" stroke="#f7974d" fill="#f7e6da" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
