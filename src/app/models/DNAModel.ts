import { DNAModelPoint } from './DNAModelPoint';

const MID_POINT = 200;

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

            let y = this.getNextYVal(angle * i)
            let z = this.getNextZVal(angle * i);

            let prevXVal: number = 30;
            let prevYVal: number = this.initLength;

            if(this.modelPoints.length != 0){
                prevXVal = this.modelPoints[i-1].getX();
                prevYVal = this.modelPoints[i-1].getY1() - MID_POINT;
            }

            //  Equation to find next X Value
            //
            //  x = sqrt(circleDiameter^2 - (Yprev - Ythis)^2)
            let dx = Math.sqrt(Math.pow(2*this.circleRadius, 2) - Math.pow(prevYVal - y, 2));

            let x = (prevXVal + dx);
            let y1 = MID_POINT + y;
            let y2 = MID_POINT - y;
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

    updateDataPoints(){

        let angle = 360/60;

        for(let i = 0; i < this.modelPoints.length; i++){

            let prevAngle: number;
            // let prev
            let prevY = this.modelPoints[i].getY1() - MID_POINT;

            let prevZ = this.untransformZVal(this.modelPoints[i].getZ1());

            if(prevY == this.initLength){
                prevAngle = 0;
            }else if(prevY == this.initLength){
                prevAngle = 180;
            }else if(prevY == 0 && prevZ > 0){
                prevAngle = 90;
            }else if(prevY == 0 && prevZ < 0){
                prevAngle = 270;
            }else{
                prevAngle = Math.atan(prevZ/prevY)/Math.PI*180;
            }


            let y = this.getNextYVal(prevAngle + angle);
            let z = this.getNextZVal(prevAngle + angle);

            let prevXVal: number = 30;
            let prevYVal: number = this.initLength;
            let dx: number = 2 * this.circleRadius;

            if(i != 0){
                prevXVal = this.modelPoints[i-1].getX();
                prevYVal = this.modelPoints[i-1].getY1() - MID_POINT;
                //  Equation to find next X Value
                //
                //  x = sqrt(circleDiameter^2 - (Yprev - Ythis)^2)
                dx = Math.sqrt(Math.pow(2*this.circleRadius, 2) - Math.pow(prevYVal - y, 2));
            }




            this.modelPoints[i].setX(prevXVal + dx);

            this.modelPoints[i].setY1(MID_POINT + y);
            this.modelPoints[i].setY2(MID_POINT - y);
            this.modelPoints[i].setZ1(this.transformZVal(z));
            this.modelPoints[i].setZ2(this.transformZVal(-z));

        }

    }

    getNextYVal(angle: number): number{
        return this.initLength*Math.cos(angle * Math.PI/180);
    }

    getNextZVal(angle: number): number{
        return this.initLength*Math.sin(angle * Math.PI/180);
    }

    getModelPoints(): Array<DNAModelPoint>{
        return this.modelPoints;
    }

    getCircleRadius(): number {
        return this.circleRadius;
    }

    /*
     * Transforms Z Value index into a a number b/w 0-1
     * Opacity and Radius are calculated based off this value
     */
     transformZVal(z: number): number{
         return Math.pow((z+this.initLength)/(2*this.initLength), 1/8);
     }

     untransformZVal(z: number): number{
         z = Math.pow(z, 8);
         z = z*2*this.initLength;
         z = z - this.initLength;
         return z;
     }

 }