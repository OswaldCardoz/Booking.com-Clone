import Footer from "../../Footer/Footer";
import  Header1  from "../../Header/Header1";
import EmailFoot from "../../Mailsection/EmailFoot";
import Navbar from "../../NavBar/NavBar";
import Offers from "../../Offers/Offers";
import FeaturedProperties from "./Treanding/FeaturedProperties";
import  BrowseByProperty  from "./BrowseByProperty";
import "./Home.css"
import { useState } from "react";
function Home(){
    return(
        <>
        <Navbar/>
        <Header1/>
        <div className="home-page parent-container">
            <div className="homepage-content child-container">
            <Offers/>

            {/* <Modal/> */}
            <BrowseByProperty/>
        <FeaturedProperties/>
        

        </div>
       
        </div>


        <EmailFoot/>
        <Footer/>
        </>
    )
}
export default Home;


