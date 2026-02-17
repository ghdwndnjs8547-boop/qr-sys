document.addEventListener('DOMContentLoaded', () => {
    const qrcodeContainer = document.getElementById('qrcode');
    const generateBtn = document.getElementById('generate-qr');
    const attendanceList = document.getElementById('attendance-list');

    let currentSessionId = null;

    // Function to generate QR code
    const generateQRCode = () => {
        // Clear previous QR code
        qrcodeContainer.innerHTML = '';
        // Generate a unique session ID (e.g., using timestamp)
        currentSessionId = new Date().getTime().toString();
        // Create new QR code
        new QRCode(qrcodeContainer, {
            text: currentSessionId,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        console.log(`Generated QR code for session: ${currentSessionId}`);
        // Clear and update attendance list display
        updateAttendanceList();
    };

    // Function to update attendance list
    const updateAttendanceList = () => {
        attendanceList.innerHTML = '';
        if (currentSessionId) {
            const attendanceData = JSON.parse(localStorage.getItem('attendance')) || {};
            const sessionAttendance = attendanceData[currentSessionId] || [];
            sessionAttendance.forEach(student => {
                const li = document.createElement('li');
                li.textContent = student;
                attendanceList.appendChild(li);
            });
        }
    };

    // Generate QR code on button click
    generateBtn.addEventListener('click', generateQRCode);

    // Periodically update the attendance list to show new check-ins
    setInterval(updateAttendanceList, 2000);

    // Generate a QR code on initial load
    generateQRCode();
});