window.onload = function () {
    // קח את הסדרות שנבחרו מ-localStorage
    let selectedSeries = [];
    try {
        selectedSeries = JSON.parse(localStorage.getItem('selectedSeries')) || [];
    } catch (error) {
        console.error("Error parsing selectedSeries from localStorage:", error);
        selectedSeries = [];
    }

    console.log("סדרות שנבחרו:", selectedSeries);

    // אם אין סדרות נבחרות, הצג הודעה
    if (selectedSeries.length === 0) {
        document.getElementById('recommendations').innerHTML = "לא נבחרו סדרות.";
    } else {
        // חילוץ הקטגוריות שנבחרו
        let selectedCategories = [...new Set(selectedSeries.map(item => item.category))];
        console.log("קטגוריות שנבחרו:", selectedCategories);

        // המלצות לפי קטגוריות
        let recommendations = getCategoryRecommendations(selectedCategories, selectedSeries);
        console.log("כל ההמלצות מהקטגוריות:", recommendations);

        // הצגת המלצות בעמוד
        if (recommendations.length === 0) {
            document.getElementById('recommendations').innerHTML = "לא נמצאו המלצות מתאימות.";
        } else {
            document.getElementById('recommendations').innerHTML =
                "<ul>" +
                recommendations
                    .map(function (series) {
                        return "<li>" + series.name + " (" + series.category + ")" + "</li>";
                    })
                    .join('') +
                "</ul>";
        }
    }
};

// פונקציה להמלצות לפי קטגוריות
function getCategoryRecommendations(categories, selectedSeries) {
    if (!Array.isArray(categories) || categories.length === 0) {
        return [];
    }

    const allSeries = [
        { name: 'החץ', category: 'גיבורי-על ופעולה' },
        { name: 'הפלאש', category: 'גיבורי-על ופעולה' },
        { name: 'לוציפר', category: 'גיבורי-על ופעולה' },
        { name: 'איך פגשתי את אמא', category: 'קומדיה' },
        { name: 'חברים', category: 'קומדיה' },
        { name: 'סופרסטור', category: 'קומדיה' },
        { name: 'ברוקלין 99', category: 'קומדיה' },
        { name: 'קופה ראשית', category: 'קומדיה' },
        { name: 'משפחת סימפסון', category: 'אנימציה' },
        { name: 'איש משפחה', category: 'אנימציה' },
        { name: 'דברים מוזרים', category: 'מדע בדיוני ופנטזיה' },
        { name: 'אווטאר', category: 'מדע בדיוני ופנטזיה' },
        { name: 'המאה', category: 'מדע בדיוני ופנטזיה' },
        { name: 'מניפסט', category: 'מדע בדיוני ופנטזיה' },
        { name: 'נמלטים', category: 'דרמה ומתח' },
        { name: 'רעבים', category: 'דרמה ומתח' },
        { name: 'גאליס', category: 'נוער ישראליות' },
        { name: 'השמינייה', category: 'נוער ישראליות' },
        { name: 'האי', category: 'נוער ישראליות' },
        { name: 'החממה', category: 'נוער ישראליות' },
    ];

    console.log("קטגוריות נבחרות לבדיקה:", categories);

    // מחזיר את כל הסדרות מהקטגוריות שנבחרו
    let recommendations = allSeries.filter(series => categories.includes(series.category));

    // סינון הסדרות שכבר נבחרו
    recommendations = recommendations.filter(rec => !selectedSeries.some(sel => sel.name === rec.name));

    return recommendations;
}