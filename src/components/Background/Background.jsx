import React from 'react';
import BackgroundImage from '../../images/homepageBackground.jpg';
import Footer from '../Footer/Footer';
// "min-h-[1792px] min-w-[828px] object-cover"
export default function Background() {
    return (
        <>
            <div className='relative min-h-screen overflow-hidden'>
                {/* Background Image */}
                <div className='absolute inset-0 bg-cover bg-center bg-no-repeat'
                    style={{ backgroundImage: `url(${BackgroundImage})` }}
                ></div>

                {/* Content */}
            </div>

        </>
    )
}
