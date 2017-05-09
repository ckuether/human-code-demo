export class DNAModelPoint {
    point1: [number, number, number];
    point2: [number, number, number];

    constructor(){

    }

    getX1(): number {
        return this.point1[0];
    }

    getX2(): number {
        return this.point2[0];
    }

    getY1(): number {
        return this.point1[1];
    }

    getY2(): number {
        return this.point2[1];
    }

    getZ1(): number {
        return this.point1[2];
    }

    getZ2(): number {
        return this.point2[2];
    }
}