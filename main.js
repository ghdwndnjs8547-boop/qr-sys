document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('result');
    let lastScanTime = 0;
    const scanCooldown = 5000; // 5 seconds

    function onScanSuccess(decodedText, decodedResult) {
        const now = new Date().getTime();
        if (now - lastScanTime < scanCooldown) {
            // Cooldown active, ignore scan
            return;
        }
        lastScanTime = now;

        console.log(`Code matched = ${decodedText}`, decodedResult);
        const sessionId = decodedText;

        // Prompt for student name
        const studentName = prompt("Please enter your name:");
        if (studentName) {
            // Get existing attendance data
            const attendanceData = JSON.parse(localStorage.getItem('attendance')) || {};
            // Get or create session array
            if (!attendanceData[sessionId]) {
                attendanceData[sessionId] = [];
            }
            // Add student if not already present
            if (!attendanceData[sessionId].includes(studentName)) {
                attendanceData[sessionId].push(studentName);
                // Save updated data
                localStorage.setItem('attendance', JSON.stringify(attendanceData));
                resultContainer.textContent = `Welcome, ${studentName}! Your attendance has been recorded.`;
            } else {
                resultContainer.textContent = `Hi ${studentName}, you have already checked in.`;
            }
        } else {
             resultContainer.textContent = "Attendance recording cancelled.";
        }
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});