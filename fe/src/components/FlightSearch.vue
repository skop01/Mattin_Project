<template>
  <div class="flight-search">
    <div class="flight-bg"></div>
    <div class="flight-wrap">
      <div class="flight-pal">
        <div class="flight-texture">
          <h2>
            <b>
              DONT LISTEN TO WHAT
              THEY SAY               
            </b>           
          </h2>
        
          <h1>
            <b>GO AND SEE</b>
          </h1>
          
        </div>
        <div class="flight-info">
          <!-- <v-btn text x-large color="primary">왕복</v-btn>
          <v-btn text x-large color="primary">편도</v-btn>-->

          <!-- <v-btn text x-large color="primary" v-for="(btn,index) in btns" :key="index">{{btn}} </v-btn> -->
          <!-- <div style="height:42px;"></div> -->
          <div class="search-box">
          <div class="btns">
            <!-- <v-btn active-class="btn1" text x-large color="primary" v-model="roundtrip" @click="round">왕복</v-btn>
            <v-btn active-class="btn2" text x-large color="primary" v-model="onewaytrip" @click="oneway">편도</v-btn>-->
            <button class="btn1" v-bind="roundtrip" @click="changeBtn(0)">왕복</button>
            
            <button class="btn2" v-bind="onewaytrip" @click="changeBtn(1)">편도</button>
          </div>

        
      <!-- <v-container>
          <v-row> -->
            
             <div class="search-info">
            <!-- <v-col cols="10" lg="2"  md="2"  sm="10"  xs="10" > -->
             
                <div class="departure" style="width: 100%;">
                  <v-text-field
                    dense
                    label="출발지"
                    append-icon="flight_takeoff"
                    v-model="departureInput"
                    @keyup="Depouputbox"
                    @keydown.up="pressUP('departure')"
                    @keydown.down="pressDown('departure')"
                    @keydown.enter="pressEnter('departure')"
                    @input="departureInput = $event.target.value"
                  ></v-text-field>
                  <div class="dep-tooltip">
                    <h3>출발지를 입력해주세요.</h3>
                    <i></i>
                  </div>
                  <div class="searchList" v-show="open">
                    <div class="dep-box">
                      <div class="triangle-box"></div>
                    </div>
                    <div class="dep-airlist">
                      <div
                        v-for="(airport,id) in departureOutput.slice(0,scrollMore)"
                        :key="id"
                        class="country-name"
                        :class="{'is-active' : id ===depArrow}">
                        <div style="color: black; font-size:17px;">
                          <div class="airportList">
                            <div
                              class="airport-name"
                              @click="selectAir(`${airport.code}`, `${airport.name_kor}`,'departure')">
                              <i class="anime-i"></i>
                              {{airport.name_kor}} {{airport.code}}                              
                              <span  class="airport-nation">{{airport.nation_kor}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <!-- </v-col> -->
              <div class="empty"></div>
              <!-- <v-col cols="12" lg="2"  md="2"  sm="12"  xs="12" > -->
                <div class="arrival" style="width: 100%;">
                  <v-text-field
                    dense
                    label="도착지"
                    append-icon="flight_takeoff"
                    v-model="arrivalInput"
                    @keyup="Arroutputbox"
                    @keydown.up="pressUP('arrival')"
                    @keydown.down="pressDown('arrival')"
                    @keydown.enter="pressEnter('arrival')"
                    @input="arrivalInput = $event.target.value"
                  ></v-text-field>
                  <div class="arr-tooltip">
                    <h3>도착지를 입력해주세요.</h3>
                    <i></i>
                  </div>
                  <div class="searchList-arr">
                    <div class="arr-box">
                      <div class="triangle-box"></div>
                    </div>
                    <div class="arr-airlist">
                      <div
                        v-for="(airport,id) in arrivalOutput.slice(0,scrollMore)"
                        :key="id"
                        class="country-name"
                        :class="{'is-active' : id===arrArrow}">
                        <div style="color: black; font-size:17px;">
                          <div class="airportList">
                            <div
                              class="airport-name"
                              @click="selectAir(`${airport.code}`, `${airport.name_kor}`,'arrival')">
                              <i class="anime-arr-i"></i>
                              {{airport.name_kor}} {{airport.code}}                         
                              <span class="airport-nation">{{airport.nation_kor}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <!-- </v-col> -->
              <div class="empty"></div>

              <!-- <v-col cols="12" lg="2"  md="2"  sm="12"  xs="12" > -->
                <div class="departure-time" style="width: 100%;">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"                   
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
                    <template #activator="{ on }">
                      <v-text-field
                        dense
                        label="가는 날"
                        append-icon="event"
                        v-model="leavetime"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="leavetime" :min="mindate" @input="menu=false"></v-date-picker>
                  </v-menu>
                </div>

              <!-- </v-col> -->
              <div class="empty"></div>
              <!-- <v-col cols="12" lg="2"  md="2"  sm="12"  xs="12" > -->
                <div class="arrival-time" style="width: 100%;">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"             
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template #activator="{ on }">
                      <v-text-field
                        dense
                        label="오는 날"
                        append-icon="event"
                        v-model="cometime"
                        readonly
                        v-on="on"
                        @click="checkcal"
                      ></v-text-field>
                    </template>

                    <v-date-picker v-model="cometime" :min="minComedate" @input="menu2=false"></v-date-picker>
                  </v-menu>
                </div>
              <!-- </v-col> -->
              <div class="empty"></div>
              <!-- <v-col cols="12" lg="2"  md="2"  sm="12"  xs="12" > -->
                <div class="Class-Selector" style="width: 100%;">
                  <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template #activator="{ on }">
                      <v-text-field
                        dense
                        label="좌석 등급 및 승객"
                        append-icon="airline_seat_recline_extra"
                        :value="`${adults + infants + children} 승객, ${flightClass}`"
                        v-on="on"
                        readonly
                      ></v-text-field>
                    </template>

                    <v-card class="mx-auto" width="300px" height="415px" @input="menu3=false">
                      <v-card-text style="background:#1E88E5">
                        <div style="color:white; font-size:18px; height:15px ">좌석</div>
                        </v-card-text>                    
                      <v-select :items="classes" :value="flightClass" :item-value="flightClass" 
                              flat  v-model="flightClass" solo ></v-select>                               
                       <v-card-text style="background:#1E88E5; margin-top:-22px">
                         <div style="color:white;  font-size:18px; height:15px"  >승객</div>
                         </v-card-text>         
                      <v-card-actions style="margin-top: 30px;" >
                        <v-card-text>
                          <p style="font-size: 18px;
                                    font-weight: bold;">성인</p>
                        </v-card-text>
                        <button class="minus" @click="minusAdults">
                          <v-icon color="white">mdi-minus</v-icon>
                        </button>
                        <p
                          style="font-size: 18px;
                                font-weight: bold;
                                margin: 0px 20px 0px 0px;"
                                >{{adults}}</p>
                        <button class="plus" @click="plusAdults">
                          <v-icon color="white">mdi-plus</v-icon>
                        </button>
                      </v-card-actions>

                      <v-card-actions style="margin-top: 10px;">
                        <v-card-text>
                          <p style="font-size: 18px;
                                    font-weight: bold;">어린이</p>
                           <p style="font-size: 12px; ">만 2~11세</p>  
                        </v-card-text>                        
                        <button class="minus" @click="minusChildren">
                          <v-icon color="white">mdi-minus</v-icon>
                        </button>
                        <p
                          style="font-size: 18px;
                                font-weight: bold;
                                margin: 0px 20px 0px 0px;"
                                >{{children}}</p>
                        <button class="plus" @click="plusChildren">
                          <v-icon color="white">mdi-plus</v-icon>
                        </button>
                      </v-card-actions>
                         
                      <v-card-actions style="margin-top: 7px;">
                        <v-card-text>
                          <p style="font-size: 18px;
                                    font-weight: bold;">유아</p>
                           <p style="font-size: 12px; ">만 2세 미만</p>          
                        </v-card-text>
                        <button class="minus" @click="minusInfants">
                          <v-icon color="white">mdi-minus</v-icon>
                        </button>
                        <p
                          style="font-size: 18px;
                                font-weight: bold;
                                margin: 0px 20px 0px 0px;"
                                >{{infants}}</p>
                        <button class="plus" @click="plusInfants">
                          <v-icon color="white">mdi-plus</v-icon>
                        </button>
                      </v-card-actions>                        
                    </v-card>
                  </v-menu>
                </div>
              <!-- </v-col> -->
              <div class="empty"></div>
                <div class="search-btn" style="width: 100%;">
                  <button class="search-sbmit" @click="searchTikect()">
                    <v-icon large color="white">search</v-icon>
                  </button>
                </div>
                
                
             </div>
            <!-- </v-row>
          </v-container> -->
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import airportList from "./AirportList.json";
export default {
  name: "FlightSearch",
  data() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      scrollMore: 10,
    
      depArrow:-1,
      arrArrow:-1,
      flightClass:'economy',
      classes: ["economy", "business", "first"],
      // btns:["왕복","편도"],
      roundtrip: true,
      onewaytrip: false,

      open: false,

      airportList: airportList,

      departureInput: "",
      arrivalInput: "",
      departureOutput: [],
      arrivalOutput: [],

      //api 데이터
      departure: "",
      arrival: "",
      leavetime: today.toISOString().substr(0, 10),
      cometime: tomorrow.toISOString().substr(0, 10),
      flightClass: "economy",
      adults: 1,
      children: 0,
      infants: 0,
      mindate: today.toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false
    };
  },

  created() {},
  mounted() {
    this.depScroll = document.querySelector(".dep-airlist");
    this.depScroll.addEventListener("scroll", this.scrollDetection);
    this.arrScroll = document.querySelector(".arr-airlist");
    this.arrScroll.addEventListener("scroll", this.scrollDetection);

    document.body.addEventListener("click", this.hiddenList);
    document.body.addEventListener("keydown", this.hideTooltip);
  },
  updated() {},
  destroyed() {
    document.body.removeEventListener("click", this.hiddenList);
  },
  methods: {
    hideTooltip() {
      const tooltip1 = document.querySelector(".dep-tooltip");
      const tooltip2 = document.querySelector(".arr-tooltip");
      tooltip1.style.display = "none";
      tooltip2.style.display = "none";
    },
    // 항공권 리스트로 데이터 넘겨주기 (IMPORTANT)
    searchTikect() {
      const tooltip1 = document.querySelector(".dep-tooltip");
      const tooltip2 = document.querySelector(".arr-tooltip");
      const query = {};
      query.departure = this.departure;
      query.arrival = this.arrival;
      query.departureInput = this.departureInput;
      query.arrivalInput = this.arrivalInput;
      query.leavetime = this.leavetime;
      query.cometime = this.cometime;
      query.flightClass = this.flightClass;
      query.adults = this.adults;
      query.children=this.children;
      query.infants = this.infants;

      if (query.departure && query.arrival) {
        this.$router.push({ name: "FlightList", query: query });
      } else if (query.departureInput === "") {
        tooltip1.classList.add("animated", "flash");
        tooltip1.style.display = "block";
      } else if (query.arrivalInput === "") {
        tooltip2.classList.add("animated", "flash");
        tooltip2.style.display = "block";
      }
    },
    hiddenList(e) {
      this.scrollMore = 10;
      const searchInput = [
        ".dep-airlist",
        ".dep-box",
        ".arr-airlist",
        ".arr-box"
      ];
      searchInput.forEach(className => {
        const countryList = document.querySelector(className);
        countryList.style.display = "none";
        countryList.style.position = "none";
        countryList.style.zIndex = "-1";
      });
    },
    Depouputbox() {
      this.open = true;
      this.departureSearch();
    },
    Arroutputbox() {
      this.arrivalSearch();
    },
    selectAir(airCode, airportName, travelType) {
      const airportNameSplit = airportName.replace(/\s/g, "");
      if (travelType === 'departure') {
        this.departure = airCode;
        this.departureInput = `${airportNameSplit} (${this.departure})`;
      } else {
        this.arrival = airCode;
        this.arrivalInput = `${airportNameSplit} (${this.arrival})`;
      }
    },
    departureSearch() {
      this.departureOutput = this.airportList.filter(airport => {
        if (
          airport.name_kor.includes(this.departureInput) ||
          airport.name_eng
            .toLowerCase()
            .match(this.departureInput.toLowerCase()) ||
          airport.nation_kor.includes(this.departureInput) ||
          airport.nation_eng
            .toLowerCase()
            .includes(this.departureInput.toLowerCase()) ||
          airport.city_kor.toLowerCase().includes(this.departureInput) ||
          airport.city_eng
            .toLowerCase()
            .includes(this.departureInput.toLowerCase()) ||
          airport.code.toLowerCase().includes(this.departureInput.toLowerCase())
        ) {
          return airport;
        }
      });
    },
    arrivalSearch() {
      this.arrivalOutput = this.airportList.filter(airport => {
        if (
          airport.name_kor.includes(this.arrivalInput) ||
          airport.name_eng
            .toLowerCase()
            .match(this.arrivalInput.toLowerCase()) ||
          airport.nation_kor.includes(this.arrivalInput) ||
          airport.nation_eng
            .toLowerCase()
            .includes(this.arrivalInput.toLowerCase()) ||
          airport.city_kor.toLowerCase().includes(this.arrivalInput) ||
          airport.city_eng
            .toLowerCase()
            .includes(this.arrivalInput.toLowerCase()) ||
          airport.code.toLowerCase().includes(this.arrivalInput.toLowerCase())
        ) {
          return airport;
        }
      });
    },
    // scrollDetection() {
    //   if (this.depScroll.scrollTop > 400 * (this.scrollMore / 10)) {
    //     this.scrollMore += 10;
    //   }
    //   if (this.arrScroll.scrollTop > 400 * (this.scrollMore / 10)) {
    //     this.scrollMore += 10;
    //   }
    // },
   changeBtn(tripType){
       const btn1 = document.querySelector(".btn1");
        const btn2 = document.querySelector(".btn2");
      if(tripType===1){
      this.cometime = "";
      this.roundtrip = false;
      this.onewaytrip = true;
       btn1.style.background = "#eaeaea";
       btn1.style.color = "black";
       btn2.style.background = "#4697ef";
      btn2.style.color = "white";
      }else{
      this.cometime = this.leavetime;
      this.onewaytrip = false;
      this.roundtrip = true;
      btn1.style.background = "#4697ef";
      btn1.style.color = "white";
      btn2.style.background = "#eaeaea";
      btn2.style.color = "black";
      }

    },
    checkcal() {
      const btn1 = document.querySelector(".btn1");
      const btn2 = document.querySelector(".btn2");

      if (this.cometime === "") {
        this.roundtrip = true;
        this.onewaytrip = false;

        btn1.style.background = "#4697ef";
        btn1.style.color = "white";
        btn2.style.background = "#eaeaea";
        btn2.style.color = "black";
      }
    },
    plusAdults(){
      this.adults += 1;
    },
    minusAdults(){
      if(this.adults !== 1){
      this.adults -= 1;
      }
    },
    plusChildren(){
      this.children += 1;
      
    },
    minusChildren(){
      if(this.children >= 1){
      this.children -= 1;
      }
    },
    plusInfants(){
      this.infants += 1;
      
    },
    minusInfants(){
      if(this.infants >= 1){
      this.infants -= 1;
      }
    },
    pressDown(tripType){
        if(tripType==='departure'){
          if(this.depArrow<this.departureOutput.length){
            this.depArrow += 1
          }
        }else{
          if(this.arrArrow<this.arrivalOutput.length){
            this.arrArrow += 1
          }
        }
    },
    pressUP(tripType){
         if(tripType==='departure'){
           if(this.depArrow > 0){
             this.depArrow --
           }
         }else{
           if(this.arrArrow > 0){
             this.arrArrow --
           }
        }
    },
    pressEnter(tripType){
      if(tripType==='departure'){
        this.selectAir(this.departureOutput[this.depArrow].code,
                      this.departureOutput[this.depArrow].name_kor,
                      'departure')
                  
                     
      }
      else{
        this.selectAir(this.arrivalOutput[this.arrArrow].code,
                       this.arrivalOutput[this.arrArrow].name_kor,
                       'arrival')
      }
    }
  },
  watch: {
    departureInput() {
      const leftInput = document.querySelector(".searchList");
      const countryList = document.querySelector(".dep-airlist");
      const depbox = document.querySelector(".dep-box");
      countryList.style.display = "block";
      countryList.style.position = "absolute";
      countryList.style.zIndex = "1000";
      depbox.style.display = "block";
    },
    arrivalInput() {
      const countryList = document.querySelector(".arr-airlist");
      const arrbox = document.querySelector(".arr-box");
      countryList.style.display = "block";
      countryList.style.position = "absolute";
      countryList.style.zIndex = "1000";
      arrbox.style.display = "block";
    }
  },
  computed: {
    minComedate(){
      return this.leavetime
    }
  }
};
</script>
<style scoped>
@import "./FlightSearch.css";
</style>