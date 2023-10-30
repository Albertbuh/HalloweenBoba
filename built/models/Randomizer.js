class Randomizer {
    static randInt(min = 0, max = 1) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }
    static randYesNo() {
        return Math.random() > 0.5;
    }
    static randYesNoWithPriorError() {
        let num = Math.random();
        let k = this._pError;
        let result = num > k;
        if (result) {
            console.log(`pError ${this._pError} < ${num}`);
            this._pError += 0.01;
        }
        else {
            console.log(`pError ${this._pError} > ${num}`);
            this._pError -= 0.01;
        }
        this.checkPError();
        return result;
    }
    static checkPError() {
        if (this._pError <= 0.1 || this._pError >= 0.9) {
            this._pError = 0.5;
        }
    }
}
Randomizer._pError = 0.5;
export default Randomizer;
