import React from 'react';
import image1 from '@/assets/images/image1.jpg';
import image2 from '@/assets/images/image2.jpg';
import image3 from '@/assets/images/image3.jpg';
import image4 from '@/assets/images/image4.jpg';
import image5 from '@/assets/images/image5.jpg';
import image6 from '@/assets/images/image6.jpg';

const Stories: React.FunctionComponent = () => {  
    return (
        <div className='flex justify-between'>
            <img
                src={image1}
                className='w-20 h-20 rounded-full border-4 border-black'
                alt="Story 1"
            />
            <img
                src={image2}
                className='w-20 h-20 rounded-full border-4 border-black'
                alt="Story 2"
            />
            <img
                src={image3}
                className='w-20 h-20 rounded-full border-4 border-black'
                alt="Story 3"
            />
            <img
                src={image4}
                className='w-20 h-20 rounded-full border-4 border-black'
                alt="Story 4"
            />
            <img
                src={image5}
                className='w-20 h-20 rounded-full border-4 border-black'
                alt="Story 5"
            />
            <img
                src={image6}
                className='w-20 h-20 rounded-full border-4 border-black'
                alt="Story 6"
            />
        </div>
    );
};

export default Stories;
