let selectedSeries = [];  

function toggleCheck(button) {  
    // נמצא את שם וקטגוריית הסדרה  
    const seriesName = button.parentElement.textContent.trim();  
    const seriesCategory = button.parentElement.dataset.category; // יש להוסיף data-attribute לקטגוריות ב-HTML  

    const seriesObject = { name: seriesName, category: seriesCategory };  

    // הוספה או הסרה מרשימת הסדרות הנבחרות  
    const index = selectedSeries.findIndex(series => series.name === seriesName);  
    if (index === -1) {  
        selectedSeries.push(seriesObject);  
        button.classList.add('checked'); // הוסף את המחלקה 'checked' להפיכת הכפתור לירוק  
        button.textContent = "✔"; // יעדכן את הטקסט של הכפתור  
    } else {  
        selectedSeries.splice(index, 1);  
        button.classList.remove('checked'); // הסר את המחלקה 'checked' להחזיר את הכפתור לאדום  
        button.textContent = "✖"; // יעדכן את הטקסט של הכפתור  
    }  

    // עדכון כפתור ההמלצה  
    document.getElementById("endButton").style.display = selectedSeries.length > 0 ? "block" : "none";  

    // שמירת הבחירות ב-localStorage  
    localStorage.setItem("selectedSeries", JSON.stringify(selectedSeries));  
}