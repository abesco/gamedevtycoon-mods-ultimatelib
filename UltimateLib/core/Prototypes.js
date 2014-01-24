/** Add Prototypes **/
if (typeof String.format == 'undefined') {
    String.format = function () {
        var st = arguments[0];
        $.each(arguments, function (i, arg) {
            var regex = new RegExp("\\{" + i + "\\}", "gm");
            st = st.replace(regex, arg);
        });
        return st;
    }
}
if (typeof String.prototype.endsWith == 'undefined') {
    String.prototype.endsWith = function (suffix) {
        return (this.substr(this.length - suffix.length) === suffix);
    }
}
if (typeof String.prototype.startsWith == 'undefined') {
    String.prototype.startsWith = function (prefix) {
        return (this.substr(0, prefix.length) === prefix);
    }
}
if (typeof Number.prototype.truncateDecimals == 'undefined') {
    Number.prototype.truncateDecimals = function (digits) {
        var n = this - Math.pow(10, -digits) / 2;
        n += n / Math.pow(2, 53);
        return n.toFixed(digits);
    }
}
 /****/