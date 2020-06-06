/*Action would change the state of the cargo and current user currency based on the quantity bought*/
import { Dispatch } from "redux"
import { getCargoByUserIdAndGoodId, updateCargoByUserIdAndGoodId, getUserById, updateUser } from "../remote/player-service";

import { Cargo } from "../dtos/cargo";
import { User } from "../dtos/user";

export const buyActionTypes = {
    SUCCESSFUL_PURCHASE: 'SUCCESSFUL_PURCHASE',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

/*Would require current userID to know which user to change cargo for, goodID of the purchased good to
add to cargo, the total cost of the buy action would be done in the front-end, and the planet name to find the planets buy price modifier*/
export const buyAction = (user_id: number, good_id: number, cost: number, amount: number) => async (dispatch: Dispatch) => {

    try {
        // get the cargo record
        let originalCargo: Cargo = await getCargoByUserIdAndGoodId(user_id, good_id)

        // update the cargo
        let sum: number = originalCargo.good_quantity * originalCargo.cost_of_goods;
        let newSum: number = sum + cost;
        originalCargo.good_quantity += amount;
        //update avg cost
        let newCost: number = newSum / originalCargo.good_quantity;
        originalCargo.cost_of_goods = newCost; 

        await updateCargoByUserIdAndGoodId(user_id, good_id)

        //currency
        let user: User = await getUserById(user_id);
        user.currency -= amount * cost;
        await updateUser(user);

        dispatch({
            type: buyActionTypes.SUCCESSFUL_PURCHASE,
            // payload: authUser
        });

    } catch (e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: buyActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: buyActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}