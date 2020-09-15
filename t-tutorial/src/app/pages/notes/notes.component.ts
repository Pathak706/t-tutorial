import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import API from "src/app/services/api.service";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
})
export class NotesComponent implements OnInit {
  constructor(
    public httpClint: HttpClient,
    private api: API,
    private iab: InAppBrowser
  ) {}
  notesFetched: any = [];
  file: any;
  ngOnInit() {
    this.fetchAllNotes();
  }

  handleFileInput(event) {
    this.file = event.target.files[0];
  }

  goToUploadFile(): void {
    const formData = new FormData();
    formData.append("notes", this.file);

    this.httpClint
      .post<any>(`http://18.218.213.253/api/file-uplaod`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }

  fetchAllNotes(): void {
    this.api.getRequest("get-all-notes").subscribe(
      (res: any) => {
        this.notesFetched = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadFile(item): void {
    let browser = this.iab.create(
      `http://18.218.213.253/uploads/Notes/${item.file_path}`,
      "_system"
    );
  }
}
