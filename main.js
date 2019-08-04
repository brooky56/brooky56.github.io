//function that check selected option in profList selector and depend on it puts properties for elements
function getProfListStatus() {
    $(document).ready(function () {
        $("#profList").change(function () {
            //implicitly declaration give us opportunity to use this valuable further
            selectedProf = $(this).children("option:selected").val();
            if (selectedProf === "Физическое лицо") {
                $("#organizationList").prop({disabled: 'true', required: 'false'});
                $("#ndcInputFiled").prop({disabled: 'true', placeholder: "13"});
                $("#ndcInputFiled").val(13);
            } else if (selectedProf === "Юридическое лицо") {
                $("#organizationList").prop("disabled", false);
                $("#ndcInputFiled").prop({disabled: 'true', placeholder: "17"});
                $("#checkBoxBlock").attr("hidden", false);
                $("#ndcInputFiled").val(17);
            }
        });
    });
}

// INN input text field validation function
function innFieldValidation() {
    $(document).ready(function () {
        $('#innInputField').keyup(function () {
            let inputInn = $('#innInputField').val();
            $('#errMsgInn').empty();
            if (selectedProf === "Физическое лицо" && (inputInn.length > 12 || inputInn.length < 12)) {
                $('#errMsgInn').css("color", "red");
                $('#errMsgInn').text("Invalid input length: \n" + inputInn.length);
            } else if (selectedProf === "Юридическое лицо" && (inputInn.length > 10 || inputInn.length < 10)) {
                $('#errMsgInn').css("color", "red");
                $('#errMsgInn').text("Invalid input length: \n" + inputInn.length);
            }
        });
    })
}
//function checks if user checked possibility for simplify taxation
function taxationCheckBoxChecked() {
    $(document).ready(function () {
        $("#simpleTaxation").change(function () {
            if (this.checked) {
                $("#innInputField").val("");
                $("#innInputField").prop({disabled: 'true', required: 'false'});
            } else {
                $(document).ready(function () {
                    $("#innInputField").attr("disabled", false);
                    $("#checkBoxBlock").attr("hidden", true);
                });
            }
        });
    });
}
// Phone number text field validation function
function validPhoneNumber() {
    let numberValidationRegEx = /(\+?7|8)(9\d{2})(\d{3})(\d{4})/; // +7XXXXXXXXXX or 8XXXXXXXXXXX format
    $(document).ready(function () {
        $('#phoneNumberInputField').keyup(function () {
            let inputData = $('#phoneNumberInputField').val();
            if (!numberValidationRegEx.test(inputData) && inputData !== "") {
                $('#errMsgPhone').css("color", "red");
                $('#errMsgPhone').text("Invalid input");
            } else {
                $("#errMsgPhone").empty();
            }
        });
    });
}

// payment sum text field validation, checks that input number are positive, decimal and bigger > 1
function paymentSumValidation() {
    let paymentValidationRegEx = /^[1-9][\.\d]*(,\d+)?$/;
    $(document).ready(function () {
        $('#paymentSum').keyup(function () {
            let inputData = $('#paymentSum').val();
            if (!paymentValidationRegEx.test(inputData) && inputData !== "") {
                $('#errMsgPayment').css("color", "red");
                $('#errMsgPayment').text("Invalid number");
                flag = false;
            } else {
                $("#errMsgPayment").empty();
                flag = true;
            }
            result = parseFloat(inputData).toFixed(2);
        });
    });
}

//function that prepare the result payment number when user move mouse out of #paymentSum block
function getFinalSumResult() {
    $(document).ready(function () {
        $("#paymentSum").mouseout(function () {
            if (flag) {
                let nds = $("#ndcInputFiled").val();
                let finalResult = result * (1 + (+nds / 100));
                $("#resultSum").val(parseFloat(finalResult).toFixed(2));
            } else {
                $("#resultSum").val("");
            }
        });
    });
}

//functions call list
getProfListStatus();
innFieldValidation();
taxationCheckBoxChecked();
validPhoneNumber();
paymentSumValidation();
getFinalSumResult();
