const apiClient = require("./mock-api/client");
const { ONE_DAY, ONE_HOUR } = require("./mock-api/pickup-cancellation");

const nextDayPickup = require("./pickup-services/next-day");
/**
 * Schedules a pick-up at a specific time and location
 */
async function schedulePickup(transaction, pickup) {

    // STEP 1: Validation
    if (pickup.pickupService.id === nextDayPickup.id
        && pickup.timeWindow.startDateTime.getTime() < (Date.now() + ONE_DAY)) {
        throw new Error(`${nextDayPickup.name} must be scheduled 24 hours in advance`);
    }

    // STEP 2: Create the data that the carrier's API expects
    let data = {
        operation: "pick_up",
        session_id: transaction.session.id,
        service_code: pickup.pickupService.code,
        date_time: pickup.timeWindow.startDateTime,
        contact_phone: pickup.contact.phoneNumber,
        total_weight: pickup.shipments.reduce((weight, ship) => {
            if(ship.package.weight) {
                return weight + ship.package.weight.ounces
            }

            return weight;
        }, 0)
    };

    // STEP 3: Call the carrier's API
    const response = await apiClient.request({ data });

    // STEP 4: Create the output data that ShipEngine expects
    return formatConfirmation(response.data);
}

/**
 * Formats a pickup confirmation in the way ShipEngine expects
 */
function formatConfirmation(response) {
    let pickupDateTime = new Date(response.date_time);

    return {
        id: response.id,
        timeWindows: [
            {
                startDateTime: pickupDateTime,
                endDateTime: new Date(pickupDateTime.getTime() + (ONE_HOUR * 4)),
            }
        ],
        charges: [
            {
                name: "Pickup Fee",
                type: "pickup",
                amount: {
                    value: response.pickup_cost,
                    currency: "USD",
                }
            },
            {
                name: "Transport Tax",
                type: "tax",
                amount: {
                    value: response.tax_cost,
                    currency: "USD",
                }
            },
            {
                name: "Location Fee",
                type: "location_fee",
                amount: {
                    value: response.location_cost,
                    currency: "USD",
                }
            },
        ]
    };
}

module.exports = schedulePickup;
