/**
 * A manifold will contain the data for how to respond
 * to a collision. This should abstract away the idea
 * of different shapes and only use points for response.
 * This will allow the manifold to be used for any
 * kind of collision.
 */
class Manifold {
    /**
     * Constructs a new manifold object
     * @param {boolean} collides 
     * @param {p5.Vector} normal 
     * @param {float} intersection 
     * @param {Body} body1
     * @param {Body} body2
     */
    constructor(collides, normal, intersection, body1, body2){
        this.collides = collides;
        this.normal = normal;
        this.intersection = intersection;
        this.body1 = body1;
        this.body2 = body2;
    }
}