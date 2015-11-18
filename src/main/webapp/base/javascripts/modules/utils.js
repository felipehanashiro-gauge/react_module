var Utils = {
  App : {
    get url(){
        var loc = location
        return (loc.protocol + "//" + loc.host+"/"+window.location.pathname.split("/")[1]+'/');
    }
  },
  Date: {
      getMonthName: function(month){
          return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month];
      }
  },
  Format: {
      format_decimal: function (value) {
          return parseFloat(Math.round(value * 100) / 100).toFixed(2);
      },

      format_date: function (d) {
          var date,
              formatted;

          if (d) {
              date = new Date(d);
              formatted = Utils.Date.getMonthName(date.getMonth) + " " + date.getFullYear();
          }

          return formatted;
      },

      format_hours: function (value) {
          if (value == null)
              return 0;
          else
              return value;
      },

      format_number: function (value) {
          if (value == null)
              return 0;
          value += '';
          x = value.split('.');
          x1 = x[0];
          x2 = x.length > 1 ? '.' + x[1] : '';
          var rgx = /(\d+)(\d{3})/;
          while (rgx.test(x1)) {
              x1 = x1.replace(rgx, '$1' + ',' + '$2');
          }
          return x1 + x2;
      }
  }
};

module.exports = Utils;
