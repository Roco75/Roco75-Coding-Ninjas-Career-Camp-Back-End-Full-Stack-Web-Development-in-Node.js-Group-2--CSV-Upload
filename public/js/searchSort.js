document.getElementById('searchBox').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const tableRows = document.querySelectorAll('#csvTable tbody tr');
    
    tableRows.forEach(row => {
        const cellValue = row.cells[0].innerText.toLowerCase();
        row.style.display = cellValue.includes(searchValue) ? '' : 'none';
    });
});
