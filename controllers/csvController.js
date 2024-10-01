const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');

// Homepage to show upload form and list of uploaded files
exports.getHomePage = (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            return res.status(500).send('Error reading upload folder');
        }
        res.render('index', { files });
    });
};

// Handle CSV upload
exports.uploadCSV = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No file uploaded.');
    }

    // Validate if it's a CSV file
    let csvFile = req.files.csvFile;
    if (csvFile.mimetype !== 'text/csv') {
        return res.status(400).send('Only CSV files are allowed.');
    }

    let uploadPath = path.join(__dirname, '../uploads', csvFile.name);
    csvFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
};

// View CSV data from uploaded file
exports.viewCSVData = (req, res) => {
    let filename = req.params.filename;
    let filepath = path.join(__dirname, '../uploads', filename);
    let headers = [];
    let rows = [];

    fs.createReadStream(filepath)
        .pipe(csvParser())
        .on('headers', (headerList) => {
            headers = headerList;
        })
        .on('data', (data) => {
            rows.push(data);
        })
        .on('end', () => {
            res.render('viewCSV', { headers, rows, filename });
        });
};
