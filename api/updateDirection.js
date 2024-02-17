import axios from "axios";
import { server_ip_adress } from "../utils/server";
import { action_paths } from "../utils/server_path";

/**
 * 
 * @param {number} speed 
 * @param {number} direction 0 forward ou 1 backward 
 * @returns 
 */

export async function updateSpeed(speed, direction){
    // end point 
    const path = `${server_ip_adress}/${action_paths.speed}`;

    // try to send a resquest to the server
    try {
        const response = await axios.post(path, { speed: speed, direction: direction  });
        return response.data;
    } catch (error) {
        return error.message;
    }


}