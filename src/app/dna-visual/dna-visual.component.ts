import { Component, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';

import { D3Service, D3, Axis, BrushBehavior, BrushSelection, D3BrushEvent, ScaleLinear, ScaleOrdinal, Selection, Transition} from 'd3-ng2-service';

import {DNAModel} from '../models/DNAModel';

@Component({
    selector: 'app-dna-visual',
    templateUrl: './dna-visual.component.html',
    styleUrls: ['./dna-visual.component.css']
})
export class DnaVisualComponent implements OnInit, OnDestroy {

    private d3: D3;
    private parentNativeElement: any;
    private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

    dnaModel: DNAModel;

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

        let colors: string[];

        let x: ScaleLinear<number, number>;
        let y: ScaleLinear<number, number>;
        let z: ScaleLinear<number, number>;

        if(this.parentNativeElement !== null){
            d3ParentElement = d3.select(this.parentNativeElement);
            d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

            colors = ['#00ccff','#0099ff', '#0066ff', '#3366ff', '#6666ff', '#9966ff', '#cc66ff', '#ff66ff', '#ff66cc' , '#ff6699', '#ff6666', '#ff6633', '#ff9966'];

            this.dnaModel = new DNAModel();
            let circleRadius = this.dnaModel.getCircleRadius();

            d3Svg.selectAll<SVGLineElement, any>('line')
            .data(this.dnaModel.getModelPoints())
            .enter().append<SVGRectElement>('line')
            .attr('x1', function(d) {return d.getX()})
            .attr('x2', function(d) {return d.getX()})
            .attr('y1', function(d) {return d.getY1()})
            .attr('y2', function(d) {return d.getY2()})
            .attr('stroke', function(d, index) {return colors[index%13]})
            .attr('stroke-width', 2)
            .attr('opacity', function(d) {return  d.getZ1() >= d.getZ2() ? d.getZ2() : d.getZ1() })

            d3Svg.selectAll<SVGCircleElement, any>('circle')
            .data(this.dnaModel.getCircleDataPoints())
            .enter().append<SVGCircleElement>('circle')
            .attr('cx', function(d) {return d[0]; })
            .attr('cy', function(d) {return d[1]; })
            .attr('r', function(d) { return circleRadius * d[2]; })
            .attr('fill', function(d, index) {return colors[index%13]; })
            .attr('fill-opacity', function(d) {return d[2]})

        }
    }

}
