import React from 'react';
import Meta from '../../assets/meta.png'
import chatgpt2 from '../../assets/chatgpt2.png'
import copilot from '../../assets/copilot.png'
import claude from '../../assets/claude.png'

const Aihub = () => {
    const logos = [
        { src: chatgpt2, alt: 'ChatGPT' },
        { src: Meta, alt: 'Meta AI' },
        { src: copilot, alt: 'Copilot' },
        { src: claude, alt: 'Claude' },
    ]

    // Duplicate for seamless loop
    const allLogos = [...logos, ...logos,...logos,...logos]

    return (
        <div className="w-full overflow-hidden py-8">
            <div className="flex animate-scroll">
                {allLogos.map((logo, idx) => (
                    <div 
                        key={idx} 
                        className="flex-shrink-0 mx-6 sm:mx-8 md:mx-12 lg:mx-16"
                        style={{ 
                            animation: `bounce 1.5s ease-in-out infinite`,
                            animationDelay: `${idx * 0.2}s` // stagger the bounce
                        }}
                    >
                        <img 
                            src={logo.src} 
                            alt={logo.alt}
                            className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Aihub;