const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
class Util{

    static isEmpty(value) {
        return (typeof value == "undefined")
            || (typeof value == "string" && value.length == 0)
            || (typeof value == "number" && value == 0)
            || (typeof value == "boolean" && value == false)
            || ( value === null)
    }

    static getToday(format='')
    {
        let today = new Date()
        switch(format)
        {
            case 'vn' : 
            case 'd/m/Y' : 
                return today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
            case 'm/d/Y' : return (today.getMonth() + 1)  + '/' + today.getDate() + '/' + today.getFullYear()
            case 'Y-m-d' : return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +  today.getDate() 
            case 'mysql' : 
            case 'Y-m-d H:i:s' : 
                let hour=today.getHours().toString()
                if(hour.length===1)
                {
                    hour='0'+ hour
                }
                let minute=today.getMinutes().toString()
                if(minute.length===1)
                {
                    minute='0'+ minute
                }
                return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +  today.getDate() + ' ' +  hour + ':' +  minute +':00'//  today.getSeconds() 
            case 'd-m-Y' : return today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
            case 'm-d-Y' :
            case 'dd-mm-YYYY':
                let date = today.getDate().toString()
                let dd = date.length==1 ? '0' + date : date
                let month = (today.getMonth() + 1).toString()
                let mm = month.toString().length==1 ? '0' + month : month
                let year = today.getFullYear()
                return " " + dd+" "+Txt('month_short')+" " +mm+", "+ year
            default: return (today.getMonth() + 1)  + '-' + today.getDate() + '-' + today.getFullYear()
        }
    }

    static getTimeAgo(dateString) {
        // Convert ISO date string to Date object
        const date = new Date(dateString);
      
        // Calculate time difference in milliseconds
        const diff = new Date() - date;
      
        // Define time units in milliseconds
        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        const week = 7 * day;
        const month = 30 * day;
        const year = 365 * day;
      
        // Determine appropriate time unit and format result
        let timeAgo;
        if (diff < minute) {
          timeAgo = 'just now';
        } else if (diff < hour) {
          timeAgo = `${Math.floor(diff / minute)} minutes ago`;
        } else if (diff < day) {
          timeAgo = `${Math.floor(diff / hour)} hours ago`;
        } else if (diff < week) {
          timeAgo = `${Math.floor(diff / day)} days ago`;
        } else if (diff < month) {
          timeAgo = `${Math.floor(diff / week)} weeks ago`;
        } else if (diff < year) {
          const months = Math.floor(diff / month);
          timeAgo = `${months} ${months > 1 ? 'months' : 'month'} ago`;
        } else {
          const years = Math.floor(diff / year);
          timeAgo = `${years} ${years > 1 ? 'years' : 'year'} ago`;
        }
      
        return timeAgo;
    }

    static convertDateTimeToTimestamp(dateTimeString) {
      const dateTime = new Date(dateTimeString.replace(/-/g, '/'));
      return dateTime.getTime();
    }

    static stringToTimestamp(str) {
      // Tách các phần tử của chuỗi thời gian
      const [dateStr, timeStr] = str.split(' ');
      const [year, month, day] = dateStr.split('-');
      const [hour, minute, second] = timeStr.split(':');
    
      // Tạo đối tượng Date từ các phần tử
      const date = new Date(year, month - 1, day, hour, minute, second);
    
      // Trả về timestamp tương ứng
      return date.getTime();
    }
    
    static formatDateEnglish(dateString) {
      const months = [
        "January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"
      ];
      const date = new Date(dateString);
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const day = date.getDate();
      const month = months[monthIndex];
      const formattedDate = `${month} ${day}, ${year}`;
      return formattedDate;
    }
    
    static isToday(dateString) {
      // Create a new date object for the given date string
      const date = new Date(dateString);
    
      // Create a new date object for today's date
      const today = new Date();
    
      // Compare the year, month, and day of the two dates
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    }
    
    static formatDate(_date) {
      let date = new Date(_date)
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, "0");
      let day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    static getPrevNextDays(dateString) {
      const date = new Date(dateString);
      const prevDate = new Date(date);
      prevDate.setDate(date.getDate() - 1);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
    
      const prevDay = prevDate.toISOString().split("T")[0];
      const nextDay = nextDate.toISOString().split("T")[0];
    
      return {prevDay, nextDay};
    }
      
}

export default Util