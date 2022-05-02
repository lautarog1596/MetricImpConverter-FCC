function numberStringSplitter(input) {
    let number = input.match(/[.\d\/]+/g) || ["1"];
    let string = input.match(/[a-zA-Z]+/g)[0];

    return [number[0], string];
}

function checkDiv(possibleFraction) {
    // 1/4/3 return false
    // 15 return ["15"]
    // 1/4 return ["1", "4"]
    let nums = possibleFraction.split("/");
    if (nums.length > 2) {
        return false;
    }
    return nums
}

function ConvertHandler() {

    this.getNum = (input) => {
        let result = numberStringSplitter(input)[0];
        let nums = checkDiv(result);

        if (!nums) {
            return undefined;
        }

        let num1 = nums[0];
        let num2 = nums[1] || "1";

        result = parseFloat(num1) / parseFloat(num2);

        if (isNaN(num1) || isNaN(num2)) {
            return undefined;
        }

        return result;
    };

    this.getUnit = (input) => {
        let result = numberStringSplitter(input)[1].toLowerCase();
        switch (result) {
            case "km":
                return "km";
            case "gal":
                return "gal";
            case "lbs":
                return "lbs";
            case "mi":
                return "mi";
            case "l":
                return "L";
            case "kg":
                return "kg";
            default:
                return undefined;
        }
    };

    this.getReturnUnit = (initUnit) => {
        let unit;
        if (initUnit != undefined) {
            unit = initUnit.toLowerCase();
        }

        switch (unit) {
            case "km":
                return "mi";
            case "gal":
                return "L";
            case "lbs":
                return "kg";
            case "mi":
                return "km";
            case "l":
                return "gal";
            case "kg":
                return "lbs";
            default:
                return undefined;
        }
    };

    this.spellOutUnit = (initUnit) => {
        let unit;
        if (initUnit != undefined) {
            unit = initUnit.toLowerCase();
        }

        switch (unit) {
            case "km":
                return "kilometers";
            case "gal":
                return "gallons";
            case "lbs":
                return "pounds";
            case "mi":
                return "miles";
            case "l":
                return "liters";
            case "kg":
                return "kilograms";
            default:
                return "don't know";
        }
    };

    this.convert = (initNum, initUnit) => {
        let unit;
        if (initUnit != undefined) {
            unit = initUnit.toLowerCase();
        }
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;

        switch (unit) {
            case "km":
                result = initNum / miToKm;
                break;
            case "gal":
                result = initNum * galToL;
                break;
            case "lbs":
                result = initNum * lbsToKg;
                break;
            case "mi":
                result = initNum * miToKm;
                break;
            case "l":
                result = initNum / galToL;
                break
            case "kg":
                result = initNum / lbsToKg;
                break;
            default:
                result = undefined
        }
        if (result != undefined) {
            return parseFloat(result.toFixed(5));
        } else {
            return undefined;
        }
    };

    this.getString = (initNum, initUnit, returnNum, returnUnit) => {
        return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    };

}

module.exports = ConvertHandler;