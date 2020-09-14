import { Component, OnInit } from "@angular/core";
declare var RazorpayCheckout: any;
@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  paymentAmount = null;
  ngOnInit() {}
  takeAttendance(item): void {
    console.log("take attendance");
  }

  payWithRazor() {
    let email = localStorage.getItem("email");
    let name =
      localStorage.getItem("first_name") +
      " " +
      localStorage.getItem("last_name");
    var options = {
      description: "Credits towards tution",
      image: "assets/img/logo.png",
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_yufjDUFcYV08zS", // your Key Id from Razorpay dashboard
      amount: +this.paymentAmount * 100 + "", // Payment amount in smallest denomiation e.g. cents for USD
      name: "T Tutorial",
      prefill: {
        email: email,
        contact: "",
        name: name,
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: function () {
          alert("dismissed");
        },
      },
    };

    var successCallback = function (payment_id) {
      alert("payment_id: " + payment_id);
    };

    var cancelCallback = function (error) {
      alert(error.description + " (Error " + error.code + ")");
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

  updatePayment(event) {
    this.paymentAmount = event.target.value;
  }
}
