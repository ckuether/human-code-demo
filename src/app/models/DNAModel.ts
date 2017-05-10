import { DNAModelPoint } from './DNAModelPoint';

export class DNAModel {

    private modelPoints: Array<DNAModelPoint>
    private circleRadius: number;
    private lineLength: number;

    private initLength: number;

    constructor(){
        this.modelPoints = [];
        this.circleRadius = 12;
        this.lineLength = 25;
        this.initLength = this.circleRadius + this.lineLength;

        this.initDataPoints();
    }

    initDataPoints(){
        let angle = 360/13;

        let changeInX = 0; //track change in X dist from origin
        for(let i = 0; i < 39; i++){
            let dnaPoint = new DNAModelPoint();

            // let initLength = this.lineLength + this.circleRadius;

            // let y = Math.abs(initLength*Math.cos(angle * i));
            let y = this.getNextYVal(angle, i)
            // let z = initLength*Math.sin(angle * i)
            let z = this.getNextZVal(angle, i);

            let prevXVal: number = 30;
            let prevYVal: number = this.initLength;

            if(this.modelPoints.length != 0){
                prevXVal = this.modelPoints[i-1].getX();
                prevYVal = this.modelPoints[i-1].getY1() - 200;
            }

            //  Equation to find next X Value
            //
            //  x = sqrt(circleDiameter^2 - (Yprev - Ythis)^2)
            let dx = Math.sqrt(Math.pow(2*this.circleRadius, 2) - Math.pow(prevYVal - y, 2));

            let x = (prevXVal + dx);
            let y1 = 200 + y;
            let y2 = 200 - y;
            // let z1 = Math.pow((z+initLength)/(2*initLength), 1/10);
            // let z2 = Math.pow((-z+initLength)/(2*initLength), 1/10);
            let z1 = this.transformZVal(z);
            let z2 = this.transformZVal(-z);

            dnaPoint.point1 = [x, y1, z1];
            dnaPoint.point2 = [x, y2, z2];

            this.modelPoints.push(dnaPoint);
        }
    }

    getCircleDataPoints(): Array<[number, number, number]>{
        let circlePoints: Array<[number,number,number]> = [];

        for(let modelPoint of this.modelPoints){
            circlePoints.push(modelPoint.point1);
        }
        for(let modelPoint of this.modelPoints){
            circlePoints.push(modelPoint.point2);
        }

        return circlePoints;
    }

    // updateDataPoints(){

    //     let angle = 360/60;

    //     for(let modelPoint of this.modelPoints){

    //     }

    // }

    getNextYVal(angle: number, index: number): number{
        return Math.abs(this.initLength*Math.cos(angle * index));
    }

    getNextZVal(angle: number, index: number): number{
        return this.initLength*Math.sin(angle * index);
    }

    /*
     * Transforms Z Value index into a a number b/w 0-1
     * Opacity and Radius are calculated based off this value
     */
    transformZVal(z: number): number{
        return Math.pow((z+this.initLength)/(2*this.initLength), 1/10);
    }

    getModelPoints(): Array<DNAModelPoint>{
        return this.modelPoints;
    }

    getCircleRadius(): number {
        return this.circleRadius;
    }
}