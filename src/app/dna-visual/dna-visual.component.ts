import { Component, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';

import { D3Service, D3, Axis, BrushBehavior, BrushSelection, D3BrushEvent, ScaleLinear, ScaleOrdinal, Selection, Transition} from 'd3-ng2-service';

@Component({
    selector: 'app-dna-visual',
    templateUrl: './dna-visual.component.html',
    styleUrls: ['./dna-visual.component.css']
})
export class DnaVisualComponent implements OnInit, OnDestroy {

    private d3: D3;
    private parentNativeElement: any;
    private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

    constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }

    ngOnDestroy(){
        if(this.d3Svg.empty && !this.d3Svg.empty()){
            this.d3Svg.selectAll("*").remove();
        }
    }

    ngOnInit() {
        let self = this;
        let d3 = this.d3;
        let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
        let d3Svg: Selection<SVGSVGElement, any, null, undefined>;
        let d3G: Selection<SVGGElement, any, null, undefined>;
        let width: number;
        let height: number;

        let points: Array<[number, number, number]>;
        let colors: string[];

        let x: ScaleLinear<number, number>;
        let y: ScaleLinear<number, number>;
        let z: ScaleLinear<number, number>;

        if(this.parentNativeElement !== null){
            d3ParentElement = d3.select(this.parentNativeElement);
            d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

            points = this.initializeDataPoints();

            colors = ['#00ccff','#0099ff', '#0066ff', '#3366ff', '#6666ff', '#9966ff', '#cc66ff', '#ff66ff', '#ff66cc' , '#ff6699', '#ff6666', '#ff6633', '#ff9966'];

            x = d3.scaleLinear().range([10, width - 10]);

            d3Svg.selectAll<SVGCircleElement, any>('circle')
            .data(points)
            .enter().append<SVGCircleElement>('circle')
            .attr('cx', function(d) {return d[0]; })
            .attr('cy', function(d) {return d[1]; })
            .attr('r', 8)
            .attr('fill', function(d, index) {return colors[index%13]; });

        }
    }

    initializeDataPoints() {
        let dataPoints: Array<[number, number, number]> = [];
        for(let i = 0; i < 78; i++){
            let invert = 1;
            if(i >= 39)
                invert = -1;

            let dx = (40 + i%39*16);
            let dy = 200 + invert*28
            let dz = 0;

            let point: [number, number, number];
            point = [dx, dy, dz];
            dataPoints.push(point);
        }
        return dataPoints;
    }
}
