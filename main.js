function getProfListStatus() {
  $(document).ready(function () {
    $("#profList").change(function () {
      selectedProf = $(this).children("option:selected").val();
      if (selectedProf === "Физическое лицо") {
        $("#organizationList").prop({disabled: 'true', required: 'false'});
        $("#ndcInputFiled").prop({disabled: 'true', placeholder: "13"});
        $("#ndcInputFiled").val(13);
      } else if (selectedProf === "Юридическое лицо") {
        $("#organizationList").prop("disabled", false);
        $("#ndcInputFiled").prop({disabled: 'true', placeholder: "17"});
        $("#checkBox").attr("hidden", false);
        $("#ndcInputFiled").val(17);
      }
    });
  });
}

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

function taxationCheckBoxChecked() {
  $(document).ready(function () {
    $("#simpleTaxation").change(function () {
      if (this.checked) {
        $("#innInputField").val("");
        $("#innInputField").prop({disabled: 'true', required: 'false'});
      }
    });
    $("#simpleTaxation").mouseout(function () {
      let input = $("#innInputField").val();
        if (this.unchecked) {
          $("#innInputField").val(input);
          $("#innInputField").prop({disabled: 'false', required: 'true'});
        }
    });
  });
}

function validPhoneNumber() {
  let numberValidationRegEx = /(\+?7|8)(9\d{2})(\d{3})(\d{4})/;
  $(document).ready(function () {
    $('#phoneNumberInputField').keyup(function () {
      let inputData = $('#phoneNumberInputField').val();
      if (!numberValidationRegEx.test(inputData) && inputData !== "") {
        $('#errMsgPhone').css("color", "red");
        $('#errMsgPhone').text("Invalid input");
      } else {
        $("#errmsgPhone").empty();
      }
    });
  });
}

function paymentSumValidation() {
  let numberValidationRegEx = /^[1-9][\.\d]*(,\d+)?$/;
  $(document).ready(function () {
    $('#paymentSum').keyup(function () {
      let inputData = $('#paymentSum').val();
      if (!numberValidationRegEx.test(inputData) && inputData !== "") {
        $('#errmsgPhone').css("color", "red");
        $('#errmsgPhone').text("Invalid number");
        flag = false;
      } else {
        $("#errMsgPhone").empty();
        flag = true;
      }
      result = parseFloat(inputData).toFixed(2);
    });
  });
}

function getFinalSumResult() {
  $(document).ready(function () {
    $("#paymentSum").mouseout(function () {
      if (flag) {
      debugger;
        let nds = $("#ndcInputFiled").val();
        let finalResult = result * (1 + (+nds / 100));
        $("#resultSum").val(parseFloat(finalResult).toFixed(2));
      } else {
        $("#resultSum").val("");
      }
    });
  });
}

getProfListStatus();
innFieldValidation();
taxationCheckBoxChecked();
validPhoneNumber();
paymentSumValidation();
getFinalSumResult();
