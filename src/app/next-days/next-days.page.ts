import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-next-days',
  templateUrl: './next-days.page.html',
  styleUrls: ['./next-days.page.scss'],
})
export class NextDaysPage implements OnInit {

  icon = './assets/images/01.png'
  temp = '--'
  weather = ' '
  min = '--'
  max = '--'

  list = []

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    if (coordinates.coords) {
      this.getForecast(coordinates.coords.latitude, coordinates.coords.longitude)
    }
  
    console.log('Current position:', coordinates);
  };

  async getForecast(lat, long) {
    this.http.get('http://api.openweathermap.org/data/2.5/onecall?units=metric&lat=' + lat + '&lon=' + long + '&APPID=e993afcdbfe58a0c988f97f30f129feb')
    .subscribe((response: any) => {

      let tempHourly = response['daily'];

      this.list = tempHourly;
    }, error => {
      console.log(error)
    });
  };

  getDay(item: any) {
    let newStartDate = new Date(item['dt'] * 1000);

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    if (this.isToday(item)) {
        return 'Today';
    } else {
        return days[newStartDate.getDay()];
    }
  }

  getIcon(item: any) {
    let iconRq = item['weather'][0]['icon'].substring(0, 2);
    iconRq = './assets/images/' + iconRq + '.png';

    return iconRq;
  }

  getMin(item: any) {
    return Math.round(item['temp']['min']).toString();
  }

  getMax(item: any) {
      return Math.round(item['temp']['max']).toString();
  }

  isToday(time: any) {

    let newStartDate = new Date(time['dt'] * 1000);
    newStartDate = new Date(newStartDate.getFullYear(), newStartDate.getMonth(), newStartDate.getDate());
    let newEndDate = new Date();
    newEndDate = new Date(newEndDate.getFullYear(), newEndDate.getMonth(), newEndDate.getDate());
    let one_day = 1000 * 60 * 60 * 24;
    let result = Math.ceil((newEndDate.getTime()-newStartDate.getTime())/(one_day))

    if (result == 0) {
        return true;
    } else {
        return false;
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
    this.getCurrentPosition();
  }

}
