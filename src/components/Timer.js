const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "Date") {
      const date = new Date(value);
      const convertedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const countdownDate = new Date(`${convertedDate}`).getTime();
      const countdownDateDays = Math.floor(countdownDate / (1000 * 60 * 60 * 24) + 1);
      setCountdownDays(countdownDateDays);
  
      const now = new Date().getTime();
      const countdownDateNow = Math.floor(now / (1000 * 60 * 60 * 24));
      setCountdownNow(countdownDateNow);
    }
    if (name === "Timer") {
      let [hours, minutes] = value.split(":");
      if (hours.includes("PM")) {
        hours = parseInt(hours) + 12;
      } else if (hours === "12") {
        hours = "00";
      }
      if (hours.length === 1) {
        hours = "0" + hours;
      }
      if (minutes.includes("PM")) {
        minutes = parseInt(minutes) + 12;
      } else if (minutes === "12") {
        minutes = "00";
      }
      if (minutes.length === 1) {
        minutes = "0" + minutes;
      }
  
      const countdownTime = new Date(`${formData.Date}T${hours}:${minutes}`).getTime();
      const remainingSeconds = (countdownTime - new Date().getTime()) / 1000;
      setCountdown(countdownTime);
      setCountdownHours(hours);
      setCountdownMinutes(minutes);
      setCountdownSeconds(remainingSeconds);
  
      const timeNow = new Date().getTime();
      const hoursNow = Math.floor((timeNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setCountdownHoursNow(hoursNow);
      const minutesNow = Math.floor((timeNow % (1000 * 60 * 60)) / (1000 * 60));
      setCountdownMinutesNow(minutesNow);
      const secondsNow = Math.floor((timeNow % (1000 * 60)) / 1000);
      setCountdownSecondsNow(secondsNow);
    }
  };
  