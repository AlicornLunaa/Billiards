let Utility = {
    /**
     * Determinant for two vectors
     * @param {p5.Vector} v1 
     * @param {p5.Vector} v2 
     */
    determinant(v1, v2){ return v1.x * v2.y - v1.y * v2.x; },

    /**
     * Function runs a line intersection algorithm and returns the
     * amount of intersection of edge2 against edge1
     * @param {p5.Vector} edge1 
     * @param {p5.Vector} edge2 
     * @returns {float}
     */
    lineIntersection(s1, e1, s2, e2){
        // Standard line intersection formula
        let xDifference = createVector(s1.x - e1.x, s2.x - e2.x);
        let yDifference = createVector(s1.y - e1.y, s2.y - e2.y);
        let divisor = this.determinant(xDifference, yDifference);

        if(divisor == 0) return -1;

        let d = createVector(this.determinant(s1, e1), this.determinant(s2, e2));
        let collision = createVector(this.determinant(d, xDifference) / divisor, this.determinant(d, yDifference) / divisor);
        return {x: collision.x, y: collision.y, overlap: divisor};
    }
}