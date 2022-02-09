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
                let collided = false;
                let b1 = this.bodies[i];
                let b2 = this.bodies[k];

                // With each body check each collider
                for(let j = 0; j < b1.colliders.length; j++){
                    for(let l = 0; l < b2.colliders.length; l++){
                        let manifold = b1.colliders[j].intersects(b2.colliders[l]);
                        
                        if(manifold.collides){
                            this.collisions.push(manifold);
                            collided = true;
                        }
                    }
                }

                // Call the callback for the bodies
                if(collided){
                    b1.collidedFunc(b2);
                    b2.collidedFunc(b1);
                }
            }
        }
    }

    /**
     * Responds to the manifolds and resets the manifold list to get ready for the next tick
     */
    collisionResolution(){
        this.collisions = [];
    }

    /**
     * Updates the body's position and velocities with each tick
     */
    dynamicsResponse(){

    }

    /**
     * Update every body within the simulation
     * @param {float} deltaTime 
     */
    update(deltaTime){
        this.collisionDetection();
        this.collisionResolution();
        this.dynamicsResponse();
    }
}