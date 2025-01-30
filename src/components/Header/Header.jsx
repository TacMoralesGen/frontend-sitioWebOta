import './Header.css'
import Navbar from './Navbar/Navbar'
import IndicatorStages from './Indicator-stages/IndicatorStages';
import { useLocation } from 'react-router-dom';

const useCurrentURL = () => {
    const location = useLocation();
    return location.pathname
}

const Header = () => {
    const pathname = useCurrentURL();
    const showIndicatorStages = pathname === "/reservar" || pathname === "/checkout";
    const stage = pathname === "/reservar" ? 1 : pathname === "/checkout" ? 2 : null;
    const isUponBanner = pathname === "/"; 
    return (
        <header>
            <Navbar isUponBanner={isUponBanner} />
            {showIndicatorStages ? <IndicatorStages stage={stage}/> : null}
        </header>
    )    


}

export default Header;