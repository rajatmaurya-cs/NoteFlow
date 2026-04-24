import React, { useContext, useEffect, useState } from 'react';
import ReactECharts from "echarts-for-react";
import { ToggleTheme } from './AuthProvider';

const Activity = () => {

  const { Theme } = useContext(ToggleTheme);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [words, setWords] = useState([]);
  const [pie, setPie] = useState([]);

  function getLast7DaysNotes(notes) {

    const today = new Date().getDate();

    console.log("Today: ", today)



    const sevenDaysAgo = today - 7



    console.log("sevenDaysAgo: ", sevenDaysAgo)

    const result = notes?.filter(note => {

      const noteDate = new Date(note.date).getDate();

      console.log("The noteDate", noteDate)

      return noteDate >= sevenDaysAgo && noteDate <= today;

    });

    return result;
  }

  useEffect(() => {

    console.log("Before parsing:", localStorage.getItem('myData'));

    const notes = JSON.parse(localStorage.getItem('myData')) || [];

    console.log("After parsing:", notes);


    const result = getLast7DaysNotes(notes); // Store dummy Data

    console.log("result: ", result)

    setFilteredNotes(result?.map((item) => item.date) || []); // Stores Date

    console.log("The filteredNotes: ", filteredNotes);

    setWords(result?.map((item) => item.description.length) || []);

    const freqObj = {};
    for (let item of result) {
      freqObj[item.subject] = (freqObj[item.subject] || 0) + 1;
    }

    const arr = [];

    for (let subject in freqObj) {
      arr.push({
        name: subject,
        value: freqObj[subject]
      });
    }
    setPie(arr);

  }, []);

  const isLight = Theme === "Light";


  const containerClass = Theme === 'Light' ? "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 flex flex-col gap-8 p-6 min-h-screen" : "flex flex-col gap-8 p-6 min-h-screen transition-all duration-300"


  const cardClass = `w-full h-80 rounded-2xl p-4 transition-all duration-300
    ${isLight
      ? "bg-white/80 backdrop-blur-md border border-gray-200 shadow-md"
      : "bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg text-white"
    }`;


  const textColor = isLight ? "#111" : "#eee";

  const option = {
    xAxis: {
      type: "category",
      data: filteredNotes, // Dates
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
        data: words, // Words
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