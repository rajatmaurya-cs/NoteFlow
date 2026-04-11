import React, { useEffect, useState } from 'react'
import ReactECharts from "echarts-for-react";

const Activity = () => {



  const [filteredNotes, setFilteredNotes] = useState([]);
  const [words, setwords] = useState([]);
  const [pie, setpie] = useState([])

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

    console.log(notes)

    const result = getLast7DaysNotes(notes);

    // Dates
    const dates = result?.map((item) => item.date) || [];

    console.log(dates);

    setFilteredNotes(dates);

    // Words
    const ans = result?.map((item) => item.description.length)
    setwords(ans)
    console.log(ans);

    //mOBj
    const freqObj = {};

    for (let item of result) {
      const subject = item.subject;
      freqObj[subject] = (freqObj[subject] || 0) + 1;
    }

    const arr = Object.entries(freqObj).map(([subject, count]) => ({
      name: subject,
      value: count
    }));

    setpie(arr);
    console.log(arr);





  }, []);





  const option = {
    xAxis: {
      type: "category",
      data: filteredNotes,
      name: "Date",
      nameLocation: "middle",
      nameGap: 25
    },
    yAxis: {
      type: "value",
      name: "Words",
      nameLocation: "middle",
      nameGap: 40
    },
    series: [
      {
        data: words,
        type: "line"
      }
    ]
  };

  const option2 = {
    title: {
      text: 'Weightage Of subject',
      subtext: 'Subject',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: pie,
       
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div className="flex flex-col gap-10 p-6 bg-gray-50 rounded-2xl">

      <div className="w-full h-80 bg-white rounded-xl shadow-md p-4 mt-20">
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>


      <div className="w-full h-80 bg-white rounded-xl shadow-md p-4">
        <ReactECharts option={option2} style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
};

export default Activity



/*

date.getFullYear()   // 2026
date.getMonth()      // 0–11
date.getDate()       // 1–31
date.getDay()        // 0–6 (Sunday–Saturday)

*/