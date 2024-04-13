import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayar from "./Prayar";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

export default function MainContant() {
  // Start State
  const [selectedcity, setSelectedcity] = useState({
    Apiname: "Zagazig",
    Appername: "الزقازيق",
  });
  const [gettoday, setGettoday] = useState("");
  //set counter

  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [time, setTime] = useState({
    Fajr: "04:00",
    Dhuhr: "12:99",
    Asr: "03:09",
    Maghrib: "05:00",
    Isha: "08:00",
  });
  const prayerArray = [
    {
      key: "Fajr",
      Appername: "الفجر",
    },
    {
      key: "Dhuhr",
      Appername: "الضهر",
    },
    {
      key: "Asr",
      Appername: "العصر",
    },
    {
      key: "Maghrib",
      Appername: "المغرب",
    },
    {
      key: "Isha",
      Appername: "العشا",
    },
  ];

  //العداد الي هيحسب الوقت المتبقي

  useEffect(() => {
    const clear = setInterval(() => {
      setupCountDownTimer();
    }, 1000);
    const today = moment();
    setGettoday(today.format("MMMM Do YYYY| h:mm "));

    return () => {
      clearInterval(clear);
    };
  }, [time]);

  const setupCountDownTimer = () => {
    const momentNow = moment();
    let nextPrayer = 2;
    if (
      momentNow.isAfter(moment(time["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Dhuhr"], "hh:mm"))
    ) {
      nextPrayer = 1;
    } else if (
      momentNow.isAfter(moment(time["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Asr"], "hh:mm"))
    ) {
      nextPrayer = 2;
    } else if (
      momentNow.isAfter(moment(time["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Maghrib"], "hh:mm"))
    ) {
      nextPrayer = 3;
    } else if (
      momentNow.isAfter(moment(time["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Isha"], "hh:mm"))
    ) {
      nextPrayer = 4;
    } else {
      nextPrayer = 0;
    }
    setNextPrayerIndex(nextPrayer);

    //timeNow

    const prayarObject = prayerArray[nextPrayer];
    const nextPrayerTime = time[prayarObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    //def
    const remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);
    let durationTime = moment.duration(remainingTime);

    if (remainingTime < 0) {
      const midNight = moment("23:59:59", "hh:m:ss").diff(moment());
      const fajertoMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:m:ss")
      );
      const totalDiff = midNight + fajertoMidnightDiff;
      durationTime = totalDiff;
    }
    //transform ms to hr
    const duration = moment.duration(durationTime);
    setRemainingTime(
      `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
    );
  };

  //Array
  const Listcity = [
    {
      Apiname: "Zagazig",
      Appername: "الزقازيق",
    },
    {
      Apiname: "Al Alameen",
      Appername: "العلمين",
    },
    {
      Apiname: "Qena",
      Appername: " قنا",
    },
    {
      Apiname: "Asyut",
      Appername: "أسيوط",
    },
  ];
  //changeSEt
  const handleCityChange = (e) => {
    const cityobject = Listcity.find((city) => {
      return city.Apiname == e.target.value;
    });
    setSelectedcity(cityobject);
  };
  //Api
  const getTiming = async () => {
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedcity.Apiname}`
    );

    setTime(data.data.data.timings);
  };
  //request api Date
  useEffect(() => {
    getTiming();
  }, [selectedcity]);
  // work the  dec counter

  const spacing = {
    marginRight: {
      xs: 22,
      sm: 33,
      md: 12,
      lg: 9,
      xl: 2,
    },
  };
  console.log(remainingTime);
  return (
    <>
      {/* StartTop Row */}
      <Grid container className="parent">
        <Grid xs={6}>
          <h2>{gettoday}</h2>
          <h1>{selectedcity.Appername}</h1>{" "}
        </Grid>
        <Grid xs={6}>
          <h2>متبقى حتى صلاة {prayerArray[nextPrayerIndex].Appername} </h2>
          <h1>{remainingTime}</h1>{" "}
        </Grid>
      </Grid>
      {/*End Top_Row */}
      <Divider />
      {/* StartCarDs */}
      <Stack
        direction={"row"}
        sx={{
          spacing: { xs: 1, sm: 3, md: 2 },
          justifyContent: " space-around",
          marginTop: "20px",

          boxSizing: "border-box",
          width: {
            xs: 650,
            sm: 800,
            md: 900,
            lg: 1200,
            xl: 1500,
          },
        }}
      >
        <Prayar
          style={spacing}
          time={time.Fajr}
          name="الفجر"
          image="src/Component/img/fajr-prayer.png"
        />
        <Prayar
          style={spacing}
          time={time.Dhuhr}
          name="الضهر"
          image="src/Component/img/asr-prayer-mosque.png"
        />
        <Prayar
          style={spacing}
          time={time.Asr}
          name="العصر"
          image="src/Component/img/dhhr-prayer-mosque.png"
        />
        <Prayar
          style={spacing}
          time={time.Maghrib}
          name="المغرب"
          image="src/Component/img/sunset-prayer-mosque.png"
        />
        <Prayar
          style={spacing}
          time={time.Isha}
          name="العشاء"
          image="src/Component/img/night-prayer-mosque.png"
        />
      </Stack>
      {/* EndCarDs */}
      {/* Start Select City */}
      <Stack
        direction={"row"}
        style={{ justifyContent: "center", marginTop: "20px" }}
      >
        <FormControl style={{ width: "20%", minHeight: "200px" }}>
          <InputLabel id="demo-simple-select-label">
            <span>المدينة</span>
          </InputLabel>
          <Select
            className="citylist"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={age}
            label="Age"
            onChange={handleCityChange}
          >
            {Listcity.map((city) => {
              return (
                <MenuItem value={city.Apiname} key={city.Apiname}>
                  {city.Appername}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* End Select City */}
    </>
  );
}
