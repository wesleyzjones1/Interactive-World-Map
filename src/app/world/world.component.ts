import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})

export class WorldComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    let svgPath = document.querySelectorAll<SVGPathElement>('path');
    Array.prototype.forEach.call(svgPath, (svgCount: SVGPathElement) => {
      svgCount.addEventListener('mouseover', (event: MouseEvent) => {
        const mouselocation = event.target as SVGPathElement;
        //change country color when mouse hovers over it
        mouselocation.style.fill = '#3d4aa1';
      });

      svgCount.addEventListener('mouseleave', (event: MouseEvent) => {
        const mouselocation = event.target as SVGPathElement;
        //change fill back to default when mouse leaves country
        mouselocation.style.fill = '';
      });

      svgCount.addEventListener('click', () => {
        this.getData(svgCount);
      });
    });
  }

  //function to retrieve country data
  async getData(svgCount: SVGPathElement) {
    let api: string = 'https://api.worldbank.org/V2/country/' + svgCount.id + '?format=json';
    let resp: Response = await fetch(api);
    let data: any = await resp.json();
    let datPath: any = data[1];

    //get country name
    let name: string = datPath[0].name;
    document.getElementById('name')!.innerText = "Country Name: " + name;
    
    //get capital
    let capital: string = datPath[0].capitalCity;
    document.getElementById('capital')!.innerText = "Capital: " + capital;
    
    //get region
    let region: string = datPath[0].region.value;
    document.getElementById('region')!.innerText = "Region: " + region;
    
    //get income level
    let incomeLevel: string = datPath[0].incomeLevel.value;
    document.getElementById('incomeLevel')!.innerText = "Income Level: " + incomeLevel;
    
    //get longitude
    let longitude: string = datPath[0].longitude;
    document.getElementById('longitude')!.innerText = "longitude: " + longitude;
    
    //get latitude
    let latitude: string = datPath[0].latitude;
    document.getElementById('latitude')!.innerText = "Latitude: " + latitude;
  }
}
