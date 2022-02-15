/**
 * A manifold will contain the data for how to respond
 * to a collision. This should abstract away the idea
 * of different shapes and only use points for response.
 * This will allow the manifold to be used for any
 * kind of collision.
 */
function lline(x1, y1, x2, y2){ line(x1, y1, x1 + x2, y1 + y2); }

class Manifold {
    /**
     * Constructs a new manifold object
     * @param {boolean} collides 
     * @param {p5.Vector} normal 
     * @param {float} intersection 
     * @param {Body} body1
     * @param {Body} body2
     */
    constructor(collides, normal, intersection, contactPoint, body1, body2){
        this.collides = collides;
        this.normal = normal;
        this.intersection = intersection;
        this.contactPoint = contactPoint;
        this.body1 = body1;
        this.body2 = body2;
    }

    getImpulseScale(){
        let relativeVelocity = p5.Vector.sub(this.body2.vel, this.body1.vel);
        let restitution = min(this.body1.elasticity, this.body2.elasticity);

        let contact1 = p5.Vector.sub(this.contactPoint, this.body1.pos);
        let contact2 = p5.Vector.sub(this.contactPoint, this.body2.pos);

        let invMass1 = 1 / this.body1.mass;
        let invInert1 = 1 / this.body1.inertia;
        let invMass2 = 1 / this.body2.mass;
        let invInert2 = 1 / this.body2.inertia;

        let angEnergy1 = p5.Vector.mult(contact1.cross(this.normal), invInert1).cross(contact1);
        let angEnergy2 = p5.Vector.mult(contact2.cross(this.normal), invInert2).cross(contact2);

        // Impulse resolution equation
        let numerator = this.normal.dot(p5.Vector.mult(relativeVelocity, -(1 + restitution)));
        let denomator = (invMass1 + invMass2) * 4 /*+ this.normal.dot(p5.Vector.add(angEnergy1, angEnergy2))*/;

        return numerator / denomator;
    }

    positionCorrection(){
        if(!this.body1.static) this.body1.pos.add(p5.Vector.mult(this.normal, this.intersection * 0.5));
        if(!this.body2.static) this.body2.pos.add(p5.Vector.mult(this.normal, this.intersection * -0.5));
    }

    impulseCorrection(){
        let impulse = this.getImpulseScale();
        let contact1 = p5.Vector.sub(this.contactPoint, this.body1.pos);
        let contact2 = p5.Vector.sub(this.contactPoint, this.body2.pos);
        
        if(!this.body1.static){
            this.body1.vel.sub(p5.Vector.mult(this.normal, impulse / this.body1.mass));
            this.body1.angVel -= impulse * (1 / this.body1.inertia) * contact1.cross(this.normal).z;
        }

        if(!this.body2.static){
            this.body2.vel.add(p5.Vector.mult(this.normal, impulse / this.body2.mass));
            this.body2.angVel += impulse * (1 / this.body2.inertia) * contact2.cross(this.normal).z;
        }
    }

    /**
     * Takes the collision and adjusts the position and velocity to match
     */
    solve(){
        if(this.normal.x == 0 && this.normal.y == 0) return;
        if(this.body1.isTrigger || this.body2.isTrigger) return;
        
        this.positionCorrection();
        this.impulseCorrection();
    }
}