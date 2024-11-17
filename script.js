document.addEventListener("DOMContentLoaded", () => {
    const clientForm = document.getElementById("client-form");

    // استرجاع القضايا من localStorage أو استخدام مصفوفة فارغة إذا لم تكن موجودة
    let cases = JSON.parse(localStorage.getItem("cases")) || [];

    // إضافة عميل جديد
    clientForm.addEventListener("submit", (e) => {
        e.preventDefault();  // منع الإرسال الافتراضي للنموذج

        // الحصول على البيانات المدخلة
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const details = document.getElementById("details").value;
        const sessionDate = document.getElementById("session-date").value;
        const judgment = document.getElementById("judgment").value;
        const caseFile = document.getElementById("case-file").files[0];

        // تحويل الملف إلى رابط مؤقت إذا تم رفعه
        let fileUrl = '';
        if (caseFile) {
            fileUrl = URL.createObjectURL(caseFile);  // إنشاء رابط مؤقت لملف PDF
        }

        // إنشاء قضية جديدة
        const newCase = { name, phone, email, details, sessionDate, judgment, fileUrl };

        // إضافة القضية إلى المصفوفة
        cases.push(newCase);

        // حفظ القضايا في localStorage
        localStorage.setItem("cases", JSON.stringify(cases));

        // تأكيد إضافة القضية
        alert("تم إضافة القضية بنجاح!");
        
        // إعادة تعيين النموذج
        clientForm.reset();
    });
});
