/**
 * The World class will contain a list containing all
 * the rigidbodies to update. This will be a fixed
 * timestep to keep physics accurate.
 */
class World {
    constructor(){
        // Class members
        this.bodies = [];
        this.collisions = [];
    }

    /**
     * Registers a body to be updated
     * @param {Body} body
     * @returns The body registered
     */
    registerBody(body){
        body.id = this.bodies.length;
        this.bodies.push(body);
        return body;
    }

    /**
     * Deletes the body with the ID supplied from the world
     * @param {Body} body 
     */
    deleteBody(body){
        // Remove the body at its index
        this.bodies.splice(body.id, 1);

        // Update other bodies for their indices
        for(let i = body.id; i < this.bodies.length; i++){
            this.bodies[i].id--;
        }
    }

    /**
     * Detects collisions within the world and adds manifolds for them
     */
    collisionDetection(){
        // Loop through every body
        for(let i = 0; i < this.bodies.length; i++){
            for(let k = i + 1; k < this.bodies.length; k++){
                // References to bodies
                let b1 = this.bodies[i];
                let b2 = this.bodies[k];
                
                // Check each body
                let manifold1 = b1.intersects(b2);
                let manifold2 = b2.intersects(b1);

                // Call the callback for the bodies
                if(manifold1.collides && manifold2.collides){
                    b1.collidedFunc(b2);
                    b2.collidedFunc(b1);

                    // Add manifold with smaller minimum translation vector
                    if(manifold1.intersection < manifold2.intersection){
                        this.collisions.push(manifold1);
                    } else {
                        this.collisions.push(manifold2);
                    }
                }
            }
        }
    }

    /**
     * Responds to the manifolds and resets the manifold list to get ready for the next tick
     */
    collisionResolution(){
        // Resolve the collision
        for(let manifold of this.collisions){
            manifold.solve();
        }

        this.collisions = [];
    }

    /**
     * Updates the body's position and velocities with each tick
     */
    dynamicsResponse(dt){
        // Solve for dynamics
        for(let body of this.bodies){
            body.vel.add(p5.Vector.mult(body.acc, dt));
            body.pos.add(p5.Vector.mult(body.vel, dt));
            body.acc.mult(0);

            body.angVel += body.torque * dt;
            body.rotation += body.angVel * dt;
            body.torque = 0;
        }
    }

    /**
     * Update every body within the simulation
     * @param {float} deltaTime 
     */
    update(deltaTime){
        this.collisionDetection();
        this.collisionResolution();
        this.dynamicsResponse(deltaTime);
    }
}