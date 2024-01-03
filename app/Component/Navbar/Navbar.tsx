'use client'
import Container from '../Container'
import Logo from './Logo';
import Search from './Search';
import Usermenu from './Usermenu';
const Navbar=()=>{
    return (
        <div className="
          fixed
          bg-white
          shadow-sm
           border-b-2
           w-full
           gap-10
        ">
            <Container >
                <div className="
                    my-4
                    flex 
                    flex-row
                    items-center
                    justify-between
                ">
                   <Logo />
                   <Search />
                   <Usermenu />
                </div>                 
            </Container>
        </div>
    )
}

export default Navbar;