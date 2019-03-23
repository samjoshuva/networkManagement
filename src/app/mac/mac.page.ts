import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Uid } from '@ionic-native/uid/ngx';

@Component({
  selector: 'app-mac',
  templateUrl: './mac.page.html',
  styleUrls: ['./mac.page.scss']
})
export class MacPage implements OnInit {
  address: any;

  constructor(
    private route: ActivatedRoute,
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.address = data.address;
      console.log(this.address);
    });
  }
}
