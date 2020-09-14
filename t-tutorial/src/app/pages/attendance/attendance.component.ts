import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"],
})
export class AttendanceComponent implements OnInit {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  genedCode = null;
  role: number = null;
  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {
    this.role = +localStorage.getItem("role");
    if (this.role === 2) {
      this.scanCode();
    } else if (this.role === 3) {
      this.createdCode = localStorage.getItem("id");
    }
  }

  createCode() {
    this.createdCode = this.genedCode;
  }

  scanCode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.scannedCode = barcodeData.text;
    });
  }

  hideCode() {
    this.createdCode = null;
  }

  genCode(event) {
    this.genedCode = event.target.value;
  }
}
