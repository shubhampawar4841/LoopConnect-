import React from 'react'
import image1 from '@/assets/images/image1.jpg';
import image2 from '@/assets/images/image2.jpg';
import image3 from '@/assets/images/image3.jpg';
import image4 from '@/assets/images/image4.jpg';
import image5 from '@/assets/images/image5.jpg';
import image6 from '@/assets/images/image6.jpg';
import image7 from '@/assets/images/image7.jpg';

interface IStoriesProps{}

const Stories: React.FunctionComponent<IStoriesProps> = (props) => {  
    return (
    <div className='flex justify-between'>
         <img
         src={image1}
         className='w-20 h-20 rounded-full border-4 border-black'
         />
         <img
         src={image2}
         className='w-20 h-20 rounded-full border-4 border-black'
         />
         <img
         src={image3}
         className='w-20 h-20 rounded-full border-4 border-black'
         />
         <img
         src={image4}
         className='w-20 h-20 rounded-full border-4 border-black'
         />
         <img
         src={image5}
         className='w-20 h-20 rounded-full border-4 border-black'
         />
         <img
         src={image6}
         className='w-20 h-20 rounded-full border-4 border-black'
         />
    </div>
  )
}

export default Stories