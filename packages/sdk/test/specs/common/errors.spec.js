const { error } = require("../../../lib/internal");

/*
 * This test isn't automated at all, since I'm not bothering to mock console.log
 * to verify that the print occurs when the error is wrapped.
 * 
 * As such, I'm setting it to be skipped here, but leaving it so we can check this behavior
 * if we ever want to change it
 */
xdescribe("errors", () => {
    it("prints the original stack trace", () => {
        try {
            try {
                throw new Error("original error")
            } catch (err) {
                throw error("ERR_INVALID_INPUT", "Wrapping: ", {originalError: err});
            }
        } catch (err) {
            console.log(err.stack);
        }
    });

    it("handles cases with no original error", () => {
        try {
            throw error("ERR_INVALID_INPUT", "Wrapping nothing");
        } catch (err) {
            console.log(err.stack);
        }
    });
});
