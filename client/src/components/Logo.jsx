import Totelly2 from '../videos/Totelly2.mp4';
import TotellyLogo from '../images/TotellyLogo.png';
import { useState } from 'react';

export default function Logo({handleOptionClick}) {

    const [logoSwap, setLogoSwap] = useState(false);

    return (
        <div>
            {logoSwap ? 
            <img className='logo logo-image' src={TotellyLogo} onClick={handleOptionClick}/>
            :
            <video className='logo' src={Totelly2} width='100%' height='100%' preload='auto' autoPlay muted onEnded={() => setLogoSwap(true)}/>}
        </div>
    )
}