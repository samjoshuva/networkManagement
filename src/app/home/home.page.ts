import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

declare var navigator;
declare var Connection;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  navigator: any;
  Connection: any;

  address;
  constructor(
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    public alertController: AlertController,
    private inAppBrowser: InAppBrowser,
    public plt: Platform,
    private router: Router
  ) {
    // this.address = this.getMAC().toString();
    this.getMAC().then(data => {
      this.address = data.toString();
    });
  }

  async getMAC() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }

    return this.uid.MAC;
  }

  PersentAlert() {
    this.getMAC().then(async data => {
      const mac = data.toString();
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Your mac address',
        message: mac, // this.getMac()
        buttons: ['OK']
      });

      await alert.present();
    });
  }

  async dataUsage() {
    this.plt.ready().then(async () => {
      const usage = navigator.connection.type;
      const alert = await this.alertController.create({
        header: 'connection status',
        subHeader: usage,
        buttons: ['OK']
      });

      await alert.present();
    });
  }

  async checkConnection() {
    this.plt.ready().then(async () => {
      const networkState = navigator.connection.type;
      const states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      await console.log(networkState);
      const alert = await this.alertController.create({
        header: 'connection status',
        subHeader: states[networkState],
        buttons: ['OK']
      });

      await alert.present();

      console.log('alert closed');
    });
  }

  async ARPCall() {
    await this.router.navigate(['/mac/' + this.address]);
  }

  async login() {
    const target = '_blank';
    const options = { location: 'no' };
    const refLink = this.inAppBrowser.create('192.168.0.1', target);

    refLink.show();

    setTimeout(() => {
      refLink.close();
    }, 10000);
  }

  macFilter() {
    const target = '_blank';
    const options = { location: 'no' };
    const refLink = this.inAppBrowser.create('192.168.0.1', target);

    refLink.show();
  }
}
