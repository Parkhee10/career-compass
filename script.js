let applications =
    JSON.parse(
        localStorage.getItem("applications")
    ) || [];

// Display applications
function displayApplications() {

    let applicationList =
        document.getElementById(
            "applicationList"
        );

    applicationList.innerHTML = "";

    let filterStatus =
        document.getElementById(
            "filterStatus"
        ).value;

    let searchText =
        document.getElementById(
            "searchBox"
        ).value.toLowerCase();

    let sortOption =
        document.getElementById(
            "sortOption"
        ).value;

    let appliedCount = 0;
    let interviewCount = 0;
    let rejectedCount = 0;
    let selectedCount = 0;

    let applicationsToShow =
        [...applications];

    // Sorting
    if (sortOption === "AZ") {

        applicationsToShow.sort(
            function (a, b) {

                return a.company
                    .localeCompare(
                        b.company
                    );
            }
        );
    }

    if (sortOption === "ZA") {

        applicationsToShow.sort(
            function (a, b) {

                return b.company
                    .localeCompare(
                        a.company
                    );
            }
        );
    }

    // Loop through applications
    for (
        let application
        of applicationsToShow
    ) {

        // Dashboard counts
        if (
            application.status ===
            "Applied"
        ) {
            appliedCount++;
        }

        if (
            application.status ===
            "Interview"
        ) {
            interviewCount++;
        }

        if (
            application.status ===
            "Rejected"
        ) {
            rejectedCount++;
        }

        if (
            application.status ===
            "Selected"
        ) {
            selectedCount++;
        }

        // Filter
        if (
            filterStatus !== "All" &&
            application.status !==
            filterStatus
        ) {
            continue;
        }

        // Search
        if (
            application.company
                .toLowerCase()
                .includes(searchText)
            === false
        ) {
            continue;
        }

        let newApplication =
            document.createElement(
                "li"
            );

        let statusColor = "";

        if (
            application.status ===
            "Applied"
        ) {
            statusColor = "orange";
        }

        if (
            application.status ===
            "Interview"
        ) {
            statusColor = "blue";
        }

        if (
            application.status ===
            "Selected"
        ) {
            statusColor = "green";
        }

        if (
            application.status ===
            "Rejected"
        ) {
            statusColor = "red";
        }

        newApplication.innerHTML =
            `
            <strong>${application.company}</strong>
            - ${application.role}

            <span
                style="
                color:white;
                background:${statusColor};
                padding:4px 8px;
                border-radius:5px;
                margin-left:10px;
                ">
                ${application.status}
            </span>

            <br>

            <small>
                Applied On:
                ${application.date || "Unknown"}
            </small>
            `;

        // Edit Details Button
        let editDetailsButton =
            document.createElement(
                "button"
            );

        editDetailsButton.textContent =
            "Edit";

        editDetailsButton.onclick =
            function () {

                let newCompany =
                    prompt(
                        "Enter Company Name",
                        application.company
                    );

                let newRole =
                    prompt(
                        "Enter Role Name",
                        application.role
                    );

                if (
                    newCompany &&
                    newRole
                ) {

                    application.company =
                        newCompany;

                    application.role =
                        newRole;

                    localStorage.setItem(
                        "applications",
                        JSON.stringify(
                            applications
                        )
                    );

                    displayApplications();
                }
            };

        // Next Status Button
        let editButton =
            document.createElement(
                "button"
            );

        editButton.textContent =
            "Next Status";

        editButton.onclick =
            function () {

                if (
                    application.status ===
                    "Applied"
                ) {
                    application.status =
                        "Interview";
                }

                else if (
                    application.status ===
                    "Interview"
                ) {
                    application.status =
                        "Selected";
                }

                else if (
                    application.status ===
                    "Selected"
                ) {
                    application.status =
                        "Rejected";
                }

                else {
                    application.status =
                        "Applied";
                }

                localStorage.setItem(
                    "applications",
                    JSON.stringify(
                        applications
                    )
                );

                displayApplications();
            };

        // Delete Button
        let deleteButton =
            document.createElement(
                "button"
            );

        deleteButton.textContent =
            "Delete";

        deleteButton.onclick =
            function () {

                let confirmDelete =
                    confirm(
                        "Are you sure you want to delete this application?"
                    );

                if (!confirmDelete) {
                    return;
                }

                let index =
                    applications.indexOf(
                        application
                    );

                applications.splice(
                    index,
                    1
                );

                localStorage.setItem(
                    "applications",
                    JSON.stringify(
                        applications
                    )
                );

                displayApplications();
            };

        newApplication.appendChild(
            editDetailsButton
        );

        newApplication.appendChild(
            editButton
        );

        newApplication.appendChild(
            deleteButton
        );

        applicationList.appendChild(
            newApplication
        );
    }

    // Dashboard update
    document.getElementById(
        "totalApplications"
    ).textContent =
        "Total Applications: " +
        applications.length;

    document.getElementById(
        "appliedCount"
    ).textContent =
        "Applied: " +
        appliedCount;

    document.getElementById(
        "interviewCount"
    ).textContent =
        "Interview: " +
        interviewCount;

    document.getElementById(
        "rejectedCount"
    ).textContent =
        "Rejected: " +
        rejectedCount;

    document.getElementById(
        "selectedCount"
    ).textContent =
        "Selected: " +
        selectedCount;

    // Success Rate
    let successRate = 0;

    if (applications.length > 0) {
        successRate = Math.round(
            (selectedCount /
                applications.length) * 100
        );
    }

    document.getElementById(
        "successRate"
    ).textContent =
        successRate + "%";
}

// Add Application
function addApplication() {

    let companyName =
        document.getElementById(
            "company"
        ).value;

    let roleName =
        document.getElementById(
            "role"
        ).value;

    let status =
        document.getElementById(
            "status"
        ).value;

    if (
        companyName === "" ||
        roleName === ""
    ) {
        alert(
            "Please fill both fields!"
        );
        return;
    }

    let today =
        new Date()
            .toLocaleDateString();

    let application = {
        company: companyName,
        role: roleName,
        status: status,
        date: today
    };

    applications.push(
        application
    );

    localStorage.setItem(
        "applications",
        JSON.stringify(
            applications
        )
    );

    displayApplications();

    document.getElementById(
        "company"
    ).value = "";

    document.getElementById(
        "role"
    ).value = "";
}

// Initial Load
displayApplications();

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );
}
