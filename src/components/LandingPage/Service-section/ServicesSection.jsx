import React from "react";
import "./ServicesSection.css";
import card1 from "../../../assets/Goals/Icon (2).png";
import card2 from "../../../assets/Goals/Icon (3).png";
import card3 from "../../../assets/Goals/Icon (4).png";
import card4 from "../../../assets/Goals/Icon (5).png";
import card5 from "../../../assets/Goals/Icon (6).png";
import card6 from "../../../assets/Goals/Icon (7).png";
import card7 from "../../../assets/Goals/Icon (8).png";
import card8 from "../../../assets/Goals/Icon (9).png";
import card9 from "../../../assets/Goals/Icon (10).png";
import card10 from "../../../assets/Goals/Icon (11).png";
import card11 from "../../../assets/Goals/Icon (12).png";
import card12 from "../../../assets/Goals/Icon (13).png";
const ServiceCard = ({ title, icon }) => (
  <div className="service-card">
    <div className="service-icon">
      <img src={icon} alt="Service Icon" />
    </div>
    <div className="service-title">{title}</div>
  </div>
);

const ServicesSection = () => {
  return (
    <div className="content-container">
      <div className="section-title-box">
        مشروع تعزيز جودة الحياة للأشخاص ذوي الإعاقة (الخدمات المقدمة ومدى كفايتها)
      </div>
      <div className="section-second-title">
        بالمملكة العربية السعوديه وخاصة منطقة المدينة المنورة كدراسة حالة معمقة
      </div>

      <div className="services-grid">
       <ServiceCard
title="بناء قاعدة بيانات ضخمة لدعم القرار الوطني الخاص بالإعاقة "  icon={card1}
/>
<ServiceCard
  title="رصد التحديات وتقييم الكفاية: الوصول إلى مؤشرات واقعية حول مدى كفاية الخدمات المقدمة للأشخاص ذوي الإعاقة"
  icon={card2}
/>

<ServiceCard
  title="رصد مستوى الصعوبات والتحديات اليومية التي يواجهها الأشخاص ذوو الإعاقة في المناطق الإدارية بالمملكة"
  icon={card3}
/>

<ServiceCard
  title="النطاق الجغرافي المستهدف: منطقة المدينة المنورة كدراسة حالة معمقة"
  icon={card4}
/>

<ServiceCard
  title="مساعدة متخذي القرار على الاعتماد على أسس ومؤشرات واقعية في تشخيص المناطق الإدارية ومدى كفاية الخدمات المقدمة للأشخاص ذوي الإعاقة"
  icon={card6}
/>

<ServiceCard
  title="مساعدة متخذي القرار و راسمي السياسات في تمكين ودمج الأشخاص ذوي الإعاقة اجتماعياً وتحديد التحديات والعوامل المؤثرة على جودة حياتهم"
  icon={card7}
/>

<ServiceCard
  title="رصد أثر التغيرات الوزارية على كفاءة الإجراءات التنفيذية"
  icon={card8}
/>

<ServiceCard
  title="ابتكار حزمة مقاييس لقياس الأثر التنموي للخدمات بهدف تقييم جودة المخرجات وحوكمة الأداء المهني"
  icon={card9}
/>

<ServiceCard
  title="توفير أدلة لمنظومة الخدمات في النطاق الجغرافي المستهدف"
  icon={card10}
/>

<ServiceCard
  title="توفير أدلة لخدمات القطاع الخاص في المناطق الإدارية بالمملكة لكل منطقة على حدة"
  icon={card11}
/>


      </div>
    </div>
  );
};

export default ServicesSection;
