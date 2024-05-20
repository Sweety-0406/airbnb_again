'use client'
import { SafeUser } from '@/app/types';
import Container from '../Container'
import Logo from './Logo';
import Search from './Search';
import Usermenu from './Usermenu';
import Categories from './Categories';
import {motion, useScroll, useTransform}  from 'framer-motion'
import { useEffect, useState } from 'react';

interface NavbarProps {
    currentUser ?: SafeUser | null
}


const Navbar:React.FC<NavbarProps>=({currentUser})=>{
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
        window.removeEventListener('resize', handleResize);
    };
    }, []);
    const {scrollY} = useScroll()  
    const orderStyleLogo = useTransform(scrollY,[0,200], [0,0]);
    const gridColStyleLogo = useTransform(scrollY,[0,200], ['span 4','span 1']);
    const orderStyle = useTransform(scrollY,[0,200], [2,1]);
    const gridColStyle = useTransform(scrollY,[0,200], ['span 6','span 3']);
    const orderStyleMenu = useTransform(scrollY,[0,200], [1,2]);
    const gridColStyleMenu = useTransform(scrollY,[0,200], ['span 2','span 2']);
    const searchMarginX = useTransform(scrollY,[0,200], [windowWidth >= 1168 ? '200px' : '40px', '2px']);

    return (
        <div 
        className="
          fixed
          bg-white
          shadow-sm
           border-b-2
           w-full
           gap-10
           z-40
        ">
            <Container >
                <div className="
                    my-4
                    grid
                    grid-cols-6
                    gap-3
                "
                >
                   <motion.div  
                   className='col-span-1'
                        style={{order:orderStyleLogo, gridColumn: gridColStyleLogo}}  
                    >
                     <Logo />
                   </motion.div>
                   <motion.div 
                        style={{order: orderStyleMenu,gridColumn: gridColStyleMenu}}
                    >
                     <Usermenu currentUser={currentUser} />
                   </motion.div>
                   <motion.div 
                //    className='mx-20'
                        style={{
                            order: orderStyle, 
                            gridColumn: gridColStyle, 
                            marginRight: searchMarginX, 
                            marginLeft: searchMarginX
                        }}  
                    >
                     <Search />
                   </motion.div>
                  
                </div>                 
            </Container>
            <Categories />
        </div>
        
    )
}

export default Navbar;