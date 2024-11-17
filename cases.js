document.addEventListener("DOMContentLoaded", () => {
    const casesList = document.getElementById("cases-list");
    const searchCase = document.getElementById("search-case");

    // استرجاع القضايا من localStorage
    let cases = JSON.parse(localStorage.getItem("cases")) || [];

    // عرض القضايا في الجدول
    function displayCases(casesToDisplay) {
        casesList.innerHTML = '';  // مسح البيانات السابقة
        if (casesToDisplay.length === 0) {
            casesList.innerHTML = '<tr><td colspan="7">لا توجد قضايا حالياً.</td></tr>';
        } else {
            casesToDisplay.forEach((caseItem, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${caseItem.name}</td>
                    <td>${caseItem.phone}</td>
                    <td>${caseItem.details}</td>
                    <td>${caseItem.sessionDate}</td>
                    <td>${caseItem.judgment || "لم يصدر حكم بعد"}</td>
                    <td>
                        <!-- رابط لفتح ملف القضية PDF -->
                        <a href="${caseItem.fileUrl}" target="_blank">الإطلاع على ملف القضية</a>
                    </td>
                    <td><button class="remove-case" data-index="${index}">إزالة</button></td>
                `;
                casesList.appendChild(row);
            });
        }

        // إضافة أحداث زر الإزالة
        const removeButtons = document.querySelectorAll(".remove-case");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cases.splice(index, 1);  // حذف القضية من المصفوفة
                localStorage.setItem("cases", JSON.stringify(cases));  // تحديث localStorage
                displayCases(cases);  // إعادة عرض القضايا بعد الحذف
            });
        });
    }

    // عرض جميع القضايا عند تحميل الصفحة
    displayCases(cases);

    // البحث عن القضايا
    searchCase.addEventListener("input", () => {
        const searchTerm = searchCase.value.toLowerCase();
        const filteredCases = cases.filter(client =>
            client.name.toLowerCase().includes(searchTerm) ||
            client.phone.includes(searchTerm)
        );

        displayCases(filteredCases);  // عرض القضايا التي تم تصفيتها
    });
});
