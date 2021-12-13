import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage implements OnInit {

  icon = './assets/images/01.png'
  temp = '--'
  weather = ' '
  min = '--'
  max = '--'

  list = []

  constructor(private http: HttpClient, private router: Router) { }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    
    console.log('Current position:', JSON.stringify(coordinates));

    if (coordinates.coords) {
      console.log('Calling getForecast');
      this.getForecast(coordinates.coords.latitude, coordinates.coords.longitude)
    }
  
  };

  async getForecast(lat, long) {
    console.log('Called getForecast');
    this.http.get('http://api.openweathermap.org/data/2.5/onecall?units=metric&lat=' + lat + '&lon=' + long + '&APPID=e993afcdbfe58a0c988f97f30f129feb')
    .subscribe((response: any) => {
      this.temp = Math.round(response['current']['temp']).toString();

      console.log('this.temp:', this.temp);

      var weatherTemp = response['current']['weather'][0]['description'];
      weatherTemp = weatherTemp.split(' ').map((str: string) => str[0].toUpperCase() + str.substring(1)).join(' ');
      
      this.weather = weatherTemp;

      let iconRq = response['current']['weather'][0]['icon'].substring(0, 2);
      iconRq = './assets/images/' + iconRq + '.png';
      this.icon = iconRq;

      this.min = Math.round(response['daily'][0]['temp']['min']).toString();
      this.max = Math.round(response['daily'][0]['temp']['max']).toString();

      let tempHourly = response['hourly'].filter(
          (time: any) => this.isToday(time)
        ).map((i: any) => i);

      this.list = tempHourly;
    }, error => {
      console.log(error)
    });
  };

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

  getTemp(item: any) {
    return Math.round(item['temp']).toString();
  }

  getIcon(item: any) {
    let iconRq = item['weather'][0]['icon'].substring(0, 2);
    iconRq = './assets/images/' + iconRq + '.png';

    return iconRq;
  }

  getHour(item: any) {
    var t = new Date(item['dt'] * 1000);

    var hours = ('0' + t.getHours()).slice(-2);
    var minutes = ('0' + t.getMinutes()).slice(-2);
    var formatted = hours + ':' + minutes;

    return formatted;
  }

  navigate(rout) {
    this.router.navigate([rout])
  }

  ngOnInit() {
    this.getCurrentPosition();
  }

}
