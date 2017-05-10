import { Component, ElementRef, NgZone, OnInit } from '@angular/core';

import { D3Service, D3, Axis, BrushBehavior, BrushSelection, D3BrushEvent, ScaleLinear, ScaleOrdinal, Selection, Transition} from 'd3-ng2-service';

import {DNAModel} from '../models/DNAModel';

@Component({
    selector: 'app-dna-visual',
    templateUrl: './dna-visual.component.html',
    styleUrls: ['./dna-visual.component.css']
})
export class DnaVisualComponent implements OnInit {

    private d3: D3;
    private parentNativeElement: any;

    constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }

    ngOnInit() {
        let dnaModel = new DNAModel();

        let d3ParentElement: Selection<HTMLElement, any, null, undefined>;

        d3ParentElement = this.d3.select(this.parentNativeElement);
        let d3Svg: Selection<SVGSVGElement, any, null, undefined>;
        d3Svg = d3ParentElement.select<SVGSVGElement>('svg');
        d3Svg.style('background', 'black');

        let colors = ['#00ccff','#0099ff', '#0066ff', '#3366ff', '#6666ff', '#9966ff', '#cc66ff', '#ff66ff', '#ff66cc' , '#ff6699', '#ff6666', '#ff6633', '#ff9966'];
        let circleRadius = dnaModel.getCircleRadius();

        setInterval(function(){

            let circles = d3Svg.selectAll<SVGCircleElement, any>('circle').data(dnaModel.getCircleDataPoints());
            circles.exit().remove();
            let lines = d3Svg.selectAll<SVGRectElement, any>('line').data(dnaModel.getModelPoints());
            lines.exit().remove();

            lines.enter().append<SVGRectElement>('line').merge(lines)
            .attr('x1', function(d) {return d.getX()})
            .attr('x2', function(d) {return d.getX()})
            .attr('y1', function(d) {return d.getY1()})
            .attr('y2', function(d) {return d.getY2()})
            .attr('stroke', function(d, index) {return colors[index%13]})
            .attr('stroke-width', 2)
            .attr('opacity', function(d) {return  d.getZ1() >= d.getZ2() ? d.getZ2() : d.getZ1() })


            circles.enter().append<SVGCircleElement>('circle').merge(circles)
            .attr('cx', function(d) {return d[0]; })
            .attr('cy', function(d) {return d[1]; })
            .attr('r', function(d) { return circleRadius * d[2]; })
            .attr('fill', function(d, index) {return colors[index%13]; })
            .attr('fill-opacity', function(d) {return d[2]})

            dnaModel.updateDataPoints();
        }, 25);
    }
}
