export class DNAModelPoint {
    point1: [number, number, number];
    point2: [number, number, number];

    initLength: number;

    constructor(){
    }

    setX(x: number){
        this.point1[x];
        this.point2[-x]
    }

    getX(): number {
        return this.point1[0];
    }

    setY1(y1: number){
        this.point1[1] = y1;
    }

    getY1(): number {
        return this.point1[1];
    }

    setY2(y2: number){
        this.point2[1] = y2;
    }

    getY2(): number {
        return this.point2[1];
    }

    setZ1(z1: number){
        this.point1[2] = z1;
    }

    getZ1(): number {
        return this.point1[2];
    }

    setZ2(z2: number){
        this.point2[2] = z2;
    }

    getZ2(): number {
        return this.point2[2];
    }
}