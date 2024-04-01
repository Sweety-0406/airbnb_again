'use client'
import { SafeUser } from '@/app/types';
import Container from '../Container'
import Logo from './Logo';
import Search from './Search';
import Usermenu from './Usermenu';
import Categories from './Categories';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ModeToggle } from '../ui/ToggleMode';

interface NavbarProps {
    currentUser ?: SafeUser | null
}
const Navbar:React.FC<NavbarProps>=({currentUser})=>{
    console.log(currentUser);
    const router = useRouter();
    
    return (
        <div 
        className="
          fixed
          bg-white
          shadow-sm
           border-b-2
           w-full
           gap-10
           z-10
        ">
            <Container >
                <div className="
                    my-4
                    flex 
                    flex-row
                    items-center
                    justify-between
                "
                >
                   <Logo />
                   <Search />
                   <Usermenu currentUser={currentUser} />
                  
                </div>                 
            </Container>
            <Categories />
        </div>
        
    )
}

export default Navbar;