import React from 'react'
import ReactECharts from "echarts-for-react";
const Activity = () => {

  const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    name: "Days",         
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
      data: [150, 230, 224, 218, 135, 147, 260],
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
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
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
      
      <div className="w-full h-80 bg-white rounded-xl shadow-md p-4">
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>

    
      <div className="w-full h-80 bg-white rounded-xl shadow-md p-4">
        <ReactECharts option={option2} style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
};

export default Activity
