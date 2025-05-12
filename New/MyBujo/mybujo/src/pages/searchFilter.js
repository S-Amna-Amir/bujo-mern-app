import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMonthlyData } from "../api/physicalhealthApi";
import "./searchFilter.css";

function SearchFilter()
{
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedCategories, setSelectedCategories] = useState(
    {
    sleep: true,
    water: true,
    exercise: true,
    calories: true
    });

    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await getMonthlyData(selectedMonth);
            setMonthlyData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
        
        fetchData();
      }, [selectedMonth]);
    
      const handleCategoryChange = (category) => {
        setSelectedCategories(prev => ({
          ...prev,
          [category]: !prev[category]
        }));
      };

      const filteredData = monthlyData.map(entry => {
        return {
          date: entry.date,
          ...(selectedCategories.sleep && { sleepHours: entry.sleepHours }),
          ...(selectedCategories.water && { waterIntake: entry.waterIntake }),
          ...(selectedCategories.exercise && { workoutMinutes: entry.workoutMinutes }),
          ...(selectedCategories.calories && { caloriesConsumed: entry.caloriesConsumed })
        };
      });

    return(
        <div>
            <div className="heading">
                <h1>Search and Filter</h1>
                <p id="message">Let's look at your progress!</p>
            </div>
            <div className="pagesBody">
                <div className="controls-container">
                    <div className="monthselector">
                        <p>Which month would you like to search?</p>
                        <select name="monthslist" id="monthslist" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                <div className="filter">
                  <p>Select which categories you'd like to view: </p>
                  {Object.entries(selectedCategories).map(([category, isChecked]) => (
                  <div key={category}>
                    <input type="checkbox" id={`${category}checkbox`} checked={isChecked} onChange={() => handleCategoryChange(category)}/>
                    <label htmlFor={`${category}checkbox`}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                  </div>
                  ))}
                </div>
                </div>
                {loading ? (<p>Loading...</p>) : (
            <div className="results">
            {filteredData.length === 0 ? (<p className="no-data-message">No health data found for {selectedMonth}!</p>) : (
            filteredData.map((entry, index) => (
            <div key={`${entry.date}-${index}`} className="entry">
              <h3 className="entry-date">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </h3>
                  
                  <div className="entry-stats">
                    {entry.sleepHours !== undefined && (
                      <div className="stat-item">
                        <span className="stat-label">Sleep:</span>
                        <span className="stat-value">{entry.sleepHours} hours</span>
                        <div className="stat-bar" style={{ width: `${(entry.sleepHours/8)*100}%` }}></div>
                      </div>
                    )}
                    
                    {entry.waterIntake !== undefined && (
                      <div className="stat-item">
                        <span className="stat-label">Water:</span>
                        <span className="stat-value">{entry.waterIntake} ml</span>
                        <div className="stat-bar" style={{ width: `${(entry.waterIntake/entry.waterGoal)*100}%` }}></div>
                      </div>
                    )}
                    
                    {entry.workoutMinutes !== undefined && (
                      <div className="stat-item">
                        <span className="stat-label">Exercise:</span>
                        <span className="stat-value">{entry.workoutMinutes} minutes</span>
                      </div>
                    )}
                    
                    {entry.caloriesConsumed !== undefined && (
                      <div className="stat-item">
                        <span className="stat-label">Calories:</span>
                        <span className="stat-value">{entry.caloriesConsumed} cal</span>
                        <div className="stat-bar" style={{ width: `${(entry.caloriesConsumed/entry.calorieGoal)*100}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>))
            )}
          </div>
        )}
            
            </div>
        </div>
    )
}

export default SearchFilter;