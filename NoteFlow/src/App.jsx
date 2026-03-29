
import { Bar, BarChart, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import './App.css'

function App() {


  const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
  

  return (
    <div className="app">
      <div className="chart-container">
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="desktop" fill="#8884d8" />
          <Bar dataKey="mobile" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  )
}

export default App
