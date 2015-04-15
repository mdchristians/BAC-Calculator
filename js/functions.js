function calculate_bac() {

    var intRegex = /^\d+$/;

    // Retrieve Values from Form
    var oz = document.forms["bac_form"]["oz"].value;
    var perc = document.forms["bac_form"]["perc"].value;
    var weight = document.forms["bac_form"]["weight"].value;
    var time = document.forms["bac_form"]["time"].value;

    // Check for Fields Left Empty
    if (oz === "" || perc === "" || weight === "" || time === "") {
        alert("Please enter all fields");
        return false;
    }

    // Check for Positive Numbers
    if ((!intRegex.test(oz)) || (!intRegex.test(perc))
        || (!intRegex.test(weight)) || (!intRegex.test(time))) {
            alert("You must enter a positive integer for all values");
    return false;
    }

    // Check Percentage Format
    if (perc > 100) {
        alert("Percentage of alcohol must be between 0 and 100");
        return false;
    }

    // BAC Calculation
    var bac = (oz * perc * 0.075 / weight) - (time * 0.015);
    if (bac < 0) {
        bac = 0;
    }

    // Initial Alert
    alert("Your BAC is: " + bac);

    // Return
    return true;
}