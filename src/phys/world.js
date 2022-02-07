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
     * @param {integer} bodyID 
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
     * Update every body within the simulation
     * @param {float} deltaTime 
     */
    update(deltaTime){
        
    }
}