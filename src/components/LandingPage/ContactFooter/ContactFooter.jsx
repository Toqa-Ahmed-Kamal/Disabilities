import React from "react";
import { Link } from "react-router-dom";
import "./ContactFooter.css";
import footerLogo from "../../../assets/Footer/Logo.png";
import icon1 from "../../../assets/Footer/Icon (1).png";
import icon2 from "../../../assets/Footer/Icon (2).png";
import icon3 from "../../../assets/Footer/Icon (3).png";
import icon4 from "../../../assets/Footer/Icon (4).png";

const ContactFooter = () => {
  return (
    <div className="footer-wrapper" dir="rtl">
      <div className="contact-dark-section">
        <div className="contact-header-title">تواصل معنا</div>

        <div className="contact-container">
 

          <div className="contact-form-side">
            <form>
              <input type="text" placeholder="الاسم" className="footer-input" />
              <input
                type="email"
                placeholder="الايميل"
                className="footer-input"
              />
              <textarea
                placeholder="الرسالة"
                className="footer-textarea"
                rows="5"
              />
              <button type="button" className="footer-send-btn">
                إرسال
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="golden-footer-body">
        <div className="footer-columns">
          <div className="col-branding">
            <div className="logos-row">
          
            </div>

            <p className="branding-text">
           تم اعتمادها كوثيقة مرجعية في مركز الوثائق والمحفوظات في امارة منطقة المدينة المنورة
            </p>
          </div>

          <div className="col-links">
            <ul className="footer-nav">
              <li>
                <Link to="/">الصفحة الرئيسية</Link>
              </li>
              <li>
                <Link to="/map">لوحة التحكم</Link>
              </li>
              <li>
                <Link to="/#">الخريطة</Link>
              </li>
              <li>
                <Link to="/">تواصل معنا</Link>
              </li>
            </ul>
          </div>

       
        </div>
      </div>

    
    </div>
  );
};

export default ContactFooter;
