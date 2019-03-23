import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private inAppBrowser: InAppBrowser, private router: Router) {}

  ngOnInit() {}

  async login() {
    const target = '_blank';
    const options = { location: 'no' };
    const refLink = this.inAppBrowser.create('192.168.0.1', target);

    refLink.show();

    setTimeout(() => {
      refLink.close();
      this.router.navigate(['/home']);
    }, 2000);
  }
}
