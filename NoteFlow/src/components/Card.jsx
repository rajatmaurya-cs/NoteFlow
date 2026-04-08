import React from 'react'
import { useParams } from 'react-router-dom'

const Card = () => {

    const {Id} = useParams();

    const data = JSON.parse(localStorage.getItem('myData'));

    const res = data.filter((item)=> item.id == Id)

  return (
    <div>

        {res.map((item)=>{
            return(
                <div>
                    {item.id}
                    {item.subject}
                    {item.title}
                    {item.subcription}
                </div>
            )
        })}
      
    </div>
  )
}

export default Card
