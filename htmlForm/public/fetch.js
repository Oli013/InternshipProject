document.addEventListener("DOMContentLoaded", function () {
    function getQueryParams() {
        var params = new URLSearchParams(window.location.search);
        document.getElementById("courseCode").textContent = params.get("course") ;
        document.getElementById("month").textContent=params.get("month");
        document.getElementById("year").textContent=params.get("year");
        document.getElementById("programme").textContent=params.get("programme");
        
        fetchAssignmentData(params.get("course"), params.get("month"),params.get("year"),params.get("programme"));
    }

    function fetchAssignmentData(course, month,year,programme) {
        if (!course || !month || !year || !programme) return;

        var request = new XMLHttpRequest();
        request.open("GET", "/display?course=" + encodeURIComponent(course) + "&month=" + encodeURIComponent(month) + "&year="+ encodeURIComponent(year) + "&programme=" +encodeURIComponent(programme), true);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var assignments = JSON.parse(request.responseText);
                    var tableBody = document.getElementById("displayDtls");
                    tableBody.innerHTML = "";

                    if (assignments.length === 0) {
                        tableBody.innerHTML = "<tr><td colspan='6'>No records found.</td></tr>";
                        return;
                    }

                    assignments.forEach(function (a, index) {
                        var row = document.createElement("tr");

                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${a.enrolNo}</td>
                            <td>${a.name}</td>
                            <td>${a.grade || ''}</td>
                            <td>${a.marks || ''}</td>
                            <td>${a.remarks || ''}</td>
                        `;
                        tableBody.appendChild(row);
                    });
                } else {
                    alert("Error fetching assignments. Please try again.");
                }
            }
        };

        request.onerror = function () {
            alert("Network error. Please check your connection.");
        };

        request.send();
    }

    getQueryParams();
});