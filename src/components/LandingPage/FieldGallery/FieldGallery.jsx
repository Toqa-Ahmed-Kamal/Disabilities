import React from "react";
import "./FieldGallery.css";
import { useTheme } from "../../../context/ThemeContext";

const FieldGallery = () => {
  const { theme } = useTheme();

  return (
    <div style={{ width: "100%", position: "relative", marginBottom: "80px" }}>
      <div style={{ textAlign: "center" }}>
        <h2
          className="section-title-box"
          style={{ margin: "0 auto 60px auto", display: "inline-block" }}
        >
          الباحثة الرئيسية
        </h2>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "60px 50px",
          backgroundColor: theme === "dark" ? "#252525" : "#ffffff",
          borderRadius: "16px",
          direction: "rtl",
          textAlign: "right",
          boxShadow: theme === "dark" 
            ? "0 8px 32px rgba(0,0,0,0.4)" 
            : "0 8px 32px rgba(182, 151, 103, 0.15)",
          border: `1px solid ${theme === "dark" ? "#3a3a3a" : "#f0f0f0"}`
        }}
      >
        {/* الاسم */}
        <div style={{ marginBottom: "50px", textAlign: "center", paddingBottom: "20px", borderBottom: "2px solid #b69767" }}>
          <h2 style={{ color: "#b69767", fontSize: "32px", marginBottom: "5px", fontWeight: "800" }}>
            شــــــذى ســــــالـــم الهلالي
          </h2>
          <p style={{ color: "#b69767", fontSize: "18px", fontWeight: "600", margin: 0 }}>
           
          </p>
        </div>

        {/* معلومات التواصل */}
        <div
          style={{
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#f9f9f9",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "40px",
            borderRight: "4px solid #b69767",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}
        >
          <div>
            <p style={{ color: theme === "dark" ? "#aaa" : "#666", fontSize: "12px", margin: "0 0 5px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              الهاتف
            </p>
            <p style={{ color: theme === "dark" ? "#fff" : "#000", fontSize: "16px", fontWeight: "600", margin: 0 }}>
              +966543129777
            </p>
          </div>
          <div>
            <p style={{ color: theme === "dark" ? "#aaa" : "#666", fontSize: "12px", margin: "0 0 5px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              البريد الإلكتروني
            </p>
            <p style={{ color: theme === "dark" ? "#fff" : "#000", fontSize: "16px", fontWeight: "600", margin: 0, wordBreak: "break-all" }}>
              Shatha.alhelali@gmail.com
            </p>
          </div>
        </div>

        {/* البيوغرافيا */}
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ color: "#b69767", marginBottom: "15px", fontSize: "18px", fontWeight: "700" }}>نبذة عن الباحثة</h3>
          <p style={{ 
            color: theme === "dark" ? "#ddd" : "#444", 
            fontSize: "15px", 
            lineHeight: "1.9",
            margin: 0,
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            borderRight: "3px solid #b69767"
          }}>
            قيادية متخصصة في الحوكمة وبناء المنظومات المتكاملة من مرحلة التأسيس، بخبرة تفوق 15 عاماً في قيادة
            المبادرات الاستراتيجية. متخصصة في صياغة الدراسات وتحويل البحوث المرجعية إلى حلول مستدامة ساهمت في
            تطوير رأس المال البشري وتمثيل المملكة خارجياً.
          </p>
        </div>

        {/* المؤهلات */}
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ color: "#b69767", marginBottom: "20px", fontSize: "18px", fontWeight: "700" }}>المؤهلات الأكاديمية</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            {[
              { title: "ماجستير علم النفس التربوي", detail: "(تقدير ممتاز) | جامعة طيبة 2021" },
              { title: "دبلوم عالي الإرشاد الأسري", detail: "(تقدير ممتاز) | الجامعة الإسلامية 2019" },
              { title: "بكالوريوس اضطرابات اللغة", detail: "والتواصل | جامعة طيبة 2013" },
              { title: "الرخصة الدولية للتدريب القيادي", detail: "(PCT) | المركز العالمي (CGC) - كندا 2010" },
            ].map((item, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "#f9f9f9",
                  padding: "15px",
                  borderRadius: "8px",
                  borderRight: "3px solid #b69767",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
              >
                <p style={{ color: "#b69767", fontSize: "14px", fontWeight: "700", margin: "0 0 5px 0" }}>
                  {item.title}
                </p>
                <p style={{ color: theme === "dark" ? "#aaa" : "#666", fontSize: "12px", margin: 0, lineHeight: "1.6" }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* الخبرات */}
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ color: "#b69767", marginBottom: "20px", fontSize: "18px", fontWeight: "700" }}>الخبرات المهنية</h3>
          <div style={{ display: "space-between" }}>
            {[
              "باحث تنموي (متعاون) | مكتب سمو نائب أمير منطقة المدينة المنورة",
              "المؤسس والرئيس التنفيذي | مدارس غرس الأهلية",
              "عضو رسمي في الوفد السعودي | الامانة العامة لمجلس التعاون الخليجي",
              "مؤسس أقسام تطوع| جمعية تكافل لرعاية الأيتام، جمعية طيبة النسائية",
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "#f9f9f9",
                  padding: "12px 15px",
                  borderRight: "3px solid #b69767",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  color: theme === "dark" ? "#ddd" : "#444",
                  fontSize: "14px",
                  lineHeight: "1.6"
                }}
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

        {/* المسهمات */}
        <div style={{
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#f9f9f9",
          padding: "25px",
          borderRadius: "12px",
          borderRight: "4px solid #b69767"
        }}>
          <h3 style={{ color: "#b69767", marginBottom: "15px", fontSize: "18px", fontWeight: "700" }}>أبرز المسهمات والمنجزات</h3>
          <div style={{ marginBottom: "15px" }}>
            <p style={{ color: "#b69767", fontSize: "14px", fontWeight: "700", marginBottom: "10px" }}>
              إنجاز دراسة تنموية حولت الأرقام الصماء إلى خارطة جغرافية
            </p>
            <ul style={{ color: theme === "dark" ? "#ddd" : "#444", fontSize: "13px", margin: 0, paddingLeft: "20px" }}>
              <li style={{ marginBottom: "5px" }}> تحدد البؤر المكانية الأكثر احتياجاً</li>
              <li>صدر التوجيه الكريم باعتمادها بمركز الوثائق والمحفوظات كمرجع استراتيجي لدعم إتخاذ القرار</li>
            </ul>
          </div>
          <p style={{ color: theme === "dark" ? "#ddd" : "#444", fontSize: "13px", margin: 0 }}>
            <strong style={{ color: "#b69767" }}>التمثيل الدولي:</strong> عضو رسمي في الوفد السعودي بدول مجلس التعاون الخليجي
          </p>
        </div>
      </div>
    </div>
  );
};

export default FieldGallery;
