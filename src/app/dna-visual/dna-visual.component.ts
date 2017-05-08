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
        let d3 = this.d3;
        let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
        let d3Svg: Selection<SVGSVGElement, any, null, undefined>;

        let fills = ['#00779C', '#00465C', '#54B8B1', '#377874', '#455560', '#7C99AC', '#F5CC49', '#F5CC9C', '#A8353D', '#682126'];
        let h: number;
        let w: number;
        let numX = 40;
        let numY = 30;
        let speed = 0.02;
        let torsion = 0.2;
        let x = d3.scaleLinear().range([10, w - 10]);
        let y = d3.scaleLinear().range([h - 10, 10]);
        let z = d3.scaleLinear().range([10, 2]);

        d3ParentElement = d3.select(this.parentNativeElement);
        d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

        w = +d3Svg.attr('width');
        h = +d3Svg.attr('height');

        d3Svg.append("rect")
        .attr('width', w)
        .attr('height', h)
        .attr('fill', 'white');

        let container = d3Svg.append('g');

        let counter = 0;
        function generateData() {
            counter++;
            var data = d3.range(numX).map(function (d) {
                var t = d * torsion - speed * counter;
                return[
                    {
                        x: d,
                        y: Math.cos(t),
                        z: Math.sin(t)
                    },
                    {
                        x: d,
                        y: Math.cos(t - Math.PI),
                        z: Math.sin(t - Math.PI)
                    }
                ]
            });

            let flat = d3.merge(data);
            x.domain(d3.extent(flat, function(d) {return d.x}));
            y.domain(d3.extent(flat, function(d) {return d.y}));
            z.domain(d3.extent(flat, function(d) {return d.z}));

            return data;
        }

        function draw() {
            let cont = container.selectAll("g").data(generateData());
            cont.exit().remove();

            let enter = cont.enter()
            .append('g').each(function (d, index) {

                d3.select(this)
                .selectAll('circle')
                .data(d)
                .enter()
                .append('circle')
                .attr('fill', 'black');

                d3.select(this).append('line')
                .attr('stroke', function (d, i) {return fills[index%7]})
                .attr('stroke-width', 2);
            });

            cont.each(function (d, index) {
                let inverted = (d[0].y < d[1].y) ? 1 : -1;

                d3.select(this)
                .selectAll('circle')
                .data(d)
                .attr('cx', function (d) { return x(d.x) })
                .attr('cy', function (d) { return y(d.y) })
                .attr('r', function (d) { return z(d.z) })
                .attr('fill-opacity', function (d) { return z(d.z) / 10 })
                .attr('fill', function (d,i) { return fills[index%7]; });

                d3.select(this)
                .select('line')
                .attr('x2', x(d[0].x))
                .attr('x1', x(d[0].x))
                .attr('y2', y(d[0].y) - inverted * z(d[0].z))
                .attr('y1', y(d[1].y) + inverted * z(d[1].z))
                .attr('opacity', 0.3 * inverted * (d[1].y - d[0].y));
            });
        }
        setInterval(draw, 25);
    }

    // ngOnInit() {
    //     let self = this;
    //     let d3 = this.d3;
    //     let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    //     let d3Svg: Selection<SVGSVGElement, any, null, undefined>;
    //     let d3G: Selection<SVGGElement, any, null, undefined>;
    //     let width: number;
    //     let height: number;

    //     let points: Array<[number, number]>;
    //     let colors: string[];

    //     let x: ScaleLinear<number, number>;
    //     let y: ScaleLinear<number, number>;
    //     let z: ScaleLinear<number, number>;

    //     if(this.parentNativeElement !== null){
    //         d3ParentElement = d3.select(this.parentNativeElement);
    //         d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

    //         points = [[140, 200], [180, 200], [220, 200], [260, 200], [300, 200], [340, 200], [380, 200], [420, 200], [460, 200], [500, 200], [540, 200], [580, 200], [620, 200]];
    //         colors = ['#00ccff','#0099ff', '#0066ff', '#3366ff', '#6666ff', '#9966ff', '#cc66ff', '#ff66ff', '#ff66cc' , '#ff6699', '#ff6666', '#ff6633', '#ff9966'];

    //         x = d3.scaleLinear().range([10, width - 10]);

    //         d3Svg.selectAll<SVGCircleElement, any>('circle')
    //         .data(points)
    //         .enter().append<SVGCircleElement>('circle')
    //         .attr('cx', function(d) {return d[0]; })
    //         .attr('cy', function(d) {return d[1]; })
    //         .attr('r', 20)
    //         .attr('fill', function(d, index) {return colors[index%13]; });

    //     }
    // }

}
