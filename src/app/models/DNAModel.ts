import { DNAModelPoint } from './DNAModelPoint';

export class DNAModel {
    private modelPoints: Array<DNAModelPoint>

    constructor(){
        this.modelPoints = [];

        this.initDataPoints();
    }

    initDataPoints(){
        for(let i = 0; i < 39; i++){
            let dnaPoint = new DNAModelPoint();

            let y = 28*Math.cos(27.7 * i)
            let z = 28*Math.sin(27.7 * i)

            let dx = (46 + i*16);
            let dy1 = 200 + y;
            let dy2 = 200 - y;
            let dz1 = z;
            let dz2 = -z;

            dnaPoint.point1 = [dx, dy1, dz1];
            dnaPoint.point2 = [dx, dy2, dz2];

            this.modelPoints.push(dnaPoint);
        }
    }

    getCircleDataPoints(): Array<[number, number, number]>{
        debugger;
        let circlePoints: Array<[number,number,number]> = [];

        for(let modelPoint of this.modelPoints){
            circlePoints.push(modelPoint.point1);
        }
        for(let modelPoint of this.modelPoints){
            circlePoints.push(modelPoint.point2);
        }

        return circlePoints;
    }

    getModelPoints(): Array<DNAModelPoint>{
        return this.modelPoints;
    }
}