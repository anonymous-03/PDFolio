import express from 'express'

class ExpressError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
export default ExpressError;