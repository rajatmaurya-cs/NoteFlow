import React, { useContext, useEffect, useState } from 'react';
import ReactECharts from "echarts-for-react";
import { ToggleTheme } from './AuthProvider';

const Activity = () => {

  const { Theme } = useContext(ToggleTheme);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [words, setWords] = useState([]);
  const [pie, setPie] = useState([]);

  function getLast7DaysNotes(notes) {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    return notes?.filter(note => {
      const noteDate = new Date(note.date);
      return noteDate >= sevenDaysAgo && noteDate <= today;
    });
  }

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('myData')) || [];
    const result = getLast7DaysNotes(notes);

    setFilteredNotes(result?.map((item) => item.date) || []);
    setWords(result?.map((item) => item.description.length) || []);

    const freqObj = {};
    for (let item of result) {
      freqObj[item.subject] = (freqObj[item.subject] || 0) + 1;
    }

    const arr = Object.entries(freqObj).map(([subject, count]) => ({
      name: subject,
      value: count
    }));

    setPie(arr);

  }, []);

  const isLight = Theme === "Light";

  // 🔥 GLASS CONTAINER (no solid bg)
  const containerClass = `flex flex-col gap-8 p-6 min-h-screen transition-all duration-300`;

  // 🔥 GLASS CARD
  const cardClass = `w-full h-80 rounded-2xl p-4 transition-all duration-300
    ${isLight
      ? "bg-white/80 backdrop-blur-md border border-gray-200 shadow-md"
      : "bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg text-white"
    }`;

  // 🔥 Chart theme adaptation
  const textColor = isLight ? "#111" : "#eee";

  const option = {
    xAxis: {
      type: "category",
      data: filteredNotes,
      name: "Date",
      nameLocation: "middle",
      nameGap: 25,
      axisLabel: { color: textColor }
    },
    yAxis: {
      type: "value",
      name: "Words",
      nameLocation: "middle",
      nameGap: 40,
      axisLabel: { color: textColor }
    },
    series: [
      {
        data: words,
        type: "line",
        smooth: true
      }
    ]
  };

  const option2 = {
    title: {
      text: 'Subject Distribution',
      left: 'center',
      textStyle: {
        color: textColor
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 0,
      textStyle: {
        color: textColor
      }
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        data: pie,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
          }
        }
      }
    ]
  };

  return (
    <div className={containerClass}>

      <div className={`${cardClass} mt-16`}>
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>

      <div className={cardClass}>
        <ReactECharts option={option2} style={{ height: "100%", width: "100%" }} />
      </div>

    </div>
  );
};

export default Activity;