import React, { useContext, useEffect, useState } from 'react';
import ReactECharts from "echarts-for-react";
import { ToggleTheme } from './AuthProvider';
import { Notes } from './mockData';

const Activity = () => {

  const { Theme } = useContext(ToggleTheme);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [words, setWords] = useState([]);
  const [pie, setPie] = useState([]);

  function getLast7DaysNotes(notes) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return notes?.filter(note => {
      if (!note.date) return false;
      const parts = note.date.split('-');
      if (parts.length !== 3) return false;
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // 0-indexed month
      const day = parseInt(parts[2], 10);
      const noteDate = new Date(year, month, day);

      return noteDate >= sevenDaysAgo && noteDate <= today;
    }) || [];
  }

  useEffect(() => {
    let notes = JSON.parse(localStorage.getItem('myData'));
    if (!notes || notes.length === 0) {
      notes = Notes;
      localStorage.setItem('myData', JSON.stringify(Notes));
    }

    const today = new Date();
    const formatDateObj = (dateObj) => {
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const normalizeDateStr = (dateStr) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      const year = parts[0];
      const month = String(parseInt(parts[1], 10)).padStart(2, '0');
      const day = String(parseInt(parts[2], 10)).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const countWords = (htmlStr) => {
      if (!htmlStr) return 0;
      const cleanText = htmlStr.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (!cleanText) return 0;
      return cleanText.split(' ').length;
    };

    // Migrate old static dates or mock IDs to relative dates if present
    let updated = false;
    const mockIdToRelativeDays = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6
    };

    const staticToRelativeDays = {
      "2026-06-7": 1,
      "2026-06-6": 2,
      "2026-06-5": 3,
      "2026-06-4": 4,
      "2026-06-3": 5,
      "2026-06-2": 6,
      "2026-06-07": 1,
      "2026-06-06": 2,
      "2026-06-05": 3,
      "2026-06-04": 4,
      "2026-06-03": 5,
      "2026-06-02": 6,
    };

    notes = notes.map(note => {
      let daysAgo = undefined;
      if (mockIdToRelativeDays[note.id] !== undefined) {
        daysAgo = mockIdToRelativeDays[note.id];
      } else if (note.date && staticToRelativeDays[note.date] !== undefined) {
        daysAgo = staticToRelativeDays[note.date];
      }

      if (daysAgo !== undefined) {
        const d = new Date();
        d.setDate(today.getDate() - daysAgo);
        const newDate = formatDateObj(d);
        if (note.date !== newDate) {
          note.date = newDate;
          updated = true;
        }
      }
      return note;
    });

    if (updated) {
      localStorage.setItem("myData", JSON.stringify(notes));
    }

    const result = getLast7DaysNotes(notes);

    // Initialize last 7 days with 0 words
    const dateGroups = {};
    const sortedDates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = formatDateObj(d);
      dateGroups[dateStr] = 0;
      sortedDates.push(dateStr);
    }

    // Group and sum word count by date
    result.forEach((item) => {
      if (item.date) {
        const normalized = normalizeDateStr(item.date);
        if (dateGroups[normalized] !== undefined) {
          const wordsCount = countWords(item.description);
          dateGroups[normalized] += wordsCount;
        }
      }
    });

    const sortedWords = sortedDates.map(date => dateGroups[date]);

    setFilteredNotes(sortedDates);
    setWords(sortedWords);

    // Calculate subject frequency
    const freqObj = {};
    result.forEach((item) => {
      if (item.subject) {
        freqObj[item.subject] = (freqObj[item.subject] || 0) + 1;
      }
    });

    const arr = [];
    for (let key in freqObj) {
      arr.push({
        name: key,
        value: freqObj[key]
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

      <div className={`${cardClass} mt-25`}>
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>

      <div className={cardClass}>
        <ReactECharts option={option2} style={{ height: "100%", width: "100%" }} />
      </div>

    </div>
  );
};

export default Activity;