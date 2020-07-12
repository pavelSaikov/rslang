import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label, Line, LineChart, Tooltip } from 'recharts';

export const SpeakItChart = ({ statistics }) => {
  const chartData = useMemo(
    () =>
      Object.keys(statistics).map(key => ({
        date: key,
        'Количество отвеченных слов': statistics[key],
      })),
    [statistics],
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="date">
          <Label value="Дата" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Количество отвеченных слов', angle: -90, position: 'insideBottomLeft' }} />
        <Tooltip />
        <Line type="monotone" dataKey="Количество отвеченных слов" stroke="#f7974d" fill="#f7e6da" />
      </LineChart>
    </ResponsiveContainer>
  );
};

SpeakItChart.propTypes = {
  statistics: PropTypes.object.isRequired,
};
