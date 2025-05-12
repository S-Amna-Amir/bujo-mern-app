import React, { useState } from "react";
import { useEffect } from 'react';
import { savePhysicalHealthData, getTodayPhysicalHealthData,updatePhysicalHealthData } from '../api/physicalhealthApi';
import "./physicalHealth.css";

function PhysicalHealth()
{
    const [sleephours, setSleephours] = React.useState(0);
    const [waterml, setWaterml] = React.useState(0);
    const [dailyGoal, setDailygoal] = useState(2000);
    const [newGoal, setNewgoal] = useState("");
    const [customWater, setCustomWater] = useState("");
    const progressPercentage = Math.min((waterml / dailyGoal) * 100, 100);
    const [workouthours, setWorkouthours] = React.useState(0);
    const [customWorkout, setCustomWorkout] = useState("");
    const dailyworkGoal = 300;
    const [calories, setCalories] = React.useState(0);
    const [customCal, setCustomCal] = useState("");
    const [dailycalGoal, setDailycalgoal] = useState(2000);
    const [newcalGoal, setcalNewgoal] = useState("");
    const calprogressPercentage = Math.min((calories / dailycalGoal) * 100, 100);

    useEffect(() => {
        const fetchTodayData = async () => {
          try {
            const response = await getTodayPhysicalHealthData();
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (response.data && new Date(response.data.date).getDate() === today.getDate() && new Date(response.data.date).getMonth() === today.getMonth()) 
            {
              setSleephours(response.data.sleepHours || 0);
              setWaterml(response.data.waterIntake || 0);
              setDailygoal(response.data.waterGoal || 2000);
              setWorkouthours(response.data.workoutMinutes || 0);
              setCalories(response.data.caloriesConsumed || 0);
              setDailycalgoal(response.data.calorieGoal || 2000);
            } 
            else 
            {
              setSleephours(0);
              setWaterml(0);
              setDailygoal(2000);
              setWorkouthours(0);
              setCalories(0);
              setDailycalgoal(2000);
            }
          } catch (error) {
            console.error('Error fetching todays data:', error);
            setSleephours(0);
            setWaterml(0);
            setDailygoal(2000);
            setWorkouthours(0);
            setCalories(0);
            setDailycalgoal(2000);
          }
        };
      
        fetchTodayData();
      }, []);

      const saveData = async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        const data = {
          date: today,
          sleepHours: sleephours,
          waterIntake: waterml,
          waterGoal: dailyGoal,
          workoutMinutes: workouthours,
          caloriesConsumed: calories,
          calorieGoal: dailycalGoal
        };
      
        try {
          const existingResponse = await getTodayPhysicalHealthData();
          
          if (existingResponse.data && existingResponse.data._id) {
            await updatePhysicalHealthData(existingResponse.data._id, data);
          } else {
            await savePhysicalHealthData(data);
          }
          console.log('Data saved successfully');
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };
    const handleSleep = (e) =>
    {
        setSleephours(e.target.value);
    };

    const handleWorkout = (e) =>
    {
        setWorkouthours(e.target.value);
    };

    const handleWater = (ml) =>
    {
        setWaterml(prev => Math.min(prev + ml, dailyGoal));
    };

    const handleCustomwater = () =>
    {
        const amount = parseInt(customWater);
        if(!isNaN(amount) && amount > 0)
        {
            setWaterml(prev => Math.min(prev + amount, dailyGoal));
            setCustomWater("");
        }
    }

    const handleCalories = (cal) =>
    {
        setCalories(prev => Math.min(prev + cal, dailycalGoal));
    };
    
    const handleCustomcalories = () =>
    {
        const amount = parseInt(customCal);
        if(!isNaN(amount) && amount > 0)
        {
            setCalories(prev => Math.min(prev + amount, dailycalGoal));
            setCustomCal("");
        }
    }

    const handleCustomworkout = () =>
    {
        const amount = parseInt(customWorkout);
        if(!isNaN(amount) && amount > 0)
        {
            setWorkouthours(Math.min(amount, dailyworkGoal));
            setCustomWorkout("");
        }
    }

    const changeWater = () =>
    {
        const amount = parseInt(newGoal);
        if(!isNaN(amount) && amount > 0)
        {
            setDailygoal(amount);
            saveData();
            setNewgoal("");
        }
    }

    const changeCal = () =>
    {
        const amount = parseInt(newcalGoal);
        if(!isNaN(amount) && amount > 0)
        {
            setDailycalgoal(amount);
            saveData();
            setcalNewgoal("");
        }
    }

return(
    <div>
        <div className="heading">
            <h1>My Physical Health</h1>
            <p id="message">Remember to take care of yourself today!</p>
        </div>

        <div className="pageBody">
            <div className="journal">
                <div className="sleepBox">
                    <div className="sleepimg">
                    <img src={`${process.env.PUBLIC_URL}/sleepingresize.png`}/>
                    </div>
                    <div className="sleep">
                        <p>Today I had {sleephours} hours of sleep.</p>
                        <input type="range" min="1" max="24" value={sleephours} id="sleeprange" onChange={handleSleep}></input>
                    </div>
                </div>

                <div className="waterBox">
                    <div className="waterimg">
                        <img src={`${process.env.PUBLIC_URL}/waterresize.png`}/>
                    </div>
                    <div className="water">
                        <p>Today I've had: {waterml}ml / {dailyGoal}ml of water.</p>
                        <div className="progress-container">
                        <div className="bar" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <button className="physbutton" onClick={() => handleWater(100)}>100 ml</button>
                        <button className="physbutton"onClick={() => handleWater(250)}>250 ml</button>
                        <button className="physbutton"onClick={() => handleWater(350)}>350 ml</button>
                        <button className="physbutton"onClick={() => handleWater(500)}>500 ml</button>
                        <input type="text" value={customWater} onChange={(e) => setCustomWater(e.target.value)} placeholder="Custom amount (ml)"/>
                        <button className="physbutton" onClick={handleCustomwater}>Confirm!</button>
                    </div>
                </div>

                <div className="workoutBox">
                    <div className="workoutimg">
                        <img src={`${process.env.PUBLIC_URL}/excerciseresize.png`}/>
                    </div>
                    <div className="workout">
                        <p>Today I worked out for {workouthours} minutes.</p>
                        <input type="range" min="1" max="180" value={workouthours} id="workoutrange" onChange={handleWorkout}></input>
                        <input type="text" value={customWorkout} onChange={(e) => setCustomWorkout(e.target.value)} placeholder="Enter minutes"/>
                        <button className="physbutton" onClick={handleCustomworkout}>Confirm!</button>
                    </div>
                </div>

                <div className="eatBox">
                    <div className="eatimg">
                        <img src={`${process.env.PUBLIC_URL}/eatingresize.png`}/>
                    </div>
                    <div className="calories">
                        <p>Today I've had: {calories}cal / {dailycalGoal}cal in my meals.</p>
                        <div className="cal-progress-container">
                        <div className="cal-bar" style={{ width: `${calprogressPercentage}%` }}></div>
                        </div>
                        <button className="physbutton" onClick={() => handleCalories(50)}>50 cal</button>
                        <button className="physbutton" onClick={() => handleCalories(150)}>150 cal</button>
                        <button className="physbutton" onClick={() => handleCalories(350)}>350 cal</button>
                        <button className="physbutton" onClick={() => handleCalories(500)}>500 cal</button>
                        <input type="text" value={customCal} onChange={(e) => setCustomCal(e.target.value)} placeholder="Custom amount (cal)"/>
                        <button className="physbutton" onClick={handleCustomcalories}>Confirm!</button>
                    </div>
                </div>

                <div>
                    <button className="save-button" onClick={saveData} >Save progress!</button>
                </div>

                <div className="changes">
                    <div>
                        <input type="text" value={newGoal} onChange={(e) => setNewgoal(e.target.value)} placeholder="New goal (ml)"/>
                        <button id="changew" onClick={changeWater}>Change water goal</button>
                    </div>
                    <div>
                        <input type="text" value={newcalGoal} onChange={(e) => setcalNewgoal(e.target.value)} placeholder="New goal (cal)"/>
                        <button id="changec" onClick={changeCal}>Change calorie goal</button>
                    </div>
                </div>

            </div>
            <div className="spooks">
            <img src={`${process.env.PUBLIC_URL}/spooksresize.png`}/>
            </div>
        </div>

    </div>
)
}

export default PhysicalHealth;