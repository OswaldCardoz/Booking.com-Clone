import "./emailFoot.css";
function EmailFoot(){
    return(
<div className="mail parent-container" >
    <div className="mail-title"><h1>Save time, save money!</h1></div>
  <span className="mail-desc">Sign up and we'll send the best deals to you</span>  
  <div className="mail-input-container">
    <input type="text" placeholder="Your Email"/>
    <button className="footbtn">SubScribe</button>
  </div>
</div>
)
}
export default EmailFoot;