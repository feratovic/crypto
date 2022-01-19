import logo from '../../images/logo2.png';

import { navs } from '../utils/constans';

const Footer = () => {
    return (
       <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
           <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
                <div className='flex flex-[0.5] justify-center items-center'>
                    <img src={logo} alt='logo' className='w-32'/>
                </div>
                <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
                    {navs.map((item, index) => (
                        <p className='text-white text-base text-center mx-2 cursor-pointer' key={index}>
                         <a href={item.link} >{item.title}</a>
                        </p>
                    ))}
                </div>
           </div>

           <div className='flex justify-center items-center flex-col mt-5'>
                <p className='text-white text-sm text-center'>
                    Check out my portfolio
                </p>
                <p className='text-white text-sm font-bold text-center mt-1'>
                     <a href={`https://www.elmazferatovic.me/en`} target="_blank" rel="noopener noreferrer" className='hover:text-slate-400'>
                        Elmaz Feratovic
                    </a>
                </p>
           </div>
           <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5'/>

           <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
                <p className='text-white text-sm text-center'>
                    <a href="mailto: elmazferatovic16@gmail.com"   target="_blank">elmazferatovic16@gmail.com</a>
                </p>
                <p className='text-white text-sm text-center'>
                    All rights reserved
                </p>
           </div>
       </div>
    )
}

export default Footer;