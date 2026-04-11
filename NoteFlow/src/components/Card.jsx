import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Card = () => {
  const { Id } = useParams();
  const data = JSON.parse(localStorage.getItem('myData')) || [];
  const res = data.filter((item) => item.id == Id);

  return (
    
    <div className="min-h-screen w-full bg-[#f8f9fa] flex flex-col items-center p-6 md:p-12 font-sans">
      
     
      <div className="w-full max-w-4xl mb-8 mt-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-600 hover:text-blue-600 transition-all hover:shadow-md"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back to Notes</span>
        </Link>
      </div>

      <div className="w-full max-w-4xl">
        {res.length > 0 ? (
          res.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden"
            >
            
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0 opacity-50" />

              <div className="relative z-10">
       
                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
                  {item.subject}
                </div>

               
                <div className="text-gray-400 text-sm mb-4">
                  {item.date}
                </div>

          
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
                  {item.title}
                </h1>

         
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg md:text-xl whitespace-pre-line">
                    {item.description}
                  </p>
                </div>

               
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="text-6xl mb-4">📝</div>
             <p className="text-gray-400 text-xl font-medium">Note not found</p>
             <Link to="/" className="mt-4 text-blue-500 underline">Return Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;