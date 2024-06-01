import { LightningElement } from 'lwc';
import p1 from '@salesforce/resourceUrl/Carousel1';
import p2 from '@salesforce/resourceUrl/Carousel2';
import p3 from '@salesforce/resourceUrl/Carousel3';
import p4 from '@salesforce/resourceUrl/Carousel4';
import p5 from '@salesforce/resourceUrl/Carousel5';

export default class CarouselWrapper extends LightningElement {
slides =[
        {
        id :"1",
        src: p1,
        href: "https://www.theartsclub.ae/events/tequila-trail-18th-may/"

        },
    {
        id:"2",
        src: p2,
        href: "https://www.theartsclub.ae/events/tequila-trail-18th-may/"
    },
    {
        id:"3",
        src: p3,
        href: "https://www.theartsclub.ae/events/cinema-is-served-julia-julia/"
    },
    {
        id:"4",
        src: p4,
        href: "https://theartsclub-dev-ed.develop.my.site.com/s/member-event/a035h00000csne5AAA/dj-bliss-mr-shef-codes"
    },
    {
        id:"5",
        src: p5,
        href: "https://www.theartsclub.ae/events/champagne-discovery-part-2/"
    }]
    
}