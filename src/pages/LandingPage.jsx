import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import WhyJournal from "../components/home/WhyJournal";
import QuoteCTA from "../components/home/QuoteCTA";
import About from "../components/home/About";
import Footer from "../components/layout/Footer";
function Landingpage(){
return(
<>
<Navbar/>
<Hero/>
<WhyJournal/>
<About/>
<QuoteCTA/>
<Footer/>
</>
); 

}
export default Landingpage;